<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import Modal from "../components/Modal.vue"; // Pastikan path import sesuai

const router = useRouter();

// State untuk Modal
const activeModal = ref(false);
const modalData = ref({
  title: "",
  content: "",
  variant: "blue",
});

// Konten untuk Materi dan Tujuan
const showModal = (type) => {
  if (type === "materi") {
    modalData.value = {
      title: "MATERI",
      content:
        "Di sini kamu akan belajar tentang berbagai tradisi keluarga dan kebiasaan di masyarakat sekitar. Kita akan menjelajahi bagaimana tradisi dibentuk dan mengapa itu penting untuk dilestarikan.",
      variant: "blue",
    };
  } else if (type === "tujuan") {
    modalData.value = {
      title: "TUJUAN PEMBELAJARAN",
      content:
        "1. Mengidentifikasi dan mengenal ragam tradisi atau budaya dalam keluarga dan masyarakat yang ada di Indonesia.\n\n2. Mengetahui pengaruh kebiasaan ragam tradisi atau budaya dalam keluarga dan masyarakat.\n\n3. Mengaplikasikan nilai positif yang berasal dari ragam tradisi atau budaya dalam keluarga dan masyarakat.",
      variant: "green",
    };
  }
  activeModal.value = true;
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="page-container min-h-screen text-white p-6 flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-4xl font-bold text-white">TUJUAN</h1>
      <button
        @click="goBack"
        class="p-2 bg-gradient-to-r from-sky-400 to-teal-400 hover:from-sky-500 hover:to-teal-500 rounded-full transition flex items-center justify-center shadow-md"
      >
        <Icon icon="mdi:home" class="w-10 h-10 text-white" />
      </button>
    </div>

    <!-- Centered Content -->
    <div class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-2xl flex flex-col md:flex-row gap-6">
        <!-- Button Materi -->
        <button
          @click="showModal('materi')"
          class="flex-1 p-8 bg-blue-600 bg-opacity-90 hover:bg-blue-700 rounded-lg shadow-xl transition transform hover:scale-105 text-center border border-blue-500"
        >
          <h2 class="text-2xl font-bold">Materi</h2>
          <p class="mt-2 text-sm opacity-90">
            Pelajari modul pembelajaran di sini.
          </p>
        </button>

        <!-- Button Tujuan -->
        <button
          @click="showModal('tujuan')"
          class="flex-1 p-8 bg-emerald-600 bg-opacity-90 hover:bg-emerald-700 rounded-lg shadow-xl transition transform hover:scale-105 text-center border border-emerald-500"
        >
          <h2 class="text-2xl font-bold">Tujuan Pembelajaran</h2>
          <p class="mt-2 text-sm opacity-90">
            Lihat target capaian pembelajaran.
          </p>
        </button>
      </div>
    </div>

    <!-- Modal Component -->
    <Modal
      :isOpen="activeModal"
      :title="modalData.title"
      :content="modalData.content"
      :variant="modalData.variant"
      @close="activeModal = false"
    />
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
