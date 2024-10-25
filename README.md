# ComfyUI Guide

A comprehensive guide website built with Svelte and TailwindCSS to help users master ComfyUI and AI art creation. This project aims to provide tutorials, tips, and showcase community artwork.

## Features

- 📚 Comprehensive getting started guides
- 🎨 Interactive tutorials for AI art creation
- 💡 Tips & tricks for optimal results
- 🖼️ Community gallery showcase
- 🌓 Dark mode support
- 📱 Responsive design

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) - Web application framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set
- [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) - Prose styling
- [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms) - Form styling
- [@tailwindcss/aspect-ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio) - Aspect ratio utilities
- [@tailwindcss/container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries) - Container query support

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd comfyui-guide
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
npm run dev -- --open
```

## Project Structure

```
src/
├── app.css                 # Global styles and Tailwind imports
├── lib/
│   ├── components/        # Reusable components
│   │   ├── layout/       # Layout components (Navbar, PageWrapper)
│   │   └── shared/       # Shared components (FeatureCard, ThemeToggle)
│   └── stores/           # Svelte stores (theme)
└── routes/               # SvelteKit routes
    ├── getting-started/  # Getting started guide
    ├── tutorials/        # Tutorial pages
    ├── tricks/          # Tips & tricks
    └── gallery/         # Community gallery
```

## Building for Production

To create a production version of your app:

```bash
npm run build
```

Preview the production build with:

```bash
npm run preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)

## Acknowledgments

- ComfyUI community for inspiration and resources
- All contributors and users of this guide
