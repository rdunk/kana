<template>
  <div
    class="flex flex-col items-center justify-center px-12 leading-none transition-colors"
    :class="{ 'text-green-500 dark:text-green-300': isMatch }"
  >
    <Transition name="tr-display" mode="out-in">
      <div class="text-center" :key="word.translation">
        <div class="py-12 sm:text-2xl lg:text-4xl">{{ word.kanji || '&nbsp;' }}</div>
        <div class="text-4xl sm:text-6xl lg:text-kana hover:text-gray-500">
          <KanaPart
            v-for="part in parts"
            :key="part.key"
            :kana="part.kana"
            :roumaji="part.roumaji"
          />
        </div>
        <div class="py-12 text-2xl">
          <Transition name="tr-answer" mode="out-in">
            <div v-if="translation">{{ translation }}</div>
            <div v-else>&nbsp;</div>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import type { KanaEntryWithRoumaji } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
  word: KanaEntryWithRoumaji;
  isMatch: boolean;
}>();

const translation = computed(() => {
  return props.isMatch ? props.word.translation : '';
});

const parts = computed(() => {
  return props.word.kana.map((kana, i) => {
    const roumaji = props.word.roumaji[i];
    return {
      key: `${i}-${kana}-${roumaji}`,
      kana,
      roumaji
    };
  });
});
</script>
