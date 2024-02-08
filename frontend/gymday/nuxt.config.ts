// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui'
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  colorMode: {
    preference: 'light'
  },

  runtimeConfig: {
    public: {
      // apiUrl: 'http://localhost:9090/api/v1',
      apiUrl: 'https://tapsaveevents.ew.r.appspot.com/api/v1',
      // apiUrl: 'https://gymday-production.up.railway.app/api/v1',
      // apiUrl: 'https://horeca-370718.ew.r.appspot.com/api/v1'
    }
  },
})

