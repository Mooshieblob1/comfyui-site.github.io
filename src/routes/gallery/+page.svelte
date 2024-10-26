<!-- src/routes/gallery/+page.svelte -->
<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import PageWrapper from '$lib/components/layout/PageWrapper.svelte';
	import { Loader2 } from 'lucide-svelte';

	interface AIPost {
		id: number;
		file_url: string;
		tag_string_general: string;
		score: number;
		rating: string;
	}

	let posts: AIPost[] = [];
	let loading = true;
	let error: string | null = null;

	async function fetchPosts() {
		try {
			loading = true;
			const response = await fetch(
				'https://aibooru.online/posts.json?limit=20&tags=rating:general'
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
		<div class="pb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each posts as post}
				<div
					class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
				>
					<div class="aspect-w-3 aspect-h-4 bg-gray-100 dark:bg-gray-700">
						{#if post.file_url}
							<img
								src={post.file_url}
								alt={post.tag_string_general}
								class="object-cover w-full h-full"
								loading="lazy"
							/>
						{:else}
							<div class="flex items-center justify-center text-gray-400 dark:text-gray-500">
								<span>No preview available</span>
							</div>
						{/if}
					</div>
					<div class="p-4">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
							{post.tag_string_general.split(' ')[0]}
						</h3>
						<p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
							{post.tag_string_general.split(' ').slice(1, 4).join(', ')}
						</p>
						<div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
							<p>Score: {post.score}</p>
							<p>Rating: {post.rating.toUpperCase()}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</PageWrapper>