import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";

/**
 * Embeddable Milo 3D world viewer.
 * Expects a root element with data-obj / data-mtl attributes (URLs).
 */
export function mountMiloWorldViewer(root) {
  const OBJ_URL = root.dataset.obj;
  const MTL_URL = root.dataset.mtl || OBJ_URL.replace(/\.obj$/i, ".mtl");
  const FOCUS_GROUP = root.dataset.focus || "world_robot_footprint";

  const viewEl = root.querySelector(".milo-world-view");
  const statusEl = root.querySelector(".milo-world-status");
  if (!viewEl || !statusEl || !OBJ_URL) {
    console.error("Milo world viewer: missing container, status, or data-obj");
    return;
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  viewEl.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(50, 1, 0.05, 200);
  camera.position.set(4, 3, 6);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.maxPolarAngle = Math.PI * 0.49;
  controls.minDistance = 0.4;
  controls.maxDistance = 40;

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 1.05);
  key.position.set(4, 10, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xa8c4ff, 0.35);
  fill.position.set(-6, 3, -4);
  scene.add(fill);

  function resize() {
    const w = viewEl.clientWidth || 640;
    const h = viewEl.clientHeight || 420;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  function setStatus(msg) {
    statusEl.textContent = msg || "";
    statusEl.classList.toggle("hidden", !msg);
  }

  function focusOnObject(rootObj, name) {
    let target = null;
    rootObj.traverse((obj) => {
      if (target) return;
      if (obj.name === name || obj.name.endsWith(name)) target = obj;
    });
    if (!target) {
      rootObj.traverse((obj) => {
        if (target || !obj.isMesh || !obj.geometry?.attributes?.color) return;
        const c = obj.geometry.attributes.color;
        let green = 0;
        for (let i = 0; i < Math.min(c.count, 64); i++) {
          const r = c.getX(i),
            g = c.getY(i),
            b = c.getZ(i);
          if (g > 0.85 && r < 0.2 && b < 0.2) green++;
        }
        if (green > 8) target = obj;
      });
    }
    const box = new THREE.Box3();
    if (target) box.setFromObject(target);
    else box.setFromObject(rootObj);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const radius = Math.max(size.length() * 0.5, 0.6);
    return { center, radius, target };
  }

  function enableVertexColors(rootObj) {
    rootObj.traverse((obj) => {
      if (!obj.isMesh) return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const m of mats) {
        if (!m) continue;
        if (obj.geometry?.attributes?.color) m.vertexColors = true;
        m.side = THREE.DoubleSide;
        m.needsUpdate = true;
      }
    });
  }

  /** Make the camera frustum image unlit + brighter; leave other meshes alone. */
  function brightenCameraImage(rootObj, gain = 1.35) {
    rootObj.traverse((obj) => {
      if (!obj.isMesh) return;
      const name = (obj.name || "").toLowerCase();
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      const hasMap = mats.some((m) => m && m.map);
      const isImagePlane =
        hasMap &&
        (name.includes("image_plane") ||
          name.includes("camera") ||
          mats.some((m) => (m?.name || "").toLowerCase().includes("camera")));
      if (!isImagePlane) return;

      const old = mats[0];
      const map = old.map;
      if (map) {
        map.colorSpace = THREE.SRGBColorSpace;
        map.needsUpdate = true;
      }
      const basic = new THREE.MeshBasicMaterial({
        map,
        color: new THREE.Color(gain, gain, gain),
        side: THREE.DoubleSide,
        toneMapped: false,
      });
      obj.material = basic;
      if (old && old !== basic) old.dispose?.();
    });
  }

  async function loadScene() {
    setStatus("Loading 3D scene…");
    const manager = new THREE.LoadingManager();
    let materials = null;
    try {
      materials = await new Promise((resolve) => {
        new MTLLoader(manager).load(
          MTL_URL,
          (mats) => {
            mats.preload();
            resolve(mats);
          },
          undefined,
          () => resolve(null),
        );
      });
    } catch {
      materials = null;
    }

    const object = await new Promise((resolve, reject) => {
      const loader = new OBJLoader(manager);
      if (materials) loader.setMaterials(materials);
      loader.load(OBJ_URL, resolve, undefined, reject);
    });

    enableVertexColors(object);
    brightenCameraImage(object, 1.45);
    scene.add(object);

    const { center, radius } = focusOnObject(object, FOCUS_GROUP);
    controls.target.copy(center);

    // Camera framing knobs
    const azimuthDeg = 165;
    const elevationDeg = 45;
    const distanceScale = 14;

    const dist = Math.max(radius * distanceScale, 2.5);
    const az = THREE.MathUtils.degToRad(azimuthDeg);
    const el = THREE.MathUtils.degToRad(elevationDeg);
    camera.position.set(
      center.x + dist * Math.cos(el) * Math.sin(az),
      center.y + dist * Math.sin(el),
      center.z + dist * Math.cos(el) * Math.cos(az),
    );
    controls.update();
    resize();

    let baseAzimuth = controls.getAzimuthalAngle();
    const yawAmp = THREE.MathUtils.degToRad(22);
    const yawPeriod = 7.5;
    const clock = new THREE.Clock();
    let userInteracting = false;
    let resumeAt = 0;
    let yawPhase = 0;

    controls.addEventListener("start", () => {
      userInteracting = true;
    });
    controls.addEventListener("end", () => {
      userInteracting = false;
      baseAzimuth = controls.getAzimuthalAngle();
      yawPhase = clock.getElapsedTime();
      resumeAt = performance.now() + 1200;
    });

    setStatus("");

    function tick() {
      requestAnimationFrame(tick);
      const t = clock.getElapsedTime() - yawPhase;
      if (!userInteracting && performance.now() >= resumeAt) {
        const yaw = baseAzimuth + Math.sin((t * Math.PI * 2) / yawPeriod) * yawAmp;
        const polar = controls.getPolarAngle();
        const d = camera.position.distanceTo(controls.target);
        camera.position.x = controls.target.x + d * Math.sin(polar) * Math.sin(yaw);
        camera.position.y = controls.target.y + d * Math.cos(polar);
        camera.position.z = controls.target.z + d * Math.sin(polar) * Math.cos(yaw);
        camera.lookAt(controls.target);
      }
      controls.update();
      renderer.render(scene, camera);
    }
    tick();
  }

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(viewEl);

  loadScene().catch((err) => {
    console.error(err);
    setStatus("Failed to load 3D scene.");
  });
}

document.querySelectorAll("[data-milo-world-viewer]").forEach(mountMiloWorldViewer);
