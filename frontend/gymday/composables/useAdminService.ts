export const useAdminService = () => {

    async function getApplications() :  Promise<any> {
        try {
            console.log(useRequestHeader('Cookie'))
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const verificationrequests = await $fetch('/api/admin/getapplications', {
                headers: useRequestHeaders(['cookies'])
            })

            // Set the user in the store
            return verificationrequests
        } catch(err) {
            return Promise.reject(err)
        }
    }

    async function submitApplication(reason : string){
        try {
            console.log(useRequestHeader('Cookie'))
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const response = await $fetch('/api/admin/verificationrequest', {
                headers: useRequestHeaders(['cookies']),
                body: {
                    reason
                },
                method: 'POST'
            })

            return response

        } catch(err) {
            return Promise.reject(err)
        }
    }

    async function updateApplication(reply: string, status: string, applicationID: string) : Promise<any> {

        try {
            console.log(useRequestHeader('Cookie'))
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const response = await $fetch('/api/admin/updateapplication', {
                headers: useRequestHeaders(['cookies']),
                body: {
                    reply,
                    status,
                    applicationID
                },
                method: 'PUT'
            })

            return response

        } catch(err) {
            return Promise.reject(err)
        }
    }


    return {
        getApplications,
        submitApplication,
        updateApplication,

    }

}
