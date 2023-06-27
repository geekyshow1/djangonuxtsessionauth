<script setup>
const serverError = ref(false);
const isSuccess = ref(false);
const onAccountActivation = async () => {
  const {params} = useRoute()
  const { data, pending, error, refresh } = await useAuthApi('activate/', 'POST', params)
  if(error.value){
    isSuccess.value = false;
    serverError.value = error.value.data;
  }
  if(data.value){
    isSuccess.value = true;
    serverError.value = null;
    setTimeout(() => {
        return navigateTo("/account/login", { replace: true });
      }, 5000);
  }
};
</script>

<template>
  <div>
    <div class="mx-auto max-w-md px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8">Activate Your Account</h1>
      <div class="bg-white shadow-md rounded-lg px-6 py-8">
        <p class="text-md text-gray-700 mb-4">
          Please click below button to activate your account.
        </p>

        <div class="flex justify-center mb-3">
          <button
            @click="onAccountActivation"
            type="submit"
            class="bg-emerald-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Activate Account
          </button>
        </div>

        <i class="text-gray-700 text-sm">
          Not able to activate?
          <NuxtLink to="/contact" class="text-blue-500 hover:text-blue-700"
            >Contact us</NuxtLink
          >
        </i>
      </div>
      <div v-if="serverError" class="my-3">
      <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative">{{ serverError.detail }}</p>      
    </div>
    <div v-if="isSuccess" class="mt-2">
        <p
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative"
        >
          <strong>Your account has been activated successfully !</strong>
          <br />
          You will be redirected to login page in 5 seconds !
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
