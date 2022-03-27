<template>
  <page-header-wrapper>
    <router-view />
  </page-header-wrapper>
</template>

<script>

export default {
  name: 'PageView'
}
</script>

<style scoped>
>>> .ant-page-header-heading {
  display: none;
}
</style>
