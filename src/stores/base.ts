import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('base', () => {
  const count = ref(0);

  const modal = ref<'kana' | 'settings' | null>(null);

  const tableType = ref<'hiragana' | 'katakana'>('hiragana');
  const setTableType = (kana: typeof tableType.value) => {
    tableType.value = kana;
  };

  return {
    count,
    modal,
    setTableType,
    tableType
  };
});
