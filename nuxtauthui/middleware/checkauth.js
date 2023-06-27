import { useAuthStore } from "~/stores/auth"
import { useUserStore } from "~/stores/user"
export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const baseUrl = "http://localhost:8000/api/account/"
  const csrfToken = useCookie('csrftoken')
  const response = await $fetch(baseUrl + 'checkauth/', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken.value,
    },
    credentials: 'include',
  })

  if (!response.isAuthenticated) {
    authStore.setAuthenticated(false)
    authStore.$reset();
    userStore.$reset();
    return navigateTo("/account/login", { replace: true });
  }

})