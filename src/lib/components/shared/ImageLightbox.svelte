<!-- src/lib/components/shared/ImageLightbox.svelte -->
<script lang="ts">
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

	onMount(() => {
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		document.body.style.overflow = 'unset';
		window.removeEventListener('keydown', handleKeydown);
	});
</script>

<div class="fixed inset-0 z-50 bg-black/90 flex">
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
			<img
				src={currentImage.url}
				alt={currentImage.alt}
				class="max-h-full max-w-full object-contain"
			/>

			<!-- Image counter -->
			<div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
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
</div>
