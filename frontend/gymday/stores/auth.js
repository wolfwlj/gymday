import {defineStore} from 'pinia'
import { baseURL } from '../api.js'


const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        authenticated : false,
        user : {
            ID : 0,
            FirstName : null,
            LastName : null,
            Email : null,
            ProfilePicture : null,
            Bio : null,
            CreatedAt : null,
            UpdatedAt : null,
        } ,

        emailverified : false,
    }),
    getters: {

    },
    actions: {
        async loginuser(Email, Password) {
            // fetchWithCookie(event, `${baseURL}/user/login`)
            // const { data, pending } = await useAsyncData(() => postWithCookie(event, `${baseURL}/user/login`,{
            //     Email : Email,
            //     Password : Password,
            // }))
        
            // // useFetch from nuxt 3
            const { data, pending } = await useFetch(`${baseURL}/user/login`, {
                method: 'post',
                headers: useRequestHeaders(['cookie']),
                body: {
                    Email : Email,
                    Password : Password,
                },
                credentials: 'include',
            });
            this.loading = pending;
            let date = new Date();
            // token expires in 2050 year
            date.setFullYear(2050);

            if (data.value) {   
                const token = useCookie('gymdaytoken', { expires: date}); // useCookie new hook in nuxt 3
                token.value = data?.value?.cookie; // set token to cookie
                console.log(data.value)
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
            const headers = useRequestHeaders(['cookie'])

            // if (token === undefined) return;
            // set headers to include token
            const user = await useFetch(`${baseURL}/user/validate`, {
                headers
            }).catch((error) => error.data)

            this.authenticated = true
            this.user = user.user

        },
        async verifyEmail(token){
                
                if (token === undefined) return;
    
                const result = await $fetch(`${baseURL}/user/verifyemail`, {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: {
                        Token : token
                    },
                }).catch((error) => error.data)

                if (result.status === 200) {
                    this.emailverified = true
                }
            },
    },
})

export default useAuthStore