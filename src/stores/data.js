import { ref } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", () => {
  const selectedDegrees = ref([]);
  const STORE_KEY = ref("practice_history");

  return { selectedDegrees, STORE_KEY };
});
