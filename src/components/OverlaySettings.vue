<template>
  <BaseOverlay v-slot="{ dismiss }" @dismiss="store.modal = null">
    <div
      class="max-w-md w-full rounded-lg p-6 shadow-xl bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800"
    >
      <div class="w-full flex justify-start items-center gap-2">
        <div>Settings</div>
        <button
          class="ml-auto btn-round text-gray-500 focus:bg-gray-300 hover:bg-gray-300 dark:focus:bg-gray-800 dark:hover:bg-gray-800"
          type="button"
          @click.prevent="dismiss"
        >
          <IconX class="w-6 h-6" />
        </button>
      </div>

      <div class="w-full flex justify-start items-center gap-2 my-4">
        <div class="text-sm text-gray-500">Practice:</div>
        <BaseTabs
          class="text-sm"
          :options="[
            {
              title: 'All',
              value: 'all'
            },
            {
              title: 'Hiragana',
              value: 'hiragana'
            },
            {
              title: 'Katakana',
              value: 'katakana'
            }
          ]"
          v-model="store.words"
        />
      </div>
      <p class="text-xs mt-2 text-gray-500">
        Built by
        <a class="text-lime-500" href="https://rupertdunk.com" target="_blank"> rdunk</a>.
      </p>
    </div>
  </BaseOverlay>
</template>

<script lang="ts" setup>
import { useStore } from '@/stores/base';

const store = useStore();
</script>
