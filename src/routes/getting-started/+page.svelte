<!-- src/routes/getting-started/+page.svelte -->
<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import PageWrapper from '$lib/components/layout/PageWrapper.svelte';
	import { ClipboardCopy, ChevronDown, Monitor, Apple, Terminal, Container } from 'lucide-svelte';

	let openSections: Record<string, boolean> = {};
	let openLinuxDistros: Record<string, boolean> = {};
	let openDockerOS: Record<string, boolean> = {};
	let openDockerLinuxDistros: Record<string, boolean> = {};
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
	interface LinuxDistro {
		title: string;
		content: string;
		steps: (string | CodeStep)[];
	}
	interface DockerOS {
		title: string;
		content: string;
		steps?: (string | CodeStep)[];
		linuxDistros?: DockerLinuxDistro[];
	}
	interface DockerLinuxDistro {
		title: string;
		content: string;
		steps: (string | CodeStep)[];
	}

	const linuxDistros: LinuxDistro[] = [
		{
			title: 'Debian/Ubuntu (APT)',
			content: 'For Debian, Ubuntu, Linux Mint, Pop!_OS, Elementary OS',
			steps: [
				{
					text: 'Update package manager:',
					code: 'sudo apt update && sudo apt upgrade -y'
				},
				{
					text: 'Install Python, pip, Git, and build tools:',
					code: 'sudo apt install python3.11 python3-pip python3-venv git build-essential -y'
				},
				{
					text: 'Install NVIDIA drivers (if using NVIDIA GPU):',
					code: 'sudo apt install nvidia-driver-535 nvidia-utils-535 -y'
				}
			]
		},
		{
			title: 'Red Hat/Fedora (DNF/YUM)',
			content: 'For Fedora, RHEL, CentOS, Rocky Linux, AlmaLinux',
			steps: [
				{
					text: 'Update package manager (Fedora):',
					code: 'sudo dnf update -y'
				},
				{
					text: 'For RHEL/CentOS/Rocky/Alma, enable EPEL first:',
					code: 'sudo dnf install epel-release -y'
				},
				{
					text: 'Install Python, pip, Git, and development tools:',
					code: 'sudo dnf install python3.11 python3-pip python3-devel git gcc gcc-c++ -y'
				},
				{
					text: 'Install NVIDIA drivers (Fedora with RPM Fusion):',
					code: 'sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda -y'
				}
			]
		},
		{
			title: 'Arch Linux (Pacman)',
			content: 'For Arch Linux, Manjaro, EndeavourOS',
			steps: [
				{
					text: 'Update system:',
					code: 'sudo pacman -Syu'
				},
				{
					text: 'Install Python, pip, Git, and base development tools:',
					code: 'sudo pacman -S python python-pip git base-devel'
				},
				{
					text: 'Install NVIDIA drivers:',
					code: 'sudo pacman -S nvidia nvidia-utils'
				}
			]
		},
		{
			title: 'openSUSE (Zypper)',
			content: 'For openSUSE Leap and Tumbleweed',
			steps: [
				{
					text: 'Update system:',
					code: 'sudo zypper refresh && sudo zypper update'
				},
				{
					text: 'Install Python, pip, Git, and development tools:',
					code: 'sudo zypper install python311 python3-pip git gcc gcc-c++'
				},
				{
					text: 'Install NVIDIA drivers:',
					code: 'sudo zypper install nvidia-video-G06 nvidia-compute-G06'
				}
			]
		}
	];

	const dockerLinuxDistros: DockerLinuxDistro[] = [
		{
			title: 'Debian/Ubuntu (APT)',
			content: 'For Debian, Ubuntu, Linux Mint, Pop!_OS, Elementary OS',
			steps: [
				{
					text: 'Update package manager:',
					code: 'sudo apt update'
				},
				{
					text: 'Install required packages:',
					code: 'sudo apt install ca-certificates curl gnupg lsb-release'
				},
				{
					text: 'Add Docker GPG key:',
					code: 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg'
				},
				{
					text: 'Add Docker repository:',
					code: 'echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null'
				},
				{
					text: 'Update package list:',
					code: 'sudo apt update'
				},
				{
					text: 'Install Docker Engine:',
					code: 'sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin'
				},
				{
					text: 'Start and enable Docker:',
					code: 'sudo systemctl start docker && sudo systemctl enable docker'
				},
				{
					text: 'Add user to docker group (optional):',
					code: 'sudo usermod -aG docker $USER'
				},
				'Log out and back in for group changes to take effect'
			]
		},
		{
			title: 'Red Hat/Fedora (DNF/YUM)',
			content: 'For Fedora, RHEL, CentOS, Rocky Linux, AlmaLinux',
			steps: [
				{
					text: 'Update system (Fedora):',
					code: 'sudo dnf update -y'
				},
				{
					text: 'Install required packages:',
					code: 'sudo dnf install dnf-plugins-core'
				},
				{
					text: 'Add Docker repository (Fedora):',
					code: 'sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo'
				},
				{
					text: 'Install Docker Engine:',
					code: 'sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin'
				},
				{
					text: 'Start and enable Docker:',
					code: 'sudo systemctl start docker && sudo systemctl enable docker'
				},
				{
					text: 'Add user to docker group (optional):',
					code: 'sudo usermod -aG docker $USER'
				},
				'Log out and back in for group changes to take effect'
			]
		},
		{
			title: 'Arch Linux (Pacman)',
			content: 'For Arch Linux, Manjaro, EndeavourOS',
			steps: [
				{
					text: 'Update system:',
					code: 'sudo pacman -Syu'
				},
				{
					text: 'Install Docker:',
					code: 'sudo pacman -S docker docker-compose'
				},
				{
					text: 'Start and enable Docker:',
					code: 'sudo systemctl start docker && sudo systemctl enable docker'
				},
				{
					text: 'Add user to docker group (optional):',
					code: 'sudo usermod -aG docker $USER'
				},
				'Log out and back in for group changes to take effect'
			]
		},
		{
			title: 'openSUSE (Zypper)',
			content: 'For openSUSE Leap and Tumbleweed',
			steps: [
				{
					text: 'Update system:',
					code: 'sudo zypper refresh && sudo zypper update'
				},
				{
					text: 'Install Docker:',
					code: 'sudo zypper install docker docker-compose'
				},
				{
					text: 'Start and enable Docker:',
					code: 'sudo systemctl start docker && sudo systemctl enable docker'
				},
				{
					text: 'Add user to docker group (optional):',
					code: 'sudo usermod -aG docker $USER'
				},
				'Log out and back in for group changes to take effect'
			]
		}
	];

	const dockerOSOptions: DockerOS[] = [
		{
			title: 'Windows',
			content: 'Install Docker Desktop on Windows systems.',
			steps: [
				'Ensure Windows 10/11 (64-bit) with Hyper-V support',
				'Enable WSL 2 (Windows Subsystem for Linux)',
				{
					text: 'Enable WSL 2 feature:',
					code: 'dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart'
				},
				{
					text: 'Enable Virtual Machine Platform:',
					code: 'dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart'
				},
				'Restart your computer',
				{
					text: 'Set WSL 2 as default:',
					code: 'wsl --set-default-version 2'
				},
				'Download Docker Desktop from https://docker.com/products/docker-desktop',
				'Run the installer and follow the setup wizard',
				'Start Docker Desktop from the Start menu',
				'Verify installation by opening Command Prompt or PowerShell:',
				{
					text: 'Check Docker version:',
					code: 'docker --version'
				}
			]
		},
		{
			title: 'macOS',
			content: 'Install Docker Desktop on macOS systems.',
			steps: [
				'Ensure macOS 10.15 or newer',
				'Download Docker Desktop for Mac from https://docker.com/products/docker-desktop',
				'Choose the appropriate version:',
				'- For Apple Silicon Macs (M1/M2): Download "Mac with Apple chip"',
				'- For Intel Macs: Download "Mac with Intel chip"',
				'Open the downloaded .dmg file',
				'Drag Docker.app to the Applications folder',
				'Launch Docker from Applications',
				'Complete the initial setup process',
				'Verify installation by opening Terminal:',
				{
					text: 'Check Docker version:',
					code: 'docker --version'
				},
				{
					text: 'Alternative installation via Homebrew:',
					code: 'brew install --cask docker'
				}
			]
		},
		{
			title: 'Linux',
			content: 'Choose your Linux distribution below for Docker installation instructions.',
			linuxDistros: dockerLinuxDistros
		}
	];

	const commonDockerSteps: (string | CodeStep)[] = [
		{
			text: 'Pull the ComfyUI Docker image:',
			code: 'docker pull yanwk/comfyui-boot:latest'
		},
		{
			text: 'Create a directory for models and outputs:',
			code: 'mkdir -p ~/comfyui-data'
		},
		{
			text: 'Run ComfyUI container with GPU support:',
			code: 'docker run -it --rm --gpus all -p 8188:8188 -v ~/comfyui-data:/root/ComfyUI yanwk/comfyui-boot:latest'
		},
		{
			text: 'Alternative: Run without GPU (CPU only):',
			code: 'docker run -it --rm -p 8188:8188 -v ~/comfyui-data:/root/ComfyUI yanwk/comfyui-boot:latest'
		},
		'Open your browser and go to http://127.0.0.1:8188',
		'Your models and outputs will be saved in ~/comfyui-data'
	];

	const commonLinuxSteps: (string | CodeStep)[] = [
		{
			text: 'Create a virtual environment (recommended):',
			code: 'python3 -m venv ~/comfyui-env && source ~/comfyui-env/bin/activate'
		},
		{
			text: 'Clone ComfyUI repository:',
			code: 'git clone https://github.com/comfyanonymous/ComfyUI.git'
		},
		{
			text: 'Navigate to ComfyUI directory:',
			code: 'cd ComfyUI'
		},
		{
			text: 'Install PyTorch with CUDA (NVIDIA GPU):',
			code: 'pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121'
		},
		{
			text: 'Or install PyTorch for CPU-only:',
			code: 'pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu'
		},
		{
			text: 'Install ComfyUI requirements:',
			code: 'pip install -r requirements.txt'
		},
		{
			text: 'Launch ComfyUI:',
			code: 'python main.py'
		},
		'Open your browser and go to http://127.0.0.1:8188',
		'**Note:** Restart your system after installing NVIDIA drivers'
	];

	const sections: Section[] = [
		{
			title: 'System Requirements',
			content: 'Before installing ComfyUI, ensure your system meets these requirements.',
			topics: [
				'NVIDIA GPU with at least 4GB VRAM (recommended 8GB+)',
				'Python 3.10 or higher',
				'Git (for cloning repositories)',
				'At least 10GB free storage space'
			]
		},
		{
			title: 'Windows Installation',
			content: 'Step-by-step guide for installing ComfyUI on Windows systems.',
			steps: [
				'Download and install Python 3.10+ from python.org',
				'Download and install Git from git-scm.com',
				'Open Command Prompt or PowerShell as Administrator',
				{
					text: 'Clone ComfyUI repository:',
					code: 'git clone https://github.com/comfyanonymous/ComfyUI.git'
				},
				{
					text: 'Navigate to ComfyUI directory:',
					code: 'cd ComfyUI'
				},
				{
					text: 'Install PyTorch with CUDA support:',
					code: 'pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121'
				},
				{
					text: 'Install ComfyUI requirements:',
					code: 'pip install -r requirements.txt'
				},
				{
					text: 'Launch ComfyUI:',
					code: 'python main.py'
				},
				'Open your browser and go to http://127.0.0.1:8188'
			]
		},
		{
			title: 'macOS Installation',
			content: 'Instructions for setting up ComfyUI on macOS systems.',
			steps: [
				'Install Homebrew if not already installed',
				{
					text: 'Install Homebrew:',
					code: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
				},
				{
					text: 'Install Python and Git:',
					code: 'brew install python@3.11 git'
				},
				{
					text: 'Clone ComfyUI repository:',
					code: 'git clone https://github.com/comfyanonymous/ComfyUI.git'
				},
				{
					text: 'Navigate to ComfyUI directory:',
					code: 'cd ComfyUI'
				},
				{
					text: 'For Apple Silicon Macs, install PyTorch:',
					code: 'pip install torch torchvision torchaudio'
				},
				{
					text: 'Install ComfyUI requirements:',
					code: 'pip install -r requirements.txt'
				},
				{
					text: 'Launch ComfyUI:',
					code: 'python main.py'
				},
				'Open your browser and go to http://127.0.0.1:8188'
			]
		},
		{
			title: 'Linux Installation',
			content: 'Choose your Linux distribution below for specific installation instructions.',
			steps: [] // Will be populated with nested dropdowns in template
		},
		{
			title: 'Docker Installation',
			content:
				'Run ComfyUI in a containerized environment using Docker. First install Docker for your operating system.',
			steps: [] // Will be populated with nested dropdowns in template
		},
		{
			title: 'First Steps After Installation',
			content: 'Essential steps to get ComfyUI ready for use.',
			steps: [
				'Download a Stable Diffusion checkpoint model (e.g., from Hugging Face)',
				{
					text: 'Place models in the checkpoints folder:',
					code: 'ComfyUI/models/checkpoints/'
				},
				'Download a VAE model and place it in:',
				{
					text: 'VAE folder location:',
					code: 'ComfyUI/models/vae/'
				},
				'Load the default workflow by right-clicking and selecting "Load Default"',
				'Connect your model to the Load Checkpoint node',
				'Queue your first prompt by clicking "Queue Prompt"',
				'Check the output in the ComfyUI/output/ folder'
			]
		},
		{
			title: 'Troubleshooting Common Issues',
			content: 'Solutions for frequent installation and setup problems.',
			topics: [
				'CUDA out of memory: Reduce batch size or image resolution',
				'Missing dependencies: Run pip install -r requirements.txt again',
				'Model loading errors: Ensure models are in correct folders',
				'Port already in use: Use --port 8189 to change port',
				'Performance issues: Check GPU drivers and VRAM usage',
				'Permission errors: Run with administrator/sudo privileges'
			]
		}
	];

	function toggleSection(sectionTitle: string) {
		openSections[sectionTitle] = !openSections[sectionTitle];
		openSections = { ...openSections }; // Trigger reactivity
	}

	function toggleLinuxDistro(distroTitle: string) {
		openLinuxDistros[distroTitle] = !openLinuxDistros[distroTitle];
		openLinuxDistros = { ...openLinuxDistros }; // Trigger reactivity
	}

	function toggleDockerOS(osTitle: string) {
		openDockerOS[osTitle] = !openDockerOS[osTitle];
		openDockerOS = { ...openDockerOS }; // Trigger reactivity
	}

	function toggleDockerLinuxDistro(distroTitle: string) {
		openDockerLinuxDistros[distroTitle] = !openDockerLinuxDistros[distroTitle];
		openDockerLinuxDistros = { ...openDockerLinuxDistros }; // Trigger reactivity
	}

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	// Function to get the appropriate icon for each OS
	function getOSIcon(title: string) {
		if (title.includes('Windows')) return Monitor;
		if (title.includes('macOS')) return Apple;
		if (title.includes('Linux')) return Terminal;
		if (title.includes('Docker')) return Container;
		return null;
	}

	// Create a reactive mapping of sections to their icons
	$: sectionIcons = sections.slice(1, 5).reduce(
		(acc, section) => {
			acc[section.title] = getOSIcon(section.title);
			return acc;
		},
		{} as Record<string, any>
	);
