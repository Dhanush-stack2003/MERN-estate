import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'https://mern-estate-k37d.onrender.com',
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/api/, "")
      }
      }
    },
  plugins: [react()],
})
