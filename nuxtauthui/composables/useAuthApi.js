import { useAuthStore } from "~/stores/auth"
import { useUserStore } from "@/stores/user";
export default async (endpoint, method = 'GET', body = null) => {
  const baseURL = 'http://localhost:8000/api/account/'
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const { data, pending, error, refresh } = await useFetch(baseURL + endpoint, {
    async onRequest({ request, options }) {
      let csrfToken = useCookie('csrftoken')
      if (!authStore.isAuthenticated) {
        await useFetch(baseURL + 'csrf_cookie/', { credentials: 'include' })
        csrfToken = useCookie('csrftoken')
      }

      // Set the request headers
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken.value
      },
        options.credentials = 'include',
        options.method = method,
        options.body = body
    },

    async onResponseError({ request, response, options }) {
      // Handle the response errors
      if (response.status === 403) {
        const { data } = await useFetch(baseURL + "checkauth/", { credentials: 'include' })
        if (data.value.isAuthenticated === false) {
          authStore.setAuthenticated(false)
          userStore.$reset();
          authStore.$reset();
          return navigateTo("/account/login", { replace: true })
        }
      }
    }
  })
  return { data, pending, error, refresh }
}