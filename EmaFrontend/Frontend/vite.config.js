import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server:{
  //   proxy:{
  //     "/api/login":"http://127.0.0.1:8000",
  //     "/api/register":"http://127.0.0.1:8000",
  //     "/api/logout":"http://127.0.0.1:8000",
  //     "/api/upload":"http://127.0.0.1:8000",
  //     "/api/get":"http://127.0.0.1:8000",
  //     "/api/convert_image":"http://127.0.0.1:8000",
  //     "/api/delete_image":"http://127.0.0.1:8000"
  //   }
  // }
});
