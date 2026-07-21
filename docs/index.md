---
layout: default
---

<img class="hero" src="{{ '/assets/header2.jpg' | relative_url }}" alt="Milo guiding a handler along an outdoor park path">

<h1 class="paper-title">Milo, the Mila Fully Autonomous Indoor/Outdoor Robotic Guide Dog</h1>

<div class="authors">
  <p class="author-list">
    <a href="https://fgolemo.github.io" target="_blank">Florian Golemo</a><sup>*</sup>,
    <a href="https://jowsk.github.io/" target="_blank">Joanna Wolski</a><sup>*</sup>,
    <a href="https://www.linkedin.com/in/joelmoniz/" target="_blank">Joel Ruben Antony Moniz</a>,
    <a href="https://chris-pal-lab.github.io/" target="_blank">Christopher Pal</a>
  </p>
  <p class="affiliation"><a href="https://mila.quebec" target="_blank" rel="noopener">Mila - Quebec AI Institute</a>, <a href="https://www.polymtl.ca/" target="_blank" rel="noopener">Polytechnique Montreal</a></p>
  <p class="equal-contrib"><sup>*</sup> Equal contribution</p>
</div>

<p class="paper-meta">Submitted to the Conference on Robot Learning (CoRL) 2026<br><br><b>TL;DR:</b> Real guide dogs are incredibly expensive (~$50,000) and take long to train. With Milo, we've developed an autonomous (self-contained, no cloud compute) and low-cost (~$2,000) robot guide dog that can follow paths and avoid obstacles and pedestrians indoors and outdoors. And in order to foster open access for the blind/low-vision community, we're open-sourcing our research.</p>

<div class="button-row">
  <a class="btn-link btn-github" href="{{ site.github_url }}" target="_blank" rel="noopener">
    <svg class="btn-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
    GitHub
  </a>
  <a class="btn-link btn-arxiv" href="{{ site.arxiv_url }}" target="_blank" rel="noopener">
    <svg class="btn-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.2 2.7 7.1 8l-4.9 5.3c-.3.3-.2.8.2 1l1.3.6c.3.15.7.05.9-.25L9 9.3l4.4 5.35c.2.3.6.4.9.25l1.3-.6c.4-.2.5-.7.2-1L11 8l4.8-5.3c.3-.3.2-.8-.2-1l-1.3-.6c-.3-.15-.7-.05-.9.25L9 6.7 4.6 1.35c-.2-.3-.6-.4-.9-.25l-1.3.6c-.4.2-.5.7-.2 1z"/></svg>
    arXiv
  </a>
  <a class="btn-link btn-pdf" href="{{ '/assets/milo_paper.pdf' | relative_url }}" target="_blank" rel="noopener">
    <svg class="btn-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 1.5A1.5 1.5 0 0 1 5.5 0h5.086a1.5 1.5 0 0 1 1.06.44l2.914 2.914A1.5 1.5 0 0 1 15 4.414V14.5A1.5 1.5 0 0 1 13.5 16h-8A1.5 1.5 0 0 1 4 14.5v-13zM5.5 1.5v13h8V5H10a1 1 0 0 1-1-1V1.5H5.5zm5 .207L13.293 4.5H10.5V1.707zM6.5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 2.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1z"/></svg>
    Paper PDF
  </a>
</div>


## Demos

<div class="demo-grid">
  <div class="demo-card">
    <video autoplay muted loop playsinline controls>
      <source src="{{ '/assets/dogwalk1-indoor.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p>Indoor navigation</p>
  </div>
  <div class="demo-card">
    <video autoplay muted loop playsinline controls>
      <source src="{{ '/assets/dogwalk2-indoor.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p>Indoor obstacle course</p>
  </div>
  <div class="demo-card">
    <video autoplay muted loop playsinline controls>
      <source src="{{ '/assets/dogwalk3-outdoor.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p>Outdoor navigation</p>
  </div>
  <div class="demo-card">
    <video autoplay muted loop playsinline controls>
      <source src="{{ '/assets/dogwalk4-drone1.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p>Outdoor nav with pedestrian avoidance (drone view)</p>
  </div>
</div>

## How Milo sees the world

Milo builds a live 3D understanding of its surroundings from LiDAR and camera: occupied space, walkable floor, people, and the handler—then navigates through that map with a simulator-trained policy.

