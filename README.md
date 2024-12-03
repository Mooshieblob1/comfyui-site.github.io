# ComfyUI Guide

A comprehensive guide website built with Svelte and TailwindCSS to help users master ComfyUI and AI art creation. The site provides tutorials, tips, and showcases community artwork.

## 🚧 Work in Progress 🚧

This project is currently under active development. Features, content, and site structure are subject to change as I continue to improve and expand the guide. I welcome feedback and contributions, but please be aware that things might break or change frequently.

## Features

- 📚 Comprehensive getting started guides
- 🎨 Interactive tutorials for AI art creation
- 💡 Tips & tricks for optimal results
- 🖼️ Community gallery showcase
- 🌙 Dark mode support
- 📱 Responsive design
- ⚡ Fast, static-first architecture
- 🔍 Full-text search functionality
- 📝 Markdown-based content

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) - Web application framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set
- [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) - Prose styling
- [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms) - Form styling
- [@tailwindcss/aspect-ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio) - Aspect ratio utilities
- [@tailwindcss/container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries) - Container query support
- [Adapter for Cloudflare](https://kit.svelte.dev/docs/adapters#supported-environments-cloudflare) - Deploy to Cloudflare

## Prerequisites

- Node.js 18 or higher
- PNPM 8 or higher

To install PNPM, run:

```bash
npm install -g pnpm
```

## Local Development

1. Clone the repository:

```bash
git clone https://github.com/Mooshieblob1/comfyui-site.github.io
cd comfyui-site.github.io
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
# or: pnpm dev --open
```

## Project Structure

```
src/
├── app.css                 # Global styles and Tailwind imports
├── lib/
│   ├── components/        # Reusable components
│   │   ├── layout/       # Layout components (Navbar, PageWrapper)
│   │   └── shared/       # Shared components (FeatureCard, ThemeToggle)
│   ├── stores/           # Svelte stores (theme, search)
│   ├── utils/            # Utility functions
│   └── content/          # Markdown content files
└── routes/               # SvelteKit routes
    ├── getting-started/  # Getting started guide
    ├── tutorials/        # Tutorial pages
    ├── tricks/           # Tips & tricks
    └── gallery/          # Community gallery
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm preview` - Preview production build
- `pnpm check` - Run Svelte type checking
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Check code formatting
- `pnpm clean` - Clean build files and dependencies

## Production Build

Create a production build:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Contributing

I welcome contributions! Before submitting a Pull Request:

1. Open an issue to discuss proposed changes
2. Follow the existing code style and conventions
3. Test your changes thoroughly
4. Update documentation as needed

### Development Setup

1. Fork and clone the repository
2. Install PNPM if you haven't already: `npm install -g pnpm`
3. Install dependencies: `pnpm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Test your changes: `pnpm check`
7. Format your code: `pnpm format`
8. Submit your pull request

## Troubleshooting

### Common Issues

1. If you get PNPM-related errors:

   ```bash
   pnpm store prune  # Clean the store
   pnpm install      # Reinstall dependencies
   ```

2. If you need to reset your development environment:
   ```bash
   pnpm clean       # Clean build files and dependencies
   pnpm install     # Reinstall everything
   ```

## License

[MIT](LICENSE)

## Acknowledgments

- The amazing ComfyUI community for inspiration and resources
- All contributors who help improve this guide
- You, for checking out this project!

## Contact

Found a bug or have a suggestion? Please open an issue or reach out to me at blob@mooshieblob.com.
