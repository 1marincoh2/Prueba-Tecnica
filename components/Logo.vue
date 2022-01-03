<template>
  <v-img class="my-3 logo" contain height="100" alt="Logo" src="/logo1.png" />
</template>

<style>
.logo {
  height: 50px;
  width: 50px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