<div
  class="milo-world"
  data-milo-world-viewer
  data-obj="{{ '/assets/scene/color_3d_map_scene.obj' | relative_url }}"
  data-mtl="{{ '/assets/scene/color_3d_map_scene.mtl' | relative_url }}"
  data-focus="world_robot_footprint">
  <div class="milo-world-view" aria-label="Interactive 3D perception scene"></div>
  <div class="milo-world-status">Loading 3D scene…</div>
  <p class="milo-world-hint"><strong>drag</strong> to orbit · <strong>scroll</strong> to zoom</p>
</div>

<ul class="milo-legend" aria-label="Color legend for the 3D scene">
  <li><span class="swatch" style="background:#22c55e"></span>robot</li>
  <li><span class="swatch" style="background:#a855f7"></span>handler</li>
  <li><span class="swatch" style="background:#ef4444"></span>obstacles</li>
  <li><span class="swatch" style="background:#9ca3af"></span>walkable path</li>
  <li><span class="swatch" style="background:#3b82f6"></span>objects</li>
  <li><span class="swatch" style="background:#eab308"></span>pedestrian</li>
</ul>

<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/"
  }
}
</script>
<script type="module" src="{{ '/assets/js/milo-world-viewer.js' | relative_url }}"></script>


## Abstract

Many Blind and Low-Vision (BLV) people rely on guide dogs for moment-to-moment navigation, such as staying on path and avoiding obstacles and pedestrians. However, guide dogs are expensive to acquire and maintain (approximately $50k USD plus ongoing costs), often involve long waiting lists, and have relatively short life expectancies. While robot guide dogs offer a promising alternative, existing approaches exploring this idea suffer from several drawbacks: They often lack the autonomy required for real-world deployment, relying on prior 3D scans of the environment, external computation, or limited awareness of the handler.

In this work, we present **Milo**, the first open-source, low-cost (approximately $2k USD) robotic guide dog platform capable of fulfilling the basic collaborative navigation role expected of a guide dog. Milo is fully autonomous, requiring no *a priori* knowledge of the environment, completely self-contained with all computation performed onboard, and suitable for both indoor and outdoor navigation while avoiding obstacles and pedestrians. Our system consists of a modified Unitree Go2 robot (equipped with onboard compute, sensors, and a handle), a perception stack combining voxel mapping with floor, obstacle, and pedestrian detection, and a navigation stack based on an obstacle-avoidance policy trained in a custom bird's-eye-view simulator. We evaluate Milo in real indoor and outdoor obstacle courses and compare it against a costmap-based baseline, demonstrating smoother navigation and fewer handler collisions. To maximize accessibility for BLV users, we release both the robot hardware instructions and the complete software stack as open source.


## Comparison with Prior Work

<table class="comparison-table">
  <thead>
    <tr>
      <th>Method</th>
      <th>Indoor &amp; Outdoor</th>
      <th>Unknown Environment</th>
      <th>Fully Onboard</th>
      <th>Handler Commands</th>
      <th>Dynamic Handler Modeling</th>
      <th>Open Source</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://arxiv.org/abs/2109.05603" target="_blank">Sorokin et al.</a></td>
      <td>Outdoor only</td>
      <td><span class="mark-yes">✓</span></td>
      <td><span class="mark-yes">✓</span></td>
      <td><span class="mark-no">✗</span></td>
      <td><span class="mark-no">✗</span></td>
      <td><span class="mark-no">✗</span></td>
    </tr>
    <tr>
      <td><a href="https://dl.acm.org/doi/10.1145/3613904.3642227" target="_blank">Cai et al., “RDog”</a></td>
      <td><span class="mark-yes">✓</span></td>
      <td><span class="mark-no">✗</span></td>
      <td><span class="mark-yes">✓</span></td>
      <td><span class="mark-yes">✓</span></td>
      <td>Partial</td>
      <td><span class="mark-no">✗</span></td>
    </tr>
    <tr>
      <td><a href="https://arxiv.org/abs/2210.13368" target="_blank">Hwang et al., “Summer”</a></td>
      <td>Indoor only</td>
      <td><span class="mark-yes">✓</span></td>
      <td><span class="mark-no">✗</span></td>
      <td><span class="mark-yes">✓</span></td>
      <td>Static</td>
      <td><span class="mark-no">✗</span></td>
    </tr>
    <tr>
      <td><a href="https://arxiv.org/abs/2512.06147" target="_blank">Hwang et al., “GuideNav”</a></td>
      <td>Outdoor only</td>
      <td><span class="mark-no">✗</span></td>
      <td><span class="mark-yes">✓</span></td>
      <td><span class="mark-no">✗</span></td>
      <td><span class="mark-no">✗</span></td>
      <td><span class="mark-no">✗</span></td>
    </tr>
    <tr class="ours">
      <td>Ours, “Milo”</td>
      <td><span class="mark-yes">✓</span></td>
      <td><span class="mark-yes">✓</span></td>
      <td><span class="mark-yes">✓</span></td>
      <td><span class="mark-yes">✓</span></td>
      <td><span class="mark-yes">✓</span></td>
      <td><span class="mark-yes">✓</span></td>
    </tr>
  </tbody>
