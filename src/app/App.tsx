import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from './routes';
import '../i18n/config';
import { initDevTools } from '../utils/devTools';

/**
 * Elite Motors - Premium Luxury Car Marketplace
 * 
 * Features:
 * - 🌍 Multi-language support (English, Russian, Kyrgyz)
 * - 🚗 Buy & Sell luxury cars ($100k+)
 * - 🔐 Google OAuth authentication (mocked)
 * - ❤️ Favorites system
 * - 👑 Admin dashboard
 * - 📱 Fully responsive mobile design
 * - 🎨 Dark theme with gold accents
 * - ✨ Smooth animations & glassmorphism
 * 
 * To test admin features:
 * 1. Sign in via Google (mocked authentication)
 * 2. Open browser console
 * 3. Run: makeUserAdmin()
 * 4. Refresh the page
 * 5. Access Admin Dashboard from profile or header
 */

// Initialize dev tools in development
if (import.meta.env.DEV) {
  initDevTools();
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster 
        position="top-right" 
        theme="dark"
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--foreground)',
            border: '1px solid var(--gold)',
          },
        }}
      />
    </>
  );
}