import axios from "axios";
export const gptStore = {
	audio: "",
    // pPrompt: "",
    // pResponse: "",
}

export function gptActions(getStore, getActions, setStore) {
    return {
        createGpt: async (prompt, lang) => {
            // const store = getStore();
            // if(store.pResponse === undefined){
            //     prompt = {new: prompt}
            // }else{
            //     prompt = {new: prompt, previous: {prompt: store.pPrompt, response: store.pResponse}}
            // }
            const res = await axios.post(process.env.REACT_APP_API_URL+"/gpt", {
                id: "*",
                prompt: JSON.stringify(prompt),
                response: "*",
                language: lang,
                audio: "*"
            });
            console.log(res);
            setStore({audio: res.data})
            // setStore({pPrompt: res.data.prompt})
            // setStore({pResponse: res.data.response})
        },
    }
}