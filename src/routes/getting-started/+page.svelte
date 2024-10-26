<!-- src/routes/getting-started/+page.svelte -->
<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import PageWrapper from '$lib/components/layout/PageWrapper.svelte';

	const sections = [
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
</script>

<Navbar activeSection="getting-started" />
<PageWrapper title="Getting Started with ComfyUI">
	<div class="pb-6 space-y-8">
		{#each sections as section}
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">{section.title}</h2>
				<p class="text-gray-600 dark:text-gray-300 mb-4">{section.content}</p>

				<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
					{#if section.steps}
						{#each section.steps as step}
							{#if typeof step === 'string'}
								<li>{step}</li>
							{:else}
								<li>
									{step.text}
									<code
										class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono mt-1 block"
									>
										{step.code}
									</code>
								</li>
							{/if}
						{/each}
					{/if}
					{#if section.topics}
						{#each section.topics as topic}
							<li>{topic}</li>
						{/each}
					{/if}
				</ul>
			</div>
		{/each}
	</div>
</PageWrapper>
