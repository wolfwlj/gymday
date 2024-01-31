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

            let dataForm = new FormData()

            for (let i = 0; i < images.length; i++) {
                dataForm.append(`name${i+1}`, `file${i+1}`);
                dataForm.append(`file${i+1}`,  images[i]); 
            }

            dataForm.append('ImageAmount', images.length)
            dataForm.append('Title', title)
            dataForm.append('City', city)
            dataForm.append('Description', description)
            dataForm.append('Price', price)
            dataForm.append('Location', location)
            dataForm.append('Province', province)
            dataForm.append('Country', country)
            dataForm.append('Private', privatelisting)

            const { data, pending, error} = await useFetch(`${baseURL}/user/listing`, {
                method: 'post',
                body: dataForm,
                credentials: 'include',
            });
            this.loading = pending;
            if (data.value) {
                await this.getlistings()
                this.isAddListingOpen = false
            }
        },

        async editListing(title, city, description, price, location, province, country, images, privatelisting) {
            
            let dataForm = new FormData()

            for (let i = 0; i < images.length; i++) {
                dataForm.append(`name${i+1}`, `file${i+1}`);
                dataForm.append(`file${i+1}`,  images[i]); 
            }

            dataForm.append('Title', title)
            dataForm.append('City', city)
            dataForm.append('Description', description)
            dataForm.append('Price', price)
            dataForm.append('Location', location)
            dataForm.append('Province', province)
            dataForm.append('Country', country)
            dataForm.append('Private', privatelisting)

            const { data, pending, error} = await useFetch(`${baseURL}/user/listing/${this.selectedListing.ID}`, {
                method: 'put',
                body: dataForm,
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