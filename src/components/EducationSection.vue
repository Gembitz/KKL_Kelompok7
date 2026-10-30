<script setup>
import { ref } from 'vue'
import { ArrowLeft, GraduationCap } from 'lucide-vue-next'
import { studyTourData } from '../data/studyTourData'

const destinations = studyTourData.educationalDestinations
const selectedDest = ref(null)

const openDetail = (item) => {
  selectedDest.value = item
  document.body.style.overflow = 'hidden'
}

const closeDetail = () => {
  selectedDest.value = null
  document.body.style.overflow = ''
}
</script>

<template>
  <section
    id="edukasi"
    class="relative w-full py-24 text-slate-100 selection:bg-amber-400 selection:text-slate-950 overflow-hidden"
  >
    <!-- Ambient Glow Lembut & Terang -->
    <div class="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-cyan-500/15 blur-[150px] rounded-full pointer-events-none -z-0"></div>
    <div class="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-amber-500/15 blur-[150px] rounded-full pointer-events-none -z-0"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      
      <!-- Section Header seragam persis gaya konsisten: Line — DESTINASI EDUKASI — Line -->
      <div class="reveal-fade-up flex items-center justify-center gap-4 sm:gap-8 mb-16">
        <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/30"></div>
        <div class="flex items-center gap-3">
          <GraduationCap class="w-6 h-6 text-amber-400" />
          <h2 class="text-2xl sm:text-4xl font-extrabold uppercase tracking-[0.25em] text-white/95">
            DESTINASI EDUKASI
          </h2>
        </div>
        <div class="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/30"></div>
      </div>

      <!-- Grid 4 Kotak Edukasi Simple -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(item, index) in destinations"
          :key="item.id"
          @click="openDetail(item)"
          class="reveal-fade-up group relative h-80 sm:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-white/10 hover:border-amber-400/80 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20"
          :class="`delay-${(index + 1) * 100}`"
        >
          <!-- Foto Destinasi -->
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover filter brightness-[0.9] group-hover:brightness-105 group-hover:scale-110 transition-all duration-700 ease-out"
          />

          <!-- Gradient Scrim di Bawah Kartu agar Teks Kontras -->
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent"></div>

          <!-- Nama Destinasi di Bagian Bawah Kartu -->
          <div class="absolute bottom-0 inset-x-0 p-5 text-center space-y-1">
            <h3 class="text-base sm:text-lg font-black uppercase tracking-wider text-white group-hover:text-amber-300 transition-colors leading-snug">
              {{ item.title }}
            </h3>
            <p class="text-xs text-slate-300 font-light truncate">
              {{ item.tagline }}
            </p>
          </div>
        </div>
      </div>

      <!-- Indikator Garis Slider Bawah ala Referensi -->
      <div class="flex items-center justify-center gap-3 mt-12">
        <span class="w-16 h-[2px] bg-amber-400 rounded-full"></span>
        <span class="w-16 h-[2px] bg-white/20 rounded-full"></span>
      </div>

    </div>

    <!-- Modal Popup Detail: Gambar Membentang Penuh 100% dengan Gradasi Putih Halus Tanpa Garis Pembatas -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selectedDest"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950/85 backdrop-blur-md"
        @click.self="closeDetail"
      >
        <!-- Kontainer Modal: Gambar 100% Full Width Membentang dari Ujung ke Ujung -->
        <div
          class="relative w-full max-w-4xl min-h-[440px] sm:min-h-[500px] rounded-3xl overflow-hidden shadow-2xl text-slate-900 flex items-center max-h-[90vh] animate-in fade-in zoom-in-95 duration-300 bg-white"
        >
          <!-- Tombol Panah Kembali di Pojok Kiri Atas Gambar -->
          <button
            type="button"
            @click="closeDetail"
            aria-label="Kembali"
            class="absolute top-5 left-5 z-30 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white hover:text-amber-300 flex items-center justify-center border border-white/30 backdrop-blur-md shadow-lg transition-transform active:scale-95"
          >
            <ArrowLeft class="w-5 h-5" />
          </button>

          <!-- Layer Gambar: Full 100% Membentang di Seluruh Wadah (Mencegah Garis Pembatas Terpotong) -->
          <div class="absolute inset-0 z-0">
            <img
              :src="selectedDest.image"
              :alt="selectedDest.title"
              class="w-full h-full object-cover filter brightness-[0.98]"
            />
            
            <!-- Gradasi Putih Sangat Halus dan Mulus: Tidak Ada Garis Putus-Putus / Hard Edge -->
            <!-- Berawal transparan di kiri, perlahan memudar lembut ke putih solid di 55% hingga ujung kanan -->
            <div
              class="absolute inset-0 hidden md:block"
              style="background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 15%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0.98) 55%, #ffffff 65%, #ffffff 100%);"
            ></div>
            
            <!-- Gradasi Lembut untuk Tampilan Mobile (Atas ke Bawah) -->
            <div
              class="absolute inset-0 md:hidden"
              style="background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.95) 50%, #ffffff 65%, #ffffff 100%);"
            ></div>
          </div>

          <!-- Konten Teks Menyatu di Sebelah Kanan (Berada di Atas Lapisan Gradasi Putih Halus) -->
          <div class="relative z-10 w-full flex justify-end p-6 sm:p-10 lg:p-12 overflow-y-auto max-h-[85vh]">
            <div class="w-full md:w-1/2 lg:w-3/5 space-y-4 text-left pl-0 md:pl-6">
              <!-- Judul Destinasi & Tagline -->
              <div class="space-y-1">
                <span class="text-xs uppercase font-extrabold tracking-widest text-amber-600 block">
                  {{ selectedDest.tagline }}
                </span>
                <h3 class="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-slate-950 leading-tight">
                  {{ selectedDest.title }}
                </h3>
              </div>

              <!-- Isi Deskripsi / Materi yang Disampaikan -->
              <p class="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                {{ selectedDest.content }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </transition>
  </section>
</template>
