<template>
  <div class="flex flex-col w-full">
    <div class="w-full">
      <h1 class="font-bold text-2xl">请选择你要练习的范围：</h1>
    </div>
    <div class="w-full flex flex-col sm:flex-row mt-8">
      <div class="w-full sm:w-1/2 flex flex-col">
        <n-form ref="formRef" :label-width="80" :model="formValue" size="large">
          <n-form-item v-for="category of degreeList" :key="category.name" :label="category.name">
            <n-checkbox-group v-model:value="formValue.selectedDegreeLists">
              <n-space>
                <n-checkbox v-for="item of category.data" :key="item.label" :value="item.label">
                  {{ item.label }}
                </n-checkbox>
              </n-space>
            </n-checkbox-group>
          </n-form-item>
        </n-form>
      </div>
      <div class="w-full sm:w-1/2">
        <h1 class="text-base mb-2">已选择：</h1>
        <n-dynamic-tags v-model:value="selectedTags" />
        <div class="mt-4">
          <n-button type="primary" @click="onConfirm">确定</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useDataStore } from "../stores/data";
import { degreeList, getDegreeByName } from "../utils";
import { useRouter } from "vue-router";

const dataStore = useDataStore();
const router = useRouter();
const formRef = ref(null);
const formValue = ref({
  selectedDegreeLists: []
});

/**
 * 已选择的音程
 * @returns {Array} 已选择的音程
 */
const selectedTags = computed(() => {
  return formValue.value.selectedDegreeLists;
});

/**
 * 确认选择
 */
function onConfirm() {
  dataStore.selectedDegrees = selectedTags.value.map((item) => {
    return getDegreeByName(item);
  });
  router.push("/practice");
}
</script>

<style lang="scss" scoped></style>
