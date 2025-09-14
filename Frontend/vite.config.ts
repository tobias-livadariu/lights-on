import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/lights-on/',  //  important
   plugins: [react()],
  build: {
    outDir: 'dist'
  },
   server: {
      host: '0.0.0.0', // Binds to all available network interfaces
      port: 5173,      // Optional: Specify the port explicitly
      allowedHosts: [
           'tobias-livadariu.online',
           'www.tobias-livadariu.online'
      ],
      proxy: {
         "/lights-on/api": {
            target: "http://localhost:5000", // Backend server
            changeOrigin: true,
            secure: false,
         },
      },
   },
});
