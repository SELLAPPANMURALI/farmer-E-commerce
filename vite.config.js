// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import dotenv from 'dotenv'

// dotenv.config()

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env': process.env
//   }
// })


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['react/jsx-runtime']   // ✅ Add this to avoid preamble error
//   },
//   server: {
//     watch: {
//       usePolling: true  // ✅ Ensure polling for reliable hot reload
//     }
//   }
// });






// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import dotenv from 'dotenv';

// dotenv.config();

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env': process.env
//   },
//   server: {
//     watch: {
//       usePolling: true  // Ensure polling for reliable hot reload
//     }
//   }
// });




import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { VitePWA } from 'vite-plugin-pwa';

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'logo.png'],
      manifest: {
        name: 'Farmer E-Commerce App',
        short_name: 'FarmerApp',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4CAF50',
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  define: {
    'process.env': process.env
  },
  server: {
    watch: {
      usePolling: true
    }
  }
});
