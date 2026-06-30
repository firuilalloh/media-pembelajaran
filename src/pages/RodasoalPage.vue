<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { act4Questions } from "../data/data.js";

const currentQuestion = ref(null);
const isSpinning = ref(false);

const spinWheel = () => {
  isSpinning.value = true;
  currentQuestion.value = null;

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * act4Questions.length);
    currentQuestion.value = act4Questions[randomIndex];
    isSpinning.value = false;
  }, 2000);
};
</script>
<template>
  <div class="flex flex-col items-center justify-center h-full w-full p-4">
    <!-- Icon Roda (diperkecil agar tidak makan tempat) -->
    <div class="mb-4">
      <Icon
        icon="mdi:dots-circle"
        class="w-46 h-46 text-pink-500 transition-transform duration-2000"
        :class="{ 'rotate-1440': isSpinning }"
      />
    </div>

    <!-- Tombol Putar (Dibuat lebih compact) -->
    <button
      @click="spinWheel"
      :disabled="isSpinning"
      class="bg-pink-500 text-white text-2xl font-black py-2 px-6 rounded-full mb-6 shadow-lg hover:bg-pink-400"
    >
      {{ isSpinning ? "Berputar..." : "PUTAR RODA!" }}
    </button>

    <!-- Kartu Pertanyaan (Dibuat lebih tipis) -->
    <div
      v-if="currentQuestion && !isSpinning"
      class="bg-pink-50 p-4 rounded-2xl border-2 border-pink-200 text-center max-w-xl"
    >
      <div class="text-pink-600 font-bold text-xl uppercase mb-1">
        Pertanyaanmu:
      </div>
      <p class="text-2xl font-black text-slate-700">{{ currentQuestion }}</p>
    </div>
  </div>
</template>
