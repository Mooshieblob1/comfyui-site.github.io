<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import PageWrapper from '$lib/components/layout/PageWrapper.svelte';

	const steps = [
		{
			title: 'Loading a Model',
			content: 'First, we need to load our base model and the required VAE.',
			details: [
				'Click the "Add Node" button or right-click in the workspace',
				'Search for "Load Checkpoint" and add it to your workspace',
				'Select your desired model from the dropdown (e.g., "sd_xl_base_1.0.safetensors")',
				'Add a "VAE Decode" node - this will be connected later'
			]
		},
		{
			title: 'Setting Up Text Prompts',
			content: 'Create positive and negative prompt nodes to guide the image generation.',
			details: [
				'Add a "CLIPTextEncode" node for your positive prompt',
				'Add another "CLIPTextEncode" node for your negative prompt',
				"Connect both to the Load Checkpoint node's CLIP output",
				'Enter your desired prompts in each node'
			]
		},
		{
			title: 'Configuring Generation Parameters',
			content: 'Set up the parameters that control how your image will be generated.',
			details: [
				'Add a "KSampler" node to control the generation process',
				'Set your desired steps (20-30 is a good starting point)',
				'Choose your preferred sampler (Euler a is commonly used)',
				'Set an appropriate CFG Scale (7-8 works well for most cases)',
				'Connect your checkpoint, positive prompt, and negative prompt nodes'
			]
		},
		{
			title: 'Image Output Setup',
			content: 'Configure the final steps to generate and save your image.',
			details: [
				'Connect the KSampler output to your VAE Decode node',
				'Add a "Save Image" node and connect it to the VAE Decode output',
				'Configure your desired save location and file format',
				'Your workflow is now ready to generate images!'
			]
		}
	];
</script>

<Navbar activeSection="tutorials" />
<PageWrapper title="Basic Image Generation">
	<div class="space-y-8">
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
				Getting Started with Basic Image Generation
			</h2>
			<p class="text-gray-600 dark:text-gray-300">
				Learn how to create your first image using ComfyUI's node-based interface. This tutorial
				will walk you through the essential steps of setting up a basic generation workflow.
			</p>
		</div>

		{#each steps as step, index}
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
				<div class="flex items-center gap-4 mb-4">
					<div
						class="flex-shrink-0 w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold"
					>
						{index + 1}
					</div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
				</div>
				<p class="text-gray-600 dark:text-gray-300 mb-4">{step.content}</p>
				<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
					{#each step.details as detail}
						<li>{detail}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</PageWrapper>
