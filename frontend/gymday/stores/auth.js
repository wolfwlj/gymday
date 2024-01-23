import {defineStore} from 'pinia'
import { baseURL } from '../api.js'


const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        authenticated : false,
        user : null,
    }),
    getters: {

    },
    actions: {
        async loginuser(Email, Password) {
            // useFetch from nuxt 3
            const { data, pending } = await useFetch(`${baseURL}/user/login`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    Email,
                    Password,
                },
            });
            this.loading = pending;
            let date = new Date();
            // token expires in 2050 year
            date.setFullYear(2050);

            if (data.value) {
                const token = useCookie('gymdaytoken', { expires: date }); // useCookie new hook in nuxt 3
                token.value = data?.value?.cookie; // set token to cookie
                this.authenticated = true; // set authenticated  state value to true
                this.user = data?.value?.user; // set user state value to user
            }
        },

        async logoutuser() { // logout action
            const token = useCookie('gymdaytoken'); // useCookie new hook in nuxt 3
            this.authenticated = false; // set authenticated  state value to false
            this.user = null; // set user state value to null
            token.value = null; // set token to null
        },

        async validate(token){

            if (token === undefined) return;

            const user = await $fetch(`${baseURL}/user/validate`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            }).catch((error) => error.data)

            console.log(user)
            this.authenticated = true
            this.user = user.user

        }
    },
})







export default useAuthStore