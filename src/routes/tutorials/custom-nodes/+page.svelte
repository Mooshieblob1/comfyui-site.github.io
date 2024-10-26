<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import PageWrapper from '$lib/components/layout/PageWrapper.svelte';

	const sections = [
		{
			title: 'Understanding Custom Nodes',
			content:
				"Custom nodes allow you to extend ComfyUI's functionality with your own processing logic and UI elements.",
			points: [
				'Nodes are Python classes that inherit from ComfyNode',
				'Each node can define inputs, outputs, and processing logic',
				'Nodes can include custom UI elements and controls',
				'Nodes are loaded dynamically when ComfyUI starts'
			]
		},
		{
			title: 'Setting Up Development Environment',
			content: 'Prepare your environment for custom node development.',
			points: [
				"Create a new directory in ComfyUI's custom_nodes folder",
				'Set up a basic Python development environment',
				'Install required ComfyUI dependencies',
				'Create necessary file structure for your custom node'
			]
		},
		{
			title: 'Creating Your First Custom Node',
			content: 'Learn the basic structure and implementation of a custom node.',
			points: [
				'Define node class and inheritance',
				'Implement RETURN_TYPES and FUNCTION',
				'Create input and output specifications',
				'Add processing logic to your node'
			],
			codeExample: `
class ExampleNode:
    def __init__(self):
        pass
        
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "input_1": ("STRING", {
                    "multiline": False
                }),
                "input_2": ("INT", {
                    "default": 0,
                    "min": 0,
                    "max": 100
                }),
            },
        }
    
    RETURN_TYPES = ("STRING",)
    FUNCTION = "process"
    
    def process(self, input_1, input_2):
        # Your processing logic here
        result = f"{input_1} processed with {input_2}"
        return (result,)
      `
		},
		{
			title: 'Advanced Node Features',
			content: 'Explore advanced features and capabilities for custom nodes.',
			points: [
				'Adding custom UI widgets and controls',
				'Implementing complex processing pipelines',
				'Working with image and tensor data',
				'Creating nodes with multiple outputs'
			]
		}
	];
</script>

<Navbar activeSection="tutorials" />
<PageWrapper title="Custom Node Creation">
	<div class="space-y-8">
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
				Creating Custom Nodes
			</h2>
			<p class="text-gray-600 dark:text-gray-300">
				Learn how to extend ComfyUI's functionality by creating your own custom nodes. This guide
				will walk you through the process of developing, testing, and implementing custom nodes.
			</p>
		</div>

		{#each sections as section}
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{section.title}</h3>
				<p class="text-gray-600 dark:text-gray-300 mb-4">{section.content}</p>

				<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 mb-4">
					{#each section.points as point}
						<li>{point}</li>
					{/each}
				</ul>

				{#if section.codeExample}
					<div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
						<h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Example Code:</h4>
						<pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
              <code>{section.codeExample}</code>
            </pre>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</PageWrapper>
