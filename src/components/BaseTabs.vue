<template>
  <div class="relative" :class="{ modified: modified }" ref="tabs">
    <div class="selector" ref="selector" />
    <div class="tabs" role="tablist" tabindex="0" style="outline: none">
      <button
        v-for="option of options"
        :key="option.title"
        class="tab"
        type="button"
        role="tab"
        :data-value="option.value"
        :data-selected="option.value === modelValue || undefined"
        @click.prevent="modelValue = option.value"
      >
        {{ option.title }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core';
import { ref, watch } from 'vue';

interface Option {
  title: string;
  value: string;
}

const modelValue = defineModel<string>();

defineProps<{
  options: Option[];
}>();

const tabs = ref<HTMLDivElement | null>(null);
const selector = ref<HTMLDivElement | null>(null);
const modified = ref(false);

const setSelector = (toEl?: HTMLDivElement, fromEl?: HTMLDivElement) => {
  if (!selector.value || !fromEl || !toEl) return;

  const prevStyle = {
    height: selector.value.style.height || `${fromEl.offsetHeight || 0}px`,
    left: selector.value.style.left || `${fromEl.offsetLeft || 0}px`,
    top: selector.value.style.top || `${fromEl.offsetTop || 0}px`,
    width: selector.value.style.width || `${fromEl.offsetWidth || 0}px`
  };
  const newStyle = {
    height: `${toEl.offsetHeight}px`,
    left: `${toEl.offsetLeft}px`,
    top: `${toEl.offsetTop}px`,
    width: `${toEl.offsetWidth}px`
  };

  selector
    .value!.animate([prevStyle, newStyle], {
      duration: 300,
      easing: 'ease'
    })
    .finished.then(() => {
      selector.value!.style.cssText = Object.entries(newStyle)
        .map((entry) => entry.join(': '))
        .join('; ');
    });
  modified.value = true;
};

watch(modelValue, (to, from) => {
  const toEl = (tabs.value!.querySelector(`[data-value=${to}]`) || undefined) as
    | HTMLDivElement
    | undefined;
  const fromEl = (tabs.value!.querySelector(`[data-value=${from}]`) || undefined) as
    | HTMLDivElement
    | undefined;
  setSelector(toEl, fromEl);
});

useResizeObserver(tabs, () => {
  const selected = (tabs.value!.querySelector(`[data-selected]`) || undefined) as
    | HTMLDivElement
    | undefined;
  if (!selected) return;
  const newStyle = {
    height: `${selected.offsetHeight}px`,
    left: `${selected.offsetLeft}px`,
    top: `${selected.offsetTop}px`,
    width: `${selected.offsetWidth}px`
  };
  selector.value!.style.cssText = Object.entries(newStyle)
    .map((entry) => entry.join(': '))
    .join('; ');
});
</script>

<style lang="postcss" scoped>
.tabs {
  @apply flex flex-wrap;
}

.tab {
  @apply border border-transparent rounded-full select-none outline-none appearance-none h-8 leading-8 px-3 flex items-center;
}
.tab[data-selected] {
  @apply border-gray-200 rounded-full shadow;
}
.modified .tab[data-selected] {
  @apply border-transparent shadow-none;
}

.selector {
  @apply absolute border border-transparent rounded-full shadow-none h-full pointer-events-none z-10;
}
.modified .selector {
  @apply border-gray-200 shadow;
}
</style>
