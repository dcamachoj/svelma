<script lang="ts">
	import { EnvPublic } from '$lib/utils/env.js';

	const env = EnvPublic.getInstance();

	export let fullHeight: boolean = false;
	export let centered: boolean = false;

	$: style = `max-height: calc(100vh - ${env.mainHeaderHeight}px - ${env.mainFooterHeight}px);`;
</script>

<div class="layout-responsive" {style} class:full-height={fullHeight} class:is-centered={centered}>
	<div class="columns">
		<div class="column is-4 is-offset-4"><slot /></div>
	</div>
</div>

<style lang="less">
	.layout-responsive {
		&.is-centered {
			.column {
				align-items: center;
				display: flex;
				flex-direction: column;
			}
		}
		&.full-height {
			height: 100%;

			> .columns,
			> .columns > .column {
				height: 100%;
			}
		}
	}
</style>
