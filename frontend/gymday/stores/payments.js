import {defineStore} from 'pinia'
import { baseURL } from '../api.js'
import Swal from 'sweetalert2'


const usePaymentStore = defineStore({
    id: 'paymentstore',
    state: () => ({

    }),
    getters: {

    },
    actions: {
        async TestAccountConnect() {
            try {
                const result = await $fetch("/api/payments/accounts", {
                    body: JSON.stringify({
                        "teststring" : "test"
                    }),

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log(result)
            } catch (e) {
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occured while trying to get the reviews',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        },
    }
})

export default usePaymentStore