<script lang="ts">
	import IconText from './IconText.svelte';
	import { buttonClass, type ButtonOptions } from './button.js';

	export let opts: ButtonOptions = {};
	export let id: string;
	export let icon: string | undefined = undefined;
	export let text: string | undefined = undefined;

	$: cls = buttonClass.cls(opts);
</script>

<button class={cls} aria-haspopup="true" aria-controls={id} on:click>
	<slot>
		<IconText {icon} {text} />
	</slot>
</button>
