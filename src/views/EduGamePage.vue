<script setup>
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};

const questions = ref([
  {
    id: 1,
    image:
      "https://jatengprov.go.id/wp-content/uploads/2020/03/IMG-20200316-WA0018.jpg",
    textStart: "Kalau ada warga yang sedang kerja bakti, kita harus",
    textEnd: "agar pekerjaan cepat selesai.",
    correctAnswer: "Membantu",
    currentAnswer: null,
    // Tambahin properti warna biar tiap soal beda warna (visual cue buat anak)
    theme: "bg-blue-100 border-blue-300 text-blue-900",
  },
  {
    id: 2,
    image:
      "https://desakarangmojo.gunungkidulkab.go.id/assets/files/artikel/sedang_1738334390kb%201.jpg",
    textStart: "Keputusan desa yang penting harus diselesaikan dengan cara",
    textEnd: "di balai desa.",
    correctAnswer: "Musyawarah",
    currentAnswer: null,
    theme: "bg-green-100 border-green-300 text-green-900",
  },
  {
    id: 3,
    image:
      "https://murtigading.bantulkab.go.id/assets/files/artikel/sedang_1618640089IMG20210416WA0016.jpg",
    textStart: "Bapak-bapak melakukan",
    textEnd: "secara bergantian untuk menjaga keamanan kampung.",
    correctAnswer: "Ronda Malam",
    currentAnswer: null,
    theme: "bg-orange-100 border-orange-300 text-orange-900",
  },
]);

const allChoices = [
  "Ronda Malam",
  "Membantu",
  "Menonton",
  "Musyawarah",
  "Tidur",
];

const availableChoices = computed(() => {
  return allChoices.filter(
    (choice) => !questions.value.some((q) => q.currentAnswer === choice),
  );
});

const selectedChoice = ref(null);
const isGameFinished = ref(false);
const showSuccessMessage = ref(false);
const gameFeedback = ref(""); // State baru buat gantiin alert()

const pickChoice = (choice) => {
  selectedChoice.value = selectedChoice.value === choice ? null : choice;
  gameFeedback.value = ""; // Reset pesan error pas user milih kata baru
};

const fillAnswer = (question) => {
  if (selectedChoice.value) {
    question.currentAnswer = selectedChoice.value;
    selectedChoice.value = null;
    gameFeedback.value = "";
  } else if (question.currentAnswer) {
    question.currentAnswer = null;
    gameFeedback.value = "";
  }
};

const checkAnswers = () => {
  const isAnyEmpty = questions.value.some((q) => q.currentAnswer === null);
  if (isAnyEmpty) {
    gameFeedback.value = "Oops! Masih ada kotak yang kosong nih! 🧐";
    return;
  }

  const isAllCorrect = questions.value.every(
    (q) => q.currentAnswer === q.correctAnswer,
  );

  if (isAllCorrect) {
    isGameFinished.value = true;
    showSuccessMessage.value = true;
    gameFeedback.value = "";
  } else {
    gameFeedback.value =
      "Wah, masih ada yang kurang tepat. Coba cek lagi ya! 🤔";
  }
};

const resetGame = () => {
  questions.value.forEach((q) => (q.currentAnswer = null));
  isGameFinished.value = false;
  showSuccessMessage.value = false;
  selectedChoice.value = null;
  gameFeedback.value = "";
};
</script>

