<!-- src/routes/gallery/+page.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
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
	let intersectionObserver: IntersectionObserver | null = null;
	let selectedTags: Set<string> = new Set();
	let allTags: Map<string, { count: number; category: string }> = new Map();
	let filteredPosts: AIPost[] = [];
	let tagFeedback: { message: string; type: 'added' | 'removed' } | null = null;
	let feedbackTimeout: number | null = null;

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
				'https://aibooru.online/posts.json?tags=rating%3Ageneral+blob_%28artist%29+comfyui'
			);
			if (!response.ok) {
				throw new Error('Failed to fetch posts');
			}
			posts = await response.json();
			extractTags();
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}

	// Extract and categorize all tags from posts
	function extractTags() {
		allTags.clear();

		posts.forEach((post) => {
			// Process different tag categories
			addTagsFromString(post.tag_string_general, 'general');
			addTagsFromString(post.tag_string_character, 'character');
			addTagsFromString(post.tag_string_copyright, 'copyright');
			addTagsFromString(post.tag_string_artist, 'artist');
			addTagsFromString(post.tag_string_meta, 'meta');
			addTagsFromString(post.tag_string_model, 'model');
		});
	}

	// Helper function to add tags from a tag string
	function addTagsFromString(tagString: string, category: string) {
		if (!tagString) return;

		const tags = tagString.split(' ').filter((tag) => tag.length > 0);
		tags.forEach((tag) => {
			const normalizedTag = tag.toLowerCase().trim();
			if (normalizedTag) {
				if (allTags.has(normalizedTag)) {
					allTags.get(normalizedTag)!.count++;
				} else {
					allTags.set(normalizedTag, { count: 1, category });
				}
			}
		});
	}

	// Filter posts based on selected tags
	function filterPosts() {
		if (selectedTags.size === 0) {
			filteredPosts = posts;
			return;
		}

		filteredPosts = posts.filter((post) => {
			const postTags = new Set(
				[
					...post.tag_string_general.toLowerCase().split(' '),
					...post.tag_string_character.toLowerCase().split(' '),
					...post.tag_string_copyright.toLowerCase().split(' '),
					...post.tag_string_artist.toLowerCase().split(' '),
					...post.tag_string_meta.toLowerCase().split(' '),
					...post.tag_string_model.toLowerCase().split(' ')
				].filter((tag) => tag.length > 0)
			);

			// Check if post contains all selected tags
			return Array.from(selectedTags).every((tag) => postTags.has(tag));
		});
	}

	// Toggle tag selection
	function toggleTag(tag: string) {
		const normalizedTag = tag.toLowerCase().trim();
		let action: 'added' | 'removed';

		if (selectedTags.has(normalizedTag)) {
			selectedTags.delete(normalizedTag);
			action = 'removed';
		} else {
			selectedTags.add(normalizedTag);
			action = 'added';
		}
		selectedTags = selectedTags; // Trigger reactivity
		filterPosts();

		return action;
	}

	// Clear all selected tags
	function clearTags() {
		selectedTags.clear();
		selectedTags = selectedTags; // Trigger reactivity
		filterPosts();
	}

	// Get sorted tags by popularity
	function getSortedTags(category?: string, limit = 50) {
		let tagsArray = Array.from(allTags.entries());

		if (category) {
			tagsArray = tagsArray.filter(([, data]) => data.category === category);
		}

		return tagsArray
			.sort(([, a], [, b]) => b.count - a.count)
			.slice(0, limit)
			.map(([tag, data]) => ({ tag, ...data }));
	}

	// Reactive statement to update filtered posts when posts change
	$: {
		posts;
		filterPosts();
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

	// Handle tag click from lightbox
	function handleLightboxTagClick(tag: string) {
		const action = toggleTag(tag);

		// Show feedback
		tagFeedback = {
			message: action === 'added' ? `Filter added: "${tag}"` : `Filter removed: "${tag}"`,
			type: action
		};

		// Clear any existing timeout
		if (feedbackTimeout) {
			clearTimeout(feedbackTimeout);
		}

		// Clear feedback after 3 seconds
		feedbackTimeout = setTimeout(() => {
			tagFeedback = null;
			feedbackTimeout = null;
		}, 3000);

		// Optionally close lightbox after selecting a tag (uncomment if desired)
		// selectedImageIndex = null;
	}

	// Set up intersection observer for enhanced lazy loading
	function setupIntersectionObserver() {
		if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
			intersectionObserver = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const img = entry.target as HTMLImageElement;
							if (img.dataset.src && !img.src.includes(img.dataset.src)) {
								img.src = img.dataset.src;
								img.style.opacity = '0';
								img.onload = () => {
									img.style.opacity = '1';
								};
							}
							intersectionObserver?.unobserve(img);
						}
					});
				},
				{
					rootMargin: '50px',
					threshold: 0.1
				}
			);
		}
	}

	// Observe images for lazy loading
	function observeImage(node: HTMLImageElement) {
		if (intersectionObserver) {
			intersectionObserver.observe(node);
		}
		return {
			destroy() {
				if (intersectionObserver) {
					intersectionObserver.unobserve(node);
				}
			}
		};
	}

	// Fetch posts when component mounts
	onMount(() => {
		setupIntersectionObserver();
		fetchPosts();
	});

	// Cleanup intersection observer on destroy
	onDestroy(() => {
		if (intersectionObserver) {
			intersectionObserver.disconnect();
		}
		if (feedbackTimeout) {
			clearTimeout(feedbackTimeout);
		}
	});
