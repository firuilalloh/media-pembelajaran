<script setup>
import { computed } from "vue";

// Definisikan props dengan tipe varian yang lebih aman, bukan class tailwind mentah
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
  // Alihkan dari passing utility class ke nama varian (misal: 'blue', 'purple', 'green')
  variant: {
    type: String,
    default: "blue",
    validator: (value) => ["blue", "purple", "green"].includes(value),
  },
  profiles: {
    type: Array,
    default: null,
  },
});

defineEmits(["close"]);

// Mapping class gradient berdasarkan varian secara eksplisit agar terbaca oleh JIT Tailwind
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
    class="fixed inset-0 bg-black/10 flex items-center justify-center p-4 z-50 pointer-events-auto backdrop-blur-sm"
  >
    <div
      :class="[
        'bg-gradient-to-br rounded-2xl max-w-2xl w-full p-8 shadow-2xl',
        themeClasses.card,
      ]"
    >
      <h2 class="text-3xl font-bold text-white mb-6">{{ title }}</h2>

      <div v-if="profiles" class="grid grid-cols-2 gap-6 mb-8">
        <div
          v-for="(profile, index) in profiles"
          :key="index"
          class="bg-white bg-opacity-20 rounded-lg p-6 text-center"
        >
          <img
            v-if="profile.foto"
            :src="profile.foto"
            :alt="profile.name"
            class="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 class="text-xl font-bold text-slate-900 mb-2">
            {{ profile.name }}
          </h3>
          <p v-if="profile.role" class="text-slate-700 text-sm">
            {{ profile.role }}
          </p>
        </div>
      </div>

      <p
        v-else
        class="text-white text-lg leading-relaxed mb-8 whitespace-pre-line"
      >
        {{ content }}
      </p>

      <button
        @click="$emit('close')"
        :class="[
          'px-8 py-3 bg-white hover:bg-gray-100 rounded-lg font-semibold transition shadow-lg',
          themeClasses.buttonText,
        ]"
      >
        Close
      </button>
    </div>
  </div>
</template>
