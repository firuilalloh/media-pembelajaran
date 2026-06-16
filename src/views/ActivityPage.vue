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
    title: "Roda Keberuntungan",
    icon: "mdi:ferris-wheel",
    color: "bg-pink-400 border-pink-600 text-white hover:bg-pink-300",
    iconBg: "bg-pink-500",
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
    act2ResultMsg.value = "Oops! Pasangkan semua gambar dulu ya! 🧐";
    act2IsChecked.value = true;
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
    ? "Luar Biasa! Semua pasangan benar! 🌟"
    : "Wah, masih ada yang keliru. Yuk perbaiki! 🤔";
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
    act3ResultMsg.value = "Oops! Jawab semua pertanyaan dulu ya! 🧐";
    act3IsChecked.value = true;
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
    ? "Hebat! Semua jawabanmu tepat! 🌟"
    : "Masih ada yang salah, ayo coba lagi! 🤔";
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
  <div class="page-container min-h-screen p-4 md:p-6 flex flex-col font-sans">
    <div class="flex items-center justify-between mb-6 md:mb-8">
      <h1
        class="text-3xl md:text-5xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] uppercase tracking-wider"
      >
        {{
          activeActivity === 0
            ? "AKTIVITAS SERU"
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
        <div v-if="activeActivity === 1">
          <div
            class="bg-blue-100 border-2 border-blue-300 rounded-2xl p-4 mb-8 text-center shadow-sm"
          >
            <p
              class="text-blue-800 font-bold text-base md:text-xl flex items-center justify-center gap-2"
            >
              <Icon
                icon="mdi:lightbulb-on"
                class="text-blue-500 w-6 h-6 animate-pulse"
              />
              Bacalah deskripsi tradisi, lalu pilih nama tradisi yang tepat.
            </p>
          </div>

          <div
            class="bg-white p-6 rounded-2xl mb-8 border-4 border-slate-200 shadow-sm transform -rotate-1"
          >
            <p
              class="text-2xl md:text-3xl font-black text-slate-700 text-center leading-relaxed"
            >
              “Tradisi berkumpul bersama keluarga saat Hari Raya Idulfitri untuk
              saling memaafkan.”
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <button
              v-for="opt in act1Options"
              :key="opt"
              @click="act1Answer = opt"
              class="p-5 rounded-2xl font-black text-xl transition-all duration-200 border-2 border-b-[6px] active:border-b-2 active:translate-y-1"
              :class="
                act1Answer === opt
                  ? 'bg-sky-400 border-sky-600 text-white shadow-lg transform -translate-y-1'
                  : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-sky-500'
              "
            >
              <div class="flex items-center justify-center gap-2">
                {{ opt }}
                <Icon
                  v-if="act1Answer === opt && opt === 'Halalbihalal'"
                  icon="mdi:check-decagram"
                  class="text-yellow-300 w-8 h-8 animate-bounce"
                />
              </div>
            </button>
          </div>
        </div>

        <div v-else-if="activeActivity === 2">
          <div
            class="bg-emerald-100 border-2 border-emerald-300 rounded-2xl p-4 mb-8 text-center shadow-sm"
          >
            <p
              class="text-emerald-800 font-bold text-base md:text-xl flex items-center justify-center gap-2"
            >
              <Icon
                icon="mdi:gesture-tap"
                class="text-emerald-500 w-6 h-6 animate-pulse"
              />
              Klik gambar di bawah, lalu klik nama tradisi yang cocok di atas!
            </p>
          </div>

          <div class="flex flex-col gap-10 mb-8">
            <div
              class="w-full bg-slate-100 p-6 rounded-3xl border-4 border-slate-200 shadow-inner"
            >
              <h3
                class="text-center text-slate-500 mb-4 font-black uppercase tracking-widest text-sm"
              >
                👇 Pilih Nama Tradisi 👇
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  v-for="right in act2Right"
                  :key="right"
                  @click="matchAct2(right)"
                  class="w-full p-4 rounded-2xl border-4 border-dashed border-slate-400 bg-white text-slate-600 text-lg font-black hover:border-emerald-400 hover:text-emerald-500 transition-all shadow-sm active:scale-95"
                >
                  {{ right }}
                </button>
              </div>
            </div>

            <div class="w-full">
              <div
                class="flex flex-wrap items-center justify-center gap-4 md:gap-8"
              >
                <button
                  v-for="item in act2Left"
                  :key="item.id"
                  @click="act2SelectedLeft = item.id"
                  class="aspect-square w-[130px] sm:w-[160px] md:w-[180px] p-2 rounded-[2rem] border-4 transition-all relative overflow-hidden flex flex-col group focus:outline-none bg-white shadow-md"
                  :class="
                    act2SelectedLeft === item.id
                      ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.6)] transform scale-110 z-10'
                      : 'border-slate-300 hover:border-emerald-300'
                  "
                >
                  <img
                    :src="item.src"
                    :alt="item.name"
                    class="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    v-if="act2Matches[item.id]"
                    class="absolute inset-x-2 bottom-2 bg-emerald-500 border-2 border-white py-1 px-1 rounded-xl text-center shadow-lg animate-bounce"
                  >
                    <span
                      class="text-[10px] text-white block mb-0.5 uppercase tracking-wider font-bold"
                      >Pasangan:</span
                    >
                    <span
                      class="text-white font-black text-xs md:text-sm leading-tight block truncate"
                    >
                      {{ act2Matches[item.id] }}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div
            class="border-t-4 border-dashed border-slate-200 pt-8 flex flex-col items-center"
          >
            <div class="flex flex-wrap gap-4 justify-center">
              <button
                @click="resetAct2"
                class="bg-rose-400 hover:bg-rose-300 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-md text-base md:text-xl flex items-center gap-2 border-b-[6px] border-rose-600 active:border-b-0 active:translate-y-[6px]"
              >
                <Icon icon="mdi:refresh" class="w-6 h-6" /> Reset
              </button>
              <button
                @click="checkAct2"
                class="bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-md text-base md:text-xl flex items-center gap-2 border-b-[6px] border-emerald-700 active:border-b-0 active:translate-y-[6px]"
              >
                Cek Jawaban <Icon icon="mdi:check-decagram" class="w-6 h-6" />
              </button>
            </div>
            <p
              v-if="act2IsChecked"
              class="mt-6 text-lg md:text-xl font-bold px-6 py-3 rounded-xl border-2 animate-bounce text-center"
              :class="
                act2ResultMsg.includes('Luar Biasa')
                  ? 'bg-green-100 border-green-300 text-green-700'
                  : 'bg-red-100 border-red-300 text-red-600'
              "
            >
              {{ act2ResultMsg }}
            </p>
          </div>
        </div>

        <div v-else-if="activeActivity === 3">
          <div
            class="bg-orange-100 border-2 border-orange-300 rounded-2xl p-4 mb-8 text-center shadow-sm"
          >
            <p
              class="text-orange-800 font-bold text-base md:text-xl flex items-center justify-center gap-2"
            >
              <Icon
                icon="mdi:help-circle"
                class="text-orange-500 w-6 h-6 animate-pulse"
              />
              Tentukan apakah pernyataan di bawah ini BENAR atau SALAH!
            </p>
          </div>

          <div class="space-y-6 mb-8">
            <div
              v-for="(q, index) in act3Questions"
              :key="q.id"
              class="bg-white p-5 md:p-6 rounded-3xl border-4 border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
            >
              <p class="text-lg md:text-xl font-bold text-slate-700 flex-1">
                <span class="text-orange-500 font-black mr-2"
                  >{{ index + 1 }}.</span
                >
                {{ q.text }}
              </p>
              <div class="flex gap-3">
                <button
                  @click="
                    act3Answers[q.id] = true;
                    act3IsChecked = false;
                  "
                  class="px-6 py-3 rounded-2xl font-black transition-all border-2 border-b-[6px] active:border-b-2 active:translate-y-1"
                  :class="
                    act3Answers[q.id] === true
                      ? 'bg-green-500 border-green-700 text-white transform -translate-y-1'
                      : 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200'
                  "
                >
                  BENAR
                </button>
                <button
                  @click="
                    act3Answers[q.id] = false;
                    act3IsChecked = false;
                  "
                  class="px-6 py-3 rounded-2xl font-black transition-all border-2 border-b-[6px] active:border-b-2 active:translate-y-1"
                  :class="
                    act3Answers[q.id] === false
                      ? 'bg-red-500 border-red-700 text-white transform -translate-y-1'
                      : 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200'
                  "
                >
                  SALAH
                </button>
              </div>
            </div>
          </div>

          <div
            class="border-t-4 border-dashed border-slate-200 pt-8 flex flex-col items-center"
          >
            <div class="flex flex-wrap gap-4 justify-center">
              <button
                @click="resetAct3"
                class="bg-rose-400 hover:bg-rose-300 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-md text-base md:text-xl flex items-center gap-2 border-b-[6px] border-rose-600 active:border-b-0 active:translate-y-[6px]"
              >
                <Icon icon="mdi:refresh" class="w-6 h-6" /> Reset
              </button>
              <button
                @click="checkAct3"
                class="bg-orange-500 hover:bg-orange-400 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-md text-base md:text-xl flex items-center gap-2 border-b-[6px] border-orange-700 active:border-b-0 active:translate-y-[6px]"
              >
                Cek Jawaban <Icon icon="mdi:check-decagram" class="w-6 h-6" />
              </button>
            </div>
            <p
              v-if="act3IsChecked"
              class="mt-6 text-lg md:text-xl font-bold px-6 py-3 rounded-xl border-2 animate-bounce"
              :class="
                act3ResultMsg.includes('Hebat')
                  ? 'bg-green-100 border-green-300 text-green-700'
                  : 'bg-red-100 border-red-300 text-red-600'
              "
            >
              {{ act3ResultMsg }}
            </p>
          </div>
        </div>

        <div v-else-if="activeActivity === 4" class="text-center">
          <div
            class="bg-pink-100 border-2 border-pink-300 rounded-2xl p-4 mb-8 text-center shadow-sm max-w-lg mx-auto"
          >
            <p
              class="text-pink-800 font-bold text-base md:text-xl flex items-center justify-center gap-2"
            >
              <Icon
                icon="mdi:magic-staff"
                class="text-pink-500 w-6 h-6 animate-pulse"
              />
              Putar roda dan jawab pertanyaan yang muncul!
            </p>
          </div>

          <div class="relative inline-block mb-10">
            <Icon
              icon="mdi:ferris-wheel"
              class="w-40 h-40 md:w-48 md:h-48 mx-auto text-pink-500 transition-transform duration-[2000ms] ease-in-out drop-shadow-xl"
              :class="{ 'rotate-[1080deg] text-purple-500': act4IsSpinning }"
            />
            <div
              class="w-8 h-8 bg-slate-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-slate-400 z-10"
            ></div>
          </div>

          <br />
          <button
            @click="spinWheel"
            :disabled="act4IsSpinning"
            class="bg-pink-500 hover:bg-pink-400 text-white font-black py-4 px-12 rounded-full transition-all text-xl md:text-2xl mb-8 border-b-[8px] border-pink-700 active:border-b-0 active:translate-y-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            PUTAR RODA! 🎡
          </button>

          <div
            v-if="act4CurrentQuestion && !act4IsSpinning"
            class="bg-white p-8 rounded-[2rem] border-4 border-pink-300 max-w-2xl mx-auto animate-bounce shadow-xl relative"
          >
            <div
              class="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-6 py-1 rounded-full font-black uppercase text-sm border-2 border-white"
            >
              Pertanyaanmu
            </div>
            <p class="text-2xl md:text-3xl font-black text-slate-700 mt-2">
              {{ act4CurrentQuestion }}
            </p>
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