</script>

<Navbar activeSection="gallery" />
<PageWrapper title="Community Gallery">
	<!-- Tag Feedback Notification -->
	{#if tagFeedback}
		<div
			class="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 {tagFeedback.type ===
			'added'
				? 'bg-green-500 text-white'
				: 'bg-red-500 text-white'}"
			style="animation: slideIn 0.3s ease-out;"
		>
			{tagFeedback.message}
		</div>
	{/if}

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
		<!-- Tag Filter Section -->
		<div class="mb-6 space-y-4">
			<!-- Selected Tags Display -->
			{#if selectedTags.size > 0}
				<div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
					<div class="flex flex-wrap items-center gap-2 mb-2">
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Selected:</span>
						{#each Array.from(selectedTags) as tag}
							<button
								on:click={() => toggleTag(tag)}
								class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
							>
								{tag}
								<span class="ml-1 text-indigo-600 dark:text-indigo-300">×</span>
							</button>
						{/each}
						<button
							on:click={clearTags}
							class="text-xs text-red-600 dark:text-red-400 hover:underline ml-2"
						>
							Clear all
						</button>
					</div>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						Showing {filteredPosts.length} of {posts.length} images
					</p>
				</div>
			{/if}

			<!-- Popular Tags -->
			<div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Popular Tags</h3>
				<div class="space-y-3">
					{#each ['general', 'character', 'artist', 'copyright', 'model'] as category}
						{@const categoryTags = getSortedTags(category, 20)}
						{#if categoryTags.length > 0}
							<div>
								<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
									{category}
								</h4>
								<div class="flex flex-wrap gap-1">
									{#each categoryTags as { tag, count }}
										<button
											on:click={() => toggleTag(tag)}
											class="inline-flex items-center px-2 py-1 rounded text-xs transition-colors
												{selectedTags.has(tag)
												? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
												: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
										>
											{tag}
											<span class="ml-1 text-xs opacity-75">({count})</span>
										</button>
									{/each}
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
		<div class="pb-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each filteredPosts as post, index}
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
							class="object-cover w-full h-full transition-opacity duration-300"
							loading="lazy"
							decoding="async"
							on:load={(e) => {
								const target = e.target as HTMLImageElement;
								if (target) target.style.opacity = '1';
							}}
							style="opacity: 0;"
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
		onTagClick={handleLightboxTagClick}
	/>
{/if}

<style>
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(100%);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
