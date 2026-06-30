import imgHalal from "../assets/halalbihalal.jpg";
import imgKerjaBakti from "../assets/kerjabakti.jpg";
import imgMudik from "../assets/mudik.jpg";
import imgRonda from "../assets/ronda.jpg";
import imgMusyawarah from "../assets/musyawarah.jpeg";
import imgTahlilan from "../assets/tahlilan.jpg";
import imgNyekar from "../assets/nyekar.jpg";
import imgThr from "../assets/thr.jpg";
import imgHantaran from "../assets/hantaran.jpg";
import imgKupatan from "../assets/kupatan.jpeg";

export const act1Questions = [
  {
    id: 1,
    text: "Tradisi berkumpul bersama keluarga saat Hari Raya Idulfitri untuk saling memaafkan?",
    options: ["Halalbihalal", "Kerja Bakti", "Kenduri", "Mudik"],
    answer: "Halalbihalal",
  },
  {
    id: 2,
    text: "Kegiatan membersihkan lingkungan tempat tinggal secara bersama-sama?",
    options: ["Musyawarah", "Gotong Royong", "Kerja Bakti", "Antaran"],
    answer: "Kerja Bakti",
  },
  {
    id: 3,
    text: "Tradisi berdiskusi bersama untuk mencapai kesepakatan atau mufakat?",
    options: ["Halalbihalal", "Kerja Bakti", "Musyawarah", "Mudik"],
    answer: "Musyawarah",
  },
  {
    id: 4,
    text: "Tradisi pulang ke kampung halaman saat libur panjang atau hari raya?",
    options: ["Mudik", "Nyekar", "Kenduri", "Antaran"],
    answer: "Mudik",
  },
  {
    id: 5,
    text: "Tradisi syukuran makan bersama sebagai bentuk rasa syukur atas keberhasilan atau keselamatan?",
    options: ["Halalbihalal", "Kenduri", "Gotong Royong", "Nyekar"],
    answer: "Kenduri",
  },
  {
    id: 6,
    text: "Tradisi bekerja menolong orang lain dengan sukarela tanpa mengharap imbalan?",
    options: ["THR", "Antaran", "Gotong Royong", "Musyawarah"],
    answer: "Gotong Royong",
  },
  {
    id: 7,
    text: "Tradisi berkunjung ke makam keluarga atau leluhur sebelum hari raya?",
    options: ["Nyekar", "Mudik", "Kenduri", "Halalbihalal"],
    answer: "Nyekar",
  },
  {
    id: 8,
    text: "Tradisi memberikan bingkisan makanan kepada tetangga atau saudara sebagai tanda kasih sayang?",
    options: ["Gotong Royong", "Antaran", "Musyawarah", "THR"],
    answer: "Antaran",
  },
  {
    id: 9,
    text: "Tradisi memberikan uang kepada anak-anak saat merayakan hari besar keagamaan?",
    options: ["Nyekar", "Antaran", "THR", "Kenduri"],
    answer: "THR",
  },
  {
    id: 10,
    text: "Tradisi berbalas pantun dan adu silat saat prosesi pernikahan adat?",
    options: ["Palang Pintu", "Musyawarah", "Gotong Royong", "Halalbihalal"],
    answer: "Palang Pintu",
  },
];

export const act2Data = [
  { id: 1, src: imgHalal, name: "Halalbihalal" },
  { id: 2, src: imgKerjaBakti, name: "Kerja Bakti" },
  { id: 3, src: imgMusyawarah, name: "Musyawarah" },
  { id: 4, src: imgMudik, name: "Mudik" },
  { id: 5, src: imgRonda, name: "Ronda" },
  { id: 6, src: imgTahlilan, name: "Tahlilan" },
  { id: 7, src: imgNyekar, name: "Nyekar" },
  { id: 8, src: imgHantaran, name: "Hantaran" },
  { id: 9, src: imgThr, name: "THR" },
  { id: 10, src: imgKupatan, name: "Kupatan" },
];

export const act3Questions = [
  {
    id: 1,
    text: "Kerja bakti dilakukan secara bersama-sama untuk kebersihan lingkungan.",
    correct: true,
  },
  {
    id: 2,
    text: "Tradisi keluarga hanya boleh dilakukan di sekolah saja.",
    correct: false,
  },
  {
    id: 3,
    text: "Musyawarah adalah cara yang baik untuk mencapai kesepakatan bersama.",
    correct: true,
  },
  {
    id: 4,
    text: "Membantu tetangga yang sedang kesulitan adalah contoh gotong royong.",
    correct: true,
  },
  {
    id: 5,
    text: "Kita boleh membuang sampah sembarangan di lingkungan rumah.",
    correct: false,
  },
  {
    id: 6,
    text: "Tradisi mudik biasanya dilakukan saat hari raya besar keagamaan.",
    correct: true,
  },
  {
    id: 7,
    text: "Menghormati perbedaan budaya di Indonesia itu tidak penting.",
    correct: false,
  },
  {
    id: 8,
    text: "Gotong royong membuat pekerjaan berat menjadi terasa lebih ringan.",
    correct: true,
  },
  {
    id: 9,
    text: "Kita hanya perlu menolong teman yang kita kenal saja.",
    correct: false,
  },
  {
    id: 10,
    text: "Melestarikan tradisi adalah tugas generasi muda juga.",
    correct: true,
  },
];

export const act4Questions = [
  "Sebutkan 2 tradisi di keluargamu!",
  "Mengapa kita harus melestarikan tradisi?",
  "Apa manfaat gotong royong bagi warga?",
  "Apa yang kamu lakukan saat lebaran?",
  "Sebutkan satu contoh kerja bakti!",
  "Mengapa musyawarah itu penting?",
  "Apa arti tradisi menurut pendapatmu?",
  "Sebutkan satu tradisi di daerahmu!",
  "Bagaimana cara menghargai perbedaan?",
  "Apa manfaat saling memaafkan saat Idulfitri?",
];
