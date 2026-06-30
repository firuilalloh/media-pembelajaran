<script setup>
import { ref, computed } from "vue";
import { act1Questions } from "../data/data";

const currentIndex = ref(0); // Melacak soal ke berapa
const userAnswers = ref({});
const score = ref(0);
const isFinished = ref(false);

// Mengambil soal yang aktif berdasarkan index
const currentQuestion = computed(() => act1Questions[currentIndex.value]);

const selectAnswer = (opt) => {
  userAnswers.value[currentQuestion.value.id] = opt;
};

const nextQuestion = () => {
  if (currentIndex.value < act1Questions.length - 1) {
    currentIndex.value++;
  } else {
    finishQuiz();
  }
};

const prevQuestion = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};

const finishQuiz = () => {
  let count = 0;
  act1Questions.forEach((q) => {
    if (userAnswers.value[q.id] === q.answer) count++;
  });
  score.value = count;
  isFinished.value = true;
};

const resetQuiz = () => {
  currentIndex.value = 0; // Balik ke soal pertama
  userAnswers.value = {}; // Hapus jawaban lama
  score.value = 0; // Reset skor
  isFinished.value = false; // Balik ke tampilan kuis
};
</script>

<template>
  <div
    class="max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-lg border-2 border-slate-200"
  >
    <div v-if="!isFinished">
      <div class="mb-6 text-sm font-bold text-sky-500">
        Soal {{ currentIndex + 1 }} dari {{ act1Questions.length }}
      </div>

      <p class="text-2xl font-black mb-8 leading-snug">
        {{ currentQuestion.text }}
      </p>

      <div class="grid grid-cols-1 gap-4 mb-8">
        <button
          v-for="opt in currentQuestion.options"
          :key="opt"
          @click="selectAnswer(opt)"
          :class="
            userAnswers[currentQuestion.id] === opt
              ? 'bg-sky-500 text-white'
              : 'bg-slate-100 hover:bg-slate-200'
          "
          class="p-4 rounded-xl font-bold transition-all border-2 border-slate-200 text-left"
        >
          {{ opt }}
        </button>
      </div>

      <div class="flex justify-between mt-4">
        <button
          @click="prevQuestion"
          :disabled="currentIndex === 0"
          class="px-6 py-2 bg-slate-200 rounded-xl font-bold disabled:opacity-50"
        >
          Sebelumnya
        </button>
        <button
          @click="nextQuestion"
          :disabled="!userAnswers[currentQuestion.id]"
          class="px-6 py-2 bg-emerald-500 text-white rounded-xl font-bold disabled:opacity-50"
        >
          {{
            currentIndex === act1Questions.length - 1
              ? "Selesai"
              : "Selanjutnya"
          }}
        </button>
      </div>
    </div>

    <!-- Tampilan Skor -->
    <div v-else class="text-center py-10">
      <h2 class="text-3xl font-black mb-6">Selesai</h2>

      <!-- Angka Skor Besar -->
      <div class="text-7xl font-black text-sky-500 mb-2">
        {{ score * 10 }}
      </div>

      <!-- Detail Jawaban -->
      <div class="text-xl font-bold text-slate-500 mb-6">
        {{ score }} / 10 Soal Benar
      </div>

      <!-- Kalimat Motivasi -->
      <p class="text-lg font-medium text-slate-600 mb-8 px-4">
        {{
          score >= 7
            ? "Luar biasa! Kamu sangat memahami tradisi kita. 🌟"
            : "Wah, sepertinya kamu harus membaca lagi tentang tradisi kita! Ayo coba lagi. 🤔"
        }}
      </p>

      <button
        @click="resetQuiz"
        class="bg-slate-800 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-700 transition-all shadow-lg"
      >
        Main Lagi
      </button>
    </div>
  </div>
</template>
