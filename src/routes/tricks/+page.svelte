<!-- src/routes/tricks/+page.svelte -->
<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import PageWrapper from '$lib/components/layout/PageWrapper.svelte';
	import { ChevronDown } from 'lucide-svelte';

	let openSections: Record<string, boolean> = {};

	function toggleSection(category: string) {
		openSections[category] = !openSections[category];
		openSections = { ...openSections }; // Trigger reactivity
	}

	const tips = [
		{
			category: 'Performance',
			items: [
				{
					title: 'GPU Memory Management',
					content:
						'Monitor your GPU memory usage and adjust batch sizes accordingly. Start with batch size 1 and increase gradually. If you encounter out-of-memory errors, try reducing the batch size, using lower precision models, or enabling memory-efficient attention.'
				},
				{
					title: 'Model Loading Optimization',
					content:
						'Keep frequently used models in memory when possible. Use model switching nodes to avoid reloading the same model multiple times. Consider using quantized models (4-bit, 8-bit) for better memory efficiency with minimal quality loss.'
				},
				{
					title: 'Workflow Efficiency',
					content:
						'Organize your workflow to minimize unnecessary processing. Use "Bypass" nodes to temporarily disable parts of your workflow for testing. Group related nodes together and use reroute nodes to keep connections clean and readable.'
				},
				{
					title: 'Sampling Speed',
					content:
						'Experiment with different samplers - some are faster than others. Euler A and DPM++ 2M are good balanced options. Reduce steps for faster generation (15-25 steps often sufficient). Use schedulers like Karras for better quality at lower step counts.'
				}
			]
		},
		{
			category: 'Quality Improvements',
			items: [
				{
					title: 'Prompt Engineering Techniques',
					content:
						'Be specific and descriptive in your prompts. Use comma-separated tags rather than full sentences. Include style modifiers like "highly detailed", "professional photography", or specific artist names. Place the most important elements at the beginning of your prompt.'
				},
				{
					title: 'Negative Prompts Best Practices',
					content:
						'Use negative prompts to exclude unwanted elements: "blurry, low quality, worst quality, jpeg artifacts, watermark, signature, username, text, cropped, out of frame, duplicate, mutation, deformed". Be specific about what you want to avoid rather than using generic terms.'
				},
				{
					title: 'CFG Scale Optimization',
					content:
						'Start with CFG 7-8 for most prompts. Lower values (4-6) for more creative, less literal interpretations. Higher values (10-15) for stricter prompt adherence but risk over-saturation. Adjust based on your model and desired output style.'
				},
				{
					title: 'Resolution and Aspect Ratios',
					content:
						'Use native training resolutions when possible (512x512 for SD1.5, 1024x1024 for SDXL). For different aspect ratios, maintain similar total pixel counts. Use upscaling workflows for higher resolutions rather than generating directly at very high resolutions.'
				},
				{
					title: 'Seed Management',
					content:
						'Use fixed seeds for consistent results during experimentation. Document good seeds for future use. Use seed variation (+/- small numbers) to get similar but slightly different results. Random seeds (-1) for maximum variety in outputs.'
				}
			]
		},
		{
			category: 'Workflow Management',
			items: [
				{
					title: 'Node Organization',
					content:
						'Use groups to organize related nodes visually. Color-code your groups by function (generation=blue, post-processing=green, etc.). Use clear, descriptive names for your nodes and groups. Keep input nodes on the left, outputs on the right.'
				},
				{
					title: 'Reroute and Connection Management',
					content:
						'Use reroute nodes to avoid crossing connections. Keep workflows readable by organizing connections logically. Use named reroutes for complex workflows to track data flow easily. Minimize the number of connection crossings.'
				},
				{
					title: 'Template Creation',
					content:
						'Save frequently used workflows as templates. Create modular sub-workflows that can be easily copied between projects. Document your workflows with notes nodes explaining key parameters and expected inputs/outputs.'
				},
				{
					title: 'Version Control',
					content:
						'Save incremental versions of your workflows (workflow_v1, workflow_v2, etc.). Keep a "clean" version of working workflows before major modifications. Export and backup successful workflows regularly. Use descriptive filenames that indicate the workflow\'s purpose.'
				},
				{
					title: 'Testing and Iteration',
					content:
						'Use preview nodes to check intermediate results without full generation. Create test branches in your workflow for comparing different approaches. Use switch nodes to quickly toggle between different settings or models during experimentation.'
				}
			]
		},
		{
			category: 'Advanced Techniques',
			items: [
				{
					title: 'ControlNet Integration',
					content:
						'Use ControlNet for precise control over composition, poses, and structure. Combine multiple ControlNets for complex control (pose + depth + canny). Adjust ControlNet strength (0.5-1.5) based on how much control you want vs. creative freedom.'
				},
				{
					title: 'Inpainting and Outpainting',
					content:
						'Use high-quality masks for better inpainting results. Feather mask edges for seamless blending. For outpainting, gradually extend the canvas rather than making large jumps. Use multiple inpainting passes for complex edits.'
				},
				{
					title: 'Model Mixing and LoRA Usage',
					content:
						'Experiment with model merging for unique styles. Use LoRAs at strengths between 0.5-1.0 for best results. Stack multiple LoRAs but keep total strength reasonable. Use trigger words for LoRAs when specified by the creator.'
				},
				{
					title: 'Custom Schedulers and Sampling',
					content:
						'Experiment with custom noise schedules for different effects. Use different samplers for different stages (fast sampler for early steps, quality sampler for final steps). Consider using multiple sampling passes with different parameters.'
				}
			]
		}
	];
</script>

<Navbar activeSection="tricks" />
<PageWrapper title="Tips & Tricks">
	<div class="pb-6 space-y-4">
		{#each tips as section}
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
				<button
					class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
					on:click={() => toggleSection(section.category)}
				>
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white">
						{section.category}
					</h2>
					<ChevronDown
						class="h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 {openSections[
							section.category
						]
							? 'rotate-180'
							: ''}"
					/>
				</button>

				{#if openSections[section.category]}
					<div class="px-6 pt-4 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
						{#each section.items as item}
							<div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
								<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
									{item.title}
								</h3>
								<p class="text-gray-700 dark:text-gray-200 leading-relaxed">
									{item.content}
								</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</PageWrapper>
