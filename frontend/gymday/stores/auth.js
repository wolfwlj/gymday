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
            const authService = useAuthService()
            try {
                const user = await authService.login(Email, Password)
                console.log(user)

                this.authenticated = true
                this.user = user.user

            } catch (e) {
                console.log(e)
            }
        },

        async logoutuser() { // logout action

            const authService = useAuthService()

            try {
                const user = await authService.logout() // call logout method from auth service
                console.log(user)

                this.authenticated = false; // set authenticated  state value to false
                this.user = null; // set user state value to null

            } catch (e) {
                console.log(e)
            }
        },

        async validate(){

            const authService = useAuthService()
            try {
                const user = await authService.getUser()
                console.log(user)

                this.authenticated = true
                this.user = user.user

            } catch (e) {
                console.log(e)
            }
        },
        async verifyEmail(token){
            const authService = useAuthService()
            try {
                const user = await authService.verifyEmail(token)
                console.log(user)

                this.emailverified = true
            } catch (e) {
                console.log(e)
            }

        },
    },
})

export default useAuthStore