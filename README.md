# Phoenix Chat

This project uses **Next.js** with **TypeScript** and **Tailwind CSS** to deliver a chat interface enhanced by MotionUI animations.

## Scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm start` – run the production server
- `npm run lint` – lint the project using ESLint

## Getting Started

Install dependencies and start the local dev server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env` file in the project root with the following keys:

```bash
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your appwrite project ID
NEXT_PUBLIC_GEMINI_API_KEY=your gemini api key
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your appwrite database ID
```

These variables use the `NEXT_PUBLIC_` prefix so they are available in the
browser during development.
