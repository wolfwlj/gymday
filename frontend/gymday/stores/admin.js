import {defineStore} from 'pinia'
import { baseURL } from '../api.js'

const useAdminStore = defineStore({
    id: 'adminstore',
    state: () => ({
        applications: "null",
        applicationModal: false,
        selectedApplication: null,
    }),
    getters: {

    },
    actions: {
        async submitApplication(Reason) {
            const adminService = useAdminService()

            try {
                const result = await adminService.submitApplication(Reason)
                console.log(result)
                if (result.message === 'success') {
                    return 'success'
                }
            }   catch (e) {

            }
            // const {data, error} = await useFetch(`${baseURL}/user/verificationrequest`, {
            //     method: 'post',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: {
            //         Reason : Reason,
            //     },
            //     credentials: 'include',
            // })
            // if (data) {
            //     return 'success'
            // }
        },
        async getApplications() {

            const adminService = useAdminService()
            try {
                const result = await adminService.getApplications()
                console.log(result)
                this.applications = result.verificationrequests
                return result
            }   catch (e) {
                console.log(e)
            }

            // const {data, error} = await useFetch(`${baseURL}/user/verificationrequests`, {
            //     method: 'get',
            //     headers: { 'Content-Type': 'application/json' },
            //     credentials: 'include',
            // })
            // if (data) {
            //     this.applications = data.value.verificationrequests
            //     return data.value.verificationrequests
            // }
        },
        async UpdateApplication(reply, status) {
            const adminService = useAdminService()
            try {
                const result = await adminService.updateApplication(reply, status, this.selectedApplication.ID)

                if (result.message === 'success') {
                    alert("Application Updated")
                    this.applicationModal = false
                    await this.getApplications()
                }

            }   catch (e) {
                console.log(e)
            }





            // const {data, error} = await useFetch(`${baseURL}/user/verificationrequest/${this.selectedApplication.ID}`, {
            //     method: 'put',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: {
            //         Reply : reply,
            //         Status : status,
            //     },
            //     credentials: 'include',
            // })
            // if (data) {
            //     alert("Application Updated")
            //     this.applicationModal = false
            //     await this.getApplications()
            // }   
        },
    },
})

export default useAdminStore