import {defineStore} from 'pinia'
import { baseURL } from '../api.js'

const useProfileStore = defineStore({
  id: "profile",
  state: () => ({
    // modal states
    isEditProfileOpen: false,
    isAddListingOpen: false,
    isEditListingOpen: false,
    // data states
    addListingState: {
      title: "",
      tags: [],
      description: "",
      price: 0,
      location: "",
      city: "",
      images: [""],
      private: true,
    },

    user: null,
    selectedListing: null,
    images_to_be_deleted: [],
    profilelistings: [],
    profileimages: [],
  }),
  getters: {},
  actions: {

    async getUser(userID) {
      const profileService = useProfileService()

      try {
        const result = await profileService.getUser(userID)
        this.user = result.user
      } catch (e) {
        console.log(e)
      }
    },


    async updateProfile() {

      const profileService = useProfileService()

      try {
        console.log(this.user.ProfilePicture)
        const result = await profileService.updateProfile(this.user.FirstName, this.user.LastName, this.user.Bio, this.user.ProfilePicture)
        console.log(result)
        await this.getUser(this.user.ID)
        this.isEditProfileOpen = false
      } catch (e) {
        console.log(e)
      }

    },


    async addListing(title, city, tags, description, price, location, images, privatelisting) {

        const profileService = useProfileService()

        console.log(tags)
        try {
          const result = await profileService.addListing(title, city, tags, description, price, location, images, images.length, privatelisting)
          console.log(result)
          await this.getlistings()

          this.addListingState = {
            title: "",
            tags: [],
            description: "",
            price: 0,
            location: "",
            city: "",
            images: [""],
            private: true,
          }
          

          this.isAddListingOpen = false
        } catch (e) {
          console.log(e)
        }
    },
    async getlistings() {
        const profileService = useProfileService()

        try {
            const result = await profileService.getListings(this.user.ID)
            console.log(result.listings)
            this.profilelistings = result.listings
        } catch (e) {
            console.log(e)
        }

    },

    async editListing(title, city, tags, description, price, location, images, images_to_delete, privatelisting) {

      let dataForm = new FormData();

      for (let i = 0; i < images.length; i++) {
        dataForm.append(`name${i + 1}`, `file${i + 1}`);
        dataForm.append(`file${i + 1}`, images[i]);
      }

      console.log(images_to_delete)

      dataForm.append("Title", title);
      dataForm.append("Tags", tags);
      dataForm.append("City", city);
      dataForm.append("Description", description);
      dataForm.append("Price", price);
      dataForm.append("Location", location);
      dataForm.append("Private", privatelisting);
      dataForm.append("ImagesToBeDeleted", images_to_delete);
      dataForm.append("ImageAmount", images.length);

      try {
        const response = await $fetch(`/api/profile/listing?id=${this.selectedListing.ID}`, {
          headers: useRequestHeaders(['cookies']),
          body: dataForm,
          method: 'PUT'
        })
        console.log(response)
        await this.getlistings();
        this.isEditListingOpen = false;
      } catch (e) {
        console.log(e)
      }

    },

    async deleteListing() {

        const profileService = useProfileService()

        try {
            const result = await profileService.deleteListing(this.selectedListing.ID)
            console.log(result.success)
            await this.getlistings()
            this.isEditListingOpen = false
        } catch (e) {
            console.log(e)
        }

    },
  },
});

export default useProfileStore