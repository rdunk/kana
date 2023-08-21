<template>
  <div class="flex-grow flex flex-col">
    <div class="px-4 py-6 sm:px-6">
      <AppHeader />
    </div>
    <KanaDisplay class="flex-grow" :word="word" :is-match="isMatch" />
    <div class="px-4 py-6 sm:px-6">
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
import { computed, ref, shallowRef, watch } from 'vue';
import type { KanaEntry, KanaEntryWithRoumaji } from '@/types';
import hiraganaDictionary from '@/assets/data/hiragana.json';
import katakanaDictionary from '@/assets/data/katakana.json';
import { katakanaMap } from '@/util/katakana-map';
import { hiraganaMap } from '@/util/hiragana-map';
import { mapKana } from '@/util/kana';
import { useStore } from '@/stores/base';

const store = useStore();

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const dictionary = shallowRef<Array<KanaEntry>>([...hiraganaDictionary, ...katakanaDictionary]);
// const dictionary: Array<KanaEntry> = hiraganaDictionary

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
// const roumaji = computed(() => word.value.kana.map(mapKana(allMaps)));
// const roumaji = computed(() => word.value.kana.map(mapKana(allMaps)));
// const match = computed(() => roumaji.value.join(""));
const correctCount = ref(0);
// setInterval(() => (count.value += 1), 600);
const isMatch = computed(() => {
  const match = word.value.roumaji.join('');
  return input.value.replace(/ /g, '') === match;
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
</script>
@/stores/base
