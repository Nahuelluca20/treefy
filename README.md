# Welcome to Remix + Cloudflare!

- 📖 [Remix docs](https://remix.run/docs)
- 📖 [Remix Cloudflare docs](https://remix.run/guides/vite#cloudflare)

## Development

Run the dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## About the Project

This project is a note-taking application that allows users to create, view, edit, and delete notes. It uses Remix as the main framework and is deployed on Cloudflare Pages.

### Key Features

- User authentication
- Note creation and editing with a rich text editor
- Note viewing in list and detail views
- Error handling, including a custom page for not found notes
- Responsive design using Tailwind CSS

### Project Structure

- `app/`: Contains the main application logic
  - `components/`: Reusable components
  - `models/`: Data access logic
  - `routes/`: Application routes
  - `types/`: TypeScript type definitions
- `public/`: Static files
- `styles/`: Global styles and Tailwind configuration

### Technologies Used

- Remix
- React
- TypeScript
- Tailwind CSS
- Cloudflare Pages
