<template>
  <div class="relative z-30" role="dialog" aria-modal="true">
    <Transition name="tr-fade" appear @after-leave="emit('dismiss')">
      <div v-if="active" class="fixed inset-0 bg-gray-200 dark:bg-gray-900 bg-opacity-80" />
    </Transition>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full justify-center items-center p-4">
        <Transition name="tr-swipe-top" appear>
          <slot v-if="active" :active="active" :dismiss="dismiss" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';

const emit = defineEmits<{
  (e: 'dismiss'): void;
}>();

const active = ref(true);
const dismiss = () => {
  active.value = false;
};
onKeyStroke('Escape', dismiss);
</script>
