# Milo project page

Static site for the Milo paper. Built with [Jekyll](https://jekyllrb.com/) and the [Cayman](https://github.com/pages-themes/cayman) theme.

## Local preview

You need Ruby 3.x (macOS system Ruby is too old):

```bash
brew install ruby
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
gem install bundler
```

Then from this folder:

```bash
cd docs
bundle install
bundle exec jekyll serve
```

Open http://127.0.0.1:4000

## Deploy

Push to GitHub, then **Settings → Pages → Deploy from branch → `main` → `/docs`**.

Site URL: https://fgolemo.github.io/milo/

## Config

Edit `_config.yml`:

- `arxiv_url` — arXiv link
- `youtube_id` — YouTube video ID (the part after `watch?v=`)
