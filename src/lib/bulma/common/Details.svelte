<script lang="ts">
	import { bulmaHelper, type BulmaHelper } from '$lib/utils/bulma.js';

	export let title: string;
	export let value: string;
	export let bulma: BulmaHelper = {};
	export let bulmaTitle: BulmaHelper = {};
	export let bulmaSubtitle: BulmaHelper = {};
	export let underlined: boolean = false;

	const cls = bulmaHelper(bulma, [
		{
			flexDir: 'column',
			alignItems: 'stretch',
			justifyContent: 'flex-start'
		},
		'details full-width',
		{ underlined }
	]);
</script>

<div class={cls}>
	<p class="title {bulmaHelper(bulmaTitle, { textSize: '5' })}">{title}</p>
	<p class="subtitle {bulmaHelper(bulmaSubtitle, { textSize: '6' })}">{value}</p>
</div>

<style>
	.details.underlined {
		border-bottom: 1px solid black;
	}
	.title,
	.subtitle {
		text-align: left;
	}
</style>
