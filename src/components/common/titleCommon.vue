<template>
	<div class="vTitle">
		<router-link to="/index" class="btn-return"></router-link>
		<h2 class="title">{{title}}</h2>
		<router-link to="/search" class="btn-seach"></router-link>
	</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: [
    'title'
  ]
}
</script>

<style lang="scss">

</style>
