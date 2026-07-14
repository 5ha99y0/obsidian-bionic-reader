# BioRead

An ADHD accessibility plugin that applies Bionic Reading formatting to notes in Obsidian's Reading/Preview mode.

## Features
- **Automatic Formatting**: Applies bionic reading anchors (bolded word prefixes) to all notes viewed in Reading mode.
- **Smart Skipping**: Ignores code blocks, inline code, scripts, and other non-prose elements.
- **Mobile Support**: Works on both desktop and mobile Obsidian.

## Installation

### Manual Installation
1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release.
2. Create a folder called `obsidian-bionic-reader` inside your vault's `.obsidian/plugins/` directory.
3. Copy the downloaded files into that folder.
4. Open Obsidian Settings → Community Plugins → Enable "BioRead".

## How It Works
The plugin hooks into Obsidian's Markdown post-processor pipeline. When you switch to Reading mode, it processes each text node and bolds the first portion of every word — creating visual fixation anchors that guide your eyes and improve reading speed.

## Compatibility
- **Minimum Obsidian Version**: 1.0.0
- **Platforms**: Desktop (Windows, macOS, Linux) and Mobile (iOS, Android)

## License
MIT
