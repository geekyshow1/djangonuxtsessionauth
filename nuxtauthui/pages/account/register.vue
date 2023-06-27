<script setup>
import { reset } from '@formkit/core'
import useAuthApi from "~/composables/useAuthApi";
const serverError = ref(null)
const isSuccess = ref(false)
const submitRegistrationForm = async (formData) => {
  const { data, pending, error, refresh } = await useAuthApi('registration/', 'POST', formData)
  if(error.value){
    isSuccess.value = false;
    serverError.value = error.value.data;
  }
  if(data.value){
    isSuccess.value = true;
    serverError.value = null;
    reset('registrationForm')
  }
};
</script>

<template>
  <div class="my-32 w-96 mx-auto">
    <h1 class="text-center text-2xl font-bold mb-5">Create an Account</h1>
    <FormKit
      type="form"
      @submit="submitRegistrationForm"
      submit-label="Register"
      id="registrationForm"
    >
      <FormKit
        type="text"
        label="Name"
        name="name"
        validation="required"
        placeholder="Enter your name..."
      />

      <FormKit
        type="text"
        label="Email"
        name="email"
        validation="required|email"
        placeholder="Enter your email..."
      />

      <FormKit
        type="password"
        label="Password"
        name="password"
        validation="required"
        placeholder="Enter your password..."
      />
      <FormKit
        type="password"
        name="confirm_password"
        label="Confirm Password"
        validation="required|confirm:password|required"
        placeholder="Re-enter your password..."
        validation-visibility="live"
        validation-label="Confirm Password"
      />
    </FormKit>
    <i class="text-gray-700 text-sm">
      Already have an Account ?
      <NuxtLink to="/account/login" class="text-blue-500 hover:text-blue-700"
        >Login</NuxtLink
      >
    </i>
    <div v-if="serverError">
      <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative ">Unable to Register</p>      
    </div>
    <div v-if="isSuccess" class="mt-2">
      <p class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative ">You have registered successfully ! Check Your email to activate your account.</p>
    </div>
  </div>
</template>

