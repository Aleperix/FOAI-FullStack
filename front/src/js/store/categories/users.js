import axios from "axios";
export const userStore = {
	user: {},
	auth: false
}

export function userActions(getStore, getActions, setStore) {
    return {
        getUsers: async () => {
            const res = await axios.get(process.env.REACT_APP_API_URL+"/users");
            console.log(res);
        },
        getProfile: async (id) => {
            const res = await axios.get(process.env.REACT_APP_API_URL+"/users/" + id);
            console.log(res);
        }
    }
}