<!-- src/lib/components/shared/ImageLightbox.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { X, ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let images: { url: string; alt: string }[];
	export let initialIndex = 0;
	export let onClose: () => void;

	let currentIndex = initialIndex;
	$: currentImage = images[currentIndex];

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

	onMount(() => {
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		document.body.style.overflow = 'unset';
		window.removeEventListener('keydown', handleKeydown);
	});
</script>

<div class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
	<!-- Close button -->
	<button on:click={onClose} class="absolute top-4 right-4 p-2 text-white hover:text-gray-300">
		<X class="w-6 h-6" />
	</button>

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
		class="absolute right-4 p-2 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
	>
		<ChevronRight class="w-8 h-8" />
	</button>

	<!-- Image container -->
	<div class="w-full h-full p-8 flex items-center justify-center">
		<img
			src={currentImage.url}
			alt={currentImage.alt}
			class="max-h-full max-w-full object-contain"
		/>
	</div>

	<!-- Image counter -->
	<div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
		{currentIndex + 1} / {images.length}
	</div>
</div>
