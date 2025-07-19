<!-- src/routes/tutorials/+page.svelte -->
<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import PageWrapper from '$lib/components/layout/PageWrapper.svelte';
	import { X, ChevronRight } from 'lucide-svelte';

	let selectedTutorial: any = null;

	const tutorials = [
		{
			title: 'Basic Text-to-Image Generation',
			description: 'Master the fundamentals of generating images from text prompts in ComfyUI.',
			category: 'Beginner',
			content: {
				intro:
					"This tutorial covers the essential workflow for generating images from text descriptions. You'll learn how to connect the core nodes and understand the basic generation pipeline in ComfyUI.",
				steps: [
					{
						title: 'Setting Up the Model Pipeline',
						content: 'Create the foundation of your generation workflow with checkpoint loading.',
						details: [
							'Right-click in the workspace and search for "Load Checkpoint" node',
							'Select a Stable Diffusion model (SDXL models work great for beginners)',
							'The checkpoint outputs MODEL, CLIP, and VAE - these are the core components',
							'MODEL handles the actual image generation process',
							'CLIP processes text into tokens the model understands',
							'VAE converts between pixel space and latent space'
						]
					},
					{
						title: 'Creating Text Encoders',
						content: 'Transform your text prompts into data the model can understand.',
						details: [
							'Add two "CLIP Text Encode (Prompt)" nodes - one for positive, one for negative',
							'Connect the CLIP output from your checkpoint to both text encoders',
							'In the positive encoder, write descriptive prompts like "a serene mountain landscape, golden hour lighting, photorealistic"',
							'In the negative encoder, add unwanted elements like "blurry, low quality, distorted, watermark"',
							'Use specific keywords: "masterpiece, best quality" boost positive results',
							'Negative prompts help avoid common AI artifacts'
						]
					},
					{
						title: 'Configuring the Sampler',
						content: 'Set up the KSampler to control how your image is generated.',
						details: [
							'Add a "KSampler" node - this is where the magic happens',
							'Connect MODEL from checkpoint to model input',
							'Connect positive and negative text encoders to conditioning inputs',
							'Set steps to 20-50 (more steps = better quality but slower)',
							'Choose sampler method: "euler" or "dpmpp_2m" are reliable choices',
							'Set scheduler to "normal" or "karras" for smooth generation',
							'CFG Scale 7-12: higher values follow prompt more strictly',
							'Use a random seed or set specific value for reproducible results'
						]
					},
					{
						title: 'Adding Empty Latent and Decoding',
						content: 'Create the image canvas and convert to viewable format.',
						details: [
							'Add "Empty Latent Image" node to define your image dimensions',
							'Set width/height (512x512 for SD1.5, 1024x1024 for SDXL)',
							"Connect to KSampler's latent_image input",
							'Add "VAE Decode" node after the KSampler',
							'Connect KSampler output to VAE Decode input',
							'Connect VAE output from checkpoint to VAE Decode',
							'Finally, add "Preview Image" or "Save Image" to see results'
						]
					},
					{
						title: 'Testing and Refinement',
						content: 'Generate your first image and learn to improve results.',
						details: [
							'Click "Queue Prompt" to start generation',
							'Monitor the progress in the console',
							'If results are unsatisfactory, try adjusting CFG scale first',
							'Experiment with different samplers and step counts',
							'Refine your prompts - be specific about style, lighting, and composition',
							'Save successful workflows using "Save" in the menu',
							'Document good parameter combinations for future use'
						]
					}
				]
			}
		},
		{
			title: 'Advanced Workflows & Techniques',
			description:
				'Explore powerful ComfyUI features like ControlNet, LoRA, and multi-stage generation.',
			category: 'Advanced',
			content: {
				intro:
					'Master advanced ComfyUI techniques to gain precise control over your generations. Learn to use ControlNet for guided generation, integrate LoRA models for style control, and create complex multi-stage workflows.',
				workflows: [
					{
						title: 'ControlNet Integration',
						description:
							'Use ControlNet to guide generation with structural input like edges, depth, or poses.',
						steps: [
							'Install ControlNet models in ComfyUI/models/controlnet/ directory',
							'Add "Load ControlNet Model" node and select appropriate model (Canny, OpenPose, Depth, etc.)',
							'For Canny: Add "Load Image" → "Canny Edge" → connect to ControlNet Apply',
							'For OpenPose: Add "Load Image" → "OpenPose Preprocessor" → connect to ControlNet Apply',
							'Connect ControlNet Apply between your text encoders and KSampler',
							'Adjust strength (0.8-1.2) and start/end steps for control intensity',
							'Lower strength for subtle guidance, higher for strict adherence'
						]
					},
					{
						title: 'LoRA and Style Transfer',
						description:
							'Enhance your generations with LoRA models for specific styles, characters, or concepts.',
						steps: [
							'Download LoRA models to ComfyUI/models/loras/ directory',
							'Add "Load LoRA" node after your checkpoint loader',
							'Connect model and clip outputs through the LoRA node',
							'Set strength values: model strength (0.8-1.2), clip strength (0.8-1.2)',
							'Chain multiple LoRAs: checkpoint → LoRA1 → LoRA2 → text encoders',
							'Use trigger words specific to each LoRA in your prompts',
							'Experiment with strength values - too high causes overfitting',
							'Combine with proper prompt weighting using (word:1.2) syntax'
						]
					},
					{
						title: 'Img2Img and Inpainting Workflows',
						description: 'Transform existing images or selectively edit specific regions.',
						steps: [
							'For Img2Img: Replace "Empty Latent Image" with "VAE Encode" connected to input image',
							'Set denoise strength (0.3-0.8): lower preserves more original, higher allows more change',
							'For Inpainting: Use "VAE Encode (for Inpainting)" with mask input',
							'Create masks in external software (white = inpaint area, black = preserve)',
							'Add "Load Image (as Mask)" node for mask loading',
							'Use "Inpaint Model" checkpoint or regular model with mask conditioning',
							'Set grow_mask_by parameter to expand mask edges smoothly'
						]
					},
					{
						title: 'Multi-Resolution and Upscaling',
						description:
							'Create high-resolution images using Hi-Res Fix and specialized upscaling workflows.',
						steps: [
							'Generate base image at lower resolution (512x512 or 768x768)',
							'Add "Image Upscale" node with Real-ESRGAN or other upscaler',
							'Connect upscaled image to "VAE Encode" for second-stage generation',
							'Use "KSampler" with low denoise (0.2-0.4) for Hi-Res Fix',
							'Alternative: Use "Ultimate SD Upscale" custom node for advanced control',
							'For SDXL: Use refiner model in second stage with different prompts',
							'Monitor VRAM usage - split generation if needed'
						]
					},
					{
						title: 'Batch Processing and Animation',
						description: 'Process multiple images or create frame sequences for animation.',
						steps: [
							'Use "Load Image Batch" for processing multiple images',
							'Add "Image Batch" node to combine single images into batches',
							'For animation: Use "FreeU" or "AnimateDiff" custom nodes',
							'Create prompt schedules with "Prompt Schedule" nodes',
							'Use "Video Helper Suite" for frame interpolation and video export',
							'Set up batch count in KSampler for multiple variations',
							'Use "Random" or "Increment" nodes for parameter variation across batch'
						]
					}
				]
			}
		},
		{
			title: 'Custom Node Development',
			description: 'Learn to extend ComfyUI functionality by creating your own custom nodes.',
			category: 'Expert',
			content: {
				intro:
					'Develop custom nodes to add specialized functionality to ComfyUI. This comprehensive guide covers the complete process from setup to deployment, including practical examples.',
				sections: [
					{
						title: 'Development Environment Setup',
						content: 'Set up your development environment for creating and testing custom nodes.',
						points: [
							'Create a new folder in ComfyUI/custom_nodes/ (e.g., "my_custom_nodes")',
							'Set up Python virtual environment with ComfyUI dependencies',
							'Install development tools: IDE with Python support, Git for version control',
							'Create __init__.py file to make your folder a Python package',
							"Use ComfyUI's automatic node discovery system"
						]
					},
					{
						title: 'Basic Node Structure',
						content: 'Understand the fundamental structure of a ComfyUI node class.',
						points: [
							'Every node is a Python class with specific class methods',
							'INPUT_TYPES defines what inputs your node accepts',
							'RETURN_TYPES specifies what outputs your node produces',
							'FUNCTION specifies the method name that processes the inputs',
							'CATEGORY organizes your node in the node browser'
						],
						codeExample: `class SimpleTextProcessor:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text": ("STRING", {"multiline": True, "default": "Hello World"}),
                "uppercase": ("BOOLEAN", {"default": False}),
                "repeat_count": ("INT", {"default": 1, "min": 1, "max": 10}),
            },
        }
    
    RETURN_TYPES = ("STRING",)
    FUNCTION = "process_text"
    CATEGORY = "text processing"
    
    def process_text(self, text, uppercase, repeat_count):
        processed_text = text.upper() if uppercase else text
        result = (processed_text + "\\n") * repeat_count
        return (result.strip(),)`
					},
					{
						title: 'Working with Images and Tensors',
						content: "Learn to handle ComfyUI's image and tensor data formats.",
						points: [
							'Images in ComfyUI are PyTorch tensors with shape [B, H, W, C]',
							'Batch dimension B allows processing multiple images',
							'Channels C are typically 3 (RGB) or 4 (RGBA)',
							'Convert between PIL Images and tensors using proper functions',
							'Always maintain proper tensor dimensions for compatibility'
						],
						codeExample: `import torch
from PIL import Image, ImageFilter
import numpy as np

class ImageBlur:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "blur_radius": ("FLOAT", {"default": 2.0, "min": 0.0, "max": 10.0}),
            },
        }
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "blur_image"
    CATEGORY = "image processing"
    
    def blur_image(self, image, blur_radius):
        # Convert tensor to PIL for processing
        batch_size = image.shape[0]
        results = []
        
        for i in range(batch_size):
            # Convert single image tensor to PIL
            img_tensor = image[i]  # [H, W, C]
            img_np = (img_tensor.cpu().numpy() * 255).astype(np.uint8)
            pil_img = Image.fromarray(img_np)
            
            # Apply blur
            blurred = pil_img.filter(ImageFilter.GaussianBlur(blur_radius))
            
            # Convert back to tensor
            result_np = np.array(blurred).astype(np.float32) / 255.0
            result_tensor = torch.from_numpy(result_np)
            results.append(result_tensor)
        
        # Stack back to batch format
        return (torch.stack(results),)`
					},
					{
						title: 'Advanced Node Features',
						content: 'Implement advanced features like custom UI widgets and conditional inputs.',
						points: [
							'Use INPUT_TYPES with custom widgets for better UX',
							'Implement conditional inputs that appear based on other input values',
							'Add custom validation and error handling',
							'Create nodes with multiple output types',
							'Implement caching for expensive operations'
						],
						codeExample: `class ConditionalImageProcessor:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "operation": (["blur", "sharpen", "edge_detect"], {"default": "blur"}),
            },
            "optional": {
                "blur_radius": ("FLOAT", {"default": 2.0, "min": 0.0, "max": 10.0}),
                "sharpen_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 3.0}),
            }
        }
    
    RETURN_TYPES = ("IMAGE", "STRING")
    RETURN_NAMES = ("processed_image", "operation_log")
    FUNCTION = "process_conditional"
    CATEGORY = "image processing/conditional"
    
    def process_conditional(self, image, operation, blur_radius=None, sharpen_strength=None):
        log = f"Applied {operation} operation"
        
        if operation == "blur" and blur_radius is not None:
            # Blur implementation
            processed = self.apply_blur(image, blur_radius)
            log += f" with radius {blur_radius}"
        elif operation == "sharpen" and sharpen_strength is not None:
            # Sharpen implementation
            processed = self.apply_sharpen(image, sharpen_strength)
            log += f" with strength {sharpen_strength}"
        else:
            # Edge detection
            processed = self.apply_edge_detect(image)
        
        return (processed, log)`
					},
					{
						title: 'Testing and Distribution',
						content: 'Best practices for testing nodes and sharing them with the community.',
						points: [
							'Test nodes with various input types and edge cases',
							"Use ComfyUI's built-in error handling and logging",
							'Create comprehensive documentation and examples',
							'Package nodes with proper dependencies and requirements',
							'Consider creating a GitHub repository with installation instructions',
							'Follow ComfyUI community naming conventions'
						]
					}
				]
			}
		},
		{
			title: 'Workflow Optimization & Performance',
			description: 'Learn to optimize your workflows for speed, quality, and resource efficiency.',
			category: 'Advanced',
			content: {
				intro:
					'Master the art of optimizing ComfyUI workflows for better performance, memory efficiency, and quality output. Learn professional techniques for managing complex projects.',
				workflows: [
					{
						title: 'Memory and VRAM Optimization',
						description: 'Maximize efficiency and handle memory constraints effectively.',
						steps: [
							'Use "--lowvram" or "--medvram" launch flags for limited GPU memory',
							'Enable "CPU offload" in settings for models not actively in use',
							'Use "VAE in CPU" option when working with large images',
							'Implement tiled processing for ultra-high resolution images',
							'Clear VRAM between operations using "Empty Cache" nodes',
							'Monitor memory usage in Task Manager or GPU-Z',
							'Process images in smaller batches to avoid OOM errors'
						]
					},
					{
						title: 'Quality vs Speed Optimization',
						description:
							'Balance generation quality with processing speed for different use cases.',
						steps: [
							'For rapid prototyping: Use 15-20 steps with fast samplers (Euler, LCM)',
							'For final renders: Use 30-50 steps with quality samplers (DPM++ 2M Karras)',
							'Implement progressive workflows: low-res → high-res → refinement',
							'Use lower CFG values (4-7) with SDXL models for faster generation',
							'Cache intermediate results using "Save Latent" and "Load Latent"',
							'Use "Tiling" modes for seamless textures and patterns',
							'Optimize prompt schedules to avoid redundant encoding'
						]
					},
					{
						title: 'Workflow Organization and Management',
						description: 'Structure complex workflows for maintainability and reusability.',
						steps: [
							'Use node groups and reroute nodes for cleaner organization',
							'Color-code different workflow sections for easy identification',
							'Create reusable sub-workflows and save as templates',
							'Use "Group" functionality to collapse complex sections',
							'Implement consistent naming conventions for nodes and outputs',
							'Document complex workflows with "Note" nodes',
							'Version control workflows using Git or backup systems'
						]
					},
					{
						title: 'Batch Processing and Automation',
						description: 'Automate repetitive tasks and process multiple inputs efficiently.',
						steps: [
							'Set up queue management for overnight processing',
							'Use "Image Load Batch" for processing entire folders',
							'Implement seed randomization for variation generation',
							'Create prompt matrices for systematic testing',
							'Use "Loop" custom nodes for automated iterations',
							'Set up conditional workflows based on input characteristics',
							'Implement automatic output organization and naming'
						]
					},
					{
						title: 'Error Handling and Debugging',
						description: 'Identify and resolve common workflow issues efficiently.',
						steps: [
							'Read error messages in the console for specific issues',
							'Use "Preview" nodes strategically to debug data flow',
							'Check tensor shapes and data types at problem points',
							'Verify model compatibility and required dependencies',
							'Test workflow sections in isolation to identify problems',
							'Keep backup copies of working workflows',
							'Use ComfyUI Manager for easy custom node troubleshooting'
						]
					}
				]
			}
		}
	];

	function openTutorial(tutorial: any) {
		selectedTutorial = tutorial;
	}

	function closeTutorial() {
		selectedTutorial = null;
	}

	function getCategoryColor(category: string) {
		switch (category) {
			case 'Beginner':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
			case 'Advanced':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
			case 'Expert':
				return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
		}
	}
