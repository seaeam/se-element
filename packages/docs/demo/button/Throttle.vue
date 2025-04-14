<script setup>
function handleBtnClick() {
  alert('handleBtnClick')
}
</script>

<template>
  <p>
    <se-button @click="handleBtnClick"> with throttle</se-button>
    <se-button :use-throttle="false" @click="handleBtnClick">without throttle</se-button>
  </p>
</template>
