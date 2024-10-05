<script lang="ts">
	import Panel from '$lib/components/common/Panel.svelte';

	export let errors: string[] | null;
</script>

{#if errors}
	<Panel opts={{ hidden: !errors }} color="danger" let:PanelHeading let:PanelBlock>
		<PanelHeading>Errores</PanelHeading>
		{#each errors as err}
			<PanelBlock>{err}</PanelBlock>
		{/each}
	</Panel>
{/if}
