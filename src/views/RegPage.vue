<template>
  <div
    class="hero-container w-full min-h-screen md:h-screen overflow-hidden flex flex-col font-bold text-white items-center justify-center uppercase p-4 md:p-6"
  >
    <div
      class="w-full max-w-4xl bg-black/50 backdrop-blur-md p-6 md:p-8 rounded-3xl flex flex-col items-center text-center shadow-2xl border border-white/10"
    >
      <img
        src="../assets/UNU.png"
        alt="Logo"
        class="w-28 h-auto md:w-36 lg:w-40 mb-4 md:mb-6 object-contain drop-shadow-lg"
      />

      <h1
        class="text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-6 leading-tight md:leading-snug drop-shadow-md break-words w-full"
      >
        Multimedia Pembelajaran Interaktif <br class="hidden md:block" />
        Berbasis Kognitif (TRADIGO)
      </h1>

      <div
        class="flex flex-col items-center mb-6 md:mb-8 text-sm md:text-lg lg:text-xl text-slate-200 break-words w-full px-2"
      >
        <h3 class="mb-1">Oleh : Nafilatuzzuhro (242221099)</h3>
        <h3>Dosen : Dr. Wahyu Purwaningsih, M. Pd.</h3>
      </div>

      <router-link to="/next" class="mb-6 md:mb-8 w-full sm:w-auto">
        <button
          class="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-lg md:text-xl lg:text-2xl text-white font-bold py-3 px-8 md:px-12 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] transform hover:scale-105 active:scale-95"
        >
          Start Learning
        </button>
      </router-link>

      <div
        class="text-[10px] sm:text-xs md:text-sm lg:text-base flex flex-col items-center text-slate-300 space-y-1 tracking-wide break-words w-full"
      >
        <h2>PROGRAM STUDI PENDIDIKAN GURU SEKOLAH DASAR</h2>
        <h2>FAKULTAS ILMU PENDIDIKAN</h2>
        <h2>UNIVERSITAS NAHDLATUL ULAMA YOGYAKARTA</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-container {
  background-image: url("../assets/bg.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
