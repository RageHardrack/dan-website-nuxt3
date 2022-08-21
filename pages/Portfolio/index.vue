<script setup lang="ts"></script>

<template>
  <NuxtLayout>
    <section class="flex flex-col space-y-10">
      <header class="flex flex-col space-y-4">
        <Heading1>My Portfolio</Heading1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ex
          doloribus distinctio, eos facilis illum consequatur maiores quo modi
          in magni iusto aperiam porro quia eligendi delectus perferendis culpa
          nam.
        </p>
      </header>

      <section class="flex flex-col space-y-2">
        <Heading2>Projects</Heading2>
        <UIGrid>
          <PortfolioProjectCard />
          <PortfolioProjectCard />
          <PortfolioProjectCard />
          <PortfolioProjectCard />
          <PortfolioProjectCard />
        </UIGrid>
      </section>

      <section class="flex flex-col space-y-2">
        <Heading2>Skills</Heading2>
        <UIGrid>
          <PortfolioSkillCard />
          <PortfolioSkillCard />
          <PortfolioSkillCard />
          <PortfolioSkillCard />
          <PortfolioSkillCard />
        </UIGrid>
      </section>

      <section class="flex flex-col space-y-2">
        <Heading2>Experience</Heading2>
        <UIGrid>
          <PortfolioExperienceCard />
          <PortfolioExperienceCard />
          <PortfolioExperienceCard />
          <PortfolioExperienceCard />
          <PortfolioExperienceCard />
        </UIGrid>
      </section>
    </section>
  </NuxtLayout>
</template>
