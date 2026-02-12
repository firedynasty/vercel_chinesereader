# Chinese Reader

A browser-based Chinese text-to-speech reader for language learners. Paste in Chinese text, and the app reads it aloud character-by-character with synchronized highlighting, glossary annotations, and cloud storage integration.

## Features

**Reading & Playback**
- Character-by-character text-to-speech with visual highlighting
- Mandarin (zh-CN) and Cantonese (zh-HK) voice support
- Adjustable playback speed (0.5x - 1.5x)
- Sentence-level navigation with arrow keys, number keys, or click-to-jump

**Glossary & Annotation**
- `[word](gloss)` annotation format with hover tooltips
- Annotate button to add Chinese-English glosses to text (annotates first occurrence only)
- Annotate from clipboard text
- Flashcard generation from annotated words — copy to clipboard for import into study apps

**Cloud Storage**
- Save and load text via Vercel Blob storage
- Dropbox integration with OAuth2 (browse, search, download, and upload files)

**Keyboard Shortcuts**
- `Esc` / `Enter` — Play / Stop
- `Left` / `Right` — Previous / Next sentence
- `` ` `` — Copy current sentence
- `0-9` — Jump to sentence by number

## Setup

Hosted on Vercel. To run locally:

```bash
npm install
npm start
```

For cloud features, set these environment variables:
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob storage token
- `REACT_APP_DROPBOX_APP_KEY` — Dropbox API app key

## File Structure

```
index.html          Main app (single-page, self-contained)
api/
  files.js          Vercel Blob storage API (list, save)
  dropbox-key.js    Serves Dropbox app key to client
vercel.json         URL rewrites for Vercel deployment
package.json        Dependencies (@vercel/blob)
```
