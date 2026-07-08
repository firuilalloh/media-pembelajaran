<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import MenuButton from "../components/ButtonComponent.vue";
import Modal from "../components/Modal.vue";
import dosen from "../assets/dosen.jpeg";
import mahasiswa from "../assets/mahasiswa.jpeg";

const router = useRouter();
const namaSiswa = ref("");
const activeModal = ref(null);
const modalData = ref({
  title: "",
  content: "",
  variant: "blue",
  profiles: null,
});

onMounted(() => {
  const sessionData = localStorage.getItem("user_student");
  if (sessionData) {
    const user = JSON.parse(sessionData);
    namaSiswa.value = user.nama;
  }
});

// Fungsi ketika tombol di-klik
const navigasiMenu = (idMenu) => {
  const modals = {
    1: {
      title: "PETUNJUK PENGGUNAAN",
      content: `1. Klik icon 🛖 untuk kembali ke menu utama.\n\n2. Gunakan Fitur Interaktif: Manfaatkan edugame dan kuis untuk menguji pemahamanmu.\n\n3. Klik icon 🎵 untuk menonaktifkan music.\n\n4. Klik icon ( panah kanan ) ➡️ untuk selanjutnya.\n\n5. Klik icon ( panah kiri ) ⬅️ untuk sebelumnya.`,
      variant: "blue",
      profiles: null,
    },
    2: {
      title: "PROFILE",
      content: "",
      variant: "purple",
      profiles: [
        {
          foto: mahasiswa,
          nama: "Nafilatuzzuhro",
          cerita: "Saya adalah mahasiswa yang sedang menempuh pendidikan S1 dengan jurusan pendidikan guru sekolah dasar, Fakultas ilmu Pendidikan, di Universitas Nahdlatul ulama Yogyakarta. Angkatan 2024", // Selesai Diperbaiki: Sebelumnya 'ceirta'
        },
        {
          foto: dosen,
          nama: "Dr.Wahyu Purwaningsih, M.Pd.",
          cerita:
            "Beliau adalah seorang akademisi dan dosen di Universitas Nahdlatul Ulama (UNU) Yogyakarta. Beliau menjabat sebagai Sekretaris Program Studi Pendidikan Guru Sekolah Dasar (PGSD).", // Selesai Diperbaiki: Sebelumnya 'ceirta'
        },
      ],
    },
  };

  const routes = {
    3: "/tujuan",
    4: "/activity",
    5: "/edugame",
    6: "/feedback",
    // 7: "/practice",
  };

  if (modals[idMenu]) {
    modalData.value = modals[idMenu];
    activeModal.value = true;
  } else if (routes[idMenu]) {
    router.push(routes[idMenu]);
  }
};

const closeModal = () => {
  activeModal.value = false;
};
</script>

<template>
  <div
    class="menu-container flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6"
  >
    <!-- Title Halaman -->
    <div class="text-center mb-12 bg-[#3b3822] p-6 rounded-lg shadow-lg">
      <h1
        class="text-4xl md:text-5xl font-extrabold tracking-wide text-white drop-shadow-md"
      >
        Selamat datang,
        <span class="text-yellow-400 font-bold">{{ namaSiswa }}</span
        >!
      </h1>
      <p v-if="namaSiswa" class="text-white mt-2 text-lg font-normal">
        kita belajar tradisi keluarga & masyarakat sekitar dengan media di bawah
        ini :
      </p>
    </div>

    <!-- Container Utama Tombol (Susunan 3-3-1) -->
    <div class="w-full max-w-4xl space-y-6">
      <!-- Baris 1: Berisi 3 Tombol -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MenuButton
          iconName="ruler"
          judul="PETUNJUK"
          @click="navigasiMenu(1)"
        />
        <MenuButton
          iconName="reading"
          judul="PROFILE"
          @click="navigasiMenu(2)"
        />
        <MenuButton
          iconName="positive-dynamic"
          judul="TUJUAN"
          @click="navigasiMenu(3)"
        />
      </div>

      <!-- Baris 2: Berisi 3 Tombol dengan warna ungu -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MenuButton
          iconName="flash-on"
          judul="AKTIVITAS"
          warnaClass="from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          @click="navigasiMenu(4)"
        />
        <MenuButton
          iconName="steam"
          judul="EDUGAME"
          warnaClass="from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          @click="navigasiMenu(5)"
        />
        <MenuButton
          iconName="feedback"
          judul="FEEDBACK"
          warnaClass="from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          @click="navigasiMenu(6)"
        />
      </div>

      <!-- Baris 3: Berisi 1 Tombol di Tengah dengan warna hijau/teal -->
      <!-- <div class="flex justify-center">
        <MenuButton
          iconName="answers"
          judul="LATIHAN"
          warnaClass="from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
          class="w-full md:w-1/3"
          @click="navigasiMenu(7)"
        />
      </div> -->
    </div>

    <!-- Reusable Modal -->
    <Modal
      :isOpen="activeModal"
      :title="modalData.title"
      :content="modalData.content"
      :variant="modalData.variant"
      :profiles="modalData.profiles"
      @close="closeModal"
    />
  </div>
</template>

<style scoped>
.menu-container {
  background-image: url("../assets/bg.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
