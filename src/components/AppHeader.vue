<template>
  <div class="w-full flex justify-center items-center gap-2">
    <UseDark v-slot="{ isDark, toggleDark }">
      <button class="btn-nav" type="button" @click.prevent="toggleDark()">
        <Transition name="tr-sunset" mode="out-in">
          <IconDark v-if="isDark" class="w-5 h-5" />
          <IconLight v-else class="w-5 h-5" />
        </Transition>
      </button>
    </UseDark>
    <button class="btn-nav" type="button" @click.prevent="store.modal = 'kana'">
      <IconGrid class="w-5 h-5" :class="{ 'animate-spin': store.modal === 'kana' }" />
    </button>
    <button class="btn-nav" type="button" @click.prevent="store.modal = 'settings'">
      <IconSettings class="w-5 h-5" :class="{ 'animate-spin': store.modal === 'settings' }" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { UseDark } from '@vueuse/components';
import { useStore } from '@/stores/base';

const store = useStore();
</script>
