import {defineStore} from 'pinia'
import { baseURL } from '../api.js'
import Swal from 'sweetalert2'

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
                
                await Swal.fire({
                    title: 'Verificatie aanvraag verzonden',
                    icon: 'success',
                    timerProgressBar: true,
                    timer: 3000,
                }) 
                
            } catch (e) {
                Swal.fire({
                    title: 'Er is iets fout gegaan',
                    text: 'Je kan maar 1 verificatie aanvraag per keer doen. Wacht tot je vorige aanvraag is afgehandeld.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
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