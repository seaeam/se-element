<template>
  <div>
    <se-button type="primary" loading>Loading</se-button>
    <se-button type="primary" loading-icon="circle-notch" loading>Loading</se-button>
    <se-button type="primary" loading>
      <template #loading>
        <se-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </se-button>
  </div>
</template>
