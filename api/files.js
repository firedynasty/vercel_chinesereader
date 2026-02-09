import { put, list } from '@vercel/blob';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { blobs } = await list({ prefix: 'chinese-reader/' });

      const files = {};
      for (const blob of blobs) {
        const filename = blob.pathname.replace('chinese-reader/', '');
        try {
          const response = await fetch(blob.url);
          const content = await response.text();
          files[filename] = content;
        } catch (e) {
          console.error(`Error fetching ${filename}:`, e);
        }
      }

      return res.status(200).json({ files });
    }

    if (req.method === 'POST') {
      const { filename, content } = req.body;

      if (!filename || content === undefined) {
        return res.status(400).json({ error: 'Missing filename or content' });
      }

      const blob = await put(`chinese-reader/${filename}`, content, {
        access: 'public',
        addRandomSuffix: false,
      });

      return res.status(200).json({ success: true, url: blob.url });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
