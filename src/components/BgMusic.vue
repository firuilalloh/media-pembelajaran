<script setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";

const audioRef = ref(null);
const isPlaying = ref(false);
const volume = ref(0.5); 
const isExpanded = ref(false); // State baru untuk nampilin slider di HP

const togglePlay = () => {
  if (!audioRef.value) return;

  if (isPlaying.value) {
    audioRef.value.pause();
  } else {
    audioRef.value.play().catch((error) => {
      console.warn("Autoplay diblokir:", error);
    });
  }
  isPlaying.value = !isPlaying.value;
};

const updateVolume = () => {
  if (!audioRef.value) return;
  audioRef.value.volume = volume.value;
  
  if (volume.value == 0) {
    audioRef.value.pause();
    isPlaying.value = false;
  } else if (!isPlaying.value && volume.value > 0) {
    audioRef.value.play();
    isPlaying.value = true;
  }
};

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.volume = volume.value;
  }
});
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex items-center gap-2 md:gap-3 bg-slate-800/95 backdrop-blur-md p-2 md:p-3 rounded-full shadow-2xl border border-slate-600 transition-all">
    
    <audio ref="audioRef" loop>
      <source src="../assets/bg-music.mp3" type="audio/mpeg" />
    </audio>

    <button 
      @click="isExpanded = !isExpanded" 
      class="md:hidden w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white transition-colors focus:outline-none"
    >
      <Icon :icon="isExpanded ? 'mdi:chevron-right' : 'mdi:chevron-left'" class="w-6 h-6" />
    </button>

    <div 
      class="overflow-hidden transition-all duration-300 ease-in-out flex items-center"
      :class="isExpanded ? 'w-24' : 'w-0 md:w-24'"
    >
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.05" 
        v-model="volume" 
        @input="updateVolume"
        class="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-sky-400"
      />
    </div>

    <button 
      @click="togglePlay"
      class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-r from-sky-500 to-teal-500 rounded-full text-white hover:scale-105 transition-transform shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-500/50 flex-shrink-0"
    >
      <Icon :icon="isPlaying ? 'mdi:music-note' : 'mdi:music-note-off'" class="w-6 h-6 md:w-7 md:h-7" />
    </button>

  </div>
</template>

<style scoped>
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #38bdf8; 
  cursor: pointer;
}
</style>