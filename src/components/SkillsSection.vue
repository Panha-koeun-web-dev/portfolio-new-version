<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { skills } from "../data/portfolio";

const visibleSkills = ref(new Set());
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSkills.value.add(entry.target.dataset.skill);
          visibleSkills.value = new Set(visibleSkills.value);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  document.querySelectorAll("[data-skill]").forEach((item) => observer.observe(item));
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <section id="skills" class="py-16 md:py-24 relative bg-black/20">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 md:mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Core <span class="gradient-text">Skills</span></h2>
        <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">Technologies I use to bring ideas to life</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
        <article
          v-for="(skill, index) in skills"
          :key="skill.name"
          class="glass p-6 sm:p-8 rounded-2xl card-hover"
          data-aos="fade-up"
          :data-aos-delay="(index + 1) * 60"
          :data-skill="skill.name"
        >
          <div class="flex items-center mb-4 sm:mb-6">
            <i :class="[skill.icon, 'text-3xl sm:text-4xl mr-3.5 sm:mr-4 flex-shrink-0']"></i>
            <h3 class="text-lg sm:text-xl font-bold" style="color: var(--text-main);">{{ skill.name }}</h3>
          </div>
          <div class="flex justify-between mb-2 text-xs sm:text-sm">
            <span class="text-gray-400">{{ skill.level }}</span>
            <span class="text-primary font-semibold">{{ skill.percent }}%</span>
          </div>
          <div class="skill-container">
            <div
              class="skill-progress"
              :style="{ width: visibleSkills.has(skill.name) ? `${skill.percent}%` : '0%' }"
            ></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
