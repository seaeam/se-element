<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <se-tooltip class="box-item" content="Top Left prompts info" placement="top-start">
        <se-button>top-start</se-button>
      </se-tooltip>
      <se-tooltip class="box-item" content="Top Center prompts info" placement="top">
        <se-button>top</se-button>
      </se-tooltip>
      <se-tooltip class="box-item" content="Top Right prompts info" placement="top-end">
        <se-button>top-end</se-button>
      </se-tooltip>
    </div>
    <div class="row">
      <se-tooltip class="box-item" content="Left Top prompts info" placement="left-start">
        <se-button>left-start</se-button>
      </se-tooltip>
      <se-tooltip
        class="box-item"
        content="Right Top prompts info"
        placement="right-start"
      >
        <se-button>right-start</se-button>
      </se-tooltip>
    </div>
    <div class="row">
      <se-tooltip class="box-item" content="Left Center prompts info" placement="left">
        <se-button class="mt-3 mb-3">left</se-button>
      </se-tooltip>
      <se-tooltip class="box-item" content="Right Center prompts info" placement="right">
        <se-button>right</se-button>
      </se-tooltip>
    </div>
    <div class="row">
      <se-tooltip
        class="box-item"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <se-button>left-end</se-button>
      </se-tooltip>
      <se-tooltip
        class="box-item"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <se-button>right-end</se-button>
      </se-tooltip>
    </div>
    <div class="row center">
      <se-tooltip
        class="box-item"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <se-button>bottom-start</se-button>
      </se-tooltip>
      <se-tooltip
        class="box-item"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <se-button>bottom</se-button>
      </se-tooltip>
      <se-tooltip
        class="box-item"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <se-button>bottom-end</se-button>
      </se-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
