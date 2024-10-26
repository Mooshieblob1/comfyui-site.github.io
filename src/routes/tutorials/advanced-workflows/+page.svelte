<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import PageWrapper from '$lib/components/layout/PageWrapper.svelte';

	const workflows = [
		{
			title: 'ControlNet Integration',
			description: 'Learn how to use ControlNet for precise control over your generations.',
			steps: [
				'Add a "Load Image" node for your control image',
				'Add appropriate preprocessor node (e.g., "Canny Edge Detection")',
				'Load ControlNet model using "Load ControlNet" node',
				'Connect preprocessed image and ControlNet model to main generation pipeline'
			]
		},
		{
			title: 'Multi-Stage Generation',
			description: 'Create complex images using multiple generation stages.',
			steps: [
				'Set up initial generation workflow',
				'Add "VAE Encode" to convert output back to latent space',
				'Create second stage KSampler with refined prompts',
				'Use masks or specific areas for targeted refinement'
			]
		},
		{
			title: 'LoRA and Embedding Integration',
			description: 'Enhance your generations with custom models and embeddings.',
			steps: [
				'Load base model with "Load Checkpoint"',
				'Add "LoRA Loader" nodes for each LoRA',
				'Configure LoRA weights for optimal effect',
				'Use textual inversions in your prompts'
			]
		},
		{
			title: 'Upscaling and Post-Processing',
			description: 'Improve the quality and resolution of your generated images.',
			steps: [
				'Generate base image at standard resolution',
				'Add upscaler node (e.g., "Upscale Image")',
				'Apply face restoration if needed',
				'Add final post-processing nodes (contrast, sharpening, etc.)'
			]
		}
	];
</script>

<Navbar activeSection="tutorials" />
<PageWrapper title="Advanced Workflows">
	<div class="space-y-8">
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
				Advanced ComfyUI Workflows
			</h2>
			<p class="text-gray-600 dark:text-gray-300">
				Take your ComfyUI skills to the next level with these advanced workflow techniques. Learn
				how to combine different nodes and models for more complex and controlled generations.
			</p>
		</div>

		{#each workflows as workflow}
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{workflow.title}</h3>
				<p class="text-gray-600 dark:text-gray-300 mb-4">{workflow.description}</p>

				<div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
					<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
						Implementation Steps:
					</h4>
					<ol class="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-200">
						{#each workflow.steps as step}
							<li>{step}</li>
						{/each}
					</ol>
				</div>
			</div>
		{/each}
	</div>
</PageWrapper>
