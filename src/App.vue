<script setup>
import { ref, computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ItinerarySection from './components/ItinerarySection.vue'
import MapSection from './components/MapSection.vue'
import EducationSection from './components/EducationSection.vue'
import GallerySection from './components/GallerySection.vue'
import VideoSection from './components/VideoSection.vue'
import TeamSection from './components/TeamSection.vue'
import AppFooter from './components/AppFooter.vue'
import BaliAudioPlayer from './components/BaliAudioPlayer.vue'
import BaliEntranceModal from './components/BaliEntranceModal.vue'
import { useScrollAnimation } from './composables/useScrollAnimation'

// Inisialisasi observer animasi scroll masuk dan keluar
useScrollAnimation()

const audioPlayerRef = ref(null)

const isAudioPlaying = computed(() => {
  return audioPlayerRef.value?.isPlaying ?? false
})

const handleStartWeb = () => {
  if (audioPlayerRef.value) {
    audioPlayerRef.value.playAudio()
  }
}

const handleToggleAudio = () => {
  if (audioPlayerRef.value) {
    audioPlayerRef.value.togglePlay()
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#1a2234] text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans">
    <!-- Pemutar Audio Musik Gamelan Khas Bali (Dipasang paling awal agar langsung terputar sejak entrance) -->
    <BaliAudioPlayer ref="audioPlayerRef" />

    <!-- Animasi Masuk (Entrance) Bertema Bali -->
    <BaliEntranceModal @start-web="handleStartWeb" />

    <!-- Header Transparan dengan Kontrol Audio Gamelan di Pojok Kanan Atas -->
    <AppHeader :is-playing="isAudioPlaying" @toggle-audio="handleToggleAudio" />

    <!-- Hero Section (Ringkasan Destinasi) -->
    <HeroSection />

    <!-- Jadwal Destinasi 5 Hari (Itinerary Timeline Section) -->
    <ItinerarySection />

    <!-- Peta Interaktif & Animasi Perjalanan Semarang - Bali (Map Section) -->
    <MapSection />

    <!-- Edukasi & Jurnal Materi Pembelajaran KKL (Education Section) -->
    <EducationSection />

    <!-- Galeri Dokumentasi Foto KKL (Gallery Section) -->
    <GallerySection />

    <!-- Profil & Video Dokumentasi Kelompok KKL (VideoSection ala UPGRIS) -->
    <VideoSection />

    <!-- Tim 10 Anggota & Komentar Testimoni Carousel ala UPGRIS (Team Section) -->
    <TeamSection />

    <!-- Footer Lengkap dengan Link Destinasi & Menu Web -->
    <AppFooter />
  </div>
</template>
