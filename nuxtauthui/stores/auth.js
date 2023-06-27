import { defineStore } from 'pinia'
export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false)
  function setAuthenticated(ath) {
    isAuthenticated.value = ath
  }

  // Resetting State
  function $reset() {
    isAuthenticated.value = false
  }

  return { isAuthenticated, setAuthenticated, $reset }

},
  // //  // When you use SESSION_COOKIE_AGE
  // {
  //   persist: {
  //     storage: persistedState.localStorage
  //   }
  // }

  // When you use SESSION_EXPIRE_AT_BROWSER_CLOSE
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        sameSite: 'strict'
      }),
    }
  }
)