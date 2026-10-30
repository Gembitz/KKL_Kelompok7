<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['startWeb'])
const isVisible = ref(true)
const isClosing = ref(false)

const closeEntrance = () => {
  if (isClosing.value) return
  isClosing.value = true
  emit('startWeb')
  // Berikan waktu transisi dramatis dan bertahap (1.8s) agar perpindahan ke landing page halus & megah
  setTimeout(() => {
    isVisible.value = false
  }, 1800)
}

onMounted(() => {
  // Pemicu awal audio
  emit('startWeb')

  // Layar masuk lewat otomatis: tampil selama ~2.8 detik lalu transisi keluar secara sinematik
  const autoCloseTimer = setTimeout(() => {
    closeEntrance()
  }, 2800)
})
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-800 ease-out"
    leave-active-class="transition-all duration-1800 ease-[cubic-bezier(0.16,1,0.3,1)]"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100 scale-100 filter-none"
    leave-to-class="opacity-0 scale-110 blur-md pointer-events-none"
  >
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d1422] text-slate-100 overflow-hidden select-none"
    >
      <!-- Background Penuh: Foto Gapura Bali Asli dengan Transisi Zoom Parallax Sinematik -->
      <div class="absolute inset-0 z-0">
        <img
          src="/bali-entrance-bg.png"
          alt="Gerbang Gapura Bali"
          class="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-[2200ms] ease-out"
          :class="isClosing ? 'scale-125' : 'scale-100'"
        />
        <!-- Vignette Scrim Halus agar teks tetap kontras dan menyatu indah -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/40"></div>
      </div>

      <!-- Konten Minimalis: Teks & Sambutan dengan Efek Fade Zoom-Out saat Keluar -->
      <div
        class="relative z-20 max-w-xl mx-auto px-6 text-center flex flex-col items-center transition-all duration-1000 ease-in"
        :class="isClosing ? 'opacity-0 scale-90 translate-y-4' : 'opacity-100 scale-100 translate-y-0'"
      >
        <!-- Salam Tradisional Bali & Identitas Kelompok 7 -->
        <div class="space-y-3 mb-8">
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-950/40 border border-white/20 text-amber-300 text-xs font-semibold tracking-[0.25em] uppercase backdrop-blur-md">
            <span>🌺</span>
            <span>Rahajeng Rauh • Om Swastiastu</span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            Kelompok 7
          </h1>

          <p class="text-xs sm:text-sm text-slate-100 font-normal max-w-md mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Eksplorasi Industri & Budaya Pulau Dewata • KKL Informatika 2026
          </p>
        </div>

        <!-- Indikator Bar Halus Masuk Otomatis -->
        <div class="w-48 sm:w-60 h-1 bg-white/20 rounded-full overflow-hidden relative backdrop-blur-sm shadow-lg">
          <div class="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 rounded-full animate-entrance-bar"></div>
        </div>
        <span class="mt-2.5 text-[10px] text-white/80 font-mono tracking-widest uppercase drop-shadow">
          Memasuki Portal...
        </span>

      </div>

    </div>
  </transition>
</template>

<style scoped>
@keyframes entranceBar {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.animate-entrance-bar {
  animation: entranceBar 2.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
</style>
