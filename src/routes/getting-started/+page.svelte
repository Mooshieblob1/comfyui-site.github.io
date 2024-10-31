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
					<p class="text-gray-600 dark:text-gray-300">{section.content}</p>
				</div>
				<div class="p-6 space-y-4">
					{#if section.steps}
						<ol class="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-200">
							{#each section.steps as step}
								<li>
									{#if typeof step === 'string'}
										{step}
									{:else}
										<div class="flex items-center justify-between">
											<span>{step.text}</span>
											<button
												on:click={() => copyToClipboard(step.code)}
												class="text-blue-500 hover:underline"
											>
												<ClipboardCopy class="inline-block w-5 h-5 mr-1" /> Copy
											</button>
										</div>
										<pre class="bg-gray-100 dark:bg-gray-900 rounded p-2 text-sm">{step.code}</pre>
									{/if}
								</li>
							{/each}
						</ol>
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
