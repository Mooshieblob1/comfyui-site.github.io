# ComfyUI Guide

A comprehensive guide website built with Svelte and TailwindCSS to help users master ComfyUI and AI art creation. The site provides tutorials, tips, and showcases community artwork.

## 🚧 Work in Progress 🚧

This project is currently under active development. Features, content, and site structure are subject to change as I continue to improve and expand the guide. I welcome feedback and contributions, but please note that significant changes may occur during this development phase.

## Features

- 📚 Comprehensive getting started guides
- 🎨 Interactive tutorials for AI art creation
- 💡 Tips & tricks for optimal results
- 🖼️ Community gallery showcase
- 🌓 Dark mode support
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

## Local Development

1. Clone the repository:

```bash
git clone <your-repo-url>
cd comfyui-guide
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
# or: npm run dev -- --open
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
    ├── tricks/          # Tips & tricks
    └── gallery/         # Community gallery
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Contributing

I welcome contributions! Before submitting a Pull Request:

1. Open an issue to discuss proposed changes
2. Follow the existing code style and conventions
3. Test your changes thoroughly
4. Update documentation as needed

## License

[MIT](LICENSE)

## Acknowledgments

- The amazing ComfyUI community for inspiration and resources
- All contributors who help improve this guide
- You, for checking out this project!

## Contact

Found a bug or have a suggestion? Please open an issue or reach out to me at blob@mooshieblob.com.
