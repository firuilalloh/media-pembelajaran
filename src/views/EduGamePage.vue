<script setup>
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};

// Data Soal & Jawaban (Ditambah properti 'image')
const questions = ref([
  {
    id: 1,
    image:
      "https://jatengprov.go.id/wp-content/uploads/2020/03/IMG-20200316-WA0018.jpg",
    textStart: "Kalau ada warga yang sedang kerja bakti, kita harus",
    textEnd: "agar pekerjaan cepat selesai.",
    correctAnswer: "Membantu",
    currentAnswer: null,
  },
  {
    id: 2,
    image:
      "https://desakarangmojo.gunungkidulkab.go.id/assets/files/artikel/sedang_1738334390kb%201.jpg",
    textStart: "Keputusan desa yang penting harus diselesaikan dengan cara",
    textEnd: "di balai desa.",
    correctAnswer: "Musyawarah",
    currentAnswer: null,
  },
  {
    id: 3,
    image:
      "https://murtigading.bantulkab.go.id/assets/files/artikel/sedang_1618640089IMG20210416WA0016.jpg",
    textStart: "Bapak-bapak melakukan",
    textEnd: "secara bergantian untuk menjaga keamanan kampung.",
    correctAnswer: "Ronda Malam",
    currentAnswer: null,
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

const pickChoice = (choice) => {
  selectedChoice.value = selectedChoice.value === choice ? null : choice;
};

const fillAnswer = (question) => {
  if (selectedChoice.value) {
    question.currentAnswer = selectedChoice.value;
    selectedChoice.value = null;
  } else if (question.currentAnswer) {
    question.currentAnswer = null;
  }
};

const checkAnswers = () => {
  const isAnyEmpty = questions.value.some((q) => q.currentAnswer === null);
  if (isAnyEmpty) {
    alert("Isi semua kotak kosong terlebih dahulu!");
    return;
  }

  const isAllCorrect = questions.value.every(
    (q) => q.currentAnswer === q.correctAnswer,
  );

  if (isAllCorrect) {
    isGameFinished.value = true;
    showSuccessMessage.value = true;
  } else {
    alert("Wah, masih ada yang kurang tepat. Coba cek lagi ya!");
  }
};

const resetGame = () => {
  questions.value.forEach((q) => (q.currentAnswer = null));
  isGameFinished.value = false;
  showSuccessMessage.value = false;
  selectedChoice.value = null;
};
</script>

<template>
  <div class="page-container min-h-screen text-white p-4 md:p-6 flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
        EDUGAME
      </h1>
      <button
        @click="goBack"
        class="p-2 bg-gradient-to-r from-sky-400 to-teal-400 hover:from-sky-500 hover:to-teal-500 rounded-full transition flex items-center justify-center shadow-md focus:outline-none focus:ring-4 focus:ring-sky-300"
      >
        <Icon icon="mdi:home" class="w-8 h-8 md:w-10 md:h-10 text-white" />
      </button>
    </div>

    <!-- Centered Content -->
    <div class="flex-1 flex items-center justify-center w-full pb-10">
      <div
        class="w-full max-w-4xl bg-slate-800 bg-opacity-95 p-4 md:p-8 rounded-2xl shadow-2xl border-2 border-slate-700"
      >
        <div v-if="!isGameFinished">
          <p class="text-slate-300 mb-6 text-center text-base md:text-lg">
            Pilih kata di bawah, lalu klik kotak kosong untuk melengkapi
            kalimat!
          </p>

          <!-- Area Kalimat & Gambar -->
          <div class="space-y-6 mb-10">
            <div
              v-for="q in questions"
              :key="q.id"
              class="bg-slate-700/50 p-4 rounded-xl flex flex-col md:flex-row items-center gap-4 md:gap-6 border border-slate-600/50"
            >
              <!-- Gambar Thumbnail -->
              <img
                :src="q.image"
                alt="Ilustrasi"
                class="w-full md:w-36 h-40 md:h-24 object-cover rounded-lg shadow-md border-2 border-slate-500 flex-shrink-0"
              />

              <!-- Area Teks -->
              <div
                class="leading-loose text-base md:text-lg flex flex-wrap items-center justify-center md:justify-start gap-2 flex-1 text-center md:text-left"
              >
                <span>{{ q.textStart }}</span>

                <!-- Kotak Kosong / Jawaban -->
                <button
                  @click="fillAnswer(q)"
                  class="min-w-[120px] md:min-w-[140px] px-3 py-1 md:py-2 rounded-lg font-bold border-2 transition-all duration-200 focus:outline-none"
                  :class="{
                    'border-dashed border-slate-500 bg-slate-800 text-slate-400 hover:border-sky-400 hover:bg-slate-700':
                      !q.currentAnswer && !selectedChoice,
                    'border-dashed border-sky-400 bg-sky-900/50 text-sky-200 animate-pulse cursor-pointer':
                      !q.currentAnswer && selectedChoice,
                    'border-solid border-teal-500 bg-teal-500 text-white hover:bg-teal-600':
                      q.currentAnswer,
                  }"
                >
                  {{ q.currentAnswer || "..." }}
                </button>

                <span>{{ q.textEnd }}</span>
              </div>
            </div>
          </div>

          <!-- Area Kata Pilihan (Draggables) -->
          <div
            class="bg-slate-900/50 p-4 md:p-6 rounded-xl border border-slate-700"
          >
            <h3
              class="text-xs md:text-sm text-slate-400 uppercase tracking-widest mb-4 text-center font-bold"
            >
              Pilihan Kata
            </h3>
            <div class="flex flex-wrap gap-2 md:gap-3 justify-center">
              <button
                v-for="choice in availableChoices"
                :key="choice"
                @click="pickChoice(choice)"
                class="px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold transition-all duration-200 border-2 shadow-lg text-sm md:text-base"
                :class="{
                  'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600':
                    selectedChoice !== choice,
                  'bg-sky-500 border-white text-white transform -translate-y-1 scale-105 ring-4 ring-sky-500/50':
                    selectedChoice === choice,
                }"
              >
                {{ choice }}
              </button>
            </div>
          </div>

          <!-- Tombol Submit -->
          <div class="mt-8 flex justify-center">
            <button
              @click="checkAnswers"
              class="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white font-bold py-3 px-8 md:px-10 rounded-xl transition-all shadow-lg flex items-center gap-2 text-base md:text-lg"
            >
              Cek Jawaban
              <Icon icon="mdi:check-decagram" class="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        <!-- Tampilan Sukses -->
        <div v-else class="text-center py-10">
          <Icon
            icon="mdi:party-popper"
            class="w-24 h-24 md:w-32 md:h-32 text-yellow-400 mx-auto animate-bounce mb-6"
          />
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">
            Luar Biasa!
          </h2>
          <p class="text-slate-300 mb-8 text-lg md:text-xl">
            Kamu berhasil mencocokkan semua kata dengan benar.
          </p>

          <div class="flex flex-wrap gap-4 justify-center">
            <button
              @click="resetGame"
              class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 md:px-8 rounded-xl transition-colors shadow-md flex items-center gap-2"
            >
              <Icon icon="mdi:refresh" class="w-5 h-5" />
              Main Lagi
            </button>
            <button
              @click="goBack"
              class="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white font-bold py-3 px-6 md:px-8 rounded-xl transition-colors shadow-md flex items-center gap-2"
            >
              Kembali
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
