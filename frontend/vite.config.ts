import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';

const manifestForPlugin: Partial<VitePWAOptions> = {
	registerType: 'autoUpdate',
	minify: true,
	workbox: { clientsClaim: true, skipWaiting: true },
	devOptions: { enabled: true },
	includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
	manifest: {
		name: 'Kelass',
		short_name: 'Kelass',
		description: 'Aplikasi manajemen mahasiswa terbaik senusantara.',
		icons: [
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
			{
				src: '/apple-touch-icon.png',
				sizes: '180x180',
				type: 'image/png',
				purpose: 'apple touch icon',
			},
			{
				src: '/maskable_icon.png',
				sizes: '225x225',
				type: 'image/png',
				purpose: 'any maskable',
			},
			{
				src: '/android-icon-144x144.png',
				sizes: '144x144',
				type: 'image/png',
				purpose: 'any',
			},
		],
		theme_color: '#0284c7',
		background_color: '#ffffff',
		display: 'standalone',
		scope: '/',
		start_url: '/',
		orientation: 'portrait',
	},
};

export default defineConfig({
	plugins: [react(), VitePWA(manifestForPlugin)],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src'),
		},
	},
});
