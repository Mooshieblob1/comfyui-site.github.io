<!-- src/routes/getting-started/+page.svelte -->
<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import PageWrapper from '$lib/components/layout/PageWrapper.svelte';
	import { ClipboardCopy } from 'lucide-svelte';

	interface CodeStep {
		text: string;
		code: string;
	}

	interface Section {
		title: string;
		content: string;
		steps?: (string | CodeStep)[];
		topics?: string[];
	}

	const sections: Section[] = [
		{
			title: 'Installation',
			content: 'Learn how to install and set up ComfyUI on your system.',
			steps: [
				'Install Python 3.10 or higher',
				'Clone the ComfyUI repository',
				{
					text: 'Clone URL:',
					code: 'git clone https://github.com/comfyanonymous/ComfyUI'
				},
				'Install required dependencies',
				'Download necessary model files'
			]
		},
		{
			title: 'Basic Concepts',
			content: 'Understand the fundamental concepts of ComfyUI and its node-based interface.',
			topics: ['Node system basics', 'Workflow creation', 'Model loading', 'Image generation']
		}
	];

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};
</script>

<Navbar activeSection="getting-started" />
<PageWrapper title="Getting Started with ComfyUI">
	<div class="max-w-4xl mx-auto pb-6 space-y-8">
		{#each sections as section}
			<section class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
				<div
					class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-6 py-4"
				>
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h2>
					<p class="mt-2 text-gray-600 dark:text-gray-300">{section.content}</p>
				</div>

				<div class="p-6">
					{#if section.steps}
						<div class="space-y-4">
							{#each section.steps as step, i}
								<div class="relative pl-8">
									<div
										class="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-sm font-medium"
									>
										{i + 1}
									</div>
									{#if typeof step === 'string'}
										<p class="text-gray-700 dark:text-gray-200">{step}</p>
									{:else}
										<div>
											<p class="text-gray-700 dark:text-gray-200 mb-2">{step.text}</p>
											<div class="relative group">
												<div class="flex items-center gap-2 mb-2">
													<button
														type="button"
														class="p-1.5 rounded-md bg-gray-800 text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
														on:click={() => copyToClipboard(step.code)}
														aria-label="Copy code to clipboard"
													>
														<ClipboardCopy class="w-4 h-4" />
													</button>
													<span class="text-sm text-gray-500 dark:text-gray-400">Copy command</span>
												</div>
												<pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <code class="text-sm font-mono text-gray-200">{step.code}</code>
        </pre>
											</div>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
					{#if section.topics}
						<div class="grid gap-4 sm:grid-cols-2">
							{#each section.topics as topic}
								<div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
									<p class="text-gray-700 dark:text-gray-200">{topic}</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</section>
		{/each}
	</div>
</PageWrapper>
