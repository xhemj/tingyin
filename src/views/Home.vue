<template>
  <div class="flex justify-center items-center min-h-[75vh] w-full">
    <div class="w-auto flex flex-col">
      <Icon size="128">
        <MusicNote124Regular />
      </Icon>
      <div class="mt-4 mx-auto flex flex-col space-y-4">
        <n-button
          type="primary"
          size="large"
          @click="
            () => {
              $router.push('/setting');
            }
          "
        >
          开始练习
        </n-button>
        <n-button
          secondary
          size="large"
          @click="
            () => {
              $router.push('/result');
            }
          "
        >
          练习记录
        </n-button>
      </div>
      <div class="absolute bottom-2 left-0 right-0">
        <p class="text-center text-sm text-gray-400">
          听音出题工具 &copy; {{ new Date().getFullYear() }} XHEMJ
        </p>
      </div>
      <div class="absolute top-2 right-2">
        <n-button secondary size="small" @click="clearLocalStorage"> 清除历史记录 </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MusicNote124Regular } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import { useDataStore } from "../stores/data";

const dataStore = useDataStore();

/**
 * 清除本地历史记录
 */
function clearLocalStorage() {
  localStorage.removeItem(dataStore.STORE_KEY);
}
</script>

<style scoped></style>
