<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { profile, typewriterPhrases } from "../data/portfolio";

const typedText = ref("");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let timerId = null;
let fallbackTimerId = null;

const typeNext = () => {
  const phrase = typewriterPhrases[phraseIndex];

  if (isDeleting) {
    typedText.value = phrase.substring(0, charIndex - 1);
    charIndex -= 1;
  } else {
    typedText.value = phrase.substring(0, charIndex + 1);
    charIndex += 1;
  }

  let speed = isDeleting ? 50 : 150;

  if (!isDeleting && charIndex === phrase.length) {
    isDeleting = true;
    speed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
    speed = 500;
  }

  timerId = window.setTimeout(typeNext, speed);
};

// Video and reveal states
const videoRef = ref(null);
const isContentVisible = ref(false);
const isVideoPlaying = ref(true);

const stopVideo = () => {
  if (videoRef.value) {
    videoRef.value.pause();
  }
  isVideoPlaying.value = false;
};

const playVideo = () => {
  if (!videoRef.value) return;
  isVideoPlaying.value = true;
  videoRef.value.currentTime = 0;
  videoRef.value.play().catch(() => {});
};

const togglePlayVideo = () => {
  if (isVideoPlaying.value) {
    stopVideo();
  } else {
    playVideo();
  }
};

const stopOrSkipVideo = () => {
  stopVideo();
  if (fallbackTimerId) {
    window.clearTimeout(fallbackTimerId);
  }
  if (!isContentVisible.value) {
    isContentVisible.value = true;
    if (!timerId) {
      typeNext();
    }
  }
};

const onVideoEnded = () => {
  // Video plays ONLY one time, then hides automatically
  stopOrSkipVideo();
};

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play().catch(() => {
      // If browser blocks initial autoplay, show content immediately
      stopOrSkipVideo();
    });
  }
  // Fallback: If video stalls or fails to end after 11s, automatically reveal content and hide video
  fallbackTimerId = window.setTimeout(() => {
    if (!isContentVisible.value) {
      stopOrSkipVideo();
    }
  }, 11000);
});

onUnmounted(() => {
  if (timerId) window.clearTimeout(timerId);
  if (fallbackTimerId) window.clearTimeout(fallbackTimerId);
});
</script>

<template>
  <section
    id="home"
    class="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20"
  >
    <!-- Background Video Layer (Plays once, then hides; only shown when isVideoPlaying is true) -->
    <div
      class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 transition-opacity duration-700"
      :class="isVideoPlaying ? 'opacity-100' : 'opacity-0'"
    >
      <video
        ref="videoRef"
        class="w-full h-full object-cover scale-105 transition-all duration-1000"
        muted
        playsinline
        preload="auto"
        @ended="onVideoEnded"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      <!-- Smooth Theme Overlay for text contrast -->
      <div
        class="absolute inset-0 hero-video-overlay transition-opacity duration-1000"
        :class="isContentVisible ? 'opacity-100' : 'opacity-0'"
      ></div>

      <!-- Seamless bottom fade into next section -->
      <div
        class="absolute bottom-0 left-0 right-0 h-32 hero-bottom-fade transition-opacity duration-1000"
        :class="isContentVisible ? 'opacity-100' : 'opacity-30'"
      ></div>
    </div>

    <!-- Skip / Close Video Button during video playback -->
    <button
      v-if="isVideoPlaying"
      type="button"
      @click="stopOrSkipVideo"
      class="hero-skip-btn"
    >
      <span>{{ isContentVisible ? "Close Video" : "Skip Intro" }}</span>
      <i
        :class="
          isContentVisible
            ? 'fas fa-times text-pink-400'
            : 'fas fa-forward text-indigo-400'
        "
      ></i>
    </button>

    <!-- Main Content Container with Smooth Reveal -->
    <div
      class="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-1000 ease-out"
      :class="
        isContentVisible
          ? 'opacity-100 translate-y-0 filter blur-0 pointer-events-auto'
          : 'opacity-0 translate-y-8 filter blur-sm pointer-events-none'
      "
    >
      <!-- Left Column: Typography & CTAs -->
      <div class="text-left" data-aos="fade-right">
        <div
          class="inline-block px-3.5 py-1 mb-3.5 sm:mb-4 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs sm:text-sm font-medium tracking-wide backdrop-blur-sm"
        >
          Welcome to my portfolio
        </div>

        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
          style="color: var(--text-main)"
        >
          I'm {{ profile.name }} <br />
          <span class="gradient-text">{{ typedText }}</span
          ><span class="cursor">|</span>
        </h1>

        <p
          class="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 max-w-lg leading-relaxed"
        >
          Creative Web Developer &amp; Odoo Web Developer based in Cambodia. I transform
          complex problems into beautiful, intuitive designs.
        </p>

        <div class="flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href="#projects"
            class="btn-primary px-6 sm:px-8 py-3 rounded-full font-bold tracking-wide transition-all shadow-lg hover:shadow-indigo-500/50 text-sm sm:text-base text-center"
          >
            View Work
          </a>

          <a
            href="#contact"
            class="px-6 sm:px-8 py-3 rounded-full font-bold tracking-wide border hover:bg-white/20 transition-all text-sm sm:text-base text-center"
            style="color: var(--primary); border-color: rgba(99, 102, 241, 0.35)"
          >
            Contact Me
          </a>

          <!-- Play Video Again Button -->
          <button
            type="button"
            @click="togglePlayVideo"
            class="px-6 sm:px-8 py-3 rounded-full font-bold tracking-wide border hover:bg-white/20 transition-all text-sm sm:text-base text-center inline-flex items-center justify-center gap-2"
            style="
              color: var(--text-main);
              border-color: rgba(99, 102, 241, 0.35);
              background: var(--surface-2);
            "
            :title="isVideoPlaying ? 'Stop background video' : 'Play video again'"
          >
            <i
              :class="
                isVideoPlaying
                  ? 'fas fa-stop text-xs text-pink-400'
                  : 'fas fa-play text-xs text-indigo-400'
              "
            ></i>
            <span>{{ isVideoPlaying ? "Stop Video" : "Play Video" }}</span>
          </button>
        </div>
      </div>

      <!-- Right Column: Original Profile Photo (Visible on desktop/tablet, hidden on mobile to avoid duplication with About section) -->
      <div class="relative hidden md:block" data-aos="fade-left">
        <div class="relative w-full aspect-square max-w-md mx-auto floating">
          <div
            class="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition duration-1000"
          ></div>
          <div
            class="relative z-10 w-full h-full rounded-2xl overflow-hidden glass p-2 rotate-3 hover:rotate-0 transition-all duration-500 shadow-2xl"
          >
            <img
              :src="profile.image"
              alt="Panha Profile"
              class="w-full h-full object-cover rounded-xl filter brightness-95 contrast-110"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Down Chevron (Appears only after content is loaded) -->
    <a
      v-if="isContentVisible && !isVideoPlaying"
      href="#about"
      class="hero-scroll-btn"
      aria-label="Scroll to about section"
    >
      <i class="fas fa-chevron-down"></i>
    </a>
  </section>
</template>
