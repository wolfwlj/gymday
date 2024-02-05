export const useAuthService = () => {

    async function login(email: string, password: string) : Promise<any> {
        try {

            // Do a login request from the client side
            const user = await $fetch('/api/auth/login', {
                body: {
                    email,
                    password
                },
                method: 'POST'
            })

            return user

        } catch(err) {
            return Promise.reject(err)
        }
    }

    async function logout() : Promise<void> {
        try {

            // Do a logout request from the client side
            await $fetch('/api/auth/logout', {
                method: 'POST'
            })

        } catch(err) {
            return Promise.reject(err)
        }
    }

    async function getUser() :  Promise<any> {
        try {
            console.log(useRequestHeaders(['cookies']))
            // Get the current authenticated user
            // useRequestHeaders(['cookies']) will send the httpOnly cookies to the nitro server
            const user = await $fetch('/api/auth/user', {
                headers: useRequestHeaders(['cookies'])
            })

            // Set the user in the store
            return user
        } catch(err) {
            return Promise.reject(err)
        }
    }

    return {
        login,
        getUser,
        logout
    }

}
