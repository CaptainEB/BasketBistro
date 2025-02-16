import react from '@vitejs/plugin-react';
import { NodePackageImporter } from 'sass-embedded';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		open: true,
		proxy: {
			'/graphql': {
				target: 'http://localhost:3001',
				secure: false,
				changeOrigin: true,
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern',
				importers: [new NodePackageImporter()],
			},
		},
	},
});
