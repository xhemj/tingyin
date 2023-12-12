<template>
  <div class="flex flex-col w-full">
    <!-- <h1 class="font-bold text-xl">练习时长：</h1> -->
    <div class="flex justify-center items-center min-h-[75vh]">
      <div class="flex flex-col items-center w-full">
        <h1 class="font-bold text-2xl sm:text-4xl text-center w-full">请弹奏</h1>
        <div class="flex flex-row">
          <h1
            v-for="(note, index) of questions"
            :key="note"
            class="font-bold text-[72pt] sm:text-[128pt] leading-tight"
          >
            <span>{{ note }}</span>
            <span v-if="index != questions.length - 1" class="mx-4">-</span>
          </h1>
        </div>
        <h1 class="font-bold text-2xl sm:text-5xl text-left">{{ degreeName }}</h1>
        <div class="mt-8 sm:mt-12 space-x-8 sm:space-x-16 scale-1 sm:scale-[1.25]">
          <n-button type="error" size="large" @click="wrong">错误</n-button>
          <n-button type="success" size="large" @click="correct">正确</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDataStore } from "../stores/data";
import {
  random,
  getNoteName,
  getNameByDegree,
  caculateNoteDistance,
  getDistanceByName,
  getCoronation
} from "../utils";
import { useRouter } from "vue-router";

const dataStore = useDataStore();
const router = useRouter();
/**
 * 音程/和弦题目
 * 格式：{ rootNote: string, thirdNote: string, fifthNote: string }
 */
const questions = ref([]);
/**
 * 音程/和弦度数
 */
const degreeName = ref("");

/**
 * 根音
 */
const rootDegree = [];
// 随机 1 - 6.5 的根音
for (let i = 1; i <= 6.5; i += 0.5) {
  rootDegree.push(i);
}

function practice() {
  questions.value = [];
  const i = random(0, dataStore.selectedDegrees.length - 1);
  const randomedDegree = dataStore.selectedDegrees[i];
  const degreeNameStr = getNameByDegree(randomedDegree);
  const degreeDistance = getDistanceByName(degreeNameStr);

  degreeName.value = degreeNameStr;
  const rootNote = rootDegree[random(0, rootDegree.length - 1)];
  const highNote = rootNote + randomedDegree;
  const rootNoteStr = getNoteName(rootNote)[0];
  const highNoteStrList = getNoteName(highNote);
  const coronation = getCoronation(rootNoteStr, degreeDistance);

  for (let highNote of highNoteStrList) {
    if (highNote.split("").pop() === String(coronation)) {
      questions.value.push(rootNoteStr, highNote);
      break;
    } else {
      questions.value = [];
      practice();
      break;
    }
  }
}

const history = ref(null);

function storeHistory() {
  localStorage.setItem(dataStore.STORE_KEY, JSON.stringify(history.value));
}

function correct() {
  practice();
  if (history.value.correct[degreeName.value]) {
    history.value.correct[degreeName.value]++;
    storeHistory();
  } else {
    history.value.correct[degreeName.value] = 1;
    storeHistory();
  }
}

function wrong() {
  practice();
  if (history.value.wrong[degreeName.value]) {
    history.value.wrong[degreeName.value]++;
    storeHistory();
  } else {
    history.value.wrong[degreeName.value] = 1;
    storeHistory();
  }
}

onMounted(() => {
  if (dataStore.selectedDegrees.length === 0) {
    return router.push("/setting");
  }
  history.value = JSON.parse(
    localStorage.getItem(dataStore.STORE_KEY) ||
      JSON.stringify({
        correct: {},
        wrong: {}
      })
  );
  practice();
});
</script>

<style scoped></style>
