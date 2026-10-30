<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { studyTourData } from '../data/studyTourData'

const destinations = studyTourData.destinations
const activeIndex = ref(0)
const expandingCard = ref(null)
let timer = null
let isAnimating = false

const activeDestination = computed(() => {
  return destinations[activeIndex.value]
})

const changeDestination = (newIndex) => {
  if (newIndex === activeIndex.value || isAnimating) return
  isAnimating = true

  const targetDest = destinations[newIndex]
  expandingCard.value = {
    image: targetDest.image,
    title: targetDest.title
  }

  activeIndex.value = newIndex
  resetAutoPlay()

  setTimeout(() => {
    expandingCard.value = null
    isAnimating = false
  }, 1000)
}

const nextDestination = () => {
  const nextIdx = (activeIndex.value + 1) % destinations.length
  changeDestination(nextIdx)
}

const prevDestination = () => {
  const prevIdx = (activeIndex.value - 1 + destinations.length) % destinations.length
  changeDestination(prevIdx)
}

const startAutoPlay = () => {
  stopAutoPlay()
  timer = setInterval(() => {
    nextDestination()
  }, 5000)
}

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const resetAutoPlay = () => {
  startAutoPlay()
}

/**
 * Menghitung offset kartu:
 * 0 = Kartu paling kiri (Kartu Aktif)
 * 1, 2, 3 = Kartu antrean berikutnya di sebelah kanan
 */
const getCardOffset = (index) => {
  const total = destinations.length
  return (index - activeIndex.value + total) % total
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <section
    id="ringkasan"
    class="relative w-full min-h-screen flex items-center overflow-hidden bg-[#182030] text-slate-100 select-none pt-24 pb-12"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <!-- Background Image Cerah dengan Transisi Halus -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <transition-group
        enter-active-class="transition-opacity duration-1000 ease-in-out"
        leave-active-class="transition-opacity duration-1000 ease-in-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <img
          :key="activeDestination.id"
          :src="activeDestination.image"
          :alt="activeDestination.title"
          class="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.05] will-change-[opacity]"
        />
      </transition-group>

      <!-- Efek Pop Up / Keluar dari Frame Menggantikan Background Foto Sebelumnya -->
      <transition
        enter-active-class="transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
        leave-active-class="transition-opacity duration-500 ease-out"
        enter-from-class="opacity-40 scale-75 translate-x-20"
        enter-to-class="opacity-100 scale-100 translate-x-0"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="expandingCard"
          :key="expandingCard.image"
          class="absolute inset-0 z-10 will-change-[transform,opacity]"
        >
          <img
            :src="expandingCard.image"
            :alt="expandingCard.title"
            class="w-full h-full object-cover filter brightness-[0.98] contrast-[1.05]"
          />
        </div>
      </transition>

      <!-- Scrim Halus Elegan agar Teks Kiri Terbaca Jelas Tanpa Membuat Layar Gelap Pekat -->
      <div class="absolute inset-0 z-20 bg-gradient-to-r from-slate-900/65 via-slate-900/20 to-transparent"></div>
      <div class="absolute inset-0 z-20 bg-gradient-to-t from-[#182030]/60 via-transparent to-black/20"></div>
    </div>

    <!-- Container Utama -->
    <div class="relative z-30 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <!-- Sisi Kiri: Judul + Deskripsi Tempat Wisata -->
        <div class="lg:col-span-5 flex flex-col items-start text-left space-y-4">
          <transition
            mode="out-in"
            enter-active-class="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            enter-from-class="opacity-0 -translate-y-3"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-400 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-3"
          >
            <div :key="activeDestination.id" class="space-y-3">
              <!-- Badge bernuansa budaya Bali -->
              <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-widest uppercase">
                <span>🌺 Om Swastiastu</span>
                <span class="text-white/40">•</span>
                <span>KKL Bali 2026</span>
              </div>

              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-md">
                {{ activeDestination.title }}
              </h1>

              <p class="text-sm sm:text-base text-slate-100 font-normal leading-relaxed max-w-md drop-shadow">
                {{ activeDestination.description }}
              </p>
            </div>
          </transition>
        </div>

        <!-- Sisi Kanan: Slideshow Bergerak Halus ke Kiri -->
        <div class="lg:col-span-7 relative h-64 sm:h-72 w-full flex items-center justify-end overflow-visible">
          <div class="relative h-full w-[460px] max-w-full flex items-center overflow-visible">
            
            <div
              v-for="(dest, index) in destinations"
              :key="dest.id"
              @click="changeDestination(index)"
              class="absolute top-1/2 left-0 rounded-xl overflow-hidden cursor-pointer shadow-xl will-change-transform transform-gpu transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
              :class="[
                getCardOffset(index) === 0
                  ? 'z-30 ring-2 ring-white scale-100 shadow-2xl shadow-cyan-500/20 opacity-100'
                  : 'z-10 ring-1 ring-white/30 scale-95 opacity-70 hover:opacity-100'
              ]"
              :style="{
                width: '135px',
                height: '205px',
                transform: `translate3d(${getCardOffset(index) * 145}px, -50%, 0) scale(${getCardOffset(index) === 0 ? 1 : 0.95})`,
                opacity: getCardOffset(index) > 2 ? 0 : (getCardOffset(index) === 0 ? 1 : 0.75),
                pointerEvents: getCardOffset(index) > 2 ? 'none' : 'auto'
              }"
            >
              <!-- Gambar Kartu -->
              <img
                :src="dest.image"
                :alt="dest.title"
                class="w-full h-full object-cover filter brightness-[0.95] hover:brightness-105 transition-transform duration-500 will-change-transform"
              />

              <!-- Overlay Gradasi Tipis Bawah Kartu -->
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"></div>

              <!-- Lokasi & Judul Kartu -->
              <div class="absolute bottom-0 inset-x-0 p-2.5 text-left">
                <span class="text-[10px] uppercase font-bold text-amber-300 block truncate">
                  {{ dest.location }}
                </span>
                <h4 class="text-xs font-bold text-white uppercase truncate">
                  {{ dest.title }}
                </h4>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- Navigasi Slider Indikator & Kontrol -->
      <div class="flex items-center gap-3 mt-8">
        <button
          type="button"
          @click="prevDestination"
          aria-label="Previous Slide"
          class="w-8 h-8 rounded-full border border-white/30 hover:border-white text-white flex items-center justify-center transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-sm active:scale-95"
        >
          ‹
        </button>
        <button
          type="button"
          @click="nextDestination"
          aria-label="Next Slide"
          class="w-8 h-8 rounded-full border border-white/30 hover:border-white text-white flex items-center justify-center transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-sm active:scale-95"
        >
          ›
        </button>

        <!-- Progress Dots -->
        <div class="flex items-center gap-2 ml-2">
          <span
            v-for="(dest, i) in destinations"
            :key="dest.id"
            @click="changeDestination(i)"
            class="h-1.5 rounded-full cursor-pointer transition-all duration-500 ease-out"
            :class="activeIndex === i ? 'w-6 bg-white' : 'w-2 bg-white/40'"
          ></span>
        </div>
      </div>

    </div>
  </section>
</template>
