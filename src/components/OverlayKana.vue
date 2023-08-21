<template>
  <BaseOverlay v-slot="{ dismiss }" @dismiss="store.modal = null">
    <div
      class="max-w-7xl w-full rounded-lg p-6 shadow-xl bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800"
    >
      <div class="w-full flex justify-start items-center gap-2">
        <div class="text-sm text-gray-500">Show:</div>
        <BaseTabs
          :options="[
            {
              title: 'Hiragana',
              value: 'hiragana'
            },
            {
              title: 'Katakana',
              value: 'katakana'
            }
          ]"
          v-model="store.table"
        />
        <button
          class="ml-auto btn-round text-gray-500 focus:bg-gray-300 hover:bg-gray-300 dark:focus:bg-gray-800 dark:hover:bg-gray-800"
          type="button"
          @click.prevent="dismiss"
        >
          <IconX class="w-6 h-6" />
        </button>
      </div>
      <TableHiragana class="mt-8" :katakana="store.table === 'katakana'" />
      <p class="text-sm mt-4 text-gray-400">
        This app uses Hepburn romanization, although may support switching to Nihon-shiki in the
        future.
      </p>
    </div>
  </BaseOverlay>
</template>

<script lang="ts" setup>
import { useStore } from '@/stores/base';
const store = useStore();
</script>
