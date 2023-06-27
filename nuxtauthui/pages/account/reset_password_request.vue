<script setup>
const serverError = ref(false);
const isSuccess = ref(false);
const submitResetPasswordForm = async (formData) => {
  const { data, pending, error, refresh } = await useAuthApi('reset_password/', 'POST', formData)
  if(error.value){
    isSuccess.value = false;
    serverError.value = error.value.data;
  }
  if(data.value){
    isSuccess.value = true;
    serverError.value = null;
  }
};
</script>

<template>
 
  <div class="my-32 w-96 mx-auto">
    <h1 class="text-center text-2xl font-bold mb-5">Reset Password</h1>
    <FormKit
      type="form"
      @submit="submitResetPasswordForm"
      submit-label="Send Email"
    >
      <FormKit
        type="text"
        label="Email"
        name="email"
        validation="required|email"
        placeholder="Enter your email..."
      />
    </FormKit>
    <div v-if="serverError">
      <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative ">Unable to Send Email</p>      
    </div>
    <div v-if="isSuccess" class="mt-2">
      <p class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative ">
       Password reset email sent ! Kindly check your email.
      </p>
    </div>
  </div>
</template>
<style lang="css" scoped></style>
