<template>
  <div class="flex-grow flex flex-col">
    <div class="fixed top-0 left-0 right-0 p-4 sm:p-6">
      <AppHeader />
    </div>
    <KanaDisplay class="flex-grow" :word="word" :is-match="isMatch" />
    <div class="fixed bottom-0 left-0 right-0 p-4 sm:p-6">
      <KanaInput
        :is-match="isMatch"
        :show-tip="store.count === 0 && isMatch"
        v-model:value="input"
        @submit="onSubmit"
      />
    </div>
    <Teleport to="body">
      <OverlayKana v-if="store.modal === 'kana'" />
      <OverlaySettings v-else-if="store.modal === 'settings'" />
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import type { KanaEntry, KanaEntryWithRoumaji } from '@/types';
import hiraganaDictionary from '@/assets/data/hiragana.json';
import katakanaDictionary from '@/assets/data/katakana.json';
import { katakanaMap } from '@/util/katakana-map';
import { hiraganaMap } from '@/util/hiragana-map';
import { mapKana } from '@/util/kana';
import { useStore } from '@/stores/base';

const store = useStore();

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const dictionary = computed<KanaEntry[]>(() => {
  if (store.words === 'hiragana') {
    return hiraganaDictionary;
  }
  if (store.words === 'katakana') {
    return katakanaDictionary;
  }
  return [...hiraganaDictionary, ...katakanaDictionary];
});

const allMaps = [...hiraganaMap, ...katakanaMap];

const input = ref('');
const index = ref(randomInt(0, dictionary.value.length - 1));
const word = computed<KanaEntryWithRoumaji>(() => {
  const entry = dictionary.value[index.value];
  const roumaji = entry.kana.map(mapKana(allMaps));
  return {
    ...entry,
    roumaji
  };
});

const isMatch = computed(() => {
  const match = word.value.roumaji.join('');
  return input.value.toLowerCase().replace(/ /g, '') === match;
});

const onSubmit = () => {
  if (isMatch.value) {
    store.count += 1;
    index.value = randomInt(0, dictionary.value.length - 1);
  }
};

watch(
  () => index.value,
  () => (input.value = '')
);

watch(dictionary, (dict) => {
  index.value = randomInt(0, dict.length - 1);
});
</script>