</script>

<Navbar activeSection="getting-started" />
<PageWrapper title="Getting Started with ComfyUI">
	<div class="max-w-4xl mx-auto pb-6 space-y-8">
		<!-- System Requirements -->
		<section class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
			<button
				class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
				on:click={() => toggleSection(sections[0].title)}
			>
				<div>
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{sections[0].title}</h2>
					<p class="text-gray-600 dark:text-gray-300 text-sm mt-1">{sections[0].content}</p>
				</div>
				<ChevronDown
					class="h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 flex-shrink-0 ml-4 {openSections[
						sections[0].title
					]
						? 'rotate-180'
						: ''}"
				/>
			</button>

			{#if openSections[sections[0].title]}
				<div class="px-6 pt-4 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
					{#if sections[0].topics}
						<div class="grid gap-3 sm:grid-cols-2">
							{#each sections[0].topics as topic}
								<div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
									<p class="text-gray-700 dark:text-gray-200 text-sm">{topic}</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</section>

		<!-- Installation Methods -->
		<div class="space-y-4">
			<div class="text-center py-4">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Installation Methods</h2>
				<div class="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
				<p class="text-gray-600 dark:text-gray-400 mt-2">
					Choose the installation method that works best for your system
				</p>
			</div>

			{#each sections.slice(1, 5) as section}
				<section class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
					<button
						class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
						on:click={() => toggleSection(section.title)}
					>
						<div class="flex items-center gap-3">
							{#if sectionIcons[section.title]}
								<svelte:component
									this={sectionIcons[section.title]}
									class="h-6 w-6 text-indigo-500 dark:text-indigo-400 flex-shrink-0"
								/>
							{/if}
							<div>
								<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h2>
								<p class="text-gray-600 dark:text-gray-300 text-sm mt-1">{section.content}</p>
							</div>
						</div>
						<ChevronDown
							class="h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 flex-shrink-0 ml-4 {openSections[
								section.title
							]
								? 'rotate-180'
								: ''}"
						/>
					</button>

					{#if openSections[section.title]}
						<div class="px-6 pt-4 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
							{#if section.title === 'Linux Installation'}
								<!-- Linux Distribution Sub-dropdowns -->
								<div class="space-y-3">
									{#each linuxDistros as distro}
										<div
											class="bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm"
										>
											<button
												class="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
												on:click={() => toggleLinuxDistro(distro.title)}
											>
												<div>
													<h3 class="text-lg font-medium text-gray-900 dark:text-white">
														{distro.title}
													</h3>
													<p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
														{distro.content}
													</p>
												</div>
												<ChevronDown
													class="h-4 w-4 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 flex-shrink-0 {openLinuxDistros[
														distro.title
													]
														? 'rotate-180'
														: ''}"
												/>
											</button>

											{#if openLinuxDistros[distro.title]}
												<div
													class="px-4 pt-3 pb-4 space-y-2 border-t border-gray-200 dark:border-gray-600"
												>
													<ol
														class="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-200 mt-3"
													>
														{#each distro.steps as step}
															<li class="flex flex-col">
																{#if typeof step === 'string'}
																	<span>{step}</span>
																{:else}
																	<div class="flex items-center justify-between mb-1">
																		<span>{step.text}</span>
																		<button
																			on:click={() => copyToClipboard(step.code)}
																			class="text-blue-500 hover:underline flex items-center gap-1 flex-shrink-0"
																		>
																			<ClipboardCopy class="w-4 h-4" /> Copy
																		</button>
																	</div>
																	<pre
																		class="bg-gray-100 dark:bg-gray-900 rounded p-2 text-sm overflow-x-auto ml-0">{step.code}</pre>
																{/if}
															</li>
														{/each}
													</ol>
												</div>
											{/if}
										</div>
									{/each}

									<!-- Common Linux Steps -->
									<div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4">
										<h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
											Common Steps (After Distribution Setup)
										</h3>
										<ol class="list-decimal list-inside space-y-3 text-blue-800 dark:text-blue-200">
											{#each commonLinuxSteps as step}
												<li class="flex flex-col">
													{#if typeof step === 'string'}
														<span>{step}</span>
													{:else}
														<div class="flex items-center justify-between mb-1">
															<span>{step.text}</span>
															<button
																on:click={() => copyToClipboard(step.code)}
																class="text-blue-600 hover:underline flex items-center gap-1 flex-shrink-0"
															>
																<ClipboardCopy class="w-4 h-4" /> Copy
															</button>
														</div>
														<pre
															class="bg-blue-100 dark:bg-blue-900/50 rounded p-2 text-sm overflow-x-auto text-blue-900 dark:text-blue-100 ml-0">{step.code}</pre>
													{/if}
												</li>
											{/each}
										</ol>
									</div>
								</div>
							{:else if section.title === 'Docker Installation'}
								<!-- Docker OS Sub-dropdowns -->
								<div class="space-y-3">
									{#each dockerOSOptions as dockerOS}
										<div
											class="bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm"
										>
											<button
												class="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
												on:click={() => toggleDockerOS(dockerOS.title)}
											>
												<div>
													<h3 class="text-lg font-medium text-gray-900 dark:text-white">
														{dockerOS.title}
													</h3>
													<p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
														{dockerOS.content}
													</p>
												</div>
												<ChevronDown
													class="h-4 w-4 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 flex-shrink-0 {openDockerOS[
														dockerOS.title
													]
														? 'rotate-180'
														: ''}"
												/>
											</button>

											{#if openDockerOS[dockerOS.title]}
												<div
													class="px-4 pt-3 pb-4 space-y-2 border-t border-gray-200 dark:border-gray-600"
												>
													{#if dockerOS.linuxDistros}
														<!-- Docker Linux Distribution Sub-dropdowns -->
														<div class="space-y-2">
															{#each dockerOS.linuxDistros as distro}
																<div
																	class="bg-white dark:bg-gray-700/50 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-500 shadow-sm"
																>
																	<button
																		class="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors"
																		on:click={() => toggleDockerLinuxDistro(distro.title)}
																	>
																		<div>
																			<h4 class="text-md font-medium text-gray-900 dark:text-white">
																				{distro.title}
																			</h4>
																			<p class="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
																				{distro.content}
																			</p>
																		</div>
																		<ChevronDown
																			class="h-3 w-3 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 flex-shrink-0 {openDockerLinuxDistros[
																				distro.title
																			]
																				? 'rotate-180'
																				: ''}"
																		/>
																	</button>

																	{#if openDockerLinuxDistros[distro.title]}
																		<div
																			class="px-3 pt-2 pb-3 space-y-1 border-t border-gray-300 dark:border-gray-500"
																		>
																			<ol
																				class="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-200 mt-2"
																			>
																				{#each distro.steps as step}
																					<li class="flex flex-col">
																						{#if typeof step === 'string'}
																							<span class="text-sm">{step}</span>
																						{:else}
																							<div class="flex items-center justify-between mb-1">
																								<span class="text-sm">{step.text}</span>
																								<button
																									on:click={() => copyToClipboard(step.code)}
																									class="text-blue-500 hover:underline flex items-center gap-1 flex-shrink-0 text-xs"
																								>
																									<ClipboardCopy class="w-3 h-3" /> Copy
																								</button>
																							</div>
																							<pre
																								class="bg-gray-200 dark:bg-gray-800 rounded p-2 text-xs overflow-x-auto ml-0">{step.code}</pre>
																						{/if}
																					</li>
																				{/each}
																			</ol>
																		</div>
																	{/if}
																</div>
															{/each}
														</div>
													{:else if dockerOS.steps}
														<ol
															class="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-200 mt-3"
														>
															{#each dockerOS.steps as step}
																<li class="flex flex-col">
																	{#if typeof step === 'string'}
																		<span>{step}</span>
																	{:else}
																		<div class="flex items-center justify-between mb-1">
																			<span>{step.text}</span>
																			<button
																				on:click={() => copyToClipboard(step.code)}
																				class="text-blue-500 hover:underline flex items-center gap-1 flex-shrink-0"
																			>
																				<ClipboardCopy class="w-4 h-4" /> Copy
																			</button>
																		</div>
																		<pre
																			class="bg-gray-100 dark:bg-gray-900 rounded p-2 text-sm overflow-x-auto ml-0">{step.code}</pre>
																	{/if}
																</li>
															{/each}
														</ol>
													{/if}
												</div>
											{/if}
										</div>
									{/each}

									<!-- Common Docker Steps -->
									<div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4">
										<h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
											Running ComfyUI with Docker (After Docker Installation)
										</h3>
										<ol class="list-decimal list-inside space-y-3 text-blue-800 dark:text-blue-200">
											{#each commonDockerSteps as step}
												<li class="flex flex-col">
													{#if typeof step === 'string'}
														<span>{step}</span>
													{:else}
														<div class="flex items-center justify-between mb-1">
															<span>{step.text}</span>
															<button
																on:click={() => copyToClipboard(step.code)}
																class="text-blue-600 hover:underline flex items-center gap-1 flex-shrink-0"
															>
																<ClipboardCopy class="w-4 h-4" /> Copy
															</button>
														</div>
														<pre
															class="bg-blue-100 dark:bg-blue-900/50 rounded p-2 text-sm overflow-x-auto text-blue-900 dark:text-blue-100 ml-0">{step.code}</pre>
													{/if}
												</li>
											{/each}
										</ol>
									</div>
								</div>
							{:else if section.steps}
								<ol class="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-200">
									{#each section.steps as step}
										<li class="flex flex-col">
											{#if typeof step === 'string'}
												<span>{step}</span>
											{:else}
												<div class="flex items-center justify-between mb-1">
													<span>{step.text}</span>
													<button
														on:click={() => copyToClipboard(step.code)}
														class="text-blue-500 hover:underline flex items-center gap-1 flex-shrink-0"
													>
														<ClipboardCopy class="w-4 h-4" /> Copy
													</button>
												</div>
												<pre
													class="bg-gray-100 dark:bg-gray-900 rounded p-2 text-sm overflow-x-auto ml-0">{step.code}</pre>
											{/if}
										</li>
									{/each}
								</ol>
							{/if}
						</div>
					{/if}
				</section>
			{/each}
		</div>

		<!-- Post-Installation & Support -->
		<div class="space-y-4">
			<div class="text-center py-4">
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">After Installation</h2>
				<div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
				<p class="text-gray-600 dark:text-gray-400 mt-2">
					Get ComfyUI up and running with your first workflow
				</p>
			</div>

			{#each sections.slice(5) as section}
				<section class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
					<button
						class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
						on:click={() => toggleSection(section.title)}
					>
						<div>
							<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h2>
							<p class="text-gray-600 dark:text-gray-300 text-sm mt-1">{section.content}</p>
						</div>
						<ChevronDown
							class="h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 flex-shrink-0 ml-4 {openSections[
								section.title
							]
								? 'rotate-180'
								: ''}"
						/>
					</button>

					{#if openSections[section.title]}
						<div class="px-6 pt-4 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
							{#if section.steps}
								<ol class="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-200">
									{#each section.steps as step}
										<li class="flex flex-col">
											{#if typeof step === 'string'}
												<span>{step}</span>
											{:else}
												<div class="flex items-center justify-between mb-1">
													<span>{step.text}</span>
													<button
														on:click={() => copyToClipboard(step.code)}
														class="text-blue-500 hover:underline flex items-center gap-1 flex-shrink-0"
													>
														<ClipboardCopy class="w-4 h-4" /> Copy
													</button>
												</div>
												<pre
													class="bg-gray-100 dark:bg-gray-900 rounded p-2 text-sm overflow-x-auto ml-0">{step.code}</pre>
											{/if}
										</li>
									{/each}
								</ol>
							{/if}
							{#if section.topics}
								<div class="grid gap-3 sm:grid-cols-2">
									{#each section.topics as topic}
										<div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
											<p class="text-gray-700 dark:text-gray-200 text-sm">{topic}</p>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					{/if}
				</section>
			{/each}
		</div>
	</div>
</PageWrapper>
