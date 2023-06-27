<script setup>
import { reset } from "@formkit/core";
const serverError = ref(false);
const isSuccess = ref(false);
const submitChangePasswordForm = async (formData) => {
  console.log(formData)
  reset("changepasswordform");
};
</script>

<template>
  <div class="flex flex-wrap">
    <!-- Sidebar Content Here -->
    <AdminSidebar />
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4 px-4 py-8 md:py-12">
      <div class="my-9 w-96 mx-auto">
        <h1 class="text-center text-2xl font-bold mb-5">Change Password</h1>
        <FormKit
          type="form"
          @submit="submitChangePasswordForm"
          submit-label="Change"
          id="changepasswordform"
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
          <FormKit
            type="password"
            label="Current Password"
            name="current_password"
            validation="required"
            placeholder="Enter your current password..."
          />
        </FormKit>
      </div>    
      <div v-if="serverError">
      <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative ">Unable to Change Password</p>      
    </div>
    <div v-if="isSuccess" class="mt-2">
        <p
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative"
        >
          Password Changed successfully !
        </p>
      </div> 
    </div>
  </div>
</template>

<style lang="css" scoped></style>
