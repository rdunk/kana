<template>
  <button class="relative outline-none hover:text-black dark:hover:text-white group">
    <span>{{ kana }}</span>
    <span
      class="opacity-0 absolute w-full top-full left-0 text-xl pt-3 duration-100 select-none transition-opacity group-focus:opacity-100 text-black dark:text-white"
    >
      {{ roumaji }}
    </span>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  kana: string;
  roumaji: string;
}>();
</script>
