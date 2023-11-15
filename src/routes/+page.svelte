<script>
	import FileCard from '@/lib/client/components/FileCard.svelte';

	export let data;
</script>

<div class="flex h-screen flex-col bg-blue-50">
	<div class="mx-auto flex w-full max-w-5xl flex-col items-center gap-y-3 py-16">
		<h1 class="flex text-center text-3xl font-medium text-gray-800">Welcome to ☁️ Local Cloud</h1>
		<p class="text-gray-500">Kinda like Google Drive but Local & Fast! ⚡</p>

		<!-- Upload Area -->
		<form
			method="POST"
			enctype="multipart/form-data"
			class="mt-5 flex flex-col items-center gap-y-4"
		>
			<div class="group">
				<input type="file" multiple id="file" name="fileToUpload" required />
			</div>

			<button type="submit" class="active w-full bg-sky-500 px-2 py-4 text-sky-50">Submit</button>
		</form>
	</div>

	<div class="flex w-full flex-1 flex-wrap gap-5 bg-gray-300 p-8">
		{#each data.files as file}
			<FileCard filename={file.fileName} downloadLink={file.url} />
		{/each}
	</div>
</div>
