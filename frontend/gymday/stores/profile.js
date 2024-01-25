import {defineStore} from 'pinia'
import { baseURL } from '../api.js'


const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        // modal states
        isEditProfileOpen : false,
        isAddListingOpen : false,
        isEditListingOpen : false,
        // data states
        user : null,
        selectedListing : null,
        profilelistings : [],
        profileimages : [],
    }),
    getters: {

    },
    actions: {
        async getUser(userID) {
            const { data, pending } = await useFetch(`${baseURL}/user/user/${userID}`, {
                method: 'get',
                credentials: 'include',
            });
            this.loading = pending;
            if (data.value) {
                this.user = data.value.user
                console.log(this.user)
            }
        },
        async updateProfile() {
            // update user
            let bodydata = new FormData()
            
            bodydata.append('name', 'file');
            bodydata.append('file',  this.user.ProfilePicture); 
            bodydata.append('FirstName', this.user.FirstName)
            bodydata.append('LastName', this.user.LastName)
            bodydata.append('Bio', this.user.Bio)

            const { data, pending } = await useFetch(`${baseURL}/user/user/${this.user.ID}`, {
                method: 'put',
                body: bodydata,
                credentials: 'include',
            });
            this.loading = pending;
            if (data.value) {
                await this.getUser(this.user.ID)
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
                console.log(data.value.listings)
                this.profilelistings = data.value.listings
            }
        },

        async addListing(title, city, description, price, location, province, country, images, privatelisting) {

            console.log(title, city, description, price, location, province, country, images, privatelisting)

            const { data, pending, error} = await useFetch(`${baseURL}/user/listing`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    Title : title,
                    City : city,
                    Description : description,
                    Price : price,
                    Location : location,
                    Province : province,
                    Country : country,
                    Images : images,
                    Private : privatelisting
                },
                credentials: 'include',
            });
            this.loading = pending;
            if (data.value) {
                await this.getlistings()
                this.isAddListingOpen = false
            }
        },

        async editListing(title, city, description, price, location, province, country, images, privatelisting) {
    
            const { data, pending, error} = await useFetch(`${baseURL}/user/listing/${this.selectedListing.ID}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    Title : title,
                    City : city,
                    Description : description,
                    Price : price,
                    Location : location,
                    Province : province,
                    Country : country,
                    Images : images,
                    Private : privatelisting
                },
                credentials: 'include',
            });
            this.loading = pending;
            
            if (data.value) {
                await this.getlistings()
                this.isEditListingOpen = false
            }
        },
        
        async deleteListing() {
            const { data, pending } = await useFetch(`${baseURL}/user/listing/${this.selectedListing.ID}`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            this.loading = pending;
            if (data.value) {
                await this.getlistings()
                this.isEditListingOpen = false
            }
        },


        async getProfileImages() {
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

        async uploadProfileImage() {
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

        async deleteProfileImage() {
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