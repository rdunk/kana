<template>
  <div
    class="tabular-nums slashed-zero leading-none h-full w-full relative flex justify-start items-center"
  >
    <div v-for="(char, i) of countStr" class="relative w-2 h-[1em] overflow-hidden">
      <Transition name="tr-count" mode="default" appear>
        <div class="absolute" :key="char">
          {{ char }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  count: number;
}>();

const countStr = computed(() => props.count.toString());
</script>
