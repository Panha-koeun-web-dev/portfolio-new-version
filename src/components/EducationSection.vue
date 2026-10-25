<script setup>
import { computed } from "vue";
import { education, experience, educationHighlights, projects } from "../data/portfolio";

const projectCount = computed(() => projects.length);
</script>

<template>
  <section id="education" class="py-16 md:py-24 relative bg-black/20">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 md:mb-16" data-aos="fade-up">
        <div class="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-indigo-300">
          <i class="fas fa-graduation-cap"></i>
          Learning &amp; Experience Journey
        </div>
        <h2 class="mt-4 sm:mt-6 text-3xl md:text-4xl font-bold">My <span class="gradient-text">Education &amp; Experience</span></h2>
        <p class="mx-auto mt-3 sm:mt-4 max-w-2xl text-gray-400 text-sm sm:text-base">
          A focused path built around academic training, practical internships, and real project experience in modern software development.
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
        <div class="glass rounded-3xl p-5 sm:p-8 md:p-10" data-aos="fade-right">
          <div class="education-timeline">
            <!-- Timeline Item 1: Passerelles Numeriques Cambodia -->
            <article class="education-item">
              <div class="education-dot"></div>
              <div class="education-card">
                <div class="mb-3 sm:mb-4 inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-xs sm:text-sm font-medium text-indigo-300">
                  {{ education.period }}
                </div>
                <h3 class="text-xl sm:text-2xl font-bold" style="color: var(--text-main);">{{ education.school }}</h3>
                <p class="mt-1.5 sm:mt-2 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-pink-300 font-medium">{{ education.program }}</p>
                <p class="mt-3 sm:mt-4 leading-relaxed text-gray-400 text-xs sm:text-sm">{{ education.description }}</p>
                <div class="mt-5 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                  <span v-for="tag in education.tags" :key="tag" class="education-tag text-xs sm:text-sm">{{ tag }}</span>
                </div>
              </div>
            </article>

            <!-- Timeline Item 2: Odoo Developer Intern — RMA Cambodia -->
            <article class="education-item">
              <div class="education-dot" style="background: linear-gradient(135deg, var(--secondary), var(--accent));"></div>
              <div class="education-card">
                <div class="mb-3 sm:mb-4 inline-flex items-center rounded-full bg-pink-500/10 px-3 py-1 text-xs sm:text-sm font-medium text-pink-300">
                  {{ experience.period }}
                </div>
                <h3 class="text-xl sm:text-2xl font-bold" style="color: var(--text-main);">{{ experience.company }}</h3>
                <p class="mt-1.5 sm:mt-2 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-indigo-300 font-semibold">{{ experience.role }}</p>
                
                <!-- Responsibilities list -->
                <ul class="mt-3 sm:mt-4 space-y-2 text-xs sm:text-sm leading-relaxed" style="color: var(--text-muted);">
                  <li
                    v-for="(point, idx) in experience.responsibilities"
                    :key="idx"
                    class="flex items-start gap-2"
                  >
                    <i class="fas fa-check text-xs text-indigo-400 mt-1 flex-shrink-0"></i>
                    <span :class="{ 'font-semibold text-indigo-400': point.includes('School Management') }">
                      {{ point }}
                    </span>
                  </li>
                </ul>

                <div class="mt-5 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                  <span v-for="tag in experience.tags" :key="tag" class="education-tag text-xs sm:text-sm">{{ tag }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="space-y-6" data-aos="fade-left">
          <div class="glass rounded-3xl p-5 sm:p-8">
            <p class="text-xs uppercase tracking-[0.3em] text-gray-400 font-medium">Education Highlights</p>
            <h3 class="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold" style="color: var(--text-main);">What I am developing through study</h3>
            <div class="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4">
              <div v-for="item in educationHighlights" :key="item.title" class="education-highlight p-3.5 sm:p-4">
                <i :class="item.icon"></i>
                <div>
                  <p class="font-semibold text-sm sm:text-base" style="color: var(--text-main);">{{ item.title }}</p>
                  <p class="text-xs sm:text-sm leading-relaxed text-gray-400">{{ item.text }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="glass rounded-3xl p-5 sm:p-8">
            <p class="text-xs uppercase tracking-[0.3em] text-gray-400 font-medium">Current Focus</p>
            <div class="mt-5 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              <div class="rounded-2xl p-4 sm:p-5" style="border: 1px solid var(--panel-border); background: var(--panel-tint);">
                <p class="text-2xl sm:text-3xl font-bold" style="color: var(--text-main);">2+</p>
                <p class="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">Years of active learning</p>
              </div>
              <div class="rounded-2xl p-4 sm:p-5" style="border: 1px solid var(--panel-border); background: var(--panel-tint);">
                <p class="text-2xl sm:text-3xl font-bold" style="color: var(--text-main);">{{ projectCount }}+</p>
                <p class="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">Projects supporting growth</p>
              </div>
            </div>
            <p class="mt-5 sm:mt-6 leading-relaxed text-gray-400 text-xs sm:text-sm">
              I am currently focused on growing as a dependable developer who can design, build, and improve meaningful digital products and enterprise ERP applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
