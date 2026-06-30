<script setup>
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { act3Questions } from "../data/data"; // Sesuaikan path import

const act3Answers = ref({});
const act3IsChecked = ref(false);
const act3ResultMsg = ref("");

// Logika Paginasi
const currentPage = ref(1);
const itemsPerPage = 5;

const paginatedQuestions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return act3Questions.slice(start, start + itemsPerPage);
});

const checkAct3 = () => {
  // Pastikan semua soal terjawab (10 soal total)
  if (Object.keys(act3Answers.value).length < act3Questions.length) {
    act3ResultMsg.value = "Oops! Jawab semua pertanyaan dulu ya! 🧐";
    act3IsChecked.value = true;
    return;
  }

  let correctCount = 0;
  act3Questions.forEach((q) => {
    if (act3Answers.value[q.id] === q.correct) correctCount++;
  });

  act3IsChecked.value = true;
  act3ResultMsg.value =
    correctCount === act3Questions.length
      ? "Hebat! Semua jawabanmu tepat! 🌟"
      : `Masih ada yang salah, kamu benar ${correctCount}/10! 🤔`;
};

const resetAct3 = () => {
  act3Answers.value = {};
  act3IsChecked.value = false;
  act3ResultMsg.value = "";
  currentPage.value = 1;
};
</script>

<template>
  <div>
    <!-- Header Instruksi -->
    <div
      class="bg-orange-100 border-2 border-orange-300 rounded-2xl p-4 mb-8 text-center shadow-sm"
    >
      <p
        class="text-orange-800 font-bold text-base md:text-xl flex items-center justify-center gap-2"
      >
        <Icon
          icon="mdi:help-circle"
          class="text-orange-500 w-6 h-6 animate-pulse"
        />
        Tentukan apakah pernyataan di bawah ini BENAR atau SALAH!
      </p>
    </div>

    <!-- Daftar Soal (Paginated) -->
    <div class="space-y-6 mb-8">
      <div
        v-for="(q, index) in paginatedQuestions"
        :key="q.id"
        class="bg-white p-5 md:p-6 rounded-3xl border-4 border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
      >
        <p class="text-lg md:text-xl font-bold text-slate-700 flex-1">
          <span class="text-orange-500 font-black mr-2">
            {{ (currentPage - 1) * itemsPerPage + index + 1 }}.
          </span>
          {{ q.text }}
        </p>
        <div class="flex gap-3">
          <button
            @click="
              act3Answers[q.id] = true;
              act3IsChecked = false;
            "
            class="px-6 py-3 rounded-2xl font-black transition-all border-2 border-b-[6px] active:border-b-2 active:translate-y-1"
            :class="
              act3Answers[q.id] === true
                ? 'bg-green-500 border-green-700 text-white transform -translate-y-1'
                : 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200'
            "
          >
            BENAR
          </button>
          <button
            @click="
              act3Answers[q.id] = false;
              act3IsChecked = false;
            "
            class="px-6 py-3 rounded-2xl font-black transition-all border-2 border-b-[6px] active:border-b-2 active:translate-y-1"
            :class="
              act3Answers[q.id] === false
                ? 'bg-red-500 border-red-700 text-white transform -translate-y-1'
                : 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200'
            "
          >
            SALAH
          </button>
        </div>
      </div>
    </div>

    <!-- Navigasi Halaman -->
    <div class="flex justify-center gap-4 my-8">
      <button
        @click="currentPage = 1"
        :class="currentPage === 1 ? 'bg-orange-500 text-white' : 'bg-slate-200'"
        class="px-6 py-2 rounded-full font-bold"
      >
        1
      </button>
      <button
        @click="currentPage = 2"
        :class="currentPage === 2 ? 'bg-orange-500 text-white' : 'bg-slate-200'"
        class="px-6 py-2 rounded-full font-bold"
      >
        2
      </button>
    </div>

    <!-- Tombol Aksi -->
    <div
      class="border-t-4 border-dashed border-slate-200 pt-8 flex flex-col items-center"
    >
      <div class="flex flex-wrap gap-4 justify-center">
        <button
          @click="resetAct3"
          class="bg-rose-400 hover:bg-rose-300 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-md flex items-center gap-2 border-b-[6px] border-rose-600 active:border-b-0 active:translate-y-[6px]"
        >
          <Icon icon="mdi:refresh" class="w-6 h-6" /> Reset
        </button>
        <button
          @click="checkAct3"
          class="bg-orange-500 hover:bg-orange-400 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-md flex items-center gap-2 border-b-[6px] border-orange-700 active:border-b-0 active:translate-y-[6px]"
        >
          Cek Jawaban <Icon icon="mdi:check-decagram" class="w-6 h-6" />
        </button>
      </div>

      <!-- Hasil -->
      <p
        v-if="act3IsChecked"
        class="mt-6 text-lg md:text-xl font-bold px-6 py-3 rounded-xl border-2 animate-bounce text-center"
        :class="
          act3ResultMsg.includes('Hebat')
            ? 'bg-green-100 border-green-300 text-green-700'
            : 'bg-red-100 border-red-300 text-red-600'
        "
      >
        {{ act3ResultMsg }}
      </p>
    </div>
  </div>
</template>
