<script setup>
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const { data, pending, error, refresh } = await useAuthApi('user/',)
</script>

<template>
  <div class="flex flex-wrap">
    <!-- Sidebar Content Here -->
    <Sidebar />
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4 px-4 py-8 md:py-12">
      <h1 class="bg-emerald-700 p-5 text-2xl font-bold text-white">
        User Panel
      </h1>

      <div>
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Data from API Response
        </h1>
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">
          Welcome {{ data.name }}
        </h2>
        <p class="text-gray-700 text-xl leading-relaxed mb-6">
          Your email is {{ data.email }}
        </p>
      </div>
      <div>
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Data from Local Storage
        </h1>
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">
          Welcome {{ userStore.user.name }}
        </h2>
        <p class="text-gray-700 text-xl leading-relaxed mb-6">
           Your email is {{ userStore.user.email }}
        </p>
      </div>
      <div v-if="pending">
        <div
          class="w-12 h-12 border-4 border-gray-200 rounded-full loader ease-linear border-t-4 border-t-transparent animate-spin"
        ></div>
      </div>
    </div>
  </div>
</template>
