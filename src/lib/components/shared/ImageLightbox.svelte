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
	export let onTagClick: ((tag: string) => void) | undefined = undefined;

	let currentIndex = initialIndex;
	$: currentImage = images[currentIndex];

	let mainImage: HTMLImageElement;
	let isLoading = false;
	let preloadedImages = new Set<number>();
	let clickedTag: string | null = null;
	let tagFeedbackTimeout: number | null = null;

	const [send, receive] = crossfade({ duration: 500 });

	// Get indices of images to preload (reduced range for better performance)
	$: preloadIndices = [currentIndex - 1, currentIndex + 1, currentIndex + 2].filter(
		(i) => i >= 0 && i < images.length && !preloadedImages.has(i)
	);

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

	function handleTagClick(tag: string) {
		if (onTagClick) {
			onTagClick(tag);

			// Show feedback
			clickedTag = tag;

			// Clear any existing timeout
			if (tagFeedbackTimeout) {
				clearTimeout(tagFeedbackTimeout);
			}

			// Clear feedback after 2 seconds
			tagFeedbackTimeout = setTimeout(() => {
				clickedTag = null;
				tagFeedbackTimeout = null;
			}, 2000);
		}
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
		// Clear preloaded images set
		preloadedImages.clear();
		// Clear tag feedback timeout
		if (tagFeedbackTimeout) {
			clearTimeout(tagFeedbackTimeout);
		}
	});

	// Preload images function with better memory management
	function preloadImages(indices: number[]) {
		indices.forEach((index) => {
			if (index >= 0 && index < images.length && !preloadedImages.has(index)) {
				const img = new Image();
				img.src = images[index].url;
				img.onload = () => {
					preloadedImages.add(index);
				};
				img.onerror = () => {
					console.warn(`Failed to preload image at index ${index}`);
				};
				// Don't append to DOM, just keep in memory
			}
		});
	}

	// Reactive statement to trigger preloading when currentIndex changes
	$: {
		if (preloadIndices.length > 0) {
			// Use requestIdleCallback for better performance, fallback to setTimeout
			if ('requestIdleCallback' in window) {
				requestIdleCallback(() => preloadImages(preloadIndices));
			} else {
				setTimeout(() => preloadImages(preloadIndices), 100);
			}
		}
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

	<!-- Tag added feedback toast -->
	{#if clickedTag}
		<div
			class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce"
		>
			<div class="flex items-center gap-2">
				<span class="text-sm">✓ Added "{clickedTag}" to filter</span>
			</div>
		</div>
	{/if}

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
				{#if isLoading}
					<div class="absolute inset-0 flex items-center justify-center">
						<div
							class="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"
						></div>
					</div>
				{/if}
				<div class="absolute inset-0 flex items-center justify-center">
					{#each [currentImage] as image (currentIndex)}
						<img
							bind:this={mainImage}
							src={image.url}
							alt={image.alt}
							class="max-h-full max-w-full absolute transition-opacity duration-300"
							class:opacity-0={isLoading}
							class:opacity-100={!isLoading}
							in:send={{ key: currentIndex }}
							out:receive={{ key: currentIndex }}
							on:load={handleImageLoad}
							on:error={() => (isLoading = false)}
							loading="eager"
							decoding="async"
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
						<button
							on:click={() => handleTagClick(tag)}
							class="px-3 py-1.5 rounded-full text-sm transition-all duration-200 cursor-pointer relative
								{clickedTag === tag
								? 'bg-green-500/40 text-green-100 scale-105'
								: 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30'}"
							class:cursor-pointer={onTagClick}
							disabled={!onTagClick}
						>
							{tag}
							{#if clickedTag === tag}
								<span class="absolute -top-1 -right-1 text-xs">✓</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- Character -->
			<div>
				<h3 class="text-white font-semibold mb-3">Character</h3>
				<div class="flex flex-wrap gap-2">
					{#each formatTags(currentImage.tags.character) as tag}
						<button
							on:click={() => handleTagClick(tag)}
							class="px-3 py-1.5 rounded-full text-sm transition-all duration-200 cursor-pointer relative
								{clickedTag === tag
								? 'bg-green-500/40 text-green-100 scale-105'
								: 'bg-blue-500/20 text-blue-200 hover:bg-blue-500/30'}"
							class:cursor-pointer={onTagClick}
							disabled={!onTagClick}
						>
							{tag}
							{#if clickedTag === tag}
								<span class="absolute -top-1 -right-1 text-xs">✓</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- Copyright -->
			<div>
				<h3 class="text-white font-semibold mb-3">Copyright</h3>
				<div class="flex flex-wrap gap-2">
					{#each formatTags(currentImage.tags.copyright) as tag}
						<button
							on:click={() => handleTagClick(tag)}
							class="px-3 py-1.5 rounded-full text-sm transition-all duration-200 cursor-pointer relative
								{clickedTag === tag
								? 'bg-green-500/40 text-green-100 scale-105'
								: 'bg-yellow-500/20 text-yellow-200 hover:bg-yellow-500/30'}"
							class:cursor-pointer={onTagClick}
							disabled={!onTagClick}
						>
							{tag}
							{#if clickedTag === tag}
								<span class="absolute -top-1 -right-1 text-xs">✓</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- Model -->
			<div>
				<h3 class="text-white font-semibold mb-3">Model</h3>
				<div class="flex flex-wrap gap-2">
					{#each formatTags(currentImage.tags.model) as tag}
						<button
							on:click={() => handleTagClick(tag)}
							class="px-3 py-1.5 rounded-full text-sm transition-all duration-200 cursor-pointer relative
								{clickedTag === tag
								? 'bg-green-500/40 text-green-100 scale-105'
								: 'bg-green-500/20 text-green-200 hover:bg-green-500/30'}"
							class:cursor-pointer={onTagClick}
							disabled={!onTagClick}
						>
							{tag}
							{#if clickedTag === tag}
								<span class="absolute -top-1 -right-1 text-xs">✓</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- Meta -->
			<div>
				<h3 class="text-white font-semibold mb-3">Meta</h3>
				<div class="flex flex-wrap gap-2">
					{#each formatTags(currentImage.tags.meta) as tag}
						<button
							on:click={() => handleTagClick(tag)}
							class="px-3 py-1.5 rounded-full text-sm transition-all duration-200 cursor-pointer relative
								{clickedTag === tag
								? 'bg-green-500/40 text-green-100 scale-105'
								: 'bg-gray-500/20 text-gray-200 hover:bg-gray-500/30'}"
							class:cursor-pointer={onTagClick}
							disabled={!onTagClick}
						>
							{tag}
							{#if clickedTag === tag}
								<span class="absolute -top-1 -right-1 text-xs">✓</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- General -->
			<div>
				<h3 class="text-white font-semibold mb-3">General</h3>
				<div class="flex flex-wrap gap-2">
					{#each formatTags(currentImage.tags.general) as tag}
						<button
							on:click={() => handleTagClick(tag)}
							class="px-3 py-1.5 rounded-full text-sm transition-all duration-200 cursor-pointer relative
								{clickedTag === tag
								? 'bg-green-500/40 text-green-100 scale-105'
								: 'bg-red-500/20 text-red-200 hover:bg-red-500/30'}"
							class:cursor-pointer={onTagClick}
							disabled={!onTagClick}
						>
							{tag}
							{#if clickedTag === tag}
								<span class="absolute -top-1 -right-1 text-xs">✓</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</dialog>

<style>
</style>
