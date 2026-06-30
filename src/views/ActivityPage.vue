<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import TebaktradisiPage from "../pages/TebaktradisiPage.vue";
import PasangkangambarPage from "../pages/PasangkangambarPage.vue";
import BenarsalahPage from "../pages/BenarsalahPage.vue";
import RodasoalPage from "../pages/RodasoalPage.vue";

const router = useRouter();

const activeActivity = ref(0);

const goBack = () => {
  if (activeActivity.value !== 0) {
    activeActivity.value = 0;
  } else {
    router.back();
  }
};

const activitiesMenu = [
  {
    id: 1,
    title: "Tebak Tradisi",
    icon: "mdi:help-box-multiple",
    color: "bg-blue-400 border-blue-600 text-white hover:bg-blue-300",
    iconBg: "bg-blue-500",
  },
  {
    id: 2,
    title: "Pasangkan Gambar",
    icon: "mdi:image-multiple",
    color: "bg-emerald-400 border-emerald-600 text-white hover:bg-emerald-300",
    iconBg: "bg-emerald-500",
  },
  {
    id: 3,
    title: "Benar atau Salah",
    icon: "mdi:check-decagram",
    color: "bg-orange-400 border-orange-600 text-white hover:bg-orange-300",
    iconBg: "bg-orange-500",
  },
  {
    id: 4,
    title: "Roda Soal",
    icon: "mdi:dots-circle",
    color: "bg-pink-400 border-pink-600 text-white hover:bg-pink-300",
    iconBg: "bg-pink-500",
  },
];
</script>

<template>
  <div class="page-container min-h-screen p-4 md:p-6 flex flex-col font-sans">
    <div class="flex items-center justify-between mb-6 md:mb-8">
      <h1
        class="text-3xl md:text-5xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] uppercase tracking-wider"
      >
        {{
          activeActivity === 0
            ? "AKTIVITAS"
            : activitiesMenu[activeActivity - 1].title
        }}
      </h1>
      <button
        @click="goBack"
        class="p-2 bg-gradient-to-r from-sky-400 to-teal-400 hover:from-sky-500 hover:to-teal-500 rounded-full transition flex items-center justify-center shadow-md"
      >
        <Icon
          :icon="activeActivity === 0 ? 'mdi:home' : 'mdi:arrow-left-thick'"
          class="w-8 h-8 md:w-10 md:h-10 text-white"
        />
      </button>
    </div>

    <div class="flex-1 w-full max-w-5xl mx-auto pb-10">
      <div
        v-if="activeActivity === 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8"
      >
        <button
          v-for="item in activitiesMenu"
          :key="item.id"
          @click="activeActivity = item.id"
          class="group relative overflow-hidden p-6 rounded-[2rem] border-4 border-b-[8px] transition-all duration-200 active:border-b-4 active:translate-y-1 focus:outline-none flex flex-col items-center text-center shadow-lg"
          :class="item.color"
        >
          <div
            class="w-20 h-20 rounded-full mb-4 flex items-center justify-center shadow-inner border-4 border-white/30"
            :class="item.iconBg"
          >
            <Icon :icon="item.icon" class="w-12 h-12 text-white" />
          </div>
          <h2 class="text-2xl md:text-3xl font-black mb-2">{{ item.title }}</h2>
          <p
            class="text-white/90 font-bold text-sm md:text-base bg-black/20 px-4 py-1 rounded-full"
          >
            Mainkan Sekarang! 👉
          </p>
        </button>
      </div>

      <div
        v-else
        class="bg-[#fffdf5] p-6 md:p-10 rounded-[2.5rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] border-4 border-yellow-300"
      >
        <TebaktradisiPage v-if="activeActivity === 1" />
        <pasangkangambar-page v-else-if="activeActivity === 2" />
        <benarsalah-page v-else-if="activeActivity === 3" />
        <rodasoal-page v-else-if="activeActivity === 4" />
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
