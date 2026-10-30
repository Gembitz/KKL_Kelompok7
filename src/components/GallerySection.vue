<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Image,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin
} from 'lucide-vue-next'
import { studyTourData } from '../data/studyTourData'

const photos = studyTourData.galleryPhotos
const activeModalIndex = ref(null)

const openLightbox = (index) => {
  activeModalIndex.value = index
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  activeModalIndex.value = null
  document.body.style.overflow = ''
}

const nextPhoto = () => {
  if (activeModalIndex.value !== null) {
    activeModalIndex.value = (activeModalIndex.value + 1) % photos.length
  }
}

const prevPhoto = () => {
  if (activeModalIndex.value !== null) {
    activeModalIndex.value =
      (activeModalIndex.value - 1 + photos.length) % photos.length
  }
}

const handleKeydown = (e) => {
  if (activeModalIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextPhoto()
  if (e.key === 'ArrowLeft') prevPhoto()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <section
    id="galeri"
    class="relative w-full py-24 text-slate-100 selection:bg-amber-400 selection:text-slate-950 overflow-hidden"
  >
    <!-- Background Ambient Glow -->
    <div class="absolute -top-36 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 blur-[150px] rounded-full pointer-events-none -z-0"></div>
    <div class="absolute -bottom-36 left-1/4 w-[500px] h-[500px] bg-amber-500/15 blur-[150px] rounded-full pointer-events-none -z-0"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      
      <!-- Section Header persis gaya konsisten: Line — DOKUMENTASI GALERI — Line -->
      <div class="reveal-fade-up flex items-center justify-center gap-4 sm:gap-8 mb-16">
        <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/30"></div>
        <div class="flex items-center gap-3">
          <Image class="w-6 h-6 text-amber-400" />
          <h2 class="text-2xl sm:text-4xl font-extrabold uppercase tracking-[0.25em] text-white/95">
            DOKUMENTASI GALERI
          </h2>
        </div>
        <div class="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/30"></div>
      </div>

      <!-- Deskripsi Pengantar Singkat -->
      <div class="reveal-fade-up delay-100 max-w-2xl mx-auto text-center mb-14 space-y-2">
        <p class="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
          Sorotan potret visual lanskap alam, momen kebersamaan, dan arsip observasi lapangan selama rangkaian KKL.
        </p>
      </div>

      <!-- Grid Layout Asimetris (Persis Mengikuti Referensi 7 Foto yang Dikirimkan) -->
      <!-- Menggunakan CSS Grid 12 Kolom dengan Penempatan Spasial yang Presisi -->
      <div class="reveal-zoom-in delay-200 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 auto-rows-[140px] sm:auto-rows-[160px] lg:auto-rows-[180px]">
        
        <!-- Foto 1: Kolom Kiri Vertikal Tinggi (Foto 1 di referensi) -->
        <div
          @click="openLightbox(0)"
          class="group relative md:col-span-3 md:row-span-2 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-400/80 transition-all duration-500 shadow-xl"
        >
          <img
            :src="photos[0].image"
            :alt="photos[0].title"
            class="w-full h-full object-cover filter brightness-[0.9] group-hover:brightness-105 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <!-- Hover Overlay & Zoom Button -->
          <div class="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div class="self-end w-9 h-9 rounded-full bg-slate-950/70 border border-white/20 flex items-center justify-center text-amber-300">
              <ZoomIn class="w-4 h-4" />
            </div>
            <div class="text-left">
              <span class="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">{{ photos[0].location }}</span>
              <h4 class="text-xs sm:text-sm font-bold text-white uppercase">{{ photos[0].title }}</h4>
            </div>
          </div>
        </div>

        <!-- Foto 2: Atas Tengah (Landscape Gunung) -->
        <div
          @click="openLightbox(1)"
          class="group relative md:col-span-4 md:row-span-1 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-400/80 transition-all duration-500 shadow-xl"
        >
          <img
            :src="photos[1].image"
            :alt="photos[1].title"
            class="w-full h-full object-cover filter brightness-[0.9] group-hover:brightness-105 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div class="self-end w-8 h-8 rounded-full bg-slate-950/70 border border-white/20 flex items-center justify-center text-amber-300">
              <ZoomIn class="w-4 h-4" />
            </div>
            <div class="text-left">
              <span class="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">{{ photos[1].location }}</span>
              <h4 class="text-xs sm:text-sm font-bold text-white uppercase">{{ photos[1].title }}</h4>
            </div>
          </div>
        </div>

        <!-- Foto 5 (Di Kanan Atas): Tebing Batu Besar Lebar (Foto 3 di referensi) -->
        <div
          @click="openLightbox(4)"
          class="group relative md:col-span-5 md:row-span-1 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-400/80 transition-all duration-500 shadow-xl"
        >
          <img
            :src="photos[4].image"
            :alt="photos[4].title"
            class="w-full h-full object-cover filter brightness-[0.9] group-hover:brightness-105 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div class="self-end w-8 h-8 rounded-full bg-slate-950/70 border border-white/20 flex items-center justify-center text-amber-300">
              <ZoomIn class="w-4 h-4" />
            </div>
            <div class="text-left">
              <span class="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">{{ photos[4].location }}</span>
              <h4 class="text-xs sm:text-sm font-bold text-white uppercase">{{ photos[4].title }}</h4>
            </div>
          </div>
        </div>

        <!-- Foto 3: Tengah Bawah (Lautan & Tebing Karang) -->
        <div
          @click="openLightbox(2)"
          class="group relative md:col-span-4 md:row-span-1 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-400/80 transition-all duration-500 shadow-xl"
        >
          <img
            :src="photos[2].image"
            :alt="photos[2].title"
            class="w-full h-full object-cover filter brightness-[0.9] group-hover:brightness-105 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div class="self-end w-8 h-8 rounded-full bg-slate-950/70 border border-white/20 flex items-center justify-center text-amber-300">
              <ZoomIn class="w-4 h-4" />
            </div>
            <div class="text-left">
              <span class="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">{{ photos[2].location }}</span>
              <h4 class="text-xs sm:text-sm font-bold text-white uppercase">{{ photos[2].title }}</h4>
            </div>
          </div>
        </div>

        <!-- Foto 6: Kanan Bawah Kiri (Pantai & Bebatuan Susun Vertikal) -->
        <div
          @click="openLightbox(5)"
          class="group relative md:col-span-3 md:row-span-2 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-400/80 transition-all duration-500 shadow-xl"
        >
          <img
            :src="photos[5].image"
            :alt="photos[5].title"
            class="w-full h-full object-cover filter brightness-[0.9] group-hover:brightness-105 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div class="self-end w-9 h-9 rounded-full bg-slate-950/70 border border-white/20 flex items-center justify-center text-amber-300">
              <ZoomIn class="w-4 h-4" />
            </div>
            <div class="text-left">
              <span class="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">{{ photos[5].location }}</span>
              <h4 class="text-xs sm:text-sm font-bold text-white uppercase">{{ photos[5].title }}</h4>
            </div>
          </div>
        </div>

        <!-- Foto 7: Paling Kanan Bawah (Pohon Pinus Kabut) -->
        <div
          @click="openLightbox(6)"
          class="group relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-400/80 transition-all duration-500 shadow-xl"
        >
          <img
            :src="photos[6].image"
            :alt="photos[6].title"
            class="w-full h-full object-cover filter brightness-[0.9] group-hover:brightness-105 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div class="self-end w-8 h-8 rounded-full bg-slate-950/70 border border-white/20 flex items-center justify-center text-amber-300">
              <ZoomIn class="w-4 h-4" />
            </div>
            <div class="text-left">
              <span class="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">{{ photos[6].location }}</span>
              <h4 class="text-xs font-bold text-white uppercase">{{ photos[6].title }}</h4>
            </div>
          </div>
        </div>

        <!-- Foto 4: Kiri Bawah Melebar Luas (Panoramic Landscape Bawah) -->
        <div
          @click="openLightbox(3)"
          class="group relative md:col-span-7 md:row-span-1 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-400/80 transition-all duration-500 shadow-xl"
        >
          <img
            :src="photos[3].image"
            :alt="photos[3].title"
            class="w-full h-full object-cover filter brightness-[0.9] group-hover:brightness-105 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div class="self-end w-8 h-8 rounded-full bg-slate-950/70 border border-white/20 flex items-center justify-center text-amber-300">
              <ZoomIn class="w-4 h-4" />
            </div>
            <div class="text-left">
              <span class="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">{{ photos[3].location }}</span>
              <h4 class="text-xs sm:text-sm font-bold text-white uppercase">{{ photos[3].title }}</h4>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Lightbox Zoom Modal (Melihat Detail Foto yang Diperbesar Jelas) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="activeModalIndex !== null"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-slate-950/90 backdrop-blur-xl"
        @click.self="closeLightbox"
      >
        <!-- Tombol Tutup di Pojok Kanan Atas -->
        <button
          type="button"
          @click="closeLightbox"
          aria-label="Tutup Foto"
          class="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white hover:text-amber-300 flex items-center justify-center border border-white/20 transition-all active:scale-95"
        >
          <X class="w-6 h-6" />
        </button>

        <!-- Tombol Navigasi Prev -->
        <button
          type="button"
          @click="prevPhoto"
          aria-label="Foto Sebelumnya"
          class="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white hover:text-amber-300 flex items-center justify-center border border-white/20 transition-all active:scale-95"
        >
          <ChevronLeft class="w-6 h-6" />
        </button>

        <!-- Tombol Navigasi Next -->
        <button
          type="button"
          @click="nextPhoto"
          aria-label="Foto Berikutnya"
          class="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white hover:text-amber-300 flex items-center justify-center border border-white/20 transition-all active:scale-95"
        >
          <ChevronRight class="w-6 h-6" />
        </button>

        <!-- Frame Gambar yang Diperbesar Jelas -->
        <div class="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center">
          <div class="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black flex items-center justify-center max-h-[75vh]">
            <img
              :src="photos[activeModalIndex].image"
              :alt="photos[activeModalIndex].title"
              class="max-w-full max-h-[75vh] object-contain filter brightness-[0.98]"
            />
          </div>

          <!-- Keterangan Foto di Bawah Gambar -->
          <div class="mt-4 text-center space-y-1">
            <div class="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-bold">
              <MapPin class="w-3.5 h-3.5" />
              <span>{{ photos[activeModalIndex].location }}</span>
              <span>•</span>
              <span class="font-mono text-white/70">{{ activeModalIndex + 1 }} / {{ photos.length }}</span>
            </div>
            <h3 class="text-lg sm:text-xl font-bold uppercase text-white">
              {{ photos[activeModalIndex].title }}
            </h3>
          </div>
        </div>

      </div>
    </transition>
  </section>
</template>