</script>

<Navbar activeSection="tutorials" />
<PageWrapper title="ComfyUI Tutorials">
	<div class="pb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each tutorials as tutorial}
			<div
				role="button"
				tabindex="0"
				class="rounded-lg bg-white p-6 shadow transition-all duration-300 hover:shadow-lg dark:bg-gray-800 cursor-pointer"
				on:click={() => openTutorial(tutorial)}
				on:keydown={(e) => e.key === 'Enter' && openTutorial(tutorial)}
			>
				<div class="flex items-center justify-between mb-2">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{tutorial.title}</h3>
					<span
						class="px-2 py-1 text-xs font-medium rounded-full {getCategoryColor(tutorial.category)}"
					>
						{tutorial.category}
					</span>
				</div>
				<p class="mb-4 text-gray-600 dark:text-gray-300">{tutorial.description}</p>
				<div
					class="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
				>
					Start Tutorial
					<ChevronRight class="ml-1 w-4 h-4" />
				</div>
			</div>
		{/each}
	</div>
</PageWrapper>

{#if selectedTutorial}
	<div
		class="fixed inset-0 z-50 overflow-y-auto"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
		>
			<!-- Background overlay -->
			<div
				class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				on:click={closeTutorial}
			></div>

			<!-- Modal panel -->
			<div
				class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
			>
				<!-- Header -->
				<div
					class="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10"
				>
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
								{selectedTutorial.title}
							</h3>
							<span
								class="px-2 py-1 text-xs font-medium rounded-full {getCategoryColor(
									selectedTutorial.category
								)}"
							>
								{selectedTutorial.category}
							</span>
						</div>
						<button
							on:click={closeTutorial}
							class="rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>
							<X class="w-6 h-6" />
						</button>
					</div>
				</div>

				<!-- Content -->
				<div class="bg-white dark:bg-gray-800 px-6 py-4 max-h-[70vh] overflow-y-auto">
					<div class="space-y-6">
						<!-- Introduction -->
						<div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
							<p class="text-gray-600 dark:text-gray-300">{selectedTutorial.content.intro}</p>
						</div>

						<!-- Basic Image Generation Steps -->
						{#if selectedTutorial.content.steps}
							{#each selectedTutorial.content.steps as step, index}
								<div
									class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-600 p-4"
								>
									<div class="flex items-center gap-4 mb-4">
										<div
											class="flex-shrink-0 w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold"
										>
											{index + 1}
										</div>
										<h4 class="text-lg font-semibold text-gray-900 dark:text-white">
											{step.title}
										</h4>
									</div>
									<p class="text-gray-600 dark:text-gray-300 mb-4">{step.content}</p>
									<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
										{#each step.details as detail}
											<li>{detail}</li>
										{/each}
									</ul>
								</div>
							{/each}
						{/if}

						<!-- Advanced Workflows -->
						{#if selectedTutorial.content.workflows}
							{#each selectedTutorial.content.workflows as workflow}
								<div
									class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-600 p-4"
								>
									<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
										{workflow.title}
									</h4>
									<p class="text-gray-600 dark:text-gray-300 mb-4">{workflow.description}</p>
									<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
										<h5 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
											Implementation Steps:
										</h5>
										<ol class="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-200">
											{#each workflow.steps as step}
												<li>{step}</li>
											{/each}
										</ol>
									</div>
								</div>
							{/each}
						{/if}

						<!-- Custom Node Sections -->
						{#if selectedTutorial.content.sections}
							{#each selectedTutorial.content.sections as section}
								<div
									class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-600 p-4"
								>
									<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
										{section.title}
									</h4>
									<p class="text-gray-600 dark:text-gray-300 mb-4">{section.content}</p>

									<ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200 mb-4">
										{#each section.points as point}
											<li>{point}</li>
										{/each}
									</ul>

									{#if section.codeExample}
										<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
											<h5 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
												Example Code:
											</h5>
											<pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
<code>{section.codeExample}</code>
											</pre>
										</div>
									{/if}
								</div>
							{/each}
						{/if}
					</div>
				</div>

				<!-- Footer -->
				<div class="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex justify-end">
					<button
						on:click={closeTutorial}
						class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
					>
						Close Tutorial
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
