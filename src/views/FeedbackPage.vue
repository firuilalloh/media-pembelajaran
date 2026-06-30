<script setup>
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="page-container min-h-screen text-white p-6 flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-4xl font-bold text-white">FEEDBACK</h1>
      <button
        @click="goBack"
        class="p-2 bg-linear-to-r from-sky-400 to-teal-400 hover:from-sky-500 hover:to-teal-500 rounded-full transition flex items-center justify-center shadow-md"
      >
        <Icon icon="mdi:home" class="w-8 h-8 md:w-10 md:h-10 text-white" />
      </button>
    </div>

    <!-- Form -->
    <div class="flex-1 flex items-center justify-center">
      <div
        class="max-w-xl w-full bg-slate-800 bg-opacity-90 p-8 rounded-2xl shadow-xl"
      >
        <form
          action="https://formspree.io/f/mgobdare"
          method="POST"
          class="flex flex-col gap-6"
        >
          <!-- Pesan -->
          <div>
            <label for="pesan" class="block mb-2 font-semibold"
              >Pesan buat Kak Nafilatuzzuhro:</label
            >
            <textarea
              id="pesan"
              name="pesan"
              placeholder="Tulis saran atau kritik di sini ya..."
              class="w-full p-4 rounded-xl text-white placeholder-gray-400 bg-slate-900 border border-yellow-400/50 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none h-32 transition-all"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full py-4 bg-linear-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 rounded-full font-bold text-lg shadow-lg transition transform hover:scale-105"
          >
            Kirim Feedback! 🚀
          </button>
        </form>
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
