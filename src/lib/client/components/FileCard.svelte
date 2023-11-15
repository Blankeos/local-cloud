<script lang="ts">
	export let filename: string;
	export let downloadLink: string;

	function download(dataurl: string, filename: string) {
		const link = document.createElement('a');
		link.href = dataurl;
		link.download = filename;
		link.click();
	}
</script>

<div class="flex aspect-square h-full max-h-[180px] w-full max-w-[180px] flex-col bg-white">
	<div
		class="relative grid h-full w-full flex-1 place-items-center overflow-hidden break-words bg-gray-100 p-3"
	>
		{#if filename}
			<div
				class="absolute inset-0"
				style={`background: url('${downloadLink}'); background-position: center; background-size: cover;`}
			/>

			<span class="absolute inset-0 grid place-items-center bg-black/40 text-center text-white"
				>{filename}</span
			>
		{:else}
			⚠️ No filename
		{/if}
	</div>
	<button
		on:click={() => download(downloadLink, filename)}
		class="px-3 py-3 text-gray-700 hover:bg-sky-500 hover:text-white">Download</button
	>
	<!-- <a href={downloadLink} download class="px-3 py-3 text-gray-700 hover:bg-sky-500 hover:text-white"
		>Download</a
	> -->
</div>
