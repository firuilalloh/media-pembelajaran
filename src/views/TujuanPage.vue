<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import Modal from "../components/Modal.vue";

const router = useRouter();

const activeModal = ref(false);
const modalData = ref({
  title: "",
  content: "",
  variant: "blue",
});

const showModal = (type) => {
  if (type === "materi") {
    modalData.value = {
      title: "MATERI",
      isCarousel: true,
      carouselContent: [
        "Tradisi adalah kebiasaan yang dilakukan secara turun-temurun dalam keluarga maupun masyarakat.\n\nContoh tradisi:\n- makan bersama\n- gotong royong\n- kerja bakti\n- perayaan hari besar",
        "Tradisi keluarga adalah kebiasaan baik yang dilakukan bersama anggota keluarga.\n\nContoh:\n- makan bersama\n- berdoa bersama\n- membersihkan rumah\n\nManfaat:\n- mempererat hubungan keluarga\n- menumbuhkan kasih sayang\n- membentuk kebiasaan baik",
        "Tradisi masyarakat adalah kebiasaan yang dilakukan bersama warga sekitar.\n\nContoh:\n- gotong royong\n- kerja bakti\n- musyawarah warga\n\nManfaat:\n- menjaga kerukunan\n- mempererat persatuan\n- menumbuhkan kepedulian",
        "Tradisi perlu dijaga agar tidak hilang.\n\nCara melestarikan:\n- ikut kegiatan tradisi\n- menghargai budaya\n- menjaga kebersamaan",
      ],
      variant: "blue",
    };
  } else if (type === "tujuan") {
    modalData.value = {
      title: "TUJUAN PEMBELAJARAN",
      content:
        "1. Peserta didik mampu mengenal pengertian tradisi keluarga dan masyarakat sekitar dengan benar.\n\n2. Peserta didik mampu mengidentifikasi berbagai contoh tradisi yang ada di lingkungan keluarga dan masyarakat sekitar.\n\n3. Peserta didik mampu menjelaskan manfaat tradisi dalam kehidupan sehari-hari.\n\n4. Peserta didik mampu menunjukkan sikap menghargai tradisi yang ada di lingkungan keluarga dan masyarakat.\n\n5. Peserta didik mampu menerapkan nilai-nilai positif seperti kebersamaan, gotong royong, dan saling menghormati dalam kehidupan sehari-hari.",
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
        class="p-2 bg-linear-to-r from-sky-400 to-teal-400 hover:from-sky-500 hover:to-teal-500 rounded-full transition flex items-center justify-center shadow-md"
      >
        <Icon icon="mdi:home" class="w-8 h-8 md:w-10 md:h-10 text-white" />
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

    <Modal
      :isOpen="activeModal"
      :title="modalData.title"
      :content="modalData.content"
      :variant="modalData.variant"
      :isCarousel="modalData.isCarousel"
      :carouselContent="modalData.carouselContent"
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
