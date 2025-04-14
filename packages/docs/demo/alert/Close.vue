<script setup>
function handleClose() {
  alert('close callback')
}
</script>
<template>
  <div class="basic block">
    <se-alert title="Uncrossable alert" type="success" :closable="false" />
    <se-alert title="Alert with callback" type="warning" @close="handleClose" />
  </div>
</template>
