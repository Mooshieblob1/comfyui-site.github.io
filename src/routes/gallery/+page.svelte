<!-- src/routes/gallery/+page.svelte -->
<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import PageWrapper from '$lib/components/layout/PageWrapper.svelte';
	import { Loader2 } from 'lucide-svelte';
	import ImageLightbox from '$lib/components/shared/ImageLightbox.svelte';

	interface ImageVariant {
		type: string;
		url: string;
		width: number;
		height: number;
		file_ext: string;
	}

	interface AIPost {
		id: number;
		file_url: string;
		tag_string_general: string;
		tag_string_character: string;
		tag_string_copyright: string;
		tag_string_artist: string;
		tag_string_meta: string;
		tag_string_model: string;
		score: number;
		rating: string;
		media_asset: {
			variants: ImageVariant[];
		};
	}

	let posts: AIPost[] = [];
	let loading = true;
	let error: string | null = null;
	let selectedImageIndex: number | null = null;

	// Helper function to get the 720p WebP preview image URL
	function getPreviewUrl(post: AIPost): string {
		if (!post.media_asset?.variants) return post.file_url;

		// Find the 720x720 WebP variant for preview
		const previewVariant = post.media_asset.variants.find((v) => v.type === '720x720');
		return previewVariant?.url || post.file_url;
	}

	// Helper function to get the original full resolution image URL
	function getLightboxUrl(post: AIPost): string {
		if (!post.media_asset?.variants) return post.file_url;

		// Find the original full resolution variant
		const originalVariant = post.media_asset.variants.find((v) => v.type === 'original');
		return originalVariant?.url || post.file_url;
	}

	async function fetchPosts() {
		try {
			loading = true;
			const response = await fetch(
				'https://aibooru.online/posts.json?tags=rating%3Ageneral+blob_%28artist%29+~illustrious-xl+~comfyui'
			);
			if (!response.ok) {
				throw new Error('Failed to fetch posts');
			}
			posts = await response.json();
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}

	// Format the posts data for the lightbox
	$: lightboxImages = posts.map((post) => ({
		url: getLightboxUrl(post),
		alt: post.tag_string_general,
		tags: {
			general: post.tag_string_general,
			character: post.tag_string_character,
			copyright: post.tag_string_copyright,
			artist: post.tag_string_artist,
			meta: post.tag_string_meta,
			model: post.tag_string_model
		}
	}));

	function handleImageClick(index: number) {
		selectedImageIndex = index;
	}

	// Fetch posts when component mounts
	fetchPosts();
</script>

<Navbar activeSection="gallery" />
<PageWrapper title="Community Gallery">
	{#if loading}
		<div class="flex justify-center items-center h-64">
			<Loader2 class="w-8 h-8 animate-spin text-indigo-600" />
		</div>
	{:else if error}
		<div
			class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400"
		>
			<p>Error loading gallery: {error}</p>
		</div>
	{:else}
		<div class="pb-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each posts as post, index}
				<div
					class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
					on:click={() => handleImageClick(index)}
					on:keydown={(e) => e.key === 'Enter' && handleImageClick(index)}
					role="button"
					tabindex="0"
				>
					<div class="aspect-w-3 aspect-h-4 bg-gray-100 dark:bg-gray-700">
						<img
							src={getPreviewUrl(post)}
							alt={post.tag_string_general}
							class="object-cover w-full h-full"
							loading="lazy"
						/>
					</div>
					<div class="p-3">
						<h3 class="text-sm font-semibold text-gray-900 dark:text-white truncate">
							{post.tag_string_general.split(' ')[0]}
						</h3>
						<p class="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
							{post.tag_string_general.split(' ').slice(1, 4).join(', ')}
						</p>
						<div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
							<p>Score: {post.score}</p>
							<p>Rating: {post.rating.toUpperCase()}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</PageWrapper>

{#if selectedImageIndex !== null}
	<ImageLightbox
		images={lightboxImages}
		initialIndex={selectedImageIndex}
		onClose={() => (selectedImageIndex = null)}
	/>
{/if}
