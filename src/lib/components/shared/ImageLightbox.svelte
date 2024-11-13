<!-- src/lib/components/shared/ImageLightbox.svelte -->
<script lang="ts">
	import { crossfade } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import { X, ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let images: {
		url: string;
		alt: string;
		tags: {
			general: string;
			character: string;
			copyright: string;
			artist: string;
			meta: string;
			model: string;
		};
	}[];
	export let initialIndex = 0;
	export let onClose: () => void;

	let currentIndex = initialIndex;
	$: currentImage = images[currentIndex];

	let mainImage: HTMLImageElement;
	let isLoading = false;

	const [send, receive] = crossfade({ duration: 500 });

	// Get indices of images to preload
	$: preloadIndices = [
		currentIndex - 3,
		currentIndex - 2,
		currentIndex - 1,
		currentIndex + 1,
		currentIndex + 2,
		currentIndex + 3
	].filter((i) => i >= 0 && i < images.length);

	// Handle image loading state
	function handleImageLoad() {
		isLoading = false;
	}

	// Update loading state when changing images
	$: {
		currentImage;
		isLoading = true;
	}

	function formatTags(tagString: string): string[] {
		return tagString.split(' ').filter((tag) => tag.length > 0);
	}

	function handlePrevious() {
		if (currentIndex > 0) {
			currentIndex--;
		}
	}

	function handleNext() {
		if (currentIndex < images.length - 1) {
			currentIndex++;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onClose();
		if (e.key === 'ArrowLeft') handlePrevious();
		if (e.key === 'ArrowRight') handleNext();
	}

	function handleBackgroundClick(e: MouseEvent) {
		// Only close if clicking directly on the background
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	function handleBackgroundKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			onClose();
		}
	}

	onMount(() => {
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		document.body.style.overflow = 'unset';
		window.removeEventListener('keydown', handleKeydown);
	});

	// Preload images function
	function preloadImages(indices: number[]) {
		indices.forEach((index) => {
			if (index >= 0 && index < images.length) {
				const img = new Image();
				img.src = images[index].url;
				img.classList.add('hidden-preload'); // Add a class to hide preloaded images
				document.body.appendChild(img); // Append to the body to ensure they are rendered
			}
		});
	}

	// Reactive statement to trigger preloading when currentIndex changes
	$: {
		const indicesToPreload = [currentIndex + 1, currentIndex + 2, currentIndex + 3];
		preloadImages(indicesToPreload);
	}
</script>

<dialog
	class="fixed inset-0 z-50 bg-black/90 flex w-full h-full m-0 p-0"
	aria-label="Image lightbox"
	open
>
	<!-- Close button -->
	<button on:click={onClose} class="absolute top-4 right-4 p-2 text-white hover:text-gray-300 z-50">
		<X class="w-6 h-6" />
	</button>

	<!-- Main content area -->
	<div class="flex flex-1">
		<!-- Image section - adjusted to account for wider sidebar -->
		<div class="flex-1 flex items-center justify-center relative pr-[550px]">
			<!-- Navigation buttons -->
			<button
				on:click={handlePrevious}
				disabled={currentIndex === 0}
				class="absolute left-4 p-2 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<ChevronLeft class="w-8 h-8" />
			</button>

			<button
				on:click={handleNext}
				disabled={currentIndex === images.length - 1}
				class="absolute right-[566px] p-2 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<ChevronRight class="w-8 h-8" />
			</button>

			<!-- Image -->
			<div class="relative w-full h-full flex items-center justify-center">
				<div class="absolute inset-0 flex items-center justify-center">
					{#each [currentImage] as image (currentIndex)}
						<img
							bind:this={mainImage}
							src={image.url}
							alt={image.alt}
							class="max-h-full max-w-full absolute"
							in:send={{ key: currentIndex }}
							out:receive={{ key: currentIndex }}
							on:load={handleImageLoad}
						/>
					{/each}
				</div>
			</div>

			<!-- Image counter -->
			<div class="absolute bottom-4 left-0 right-[550px] text-center text-white">
				{currentIndex + 1} / {images.length}
			</div>
		</div>

		<!-- Tags section - increased width to 600px -->
		<div
			class="fixed right-0 top-0 bottom-0 w-[550px] bg-white/10 backdrop-blur-lg overflow-y-auto p-8 space-y-8"
		>
			<!-- Artist -->
			<div>
				<h3 class="text-white font-semibold mb-3">Artist</h3>
				<div class="flex flex-wrap gap-2">
					{#each formatTags(currentImage.tags.artist) as tag}
						<code class="bg-purple-500/20 text-purple-200 px-3 py-1.5 rounded-full text-sm"
							>{tag}</code
						>
					{/each}
				</div>
			</div>

			<!-- Character -->
			<div>
				<h3 class="text-white font-semibold mb-3">Character</h3>
				<div class="flex flex-wrap gap-2">
					{#each formatTags(currentImage.tags.character) as tag}
						<code class="bg-blue-500/20 text-blue-200 px-3 py-1.5 rounded-full text-sm">{tag}</code>
					{/each}
				</div>
			</div>

			<!-- Copyright -->
			<div>
				<h3 class="text-white font-semibold mb-3">Copyright</h3>
				<div class="flex flex-wrap gap-2">
					{#each formatTags(currentImage.tags.copyright) as tag}
						<code class="bg-yellow-500/20 text-yellow-200 px-3 py-1.5 rounded-full text-sm"
							>{tag}</code
						>
					{/each}
				</div>
			</div>

			<!-- Model -->
			<div>
				<h3 class="text-white font-semibold mb-3">Model</h3>
				<div class="flex flex-wrap gap-2">
					{#each formatTags(currentImage.tags.model) as tag}
						<code class="bg-green-500/20 text-green-200 px-3 py-1.5 rounded-full text-sm"
							>{tag}</code
						>
					{/each}
				</div>
			</div>

			<!-- Meta -->
			<div>
				<h3 class="text-white font-semibold mb-3">Meta</h3>
				<div class="flex flex-wrap gap-2">
					{#each formatTags(currentImage.tags.meta) as tag}
						<code class="bg-gray-500/20 text-gray-200 px-3 py-1.5 rounded-full text-sm">{tag}</code>
					{/each}
				</div>
			</div>

			<!-- General -->
			<div>
				<h3 class="text-white font-semibold mb-3">General</h3>
				<div class="flex flex-wrap gap-2">
					{#each formatTags(currentImage.tags.general) as tag}
						<code class="bg-red-500/20 text-red-200 px-3 py-1.5 rounded-full text-sm">{tag}</code>
					{/each}
				</div>
			</div>
		</div>
	</div>
</dialog>

<style>
</style>
