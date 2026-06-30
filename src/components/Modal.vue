<script setup>
import { ref, onMounted, onUnmounted, computed, defineProps, watch } from "vue";
import { Icon } from "@iconify/vue";

const isMobile = ref(false);

const checkScreen = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
});

// Fungsi untuk menentukan posisi
const getPlacement = (index) => {
  if (isMobile.value) return "bottom"; // Di HP selalu di bawah foto
  return index === 0 ? "right" : "left"; // Di desktop tetap kiri/kanan
};

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "blue",
    validator: (value) => ["blue", "purple", "green"].includes(value),
  },
  profiles: {
    type: Array,
    default: null,
  },
  isCarousel: {
    type: Boolean,
    default: false,
  },
  carouselContent: {
    type: Array,
    default: () => [],
  },
});

const currentPage = ref(0);

watch(
  () => props.isOpen,
  (val) => {
    if (val) currentPage.value = 0;
  },
);

defineEmits(["close"]);

const themeClasses = computed(() => {
  const maps = {
    blue: {
      card: "from-blue-400 to-blue-500",
      buttonText: "text-blue-500",
    },
    purple: {
      card: "from-purple-400 to-purple-500",
      buttonText: "text-purple-500",
    },
    green: {
      card: "from-green-400 to-green-500",
      buttonText: "text-green-600",
    },
  };
  return maps[props.variant] || maps.blue;
});
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50 pointer-events-auto backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div
      :class="[
        'bg-linear-to-br rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto',
        themeClasses.card,
      ]"
    >
      <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">
        {{ title }}
      </h2>

      <div
        v-if="profiles"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8"
      >
        <div
          v-for="(profile, index) in profiles"
          :key="index"
          class="bg-white bg-opacity-20 rounded-xl p-4 md:p-6 text-center"
        >
          <div
            v-tooltip="{
              content: `
      <div class='font-bold text-2xl text-purple-700 mb-1'>${profile.nama}</div>
      <div class='text-lg text-gray-600 leading-normal font-normal'>${profile.cerita}</div>
    `,
              html: true,
              // Gunakan 'auto' agar dia otomatis pindah ke atas/bawah sesuai ruang yang tersedia
              placement: 'auto',
              triggers: ['hover', 'click'],
              // Tambahkan popperOptions untuk memastikan dia tetap di dalam layar
              popperOptions: {
                strategy: 'fixed',
                modifiers: [
                  {
                    name: 'flip',
                    options: {
                      fallbackPlacements: ['top', 'bottom'],
                    },
                  },
                ],
              },
            }"
            class="inline-block cursor-pointer"
          >
            <img
              v-if="profile.foto"
              :src="profile.foto"
              :alt="profile.nama || 'Profile'"
              class="w-28 h-28 md:w-40 md:h-40 rounded-full mx-auto object-cover border-4 border-white/20 shadow-md shrink-0"
            />
          </div>
        </div>
      </div>
      <div v-else class="min-h-50 mb-6">
        <div v-if="!profiles">
          <p
            v-if="!isCarousel"
            class="text-white text-base md:text-xl leading-relaxed whitespace-pre-line"
          >
            {{ content }}
          </p>
          <div
            v-else
            class="text-white text-base md:text-xl leading-relaxed whitespace-pre-line"
          >
            {{ carouselContent[currentPage] }}
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between gap-4 mt-6">
        <div v-if="isCarousel" class="flex gap-2">
          <button
            @click="currentPage = Math.max(0, currentPage - 1)"
            :disabled="currentPage === 0"
            class="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full disabled:opacity-30 transition"
          >
            <Icon icon="mdi:chevron-left" class="w-6 h-6" />
          </button>
          <button
            @click="
              currentPage = Math.min(
                carouselContent.length - 1,
                currentPage + 1,
              )
            "
            :disabled="currentPage === carouselContent.length - 1"
            class="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full disabled:opacity-30 transition"
          >
            <Icon icon="mdi:chevron-right" class="w-6 h-6" />
          </button>
        </div>
        <div v-else></div>
        <button
          @click="$emit('close')"
          :class="[
            'px-8 py-3 bg-white hover:bg-gray-100 rounded-lg font-bold transition shadow-lg',
            themeClasses.buttonText,
          ]"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
}
</style>

<style>
.v-popper--theme-tooltip .v-popper__inner {
  background: #ffffff !important;
  color: #1f2937 !important;
  border: 1px solid #7a7a7a !important;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;

  max-width: 450px !important;
  width: 100% !important;

  white-space: normal !important;
  word-break: break-word !important;
  text-align: left !important;
}

.v-popper--theme-tooltip .v-popper__arrow-outer {
  border-color: #7a7a7a !important;
}

.v-popper--theme-tooltip .v-popper__arrow-inner {
  border-color: #ffffff !important;
}

@media (max-width: 640px) {
  .v-popper--theme-tooltip .v-popper__inner {
    max-width: 280px !important;
    padding: 12px !important;
    font-size: 0.875rem !important;
  }
}

@media (min-width: 641px) {
  .v-popper--theme-tooltip .v-popper__inner {
    max-width: 450px !important;
  }
}
</style>
