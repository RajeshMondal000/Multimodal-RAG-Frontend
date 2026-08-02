# Multimodal RAG Frontend

A modern React frontend for the **Multimodal Retrieval-Augmented Generation (RAG) Assistant**. It provides an intuitive interface for uploading documents, managing conversations, and interacting with the AI-powered backend.

## Features

- Upload multiple document formats
  - PDF
  - DOCX
  - TXT
  - CSV
  - XLSX
  - Images
- Real-time upload progress
- Document management
- Multi-chat support per document
- Persistent chat history
- **Document Only** and **Document + AI** chat modes
- Markdown rendering with syntax highlighting
- Responsive and modern UI
- Automatic backend integration

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Markdown



## Environment Variable

Create a `.env` file:

```env
VITE_API_URL=https://your-backend.workers.dev
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

The frontend is designed for **Cloudflare Pages** and supports automatic deployment through GitHub.

## License

This project is licensed under the MIT License.