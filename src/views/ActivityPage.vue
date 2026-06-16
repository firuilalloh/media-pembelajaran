<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

// IMPORT ASSET GAMBAR UNTUK AKTIVITAS 2
import imgKerjaBakti from "../assets/kerjabakti.jpg";
import imgKenduri from "../assets/kenduri.jpg";
import imgMudik from "../assets/mudik.jpg";

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
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 2,
    title: "Pasangkan Gambar",
    icon: "mdi:image-multiple",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    title: "Benar atau Salah",
    icon: "mdi:check",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    title: "Roda Keberuntungan",
    icon: "mdi:circle-slice-8",
    color: "from-purple-500 to-pink-500",
  },
];

// ================= LOGIC AKTIVITAS 1: TEBAK TRADISI =================
const act1Answer = ref(null);
const act1Options = [
  "Gotong Royong",
  "Halalbihalal",
  "Kerja Bakti",
  "Musyawarah",
];

// ================= LOGIC AKTIVITAS 2: PASANGKAN GAMBAR =================
const act2SelectedLeft = ref(null);
const act2Matches = ref({});
const act2IsChecked = ref(false);
const act2ResultMsg = ref("");

const act2Left = [
  { id: "img_kerja", src: imgKerjaBakti, name: "Gambar Kerja Bakti" },
  { id: "img_kenduri", src: imgKenduri, name: "Gambar Kenduri" },
  { id: "img_mudik", src: imgMudik, name: "Gambar Mudik" },
];

const act2Right = ["Kenduri", "Mudik", "Kerja Bakti"];

const act2CorrectAnswers = {
  img_kerja: "Kerja Bakti",
  img_kenduri: "Kenduri",
  img_mudik: "Mudik",
};

const matchAct2 = (rightItem) => {
  if (act2SelectedLeft.value) {
    act2Matches.value[act2SelectedLeft.value] = rightItem;
    act2SelectedLeft.value = null;
    act2IsChecked.value = false;
  }
};

const checkAct2 = () => {
  if (Object.keys(act2Matches.value).length < 3) {
    alert("Pasangkan semua gambar terlebih dahulu!");
    return;
  }

  let isAllCorrect = true;
  for (let key in act2CorrectAnswers) {
    if (act2Matches.value[key] !== act2CorrectAnswers[key]) {
      isAllCorrect = false;
    }
  }

  act2IsChecked.value = true;
  act2ResultMsg.value = isAllCorrect
    ? "Luar Biasa! Semua pasangan benar! ✅"
    : "Wah, masih ada yang keliru. Yuk perbaiki! ❌";
};

const resetAct2 = () => {
  act2Matches.value = {};
  act2SelectedLeft.value = null;
  act2IsChecked.value = false;
  act2ResultMsg.value = "";
};

// ================= LOGIC AKTIVITAS 3: BENAR / SALAH =================
const act3Answers = ref({});
const act3IsChecked = ref(false);
const act3ResultMsg = ref("");

const act3Questions = [
  { id: 1, text: "Kerja bakti dilakukan secara bersama-sama.", correct: true },
  {
    id: 2,
    text: "Tradisi keluarga hanya dilakukan di sekolah.",
    correct: false,
  },
  {
    id: 3,
    text: "Musyawarah digunakan untuk mencapai mufakat.",
    correct: true,
  },
];

const checkAct3 = () => {
  if (Object.keys(act3Answers.value).length < act3Questions.length) {
    alert("Jawab semua pertanyaan terlebih dahulu!");
    return;
  }

  let isAllCorrect = true;
  act3Questions.forEach((q) => {
    if (act3Answers.value[q.id] !== q.correct) {
      isAllCorrect = false;
    }
  });

  act3IsChecked.value = true;
  act3ResultMsg.value = isAllCorrect
    ? "Hebat! Semua jawabanmu tepat! ✅"
    : "Masih ada yang salah, ayo coba lagi! ❌";
};

const resetAct3 = () => {
  act3Answers.value = {};
  act3IsChecked.value = false;
  act3ResultMsg.value = "";
};

// ================= LOGIC AKTIVITAS 4: RODA KEBERUNTUNGAN =================
const act4CurrentQuestion = ref(null);
const act4IsSpinning = ref(false);
const act4Pool = [
  "Sebutkan 2 tradisi di keluargamu!",
  "Mengapa kita harus melestarikan tradisi?",
  "Apa manfaat gotong royong?",
];

const spinWheel = () => {
  act4IsSpinning.value = true;
  act4CurrentQuestion.value = null;
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * act4Pool.length);
    act4CurrentQuestion.value = act4Pool[randomIndex];
    act4IsSpinning.value = false;
  }, 1000);
};
</script>

