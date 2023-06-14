import axios from "axios";
export const gptStore = {
	audio: "",
}

export function gptActions(getStore, getActions, setStore) {
    return {
        createGpt: async (prompt, lang) => {
            const res = await axios.post("http://localhost:8000/gpt", {
                id: "*",
                prompt: prompt,
                response: "*",
                language: lang,
                audio: "*"
            });
            console.log(res);
            setStore({audio: res.data})
        },
    }
}