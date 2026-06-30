<script setup>
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { act2Data } from "../data/data";

const errorMessage = ref("");
const selectedImage = ref(null);
const matches = ref({});
const isFinished = ref(false);
const score = ref(0);

const selectImage = (img) => {
  selectedImage.value = img;
};

const matchName = (name) => {
  if (selectedImage.value) {
    matches.value[selectedImage.value.id] = name;
    selectedImage.value = null;
  }
};

const reset = () => {
  matches.value = {};
  isFinished.value = false;
  score.value = 0;
};

const check = () => {
  const totalAnswers = Object.keys(matches.value).length;

  if (totalAnswers < act2Data.length) {
    errorMessage.value = "Oops, belum semua gambar dipasangkan nih! 🧐";
    isFinished.value = false;
    return;
  }

  errorMessage.value = "";
  let count = 0;
  act2Data.forEach((item) => {
    if (matches.value[item.id] === item.name) {
      count++;
    }
  });
  score.value = count;
  isFinished.value = true;
};

const shuffledNames = computed(() => {
  return [...act2Data].sort(() => Math.random() - 0.5);
});
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <!-- Instruksi Menarik -->
    <div
      class="bg-yellow-400 p-4 rounded-3xl mb-6 text-center transform rotate-1 shadow-lg border-b-8 border-yellow-600"
    >
      <p
        class="text-white font-black text-xl flex items-center justify-center gap-2"
      >
        <Icon icon="mdi:palette-swatch" class="text-white w-8 h-8" />
        Klik Gambar, lalu pilih Namanya ya! 🎨
      </p>
    </div>

    <!-- Area Gambar (Card Gemoy) -->
    <div
      class="grid grid-cols-2 md:grid-cols-5 gap-4 h-75 overflow-y-auto p-4 bg-sky-100 rounded-3xl mb-6"
    >
      <button
        v-for="img in act2Data"
        :key="img.id"
        @click="selectImage(img)"
        :class="
          selectedImage?.id === img.id ? 'ring-4 ring-yellow-400 scale-105' : ''
        "
        class="relative h-28 rounded-2xl bg-white shadow-lg overflow-hidden transition-all border-4 border-white"
      >
        <img :src="img.src" class="w-full h-full object-cover" />

        <!-- Bagian ini yang diubah: Munculkan nama pasangan di sini -->
        <div
          v-if="matches[img.id]"
          class="absolute bottom-0 w-full bg-emerald-500 text-white text-[10px] font-black p-1 truncate shadow-inner flex items-center justify-center gap-1"
        >
          {{ matches[img.id] }}
        </div>
      </button>
    </div>

    <!-- Area Pilihan Nama (Tombol Bubble) -->
    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="item in shuffledNames"
        :key="item.id"
        @click="matchName(item.name)"
        class="p-4 bg-pink-400 text-white font-black text-lg rounded-full shadow-[0_4px_0_rgb(190,24,93)] hover:translate-y-1 hover:shadow-none transition-all"
      >
        {{ item.name }}
      </button>
    </div>
    <div class="flex gap-4 mt-12">
      <button
        @click="reset"
        class="flex-1 p-4 bg-red-400 text-white font-black text-lg rounded-full shadow-[0_4px_0_rgb(185,28,28)] hover:translate-y-1 hover:shadow-none transition-all"
      >
        Reset
      </button>
      <button
        @click="check"
        class="flex-1 p-4 bg-emerald-500 text-white font-black text-lg rounded-full shadow-[0_4px_0_rgb(5,150,105)] hover:translate-y-1 hover:shadow-none transition-all"
      >
        Cek Jawaban
      </button>
    </div>

    <!-- Tampilan Skor -->
    <div
      v-if="errorMessage"
      class="mt-4 p-3 bg-red-100 text-red-600 font-black rounded-xl text-center animate-pulse"
    >
      {{ errorMessage }}
    </div>

    <!-- Tampilan Skor (Hanya muncul jika sudah selesai & semua sudah terisi) -->
    <div
      v-if="isFinished"
      class="mt-8 p-6 bg-yellow-400 rounded-3xl text-center text-white shadow-xl animate-bounce"
    >
      <p class="text-lg">Hasil Akhir:</p>
      <div class="text-5xl font-black">{{ score * 10 }}</div>
      <p class="font-bold">{{ score }} / 10 Benar</p>
    </div>
  </div>
</template>
