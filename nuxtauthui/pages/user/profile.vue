<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const serverError = ref(false);
const isSuccess = ref(false);
const submitProfileForm = async (formData) => {
  const { data, pending, error, refresh } = await useAuthApi('user/', 'PATCH', formData)
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
  <div class="flex flex-wrap">
    <!-- Sidebar Content Here -->
    <Sidebar />
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4 px-4 py-8 md:py-12">
      <div class="my-9 w-96 mx-auto">
        <h1 class="text-center text-2xl font-bold mb-5">Update User Profile</h1>
        <FormKit type="form" @submit="submitProfileForm" submit-label="Update">
          <FormKit
            type="text"
            label="Name"
            name="name"
            validation="required"
            placeholder="Enter your name..."
            v-model="userStore.user.name"
          />
        </FormKit>
      </div>   
      <div v-if="serverError">
      <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative ">{{ serverError.detail }}</p>      
    </div> 
    <div v-if="isSuccess" class="mt-2">
      <p class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative ">Profile updated successfully !</p>
    </div>
    </div>
  </div>
</template>

