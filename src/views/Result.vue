<template>
  <h1 class="text-3xl font-bold">练习记录</h1>
  <div class="mt-4">
    <n-data-table size="large" :data="tableData" :columns="columns" />
  </div>
  <div class="mt-2 text-left">
    <n-button type="error" @click="clearHistory">清除记录</n-button>
  </div>
</template>

<script setup>
import { useDataStore } from "../stores/data";
import { ref, onMounted } from "vue";
import { useDialog } from "naive-ui";

const dataStore = useDataStore();
const dialog = useDialog();

const columns = [
  {
    title: "音程名",
    key: "degree"
  },
  {
    title: "正确个数",
    key: "correct"
  },
  {
    title: "错误个数",
    key: "wrong"
  },
  {
    title: "错误率",
    key: "wrong_rate"
  }
];

const history = ref(null);
const tableData = ref([]);

function initTable() {
  const historyObj = history.value;
  const allKeys = new Set([...Object.keys(historyObj.wrong), ...Object.keys(historyObj.correct)]);

  for (let key of Array.from(allKeys)) {
    tableData.value.push({
      degree: key,
      wrong: historyObj.wrong[key] || 0,
      correct: historyObj.correct[key] || 0
    });
  }

  tableData.value = tableData.value.slice(0, 10);
  tableData.value.map((item) => {
    item.wrong_rate = `${((item.wrong / (item.correct + item.wrong || 1)) * 100).toFixed(2)}`;
  });
  tableData.value.sort((a, b) => {
    return b.wrong_rate - a.wrong_rate;
  });
  tableData.value.map((item) => {
    item.wrong_rate += "%";
  });
}

function clearHistory() {
  dialog.error({
    title: "清除记录",
    content: "确定要清除所有练习记录吗？",
    positiveText: "确定",
    negativeText: "取消",
    maskClosable: false,
    onPositiveClick: () => {
      localStorage.removeItem(dataStore.STORE_KEY);
      history.value = {
        correct: {},
        wrong: {}
      };
      tableData.value = [];
    }
  });
}

onMounted(() => {
  history.value = JSON.parse(
    localStorage.getItem(dataStore.STORE_KEY) ||
      JSON.stringify({
        correct: {},
        wrong: {}
      })
  );
  initTable();
});
</script>

<style lang="scss" scoped></style>