<template>
  <div class="page-container min-h-screen text-white p-4 md:p-6 flex flex-col">
    <div class="flex items-center justify-between mb-8">
      <h1
        class="text-3xl md:text-4xl font-bold text-white drop-shadow-lg uppercase"
      >
        {{
          activeActivity === 0
            ? "AKTIVITAS"
            : activitiesMenu[activeActivity - 1].title
        }}
      </h1>
      <button
        @click="goBack"
        class="p-2 bg-gradient-to-r from-sky-400 to-teal-400 hover:from-sky-500 hover:to-teal-500 rounded-full transition flex items-center justify-center shadow-md focus:outline-none"
      >
        <Icon
          :icon="activeActivity === 0 ? 'mdi:home' : 'mdi:arrow-left-thick'"
          class="w-8 h-8 md:w-10 md:h-10 text-white"
        />
      </button>
    </div>

    <div class="flex-1 w-full max-w-6xl mx-auto pb-10">
      <div
        v-if="activeActivity === 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <button
          v-for="item in activitiesMenu"
          :key="item.id"
          @click="activeActivity = item.id"
          class="group relative overflow-hidden bg-slate-800/90 p-6 rounded-3xl shadow-xl border-2 border-slate-700 hover:border-sky-400 transition-all text-left"
        >
          <div
            class="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center shadow-lg bg-gradient-to-br"
            :class="item.color"
          >
            <Icon :icon="item.icon" class="w-10 h-10 text-white" />
          </div>
          <h2 class="text-2xl font-bold mb-2 text-white">{{ item.title }}</h2>
          <p class="text-slate-400 text-sm md:text-base">
            Klik untuk mulai bermain!
          </p>
        </button>
      </div>

      <div
        v-else
        class="bg-slate-800/95 p-6 md:p-10 rounded-3xl shadow-2xl border-2 border-slate-700"
      >
        <div v-if="activeActivity === 1">
          <p class="text-sky-300 font-bold mb-4">
            📌 Petunjuk: Bacalah deskripsi tradisi, lalu pilih nama tradisi yang
            tepat.
          </p>
          <div
            class="bg-slate-700/50 p-6 rounded-xl mb-6 border border-slate-600"
          >
            <p class="text-xl leading-relaxed">
              “Tradisi berkumpul bersama keluarga saat Hari Raya Idulfitri untuk
              saling memaafkan.”
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              v-for="opt in act1Options"
              :key="opt"
              @click="act1Answer = opt"
              class="p-4 rounded-xl border-2 font-bold text-lg transition-all"
              :class="
                act1Answer === opt
                  ? 'bg-sky-500 border-sky-400 text-white'
                  : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700'
              "
            >
              {{ opt }}
              <Icon
                v-if="act1Answer === opt && opt === 'Halalbihalal'"
                icon="mdi:check-circle"
                class="inline-block ml-2 text-green-300 w-6 h-6"
              />
            </button>
          </div>
        </div>

        <div v-else-if="activeActivity === 2">
          <p class="text-teal-300 font-bold mb-8 text-center md:text-left">
            📌 Petunjuk: Klik gambar di bawah, lalu klik nama tradisi yang cocok
            di atas.
          </p>

          <div class="flex flex-col gap-10 mb-8">
            <div
              class="w-full bg-slate-900/40 p-4 rounded-2xl border border-slate-600/50"
            >
              <h3
                class="text-center text-slate-400 mb-4 font-bold uppercase tracking-wider text-sm"
              >
                Pilih Nama Tradisi
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <button
                  v-for="right in act2Right"
                  :key="right"
                  @click="matchAct2(right)"
                  class="w-full p-4 md:p-5 rounded-xl border-2 border-dashed border-slate-400 bg-slate-800 text-slate-200 text-base md:text-lg font-bold hover:border-teal-400 hover:bg-slate-700 hover:text-teal-300 transition-all shadow-md active:scale-95"
                >
                  {{ right }}
                </button>
              </div>
            </div>

            <div class="w-full">
              <h3
                class="text-center text-slate-400 mb-4 font-bold uppercase tracking-wider text-sm"
              >
                Gambar Tradisi
              </h3>
              <div
                class="flex flex-wrap items-center justify-center gap-4 md:gap-6"
              >
                <button
                  v-for="item in act2Left"
                  :key="item.id"
                  @click="act2SelectedLeft = item.id"
                  class="aspect-square w-[140px] sm:w-[160px] md:w-[180px] p-2 rounded-2xl border-4 transition-all relative overflow-hidden flex flex-col group focus:outline-none"
                  :class="
                    act2SelectedLeft === item.id
                      ? 'border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.6)] transform scale-110 z-10'
                      : 'border-slate-500 bg-slate-700 hover:border-slate-300'
                  "
                >
                  <img
                    :src="item.src"
                    :alt="item.name"
                    class="w-full h-full object-cover rounded-xl"
                  />

                  <div
                    v-if="act2Matches[item.id]"
                    class="absolute inset-x-2 bottom-2 bg-slate-900/95 py-1 px-1 rounded-lg border border-slate-600 text-center shadow-lg backdrop-blur-sm animate-fade-in"
                  >
                    <span
                      class="text-[10px] text-slate-300 block mb-0.5 uppercase tracking-wider"
                      >Pasangan:</span
                    >
                    <span
                      class="text-teal-400 font-bold text-xs md:text-sm leading-tight block truncate"
                    >
                      {{ act2Matches[item.id] }}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div
            class="border-t border-slate-600 pt-8 flex flex-col items-center"
          >
            <div class="flex flex-wrap gap-4 justify-center">
              <button
                @click="resetAct2"
                class="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md text-base md:text-lg flex items-center gap-2"
              >
                <Icon icon="mdi:refresh" class="w-5 h-5 md:w-6 md:h-6" />
                Reset
              </button>
              <button
                @click="checkAct2"
                class="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg text-base md:text-lg flex items-center gap-2"
              >
                Cek Jawaban
                <Icon
                  icon="mdi:check-circle-outline"
                  class="w-5 h-5 md:w-6 md:h-6"
                />
              </button>
            </div>
            <p
              v-if="act2IsChecked"
              class="mt-6 text-lg md:text-xl font-bold animate-pulse text-center"
              :class="
                act2ResultMsg.includes('Luar Biasa')
                  ? 'text-green-400'
                  : 'text-red-400'
              "
            >
              {{ act2ResultMsg }}
            </p>
          </div>
        </div>

        <div v-else-if="activeActivity === 3">
          <p class="text-orange-300 font-bold mb-6">
            📌 Petunjuk: Tentukan apakah pernyataan berikut benar atau salah.
          </p>
          <div class="space-y-6 mb-8">
            <div
              v-for="(q, index) in act3Questions"
              :key="q.id"
              class="bg-slate-700/50 p-4 rounded-xl border border-slate-600 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <p class="text-lg flex-1">{{ index + 1 }}. {{ q.text }}</p>
              <div class="flex gap-2">
                <button
                  @click="
                    act3Answers[q.id] = true;
                    act3IsChecked = false;
                  "
                  class="px-6 py-2 rounded-lg font-bold border-2 transition-all"
                  :class="
                    act3Answers[q.id] === true
                      ? 'bg-green-500 border-green-400'
                      : 'bg-slate-800 border-slate-600 text-slate-400'
                  "
                >
                  Benar
                </button>
                <button
                  @click="
                    act3Answers[q.id] = false;
                    act3IsChecked = false;
                  "
                  class="px-6 py-2 rounded-lg font-bold border-2 transition-all"
                  :class="
                    act3Answers[q.id] === false
                      ? 'bg-red-500 border-red-400'
                      : 'bg-slate-800 border-slate-600 text-slate-400'
                  "
                >
                  Salah
                </button>
              </div>
            </div>
          </div>

          <div
            class="border-t border-slate-600 pt-6 flex flex-col items-center"
          >
            <div class="flex flex-wrap gap-4 justify-center">
              <button
                @click="resetAct3"
                class="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md text-lg flex items-center gap-2"
              >
                <Icon icon="mdi:refresh" class="w-6 h-6" />
                Reset
              </button>
              <button
                @click="checkAct3"
                class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg text-lg flex items-center gap-2"
              >
                Cek Jawaban
                <Icon icon="mdi:check-circle-outline" class="w-6 h-6" />
              </button>
            </div>
            <p
              v-if="act3IsChecked"
              class="mt-6 text-xl font-bold animate-pulse"
              :class="
                act3ResultMsg.includes('Hebat')
                  ? 'text-green-400'
                  : 'text-red-400'
              "
            >
              {{ act3ResultMsg }}
            </p>
          </div>
        </div>

        <div v-else-if="activeActivity === 4" class="text-center">
          <p class="text-pink-300 font-bold mb-8">
            📌 Petunjuk: Putar roda dan jawab pertanyaan yang muncul.
          </p>

          <Icon
            icon="mdi:circle-slice-8"
            class="w-32 h-32 mx-auto text-pink-400 mb-8 transition-transform duration-1000"
            :class="{ 'animate-spin': act4IsSpinning }"
          />

          <button
            @click="spinWheel"
            :disabled="act4IsSpinning"
            class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-3 px-8 rounded-full shadow-lg text-xl mb-8 disabled:opacity-50"
          >
            Putar Roda!
          </button>

          <div
            v-if="act4CurrentQuestion && !act4IsSpinning"
            class="bg-pink-900/40 p-6 rounded-xl border border-pink-500/50 max-w-2xl mx-auto animate-bounce"
          >
            <h3 class="text-2xl font-bold text-pink-200">Pertanyaanmu:</h3>
            <p class="text-xl mt-2">{{ act4CurrentQuestion }}</p>
          </div>
        </div>
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
