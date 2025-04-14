<template>
  <h2>通过 slot 传入内容</h2>
  <div style="max-width: 600px">
    <se-alert type="success">Success alert</se-alert>
    <se-alert type="info">Info alert</se-alert>
    <se-alert type="warning">Warning alert</se-alert>
    <se-alert type="danger">Error alert</se-alert>
  </div>
  <h2>通过 prop 传入内容</h2>
  <div style="max-width: 600px">
    <se-alert type="success" title="Success alert" />
    <se-alert type="info" title="Info alert" />
    <se-alert type="warning" title="Warning alert" />
    <se-alert type="danger" title="Error alert" />
  </div>
</template>
