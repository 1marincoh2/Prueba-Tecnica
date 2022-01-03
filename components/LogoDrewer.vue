<template>
  <v-img class="logo1" alt="Logo" src="/welcome.png" />
</template>

<style>
.logo1 {
  height: 100px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}
@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
