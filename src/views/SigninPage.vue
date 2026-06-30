<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 1. State untuk menampung data input form
const formData = reactive({
  nama: "",
  kelas: "",
  sekolah: "",
});

// 2. State untuk menampung pesan error
const errors = reactive({
  nama: "",
  kelas: "",
  sekolah: "",
});

// 3. Fungsi validasi dan navigasi ke halaman berikutnya
const handleNextPage = () => {
  // Reset semua error terlebih dahulu
  errors.nama = "";
  errors.kelas = "";
  errors.sekolah = "";

  let isValid = true;

  // Validasi input Nama
  if (!formData.nama.trim()) {
    errors.nama = "Nama wajib diisi!";
    isValid = false;
  }

  // Validasi input Kelas
  if (!formData.kelas.trim()) {
    errors.kelas = "Kelas wajib diisi!";
    isValid = false;
  }

  // Validasi input Sekolah
  if (!formData.sekolah.trim()) {
    errors.sekolah = "Asal sekolah wajib diisi!";
    isValid = false;
  }

  // Jika semua form valid (sudah terisi), pindah ke halaman berikutnya
  if (isValid) {
    console.log("Data pendaftaran:", formData);

    // Opsional: Anda bisa menyimpan data ini ke localStorage jika ingin dipakai di halaman selanjutnya
    localStorage.setItem("user_student", JSON.stringify(formData));

    // Pindah ke rute halaman selanjutnya (Ganti '/materi' dengan rute tujuan Anda berikutnya)
    router.replace("/home");
  }
};
</script>

<template>
  <div
    class="form-container flex flex-col font-bold text-white items-center justify-center min-h-screen bg-slate-900 px-4"
  >
    <div
      class="bg-[#b7a965] text-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md"
    >
      <h2 class="text-3xl font-extrabold text-center mb-6 text-white">
        Student Personal Information
      </h2>

      <form @submit.prevent="handleNextPage" class="space-y-5">
        <!-- Input Nama -->
        <div class="flex flex-col">
          <label for="nama" class="text-sm font-semibold mb-1 text-white">Name</label>
          <input
            id="nama"
            v-model="formData.nama"
            type="text"
            placeholder="Masukkan nama Anda"
            class="border py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 font-normal placeholder:text-white"
            :class="errors.nama ? 'border-red-500' : 'border-slate-300'"
          />
          <span
            v-if="errors.nama"
            class="text-red-500 text-xs mt-1 font-normal"
          >
            {{ errors.nama }}
          </span>
        </div>

        <!-- Input Kelas -->
        <div class="flex flex-col">
          <label for="kelas" class="text-sm font-semibold mb-1 text-white">Class</label>
          <input
            id="kelas"
            v-model="formData.kelas"
            type="text"
            placeholder="Contoh: X IPA 1 / 7B"
            class="border py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 font-normal placeholder:text-white"
            :class="errors.kelas ? 'border-red-500' : 'border-slate-300'"
          />
          <span
            v-if="errors.kelas"
            class="text-red-500 text-xs mt-1 font-normal"
          >
            {{ errors.kelas }}
          </span>
        </div>

        <!-- Input Sekolah -->
        <div class="flex flex-col">
          <label for="sekolah" class="text-sm font-semibold mb-1 text-white">School</label>
          <input
            id="sekolah"
            v-model="formData.sekolah"
            type="text"
            placeholder="Enter your school name"
            class="border py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 font-normal placeholder:text-white"
            :class="errors.sekolah ? 'border-red-500' : 'border-slate-300'"
          />
          <span
            v-if="errors.sekolah"
            class="text-red-500 text-xs mt-1 font-normal"
          >
            {{ errors.sekolah }}
          </span>
        </div>

        <!-- Tombol Submit -->
        <button
          type="submit"
          class="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md text-lg"
        >
          Let's Start Learning
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Anda bisa mengganti latar belakang ini dengan background gambar seperti halaman utama jika mau */
.form-container {
  background-image: url("../assets/bg.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
