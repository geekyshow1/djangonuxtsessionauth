<script setup>
</script>

<template>
  <div class="flex flex-wrap">
    <!-- Sidebar Content Here -->
    <AdminSidebar />
    <!-- Main Content Here -->
    <div class="w-full md:w-3/4 px-4 py-8 md:py-12">
      <h1 class="bg-red-700 p-5 text-2xl font-bold text-white">
        Admin Panel
      </h1>

      <div>
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Data from API Response
        </h1>
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">
          Welcome Admin
        </h2>
        <p class="text-gray-700 text-xl leading-relaxed mb-6">
          Your ID is 100 and Your email is admin@gmail.com
        </p>
      </div>
    </div>
  </div>
</template>
