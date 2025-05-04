import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ✅ Important for Render to detect open port
    port: 3000       // Optional: you can change this if needed
  }
});
