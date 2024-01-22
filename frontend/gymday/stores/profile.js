import {defineStore} from 'pinia'
import { baseURL } from '../api.js'


const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        // modal states
        isEditProfileOpen : false,
        isAddListingOpen : false,
        
        // data states
        user : null,
        profilelistings : [],
        profileimages : [],
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
        },

        async addListing() {
            const { data, pending } = await useFetch(`${baseURL}/user/listingsbyuser/${this.user.ID}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    Title : this.user.Title,
                    Description : this.user.Description,
                    Price : this.user.Price,
                    Location : this.user.Location,
                    Image : this.user.Image,
                },
                credentials: 'include',
            });
            this.loading = pending;
            if (data.value) {
                this.profilelistings = data.value.listings
            }
        },


        async GetProfileImages() {
            const { data, pending } = await useFetch(`${baseURL}/user/profileimages/${this.user.ID}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            this.loading = pending;
            if (data.value) {
                this.profileimages = data.value.profileImages
            }
        },

        async UploadProfileImage() {
            const { data, pending } = await useFetch(`${baseURL}/user/profileimages/${this.user.ID}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            this.loading = pending;
            if (data.value) {
                this.profileimages = data.value.images
                console.log(this.profileimages.length)
            }
        },

        async DeleteProfileImage() {
            const { data, pending } = await useFetch(`${baseURL}/user/profileimages/${this.user.ID}`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            this.loading = pending;
            if (data.value) {
                this.profileimages = data.value.images
                console.log(this.profileimages.length)
            }
        }

        
    },
})







export default useProfileStore