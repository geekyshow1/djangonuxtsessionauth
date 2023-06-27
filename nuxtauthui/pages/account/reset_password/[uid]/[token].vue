<script setup>
const serverError = ref(false);
const isSuccess = ref(false);
const submitResetPasswordConfirmForm = async (formData) => {
  const {params} = useRoute()
  const payload = {
    ...formData,
    ...params
  }
  const { data, pending, error, refresh } = await useAuthApi('reset_password_confirm/', 'POST', payload)
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
  <div class="my-32 w-96 mx-auto">
    <h1 class="text-center text-2xl font-bold mb-5">Reset Password</h1>
    <FormKit
      type="form"
      @submit="submitResetPasswordConfirmForm"
      submit-label="Submit"
    >
      <FormKit
        type="password"
        label="New Password"
        name="new_password"
        validation="required"
        placeholder="Enter your password..."
      />
      <FormKit
        type="password"
        label="Confirm New Password"
        name="re_new_password"
        validation="required|confirm:new_password|required"
        placeholder="Re-enter your password..."
      />
    </FormKit>
    <div v-if="serverError">
      <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative ">Error: {{ serverError.detail }}</p>      
    </div>
    <div v-if="isSuccess" class="mt-2">
      <p
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative"
      >
        <strong>Your Password has been reset successfully !</strong>
        <br />
        You will be redirected to login page in 5 seconds !
      </p>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
