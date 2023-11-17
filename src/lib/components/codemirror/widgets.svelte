<script lang="ts">
</script>

<div>
	<slot name="clipboard" />
	<slot name="download" />
</div>

<style lang="postcss">
	div {
		@apply fixed flex flex-col gap-y-1.5 right-6 top-24;
	}
</style>
