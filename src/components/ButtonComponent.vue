<script setup>
// Impor cukup komponen Icon resmi dari Iconify
import { Icon } from "@iconify/vue";

// Mendefinisikan properti (props) yang bisa diubah-ubah dari luar
defineProps({
  nomor: {
    type: String,
    required: false,
  },
  judul: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: false, // Contoh input: 'google', 'webcam', 'briefcase'
  },
  // Mengatur warna gradasi tombol (defaultnya biru-indigo)
  warnaClass: {
    type: String,
    default:
      "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
  },
});

// Mendefinisikan event klik yang akan dikirim ke komponen utama
defineEmits(["click"]);
</script>

<template>
  <button
    @click="$emit('click')"
    :class="warnaClass"
    class="flex flex-row items-center justify-center gap-3 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 active:scale-95 text-white font-bold tracking-wide border border-white/10 min-h-[140px] bg-gradient-to-br"
  >
    <!-- Masukkan prefix 'flat-color-icons:' diikuti oleh nama ikon secara dinamis -->
    <Icon
      v-if="iconName"
      :icon="`flat-color-icons:${iconName}`"
      :width="50"
      :height="50"
    />

    <span class="text-xl font-bold">{{ judul }}</span>
  </button>
</template>
