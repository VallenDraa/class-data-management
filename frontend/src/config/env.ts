export const env = {
	BASE_API_URL: import.meta.env.VITE_BASE_API_URL as string,
	DEV: import.meta.env.DEV,
} as const;
