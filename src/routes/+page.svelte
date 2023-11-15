<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import FileCard from '@/lib/client/components/FileCard.svelte';
	import { toast } from 'svelte-sonner';
	import type { ActionResult } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';
	import axios from 'axios';

	export let data;
	let formElement: HTMLFormElement;

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);

		// --- FETCH REQUEST ---

		const response = await axios.post(event.currentTarget.action, data, {
			headers: { 'Content-Type': 'multipart/form-data' },
			onUploadProgress: (e: any) => {
				if (!e) return;

				const uploadProgress = (e.loaded / e.total) * 100;

				toast.loading(`${uploadProgress.toFixed()}% Uploading File...`, {
					id: 'UPLOAD_TOAST',
					duration: Infinity
				});
			},
			responseType: 'text'
		});
		// --- FETCH REQUEST ----

		const result: ActionResult = deserialize(response.data);

		if (result.type === 'success') {
			toast.success('Uploaded!', { id: 'UPLOAD_TOAST', duration: 1000 });
			// rerun all `load` functions, following the successful update
			await invalidateAll();
			formElement.reset(); // Reset the form.
		} else {
			toast.error('Failed to Upload', { id: 'UPLOAD_TOAST' });
		}

		applyAction(result);
	}
</script>

<div class="shadow-3xl flex h-screen flex-col bg-blue-50">
	<div class="mx-auto flex w-full max-w-5xl flex-col items-center gap-y-3 py-16">
		<h1 class="flex text-center text-3xl font-medium text-gray-800">Welcome to ☁️ Local Cloud</h1>
		<p class="text-gray-500">Kinda like Google Drive but Local & Fast! ⚡</p>

		<!-- Upload Area -->
		<form
			bind:this={formElement}
			method="POST"
			enctype="multipart/form-data"
			class="mt-5 flex flex-col items-center gap-y-4"
			on:submit|preventDefault={handleSubmit}
		>
			<div class="group">
				<input type="file" multiple id="file" name="fileToUpload" required />
			</div>

			<button type="submit" class="active w-full bg-sky-500 px-2 py-4 text-sky-50">Submit</button>
		</form>
	</div>

	<div
		id="file-cards"
		class="shadow-3xl relative grid h-full w-full gap-5 border-t border-sky-200 bg-blue-100 p-4"
	>
		{#each data.files as file}
			<FileCard filename={file.fileName} downloadLink={file.url} />
		{/each}
	</div>
</div>

<style>
	#file-cards {
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
	}
</style>
