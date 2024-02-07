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
      // update user
      // let bodydata = new FormData();

      // bodydata.append("name", "file");
      // bodydata.append("file", this.user.ProfilePicture);
      // bodydata.append("FirstName", this.user.FirstName);
      // bodydata.append("LastName", this.user.LastName);
      // bodydata.append("Bio", this.user.Bio);

      const profileService = useProfileService()

      try {
        console.log(this.user.ProfilePicture)
        const result = await profileService.updateProfile(this.user.FirstName, this.user.LastName, this.user.Bio, this.user.ProfilePicture)
        console.log(result.success)
        await this.getUser(this.user.ID)
        this.isEditProfileOpen = false
      } catch (e) {
        console.log(e)
      }

      // const { data, pending } = await useFetch(
      //   `${baseURL}/user/user`,
      //   {
      //     method: "put",
      //     body: {
      //       FirstName: this.user.FirstName,
      //       LastName: this.user.LastName,
      //       Bio: this.user.Bio,
      //       ProfilePicture: this.user.ProfilePicture,
      //     },
      //     credentials: "include",
      //   }
      // );
      // this.loading = pending;
      // if (data.value) {
      //   await this.getUser(this.user.ID);
      // }
    },


    async addListing(title, city, tags, description, price, location, images, privatelisting) {
        // let dataForm = new FormData()

        // for (let i = 0; i < images.length; i++) {
        //     dataForm.append(`name${i+1}`, `file${i+1}`);
        //     dataForm.append(`file${i+1}`,  images[i]); 
        // }
        // dataForm.append('ImageAmount', images.length)
        // dataForm.append('Title', title)
        // dataForm.append('Tags', tags)
        // dataForm.append('City', city)
        // dataForm.append('Description', description)
        // dataForm.append('Price', price)
        // dataForm.append('Location', location)
        // dataForm.append('Private', privatelisting)

        const profileService = useProfileService()

        try {
          const result = await profileService.addListing(title, city, tags, description, price, location, images, privatelisting)
          console.log(result.success)
          await this.getlistings()
          this.isAddListingOpen = false
        } catch (e) {
          console.log(e)
        }

        // const { data, pending, error} = await useFetch(`${baseURL}/user/listing`, {
        //     method: 'post',
        //     body: dataForm,
        //     credentials: 'include',
        // });
        // this.loading = pending;
        // if (data.value) {
        //     this.addListingState = {
        //         title: "",
        //         tags: [],
        //         description: "",
        //         price: 0,
        //         location: "",
        //         city: "",
        //         province: "",
        //         country: "",
        //         images: [""],
        //         private: true,
        //     }
        //     await this.getlistings()
        //     this.isAddListingOpen = false
        // }
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

    async editListing(
      title,
      city,
      tags,
      description,
      price,
      location,
      images,
      privatelisting
    ) {
      let dataForm = new FormData();

      for (let i = 0; i < images.length; i++) {
        dataForm.append(`name${i + 1}`, `file${i + 1}`);
        dataForm.append(`file${i + 1}`, images[i]);
      }

      dataForm.append("ImageAmount", images.length);
      dataForm.append("Title", title);
      dataForm.append("Tags", tags);
      dataForm.append("City", city);
      dataForm.append("Description", description);
      dataForm.append("Price", price);
      dataForm.append("Location", location);
      dataForm.append("Private", privatelisting);

      const { data, pending, error } = await useFetch(
        `${baseURL}/user/listing/${this.selectedListing.ID}`,
        {
          method: "put",
          body: dataForm,
          credentials: "include",
        }
      );
      this.loading = pending;

      if (data.value) {
        await this.getlistings();
        this.isEditListingOpen = false;
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

    // async getProfileImages() {
    //   const { data, pending } = await useFetch(
    //     `${baseURL}/user/profileimages/${this.user.ID}`,
    //     {
    //       method: "get",
    //       headers: { "Content-Type": "application/json" },
    //       credentials: "include",
    //     }
    //   );
    //   this.loading = pending;
    //   if (data.value) {
    //     this.profileimages = data.value.profileImages;
    //   }
    // },

    // async uploadProfileImage() {
    //   const { data, pending } = await useFetch(
    //     `${baseURL}/user/profileimages/${this.user.ID}`,
    //     {
    //       method: "post",
    //       headers: { "Content-Type": "application/json" },
    //       credentials: "include",
    //     }
    //   );
    //   this.loading = pending;
    //   if (data.value) {
    //     this.profileimages = data.value.images;
    //   }
    // },

    // async deleteProfileImage() {
    //   const { data, pending } = await useFetch(
    //     `${baseURL}/user/profileimages/${this.user.ID}`,
    //     {
    //       method: "delete",
    //       headers: { "Content-Type": "application/json" },
    //       credentials: "include",
    //     }
    //   );
    //   this.loading = pending;
    //   if (data.value) {
    //     this.profileimages = data.value.images;
    //   }
    // },
  },
});

export default useProfileStore