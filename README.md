# ROSEY GEMS Jewelry Store

A modern e-commerce website for ROSEY GEMS jewelry store built with React, TypeScript, and Vite.

## Features

- Responsive design
- Product catalog with search functionality
- Shopping cart with add/remove items
- Checkout process with customer information
- Separate admin panel application for managing products and orders
- WhatsApp integration for customer communication
- Google Maps integration for location

## Environment Variables

To run this project, you need to set up the following environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

Create a `.env.local` file in the root directory with these variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Admin Panel

The admin panel is now a separate application located in the `admin-panel` directory.

To run the admin panel:
1. Navigate to the admin-panel directory: `cd admin-panel`
2. Install dependencies: `npm install`
3. Create a `.env.local` file with your Supabase credentials
4. Run the development server: `npm run dev`
5. Access the admin panel at http://localhost:3001

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.

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