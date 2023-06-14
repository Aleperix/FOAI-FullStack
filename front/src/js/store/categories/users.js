import axios from "axios";
export const userStore = {
	user: {},
	auth: false
}

export function userActions(getStore, getActions, setStore) {
    return {
        getUsers: async () => {
            const res = await axios.get("http://localhost:8000/users");
            console.log(res);
        },
        getProfile: async (id) => {
            const res = await axios.get("http://localhost:8000/users/" + id);
            console.log(res);
        }
    }
}