<template>
  <BaseOverlay v-slot="{ dismiss }" @dismiss="store.modal = null">
    <div
      class="max-w-7xl w-full rounded-lg p-6 shadow-xl bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800"
    >
      <div class="w-full flex justify-start items-center gap-2">
        <div class="text-sm text-gray-500">Show:</div>
        <div class="relative" :class="{ modified: modified }" ref="tabs">
          <div class="selector" ref="selector" />
          <div class="tabs" role="tablist" tabindex="0" style="outline: none">
            <button
              class="tab"
              type="button"
              role="tab"
              data-type="hiragana"
              :data-selected="store.tableType === 'hiragana' || undefined"
              @click.prevent="store.setTableType('hiragana')"
            >
              Hiragana
            </button>
            <button
              class="tab"
              type="button"
              role="tab"
              data-type="katakana"
              :data-selected="store.tableType === 'katakana' || undefined"
              @click.prevent="store.setTableType('katakana')"
            >
              Katakana
            </button>
          </div>
        </div>
        <button
          class="ml-auto btn-round text-gray-500 focus:bg-gray-300 hover:bg-gray-300 dark:focus:bg-gray-800 dark:hover:bg-gray-800"
          type="button"
          @click.prevent="dismiss"
        >
          <IconX class="w-6 h-6" />
        </button>
      </div>
      <TableHiragana class="mt-8" :katakana="store.tableType === 'katakana'" />
      <p class="text-sm mt-4 text-gray-400">
        This app uses Hepburn romanization, although may support switching to Nihon-shiki in the
        future.
      </p>
    </div>
  </BaseOverlay>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { useStore } from '@/stores/base';

const store = useStore();

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

watch(
  () => store.tableType,
  (to, from) => {
    const toEl = (document.querySelector(`[data-type=${to}]`) || undefined) as
      | HTMLDivElement
      | undefined;
    const fromEl = (document.querySelector(`[data-type=${from}]`) || undefined) as
      | HTMLDivElement
      | undefined;
    setSelector(toEl, fromEl);
  }
);

useResizeObserver(tabs, () => {
  const selected = (document.querySelector(`[data-selected]`) || undefined) as
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
