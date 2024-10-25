// src/lib/stores/theme.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Get initial theme from localStorage or system preference
const getInitialTheme = () => {
	if (browser) {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			return savedTheme === 'dark';
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	return false;
};

export const isDarkMode = writable(getInitialTheme());

// Update localStorage and document class when theme changes
if (browser) {
	isDarkMode.subscribe((darkMode) => {
		localStorage.setItem('theme', darkMode ? 'dark' : 'light');
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
}
