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

const revealContent = () => {
  if (isContentVisible.value) return;
  isContentVisible.value = true;
  if (fallbackTimerId) {
    window.clearTimeout(fallbackTimerId);
  }
  if (videoRef.value) {
    videoRef.value.loop = true;
    if (videoRef.value.paused) {
      videoRef.value.play().catch(() => {});
    }
  }
  // Start typewriter typing when content loads
  if (!timerId) {
    typeNext();
  }
};

const onVideoEnded = () => {
  revealContent();
};

const skipIntro = () => {
  revealContent();
};

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play().catch(() => {
      // If browser blocks autoplay, reveal content immediately
      revealContent();
    });
  }
  // Fallback: If video stalls or after 11s, automatically reveal content
  fallbackTimerId = window.setTimeout(() => {
    revealContent();
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
    class="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
  >
    <!-- Background Video (Strictly confined inside Home Section frame) -->
    <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      <video
        ref="videoRef"
        class="w-full h-full object-cover scale-105 transition-all duration-1000"
        autoplay
        muted
        playsinline
        preload="auto"
        @ended="onVideoEnded"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      <!-- Smooth Theme Overlay for text contrast (Fades in when content appears) -->
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

    <!-- Skip Intro Button during initial video playback -->
    <button
      v-if="!isContentVisible"
      type="button"
      @click="skipIntro"
      class="absolute bottom-8 right-8 z-30 px-5 py-2.5 rounded-full glass border border-white/20 text-xs font-semibold tracking-wider uppercase transition-all shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105"
      style="color: var(--text-main)"
    >
      <span>Skip Intro</span>
      <i class="fas fa-forward text-[11px] text-indigo-400"></i>
    </button>

    <!-- Main Content Container with Smooth Reveal -->
    <div
      class="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out"
      :class="
        isContentVisible
          ? 'opacity-100 translate-y-0 filter blur-0 pointer-events-auto'
          : 'opacity-0 translate-y-8 filter blur-sm pointer-events-none'
      "
    >
      <!-- Left Column: Typography & CTAs -->
      <div class="text-left" data-aos="fade-right">
        <div
          class="inline-block px-4 py-1 mb-4 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium tracking-wide backdrop-blur-sm"
        >
          Welcome to my portfolio
        </div>

        <h1
          class="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          style="color: var(--text-main)"
        >
          I'm {{ profile.name }} <br />
          <span class="gradient-text">{{ typedText }}</span
          ><span class="cursor">|</span>
        </h1>

        <p class="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
          Creative Web Developer &amp; Designer based in Cambodia. I transform complex
          problems into beautiful, intuitive designs.
        </p>

        <div class="flex flex-wrap gap-4">
          <a
            href="#projects"
            class="btn-primary px-8 py-3 rounded-full font-bold tracking-wide transition-all shadow-lg hover:shadow-indigo-500/50"
          >
            View Work
          </a>
          <a
            href="#contact"
            class="px-8 py-3 rounded-full font-bold tracking-wide border hover:bg-white/20 transition-all"
            style="color: var(--primary); border-color: rgba(99, 102, 241, 0.35)"
          >
            Contact Me
          </a>
        </div>
      </div>

      <!-- Right Column: Original Profile Photo (Clean, floating with glowing backdrop) -->
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
      v-if="isContentVisible"
      href="#about"
      class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-indigo-400/60 hover:text-indigo-400 transition-all animate-bounce"
      aria-label="Scroll to about section"
    >
      <i class="fas fa-chevron-down text-2xl"></i>
    </a>
  </section>
</template>
