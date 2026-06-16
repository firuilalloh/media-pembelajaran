<script setup>
import { computed } from "vue";

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
});

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
        'bg-gradient-to-br rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto',
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
          <img
            v-if="profile.foto"
            :src="profile.foto"
            :alt="profile.name"
            class="w-28 h-28 md:w-40 md:h-40 rounded-full mx-auto mb-4 object-cover border-4 border-white/20 shadow-md flex-shrink-0"
          />
          <h3 class="text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-2">
            {{ profile.name }}
          </h3>
          <p
            v-if="profile.role"
            class="text-slate-800 text-sm md:text-base font-medium"
          >
            {{ profile.role }}
          </p>
        </div>
      </div>

      <p
        v-else
        class="text-white text-base md:text-lg leading-relaxed mb-6 md:mb-8 whitespace-pre-line"
      >
        {{ content }}
      </p>

      <button
        @click="$emit('close')"
        :class="[
          'px-8 py-3 w-full sm:w-auto bg-white hover:bg-gray-100 rounded-lg font-bold transition shadow-lg',
          themeClasses.buttonText,
        ]"
      >
        Close
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Opsional: Bikin scrollbar bawaan browser jadi lebih cakep/tipis saat di-scroll di dalam modal */
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
