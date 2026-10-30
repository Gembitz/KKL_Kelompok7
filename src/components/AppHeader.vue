<script setup>
import { ref } from 'vue'
import { Menu, X, Volume2, VolumeX } from 'lucide-vue-next'

const props = defineProps({
  isPlaying: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggleAudio'])

const isMobileMenuOpen = ref(false)

const navItems = [
  { name: 'Ringkasan', href: '#ringkasan' },
  { name: 'Jadwal', href: '#jadwal' },
  { name: 'Peta', href: '#peta' },
  { name: 'Edukasi', href: '#edukasi' },
  { name: 'Galeri', href: '#galeri' },
  { name: 'Profil', href: '#profil' },
  { name: 'Tim', href: '#tim' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="absolute top-0 left-0 right-0 z-50 w-full bg-transparent px-6 sm:px-8 lg:px-12 py-6">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      
      <!-- Bagian Kiri: Logo Informatika UPGRIS + Title Kelompok 7 -->
      <a href="#" class="flex items-center gap-3 group focus:outline-none">
        <div class="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 p-1.5 backdrop-blur-sm group-hover:bg-amber-400/20 group-hover:scale-105 transition-all duration-300 ring-1 ring-white/15">
          <img src="/logo-informatika-upgris.webp" alt="Logo Informatika UPGRIS" class="w-full h-full object-contain filter drop-shadow" />
        </div>
        <div class="flex flex-col text-left">
          <span class="text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors uppercase leading-none">
            Kelompok 7
          </span>
          <span class="text-[9px] uppercase tracking-[0.2em] font-bold text-amber-400 mt-1">
            KKL Informatika UPGRIS
          </span>
        </div>
      </a>

      <!-- Bagian Tengah: 7 Menu (Warna font putih, transparan murni) -->
      <nav class="hidden md:flex items-center gap-8 bg-transparent">
        <a
          v-for="item in navItems"
          :key="item.name"
          :href="item.href"
          class="text-white hover:text-amber-300 text-xs uppercase tracking-widest font-semibold transition-colors bg-transparent"
        >
          {{ item.name }}
        </a>
      </nav>

      <!-- Bagian Kanan: Kontrol Audio Gamelan Bali Menggantikan Tombol ITINERARY -->
      <div class="flex items-center gap-3">
        <!-- Tombol Audio Gamelan di Pojok Kanan Atas Header (Desktop) -->
        <button
          type="button"
          @click="emit('toggleAudio')"
          class="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-amber-400 text-white hover:text-slate-950 border border-white/20 hover:border-amber-400 shadow-lg backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer group"
          :aria-label="props.isPlaying ? 'Heningkan Gamelan' : 'Nyalakan Gamelan'"
          :title="props.isPlaying ? 'Heningkan Musik Gamelan' : 'Putar Musik Gamelan Bali'"
        >
          <!-- Animasi Equalizer Bars saat memutar -->
          <div v-if="props.isPlaying" class="flex items-end gap-[2px] h-3.5 w-3.5 justify-center">
            <span class="w-[2.5px] bg-amber-400 group-hover:bg-slate-950 rounded-full animate-bounce [animation-delay:0ms] h-full"></span>
            <span class="w-[2.5px] bg-amber-400 group-hover:bg-slate-950 rounded-full animate-bounce [animation-delay:150ms] h-2.5"></span>
            <span class="w-[2.5px] bg-amber-400 group-hover:bg-slate-950 rounded-full animate-bounce [animation-delay:300ms] h-full"></span>
          </div>
          <VolumeX v-else class="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-950" />

          <span class="text-[11px] uppercase tracking-wider font-bold">
            Gamelan
          </span>
          <span
            class="text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold"
            :class="props.isPlaying ? 'bg-amber-400/25 text-amber-300 group-hover:bg-slate-950/20 group-hover:text-slate-950' : 'bg-white/15 text-slate-300 group-hover:text-slate-950'"
          >
            {{ props.isPlaying ? 'ON' : 'OFF' }}
          </span>
        </button>

        <!-- Tombol Menu Mobile -->
        <div class="flex md:hidden items-center gap-2">
          <button
            type="button"
            @click="emit('toggleAudio')"
            class="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white border border-white/20"
            :aria-label="props.isPlaying ? 'Heningkan Gamelan' : 'Nyalakan Gamelan'"
          >
            <Volume2 v-if="props.isPlaying" class="w-4 h-4 text-amber-400" />
            <VolumeX v-else class="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            @click="toggleMobileMenu"
            aria-label="Toggle Menu"
            class="flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <component :is="isMobileMenuOpen ? X : Menu" class="w-6 h-6" />
          </button>
        </div>
      </div>

    </div>

    <!-- Mobile Dropdown Nav -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden mt-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 flex flex-col gap-3"
    >
      <a
        v-for="item in navItems"
        :key="item.name"
        :href="item.href"
        @click="closeMobileMenu"
        class="text-slate-200 hover:text-amber-400 text-sm font-semibold transition-colors py-1 px-2 rounded-lg hover:bg-white/5"
      >
        {{ item.name }}
      </a>
    </div>
  </header>
</template>
