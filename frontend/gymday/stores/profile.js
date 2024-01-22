import {defineStore} from 'pinia'
import { baseURL } from '../api.js'


const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        isEditProfileOpen : false,
        user : null,
        profilelistings : null,
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
            if (data.value) {
                this.isEditProfileOpen = false
                this.user = data.value.user
            }
        },
        async getlistings() {
            const { data, pending } = await useFetch(`${baseURL}/user/listingsbyuser/${this.user.ID}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            this.loading = pending;
            if (data.value) {
                this.profilelistings = data.value.listings
            }
        }
    },
})







export default useProfileStore