<script lang="ts">
	import type { BulmaOptions, Colors, HeroSize } from '$lib/utils/bulma.types.js';
	import { heroClass, heroBodyClass } from './misc.js';

	export let opts: BulmaOptions = {};
	export let color: Colors | undefined = undefined;
	export let size: HeroSize | undefined = undefined;
	export let fullheightWithNavbar: boolean = false;
	export let title: string = '';
	export let subtitle: string = '';

	$: cls = heroClass.cls({ opts, color, size, fullheightWithNavbar });
	$: clsBody = heroBodyClass.cls({});
</script>

<section class={cls}>
	<div class={clsBody}>
		<slot>
			{#if title}
				<p class="title">{title}</p>
			{/if}
			{#if subtitle}
				<p class="subtitle">{subtitle}</p>
			{/if}
		</slot>
	</div>
</section>
