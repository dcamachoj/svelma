<script lang="ts">
	import { bulmaHelper } from '$lib/utils/bulma.js';
	import type {
		BulmaHelper,
		FileItem,
		Colors,
		BwColors,
		InputSize,
		FieldAlign
	} from '$lib/utils/bulma.js';
	import Icon from '$lib/bulma/common/Icon.svelte';

	export let bulma: BulmaHelper = {};
	export let id: string;
	export let icon: string | undefined = undefined;
	export let accept: string | undefined = undefined;
	export let color: Colors | BwColors | undefined = undefined;
	export let size: InputSize | undefined = undefined;
	export let check: ModalCheck<FileItem> | undefined = undefined;
	export let align: FieldAlign = 'left';
	export let file: File | undefined;
	export let hasName: boolean = false;
	export let isRight: boolean = false;
	export let isFullWidth: boolean = false;
	export let isBoxed: boolean = false;

	let files: FileList | undefined;

	$: cls = bulmaHelper(bulma, [
		'file',
		{
			'has-name': file && hasName,
			'is-right': isRight,
			'is-full-width': isFullWidth,
			'is-boxed': isBoxed,
			[`is-${color}`]: color != undefined,
			[`is-${size}`]: size != undefined,
			[`is-${align}`]: align != 'left'
		}
	]);
	$: files = file ? [file] : undefined;
	$: disabled =
		!file ||
		check == undefined ||
		!check({ filename: file.name, type: file.type, size: file.size });

	function onUpload() {
		const rd = new FileReader();
		rd.addEventListener('load', (e) => {
			const dataUrl = e.target?.result?.toString();
			if (!dataUrl) return;
			const fileItem: FileItem = {
				filename: file!.name,
				dataUrl,
				type: file!.type,
				size: file!.size
			};
			if (check != undefined && !check(fileItem)) return;
			dispatch('select', fileItem);
		});
		rd.readAsDataURL(file!);
	}
	function onChange() {
		file = files?.length ? files[0] : undefined;
		if (file) {
			onUpload();
		}
	}
</script>

<div class={cls}>
	<label class="file-label">
		<input class="file-input" type="file" {id} name={id} {accept} bind:files on:change={onChange} />
		<span class="file-cta">
			{#if icon}
				<Icon {icon} iconClass="file-icon" />
			{/if}
			<span class="file-label">
				<slot />
			</span>
		</span>
		{#if file && hasName}
			<span class="file-name">
				{file.name}
			</span>
		{/if}
	</label>
</div>
