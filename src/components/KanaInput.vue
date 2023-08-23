<template>
  <form
    ref="formEl"
    class="relative w-full mx-auto border rounded-full shadow-lg transition-all bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800"
    :class="formFocused || input.length ? 'max-w-xl' : 'max-w-[12rem]'"
    @submit.prevent="onSubmit"
  >
    <div v-if="formFocused || input.length" class="absolute left-0 top-0 bottom-0">
      <Counter class="text-gray-500 text-sm h-full pl-5" :count="store.count" />
    </div>

    <input
      ref="inputEl"
      class="py-2 sm:py-3 px-4 w-full outline-none text-center bg-transparent text-black dark:text-white"
      type="text"
      autocapitalize="off"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      placeholder="type rōmaji here ..."
      v-model="input"
    />

    <Transition name="tr-swipe-right">
      <div
        v-if="isMatch && (formFocused || input.length)"
        class="absolute z-10 right-0 top-0 h-full flex items-center justify-center p-2"
      >
        <button
          class="btn-round text-gray-500 focus:bg-gray-300 hover:bg-gray-300 dark:focus:bg-gray-800 dark:hover:bg-gray-800"
          type="submit"
        >
          <IconArrow class="h-4 w-4" />
        </button>
      </div>
    </Transition>

    <Transition name="tr-tip" appear>
      <div
        v-if="showTip"
        class="absolute bottom-full w-full text-center text-sm mb-2 -z-10 opacity-50"
      >
        Press &#9166; to proceed...
      </div>
    </Transition>
  </form>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useFocus, useFocusWithin } from '@vueuse/core';
import { useStore } from '@/stores/base';

const props = defineProps<{
  isMatch: boolean;
  showTip: boolean;
  value: string;
}>();

const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'update:value', value: string): void;
}>();

const store = useStore();

const input = computed({
  get: () => props.value,
  set: (value) => emit('update:value', value)
});

const formEl = ref<HTMLFormElement | null>(null);
const inputEl = ref<HTMLInputElement | null>(null);
const { focused: formFocused } = useFocusWithin(formEl);
const { focused: inputFocused } = useFocus(inputEl, { initialValue: true });

const onSubmit = () => {
  emit('submit');
  inputFocused.value = true;
};
</script>
