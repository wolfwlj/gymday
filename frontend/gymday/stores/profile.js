import {defineStore} from 'pinia'
import { baseURL } from '../api.js'


const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        isEditProfileOpen : false,
        user : null,
    }),
    getters: {

    },
    actions: {
        async updateProfile() {
            // update user
            const { data, pending } = await useFetch(`${baseURL}/user/user/${this.user.ID}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    FirstName : this.user.FirstName,
                    LastName : this.user.LastName,
                    Bio : this.user.Bio,
                    ProfilePicture : this.user.ProfilePicture,
                },
                credentials: 'include',
            });
            this.loading = pending;
            console.log(data)
            if (data.value) {
                this.isEditProfileOpen = false
                this.user = data.value.user
            }
        }
        
    },
})







export default useProfileStore