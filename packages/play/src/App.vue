<script setup lang="ts"></script>

<template>
  <se-button-group>
    <se-button type="primary">click me</se-button>
    <se-button type="primary">click me</se-button>
    <se-button type="primary">click me</se-button>
  </se-button-group>

  <br />

  <se-collapse
    v-bind="{
      accordion: true,
      modelValue: ['a'],
    }"
  >
    <se-collapse-item ame="a" title="Title a"> 111 </se-collapse-item>
  </se-collapse>
</template>

<style scoped></style>
