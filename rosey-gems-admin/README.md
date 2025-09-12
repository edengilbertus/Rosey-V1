# ROSEY GEMS Admin Panel

A separate admin panel application for managing ROSEY GEMS jewelry store products and orders.

## Features

- Product management (add, edit, delete)
- Order management (view, mark as complete)
- Dashboard with statistics
- Secure authentication

## Environment Variables

To run this application, you need to set up the following environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_SERVICE_KEY`: Your Supabase service key (for admin access)

Create a `.env.local` file in the root directory with these variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_SERVICE_KEY=your_supabase_service_key
```

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependencies for the admin panel.

### `npm run dev`

Runs the app in development mode on port 3001.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run preview`

Preview the production build locally.

## Learn More

This project was built with:
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)