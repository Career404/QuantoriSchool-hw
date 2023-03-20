import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/QuantoriSchool-hw/',
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				phone: resolve(__dirname, 'src/pages/1phone/1phone.html'),
				DVD: resolve(__dirname, 'src/pages/2DVD/2DVD.html'),
			},
		},
	},
})
