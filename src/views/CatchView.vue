<template>
  <div class="flex-grow flex flex-col justify-center items-center gap-4">
    <div class="text-lg">Page Not Found</div>
    <RouterLink :to="{ name: 'home' }" class="btn-nav">
      <IconHome class="w-5 h-5" />
    </RouterLink>
  </div>
</template>
