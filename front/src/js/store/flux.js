import { gptActions, gptStore } from "./categories/gpt.js";
import { userStore, userActions } from "./categories/users.js";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentTheme: localStorage.getItem('theme') ? localStorage.getItem('theme') : window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light",
			currentLanguage: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en_US',
		},
		...userStore,
		...gptStore,
		actions: {
			// Use getActions to call a function within a fuction
			
			setTheme: (theme) => {
					document.querySelector("html").setAttribute("data-bs-theme", theme)
					localStorage.setItem('theme', theme)
					setStore({currentTheme: theme})
			},
			setLanguage: (lang) => {
				localStorage.setItem('lang', lang)
				setStore({currentLanguage: lang})
			},
			...userActions(getStore, getActions, setStore),
			...gptActions(getStore, getActions, setStore),
		}
	};
};

export default getState;