<template>
  <div class="page-container min-h-screen p-4 md:p-6 flex flex-col font-sans">
    <div class="flex items-center justify-between mb-6 md:mb-8">
      <h1
        class="text-4xl md:text-5xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-wider"
      >
        EDUGAME
      </h1>
      <button
        @click="goBack"
        class="p-2 bg-gradient-to-r from-sky-400 to-teal-400 hover:from-sky-500 hover:to-teal-500 rounded-full transition flex items-center justify-center shadow-md"
      >
        <Icon icon="mdi:home" class="w-8 h-8 md:w-10 md:h-10 text-white" />
      </button>
    </div>

    <div class="flex-1 flex items-center justify-center w-full pb-10">
      <div
        class="w-full max-w-4xl bg-[#fffdf5] p-5 md:p-8 rounded-[2rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] border-4 border-yellow-300"
      >
        <div v-if="!isGameFinished">
          <div
            class="bg-yellow-100 border-2 border-yellow-300 rounded-2xl p-4 mb-6 md:mb-8 text-center shadow-sm"
          >
            <p
              class="text-yellow-800 font-bold text-base md:text-xl flex items-center justify-center gap-2"
            >
              <Icon
                icon="mdi:lightbulb-on"
                class="text-yellow-500 w-6 h-6 md:w-8 md:h-8 animate-pulse"
              />
              Pilih kata di bawah, lalu klik kotak kosong untuk melengkapi
              kalimat!
            </p>
          </div>

          <div class="space-y-6 md:space-y-8 mb-8 md:mb-12">
            <div
              v-for="q in questions"
              :key="q.id"
              class="p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-center gap-4 md:gap-6 border-4 shadow-sm"
              :class="q.theme"
            >
              <div
                class="bg-white p-2 rounded-xl shadow-md border-2 border-slate-200 transform -rotate-2 hover:rotate-0 transition-transform"
              >
                <img
                  :src="q.image"
                  alt="Ilustrasi"
                  class="w-full md:w-40 h-40 md:h-32 object-cover rounded-lg flex-shrink-0"
                />
              </div>

              <div
                class="leading-loose text-lg md:text-xl flex flex-wrap items-center justify-center md:justify-start gap-2 flex-1 text-center md:text-left font-bold"
              >
                <span>{{ q.textStart }}</span>

                <button
                  @click="fillAnswer(q)"
                  class="min-w-[130px] md:min-w-[150px] px-4 py-2 rounded-xl font-black text-lg md:text-xl transition-all duration-200 focus:outline-none"
                  :class="{
                    // Kosong & belum ada kata yang dipilih
                    'border-4 border-dashed border-slate-400 bg-white text-slate-300 hover:border-sky-400 hover:bg-sky-50':
                      !q.currentAnswer && !selectedChoice,
                    // Kosong & ADA kata yang dipilih (Efek manggil/kedip)
                    'border-4 border-dashed border-sky-500 bg-sky-100 text-sky-500 animate-pulse cursor-pointer shadow-[0_0_15px_rgba(14,165,233,0.5)]':
                      !q.currentAnswer && selectedChoice,
                    // Terisi (Bentuknya jadi kayak permen/kancing)
                    'border-2 border-b-4 border-sky-600 bg-sky-400 text-white shadow-sm hover:bg-sky-500 active:translate-y-1 active:border-b-2':
                      q.currentAnswer,
                  }"
                >
                  {{ q.currentAnswer || "???" }}
                </button>

                <span>{{ q.textEnd }}</span>
              </div>
            </div>
          </div>

          <div
            class="bg-slate-100 p-5 md:p-8 rounded-3xl border-4 border-slate-200 shadow-inner"
          >
            <h3
              class="text-sm md:text-base text-slate-500 uppercase tracking-widest mb-4 text-center font-black"
            >
              👇 Pilihan Kata 👇
            </h3>
            <div class="flex flex-wrap gap-3 md:gap-4 justify-center">
              <button
                v-for="choice in availableChoices"
                :key="choice"
                @click="pickChoice(choice)"
                class="px-5 md:px-8 py-3 md:py-4 rounded-2xl font-black transition-all duration-200 text-base md:text-xl border-2 border-b-[6px] active:border-b-2 active:translate-y-1"
                :class="{
                  // Tidak dipilih
                  'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-sky-500':
                    selectedChoice !== choice,
                  // Dipilih (Efek terangkat dan nyala)
                  'bg-yellow-400 border-yellow-600 text-yellow-900 transform -translate-y-2 ring-4 ring-yellow-400/50 shadow-xl':
                    selectedChoice === choice,
                }"
              >
                {{ choice }}
              </button>
            </div>
          </div>

          <div class="mt-8 flex flex-col items-center">
            <button
              @click="checkAnswers"
              class="bg-green-500 hover:bg-green-400 text-white font-black py-4 px-10 rounded-full transition-all flex items-center gap-2 text-xl md:text-2xl border-b-[6px] border-green-700 active:border-b-0 active:translate-y-[6px]"
            >
              Cek Jawaban!
              <Icon icon="mdi:check-decagram" class="w-8 h-8" />
            </button>

            <p
              v-if="gameFeedback"
              class="mt-6 text-red-500 font-bold text-lg md:text-xl bg-red-100 px-6 py-3 rounded-xl border-2 border-red-300 animate-bounce"
            >
              {{ gameFeedback }}
            </p>
          </div>
        </div>

        <div v-else class="text-center py-12 px-4">
          <div class="relative inline-block mb-8">
            <Icon
              icon="mdi:star-shooting"
              class="absolute -top-6 -left-8 w-16 h-16 text-yellow-400 animate-spin-slow"
            />
            <Icon
              icon="mdi:party-popper"
              class="w-32 h-32 md:w-40 md:h-40 text-green-500 mx-auto animate-bounce"
            />
            <Icon
              icon="mdi:star-shooting"
              class="absolute -bottom-4 -right-6 w-16 h-16 text-yellow-400 animate-spin-slow"
            />
          </div>

          <h2
            class="text-4xl md:text-5xl font-black mb-4 text-slate-800 drop-shadow-sm"
          >
            LUAR BIASA! 🌟
          </h2>
          <p class="text-slate-600 mb-10 text-lg md:text-2xl font-bold">
            Kamu berhasil mencocokkan semua kata dengan benar!
          </p>

          <div class="flex flex-wrap gap-4 justify-center">
            <button
              @click="resetGame"
              class="bg-sky-400 hover:bg-sky-300 text-white font-black py-4 px-8 rounded-2xl transition-colors flex items-center gap-2 text-lg md:text-xl border-b-[6px] border-sky-600 active:border-b-0 active:translate-y-[6px]"
            >
              <Icon icon="mdi:refresh" class="w-8 h-8" />
              Main Lagi
            </button>
            <button
              @click="goBack"
              class="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-black py-4 px-8 rounded-2xl transition-colors flex items-center gap-2 text-lg md:text-xl border-b-[6px] border-yellow-600 active:border-b-0 active:translate-y-[6px]"
            >
              Kembali
              <Icon icon="mdi:arrow-right-thick" class="w-8 h-8" />
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

/* Animasi putar lambat buat bintang di layar sukses */
.animate-spin-slow {
  animation: spin 3s linear infinite;
}
</style>
