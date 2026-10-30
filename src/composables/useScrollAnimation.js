import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
          // TIDAK me-remove 'is-visible' secara agresif saat sedikit keluar viewport
          // agar elemen di atas footer (seperti carousel komentar) tidak bergetar/flicker berulang-ulang
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px'
      }
    )

    // Daftarkan semua elemen dengan class animasi scroll
    const animElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-zoom-in, .reveal-slide-left, .reveal-slide-right')
    animElements.forEach((el) => observer.observe(el))
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}
