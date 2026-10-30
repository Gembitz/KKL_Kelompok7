<script setup>
import { ref, onMounted } from 'vue'

const isPlaying = ref(false)
const audioRef = ref(null)

// Fokus Reff: Detik ke-8 (puncak ritme dinamis gamelan Bali)
const REFF_START_TIME = 8

// Simpan preferensi manual pengguna jika pernah sengaja mematikan audio
const userManuallyPaused = ref(false)

const startPlayback = () => {
  if (!audioRef.value) return

  if (audioRef.value.currentTime < REFF_START_TIME) {
    audioRef.value.currentTime = REFF_START_TIME
  }

  audioRef.value.muted = false
  const playPromise = audioRef.value.play()

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        isPlaying.value = true
        userManuallyPaused.value = false
      })
      .catch((err) => {
        // Autoplay Policy Browser: Jika browser memblokir audio unmuted sebelum ada sentuhan/gestur
        console.warn("Autoplay audio tertahan kebijakan browser, mempersiapkan auto-play pada interaksi pertama:", err)
        isPlaying.value = false
      })
  }
}

const togglePlay = () => {
  if (!audioRef.value) return

  if (isPlaying.value && !audioRef.value.paused) {
    audioRef.value.pause()
    isPlaying.value = false
    userManuallyPaused.value = true
  } else {
    userManuallyPaused.value = false
    startPlayback()
  }
}

// Loop kembali ke titik reff jika durasi audio berakhir
const handleTimeUpdate = () => {
  if (!audioRef.value) return
  if (audioRef.value.duration && audioRef.value.currentTime >= audioRef.value.duration - 1) {
    audioRef.value.currentTime = REFF_START_TIME
    audioRef.value.play()
  }
}

defineExpose({
  playAudio: startPlayback,
  togglePlay,
  isPlaying
})

onMounted(() => {
  // 1. Eksekusi pemutaran langsung
  startPlayback()
  setTimeout(startPlayback, 200)
  setTimeout(startPlayback, 800)

  // 2. Browser Autoplay Handler:
  // Browser modern (Chrome, Edge, Safari) memblokir audio unmuted sampai ada interaksi pengguna (pointer, scroll, touch, klik).
  // Handler ini memastikan begitu pengguna menyentuh layar, menggerakkan mouse, atau scroll, audio langsung AKTIF & ON otomatis tanpa harus mengklik tombol audio.
  const resumeAudioOnAnyAction = () => {
    if (!userManuallyPaused.value && (!isPlaying.value || (audioRef.value && audioRef.value.paused))) {
      startPlayback()
    }
  }

  // Daftarkan listener pada semua event interaksi awal
  const events = ['pointerdown', 'touchstart', 'scroll', 'keydown', 'wheel', 'mousedown']
  events.forEach(evt => {
    window.addEventListener(evt, resumeAudioOnAnyAction, { passive: true })
  })

  // Setelah audio berhasil berbunyi, copot listener event agar efisien
  const checkInterval = setInterval(() => {
    if (isPlaying.value && audioRef.value && !audioRef.value.paused) {
      events.forEach(evt => {
        window.removeEventListener(evt, resumeAudioOnAnyAction)
      })
      clearInterval(checkInterval)
    }
  }, 500)
})
</script>

<template>
  <div>
    <!-- Hidden HTML5 Audio Element -->
    <audio
      ref="audioRef"
      src="/audio/gamelan-bali.mp3"
      loop
      preload="auto"
      autoplay
      playsinline
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @timeupdate="handleTimeUpdate"
    ></audio>
  </div>
</template>
