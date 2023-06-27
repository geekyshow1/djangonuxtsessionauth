// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {    
    // Render these routes on the client (SPA)
    // If i make these route ssr false then it will fetch data on page reload else it wont
    '/account/**': { ssr: false },    
    '/user/**': { ssr: false },    

  }, 
  modules: [
    '@nuxtjs/tailwindcss', 
    '@pinia/nuxt', 
    '@pinia-plugin-persistedstate/nuxt',
    '@formkit/nuxt',
  ],
  //  // To fix samesite console error
  //  piniaPersistedstate: {
  //   cookieOptions: {
  //     sameSite: "strict",
  //   },
  // },
})
