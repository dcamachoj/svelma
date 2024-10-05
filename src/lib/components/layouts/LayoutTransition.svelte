<script lang="ts">
	import { cubicIn } from 'svelte/easing';
	import type { EasingFunction, TransitionConfig } from 'svelte/transition';

	const defDelay = 0;
	const defDuration = 300;
	const defEasing = cubicIn;

	export let key: string;
	export let duration: number = defDuration;
	export let easing: EasingFunction = defEasing;

	type Params = {
		delay?: number;
		duration?: number;
		easing?: EasingFunction;
	};
	type Options = { direction: 'in' | 'out' | 'both' };
	function scale(
		node: Element,
		{ delay, duration, easing }: Params,
		{ direction }: Options,
	): TransitionConfig {
		const origin = {
			in: 'center left',
			out: 'center right',
			both: 'center center',
		};
		return {
			delay: delay || defDelay,
			duration: duration || defDuration,
			easing: easing || defEasing,
			css: (t) => `
        scale: ${t};
        transform-origin: ${origin[direction]};
      `,
		};
	}
</script>

{#key key}
	<div in:scale={{ duration, delay: duration, easing }} out:scale={{ duration, easing }}>
		<slot />
	</div>
{/key}
