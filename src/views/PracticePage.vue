<script setup>
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};

// Data Soal Latihan (Bisa diganti atau fetch dari API nanti)
const questions = ref([
  {
    id: 1,
    text: "Sikap yang tepat saat melihat warga desa sedang kerja bakti membersihkan selokan adalah...",
    options: [
      "Pura-pura tidak melihat",
      "Ikut membantu semampunya",
      "Menonton saja dari jauh",
      "Tidur di rumah",
    ],
    correctAnswerIndex: 1, // Index dari array options (mulai dari 0)
  },
  {
    id: 2,
    text: "Apa tujuan utama dari tradisi musyawarah di balai desa?",
    options: [
      "Mencari siapa yang salah",
      "Ajang pamer kekayaan",
      "Mencapai mufakat dan solusi bersama",
      "Sekadar kumpul-kumpul",
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 3,
    text: "Saat ada jadwal ronda malam, yang sebaiknya dilakukan bapak-bapak adalah...",
    options: [
      "Berjaga di pos kamling bergantian",
      "Menyuruh anak kecil yang ronda",
      "Mengunci pintu dan tidur",
      "Main game sampai pagi",
    ],
    correctAnswerIndex: 0,
  },
]);

// State untuk Kuis
const currentQuestionIndex = ref(0);
const score = ref(0);
const hasAnswered = ref(false);
const selectedOptionIndex = ref(null);
const showResult = ref(false);

// Computed untuk memudahkan ambil data soal saat ini
const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value],
);

// Logic saat user milih jawaban
const selectAnswer = (index) => {
  if (hasAnswered.value) return; // Kalau udah jawab, gak bisa ganti jawaban

  selectedOptionIndex.value = index;
  hasAnswered.value = true;

  if (index === currentQuestion.value.correctAnswerIndex) {
    score.value += 100 / questions.value.length; // Hitung persentase skor
  }
};

// Logic untuk lanjut ke soal berikutnya atau selesai
const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
    // Reset state untuk soal baru
    hasAnswered.value = false;
    selectedOptionIndex.value = null;
  } else {
    // Kuis selesai
    showResult.value = true;
  }
};

// Logic untuk mengulang latihan
const retryQuiz = () => {
  currentQuestionIndex.value = 0;
  score.value = 0;
  hasAnswered.value = false;
  selectedOptionIndex.value = null;
  showResult.value = false;
};
</script>

<template>
  <div class="page-container min-h-screen text-white p-6 flex flex-col">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-4xl font-bold text-white drop-shadow-lg">LATIHAN</h1>
      <button
        @click="goBack"
        class="p-2 bg-gradient-to-r from-sky-400 to-teal-400 hover:from-sky-500 hover:to-teal-500 rounded-full transition flex items-center justify-center shadow-md focus:outline-none focus:ring-4 focus:ring-sky-300"
      >
        <Icon icon="mdi:home" class="w-8 h-8 md:w-10 md:h-10 text-white" />
      </button>
    </div>

    <div class="flex-1 flex items-center justify-center w-full">
      <div
        class="w-full max-w-2xl bg-slate-800 bg-opacity-95 p-8 rounded-2xl shadow-2xl border-2 border-slate-700"
      >
        <div v-if="!showResult">
          <div
            class="flex justify-between items-center mb-6 text-slate-300 font-semibold"
          >
            <span
              >Soal {{ currentQuestionIndex + 1 }} dari
              {{ questions.length }}</span
            >
            <span>Skor: {{ Math.round(score) }}</span>
          </div>

          <h2 class="text-2xl font-bold mb-8 leading-relaxed text-sky-100">
            {{ currentQuestion.text }}
          </h2>

          <div class="space-y-4">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              @click="selectAnswer(index)"
              :disabled="hasAnswered"
              class="w-full text-left p-4 rounded-xl border-2 transition-all duration-300 font-medium text-lg"
              :class="{
                // Default state sebelum dijawab
                'border-slate-600 bg-slate-700 hover:bg-slate-600 text-slate-200':
                  !hasAnswered,

                // State jika jawaban BENAR
                'border-green-500 bg-green-500/20 text-green-300':
                  hasAnswered && index === currentQuestion.correctAnswerIndex,

                // State jika SALAH (dan ini adalah opsi yang dipilih user)
                'border-red-500 bg-red-500/20 text-red-300':
                  hasAnswered &&
                  index === selectedOptionIndex &&
                  index !== currentQuestion.correctAnswerIndex,

                // State untuk opsi lain yang tidak dipilih saat sudah menjawab
                'border-slate-700 bg-slate-800/50 text-slate-500 opacity-50':
                  hasAnswered &&
                  index !== selectedOptionIndex &&
                  index !== currentQuestion.correctAnswerIndex,
              }"
            >
              <div class="flex items-center justify-between">
                <span>{{ option }}</span>
                <Icon
                  v-if="
                    hasAnswered && index === currentQuestion.correctAnswerIndex
                  "
                  icon="mdi:check-circle"
                  class="w-6 h-6 text-green-500"
                />
                <Icon
                  v-if="
                    hasAnswered &&
                    index === selectedOptionIndex &&
                    index !== currentQuestion.correctAnswerIndex
                  "
                  icon="mdi:close-circle"
                  class="w-6 h-6 text-red-500"
                />
              </div>
            </button>
          </div>

          <div class="mt-8 flex justify-end" v-if="hasAnswered">
            <button
              @click="nextQuestion"
              class="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              {{
                currentQuestionIndex === questions.length - 1
                  ? "Lihat Hasil"
                  : "Selanjutnya"
              }}
              <Icon icon="mdi:arrow-right" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <div class="mb-6">
            <Icon
              v-if="score > 70"
              icon="mdi:trophy-award"
              class="w-24 h-24 text-yellow-400 mx-auto animate-bounce"
            />
            <Icon
              v-else
              icon="mdi:emoticon-sad-outline"
              class="w-24 h-24 text-slate-400 mx-auto"
            />
          </div>
          <h2 class="text-3xl font-bold mb-2 text-white">Latihan Selesai!</h2>
          <p class="text-slate-300 mb-6 text-lg">Skor akhir kamu adalah:</p>
          <div
            class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-400 mb-10"
          >
            {{ Math.round(score) }}
          </div>

          <div class="flex gap-4 justify-center">
            <button
              @click="retryQuiz"
              class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md flex items-center gap-2"
            >
              <Icon icon="mdi:refresh" class="w-5 h-5" />
              Ulangi
            </button>
            <button
              @click="goBack"
              class="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md flex items-center gap-2"
            >
              Kembali ke Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  background-image: url("../assets/bg.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
