<script setup>
import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";

const serverError = ref(null);
const isSuccess = ref(false);
const userStore = useUserStore();
const authStore = useAuthStore();
const submitDeleteAccount = async () => {
  const { data, pending, error } = await useAuthApi('delete/', 'DELETE')
  if (error.value) {
    isSuccess.value = false;
    serverError.value = error.value.data;
  }
  if (data.value == "") {     // Becoz 204 status returns empty even server as return value
    serverError.value = null;
    isSuccess.value = true;
    setTimeout(() => {
        authStore.setAuthenticated(false)
        userStore.$reset();
        authStore.$reset();
        navigateTo("/", { replace: true });
      }, 5000);
  }
};
</script>

<template>
  <div class="flex flex-wrap">
    <!-- Sidebar Content Here -->
    <Sidebar />
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4 px-4 py-8 md:py-12">
      <div class="my-9 w-96 mx-auto text-center">
        <h1 class=" text-2xl font-bold mb-5">Delete Account</h1>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="submitDeleteAccount">Delete</button>
      </div>
      <div v-if="serverError" class="my-5 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative">
        Error: {{ serverError.detail }}
      </div>
      <div v-if="isSuccess" class="mt-2">
        <p
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative"
        >
          <strong>Account deleted successfully !</strong>
          <br />
          You will be redirected to home page in 5 seconds !
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