</table>

## Video

{% if site.youtube_id != "VIDEO_ID_HERE" %}
<div class="video-wrap">
  <iframe
    src="https://www.youtube.com/embed/{{ site.youtube_id }}"
    title="Milo project video"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>
</div>
{% else %}
<div class="video-wrap">
  <div class="video-placeholder">
    Set <code>youtube_id</code> in <code>_config.yml</code> to embed your YouTube video.
  </div>
</div>
{% endif %}

## Figures

<div class="photo-grid">
  <figure class="wide">
    <img src="{{ '/assets/method_overview.png' | relative_url }}" alt="Method overview pipeline">
    <figcaption><b>Method Overview:</b> 
    <ul>
      <li/>(a) RGB images, LiDAR scans, odometry, and handle encoder measurements are acquired. 
      <li/>(b) RGB images are processed to segment the walkable path and detect objects and pedestrians, while depth estimation updates pedestrian positions. 
      <li/>(c) The segmented path, detected objects and pedestrians, the robot and handler states, and LiDAR data are fused into a voxel-based 3D map. 
      <li/>(d) The voxel map is converted into a bird's-eye-view (BEV) representation. 
      <li/>(e) The BEV map is provided to the trained navigation policy, which predicts the robot's linear velocity and yaw rate commands. 
      <li/>(f) The predicted commands are filtered by a local obstacle avoidance safety module before being sent to the robot.</ul>
      </figcaption>
  </figure>
  <figure class = "wide">
    <img src="{{ '/assets/hardware.png' | relative_url }}" alt="Hardware overview of Milo">
    <figcaption>
    <b>Hardware Overview:</b> 
    <ul>
    <li/>(A) The Nvidia Jetson Orin Nano runs navigation and perception systems; 
    <li/>(B) the 2 degree-of-freedom joint is equipped with magnetic encoders that sense the handler's position with respect to the dog; 
    <li/>(C) the telescopic handle is adjustable to cater to different handler heights and preferences; 
    <li/>(D) with the 5-way directional pad, the handler can start/stop the robot, indicate faster/slower walk speed, and desire to turn at the next opportunity; 
    <li/>(E) the whole system is based on a Unitree Go2 Air/Pro robot dog, utilizing its...
    <li/>(F) LiDAR and...
    <li/>(G) front-facing RGB camera.
    </ul>
    </figcaption>
  </figure>
  <!-- <figure>
    <img src="{{ '/assets/simulator.png' | relative_url }}" alt="BEV simulator observation">
    <figcaption>Bird’s-eye-view simulator used to train the navigation policy.</figcaption>
  </figure>
  <figure>
    <img src="{{ '/assets/path_following.jpg' | relative_url }}" alt="Outdoor path-following experiment">
    <figcaption>Outdoor path-following experiment on a park bridge.</figcaption>
  </figure>
  <figure>
    <img src="{{ '/assets/obstacle_course.jpg' | relative_url }}" alt="Indoor obstacle avoidance course">
    <figcaption>Indoor static obstacle avoidance course.</figcaption>
  </figure> -->
  <figure class="wide">
    <img src="{{ '/assets/segmentation.jpg' | relative_url }}" alt="Walkable path segmentation comparison">
    <figcaption>Walkable-path segmentation across indoor and outdoor scenes.</figcaption>
  </figure>
</div>
