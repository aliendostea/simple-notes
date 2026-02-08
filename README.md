# Simple Notes ⚡️

A modern, lightweight note-taking application built with NextJS, TypeScript, and deployed on Vercel.

## Features ✨

- 📝 Quick and easy note creation
- 💾 Auto-save functionality
- 🎨 Clean and intuitive user interface
- ⚡ Lightning-fast performance powered by Next.js
- 🔒 Type-safe development with TypeScript
- 🌐 Deployed and accessible online

## Tech Stack 🛠️

- **[React.js](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Next.js](https://nextjs.org/)** - React framework
- **[Vercel](https://vercel.com/)** - Hosting & deployment

## Getting Started 🚀

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository (if applicable)
git clone <repository-url>
cd simple-notes

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev

# Open your browser and navigate to:
# http://localhost:3000/
```

### Building for Production

```bash
# Create an optimized build
npm run build

# Start the production server
npm start
```

## Available Scripts 📜

| Command                       | Description              |
| ----------------------------- | ------------------------ |
| `npm run dev`                 | Start development server |
| `npm run build`               | Build for production     |
| `npm run start`               | Run production build     |
| `npm run lint`                | Run ESLint code analyzer |
| `npx playwright test --debug` | Run tests in debug mode  |

## Deployment 🌐

This project is deployed on **[Vercel](https://vercel.com/)** and is live at:

👉 **[https://simple-notes-theta.vercel.app/](https://simple-notes-theta.vercel.app/)**

### Deploy Your Own

1. Push your code to GitHub, GitLab, or Bitbucket
2. Connect your repository to Vercel
3. Vercel automatically deploys on every push

## Project Structure 📁

```
simple-notes/
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   └── pages/        # Page routes
├── public/           # Static assets
├── tests/            # Test files
└── README.md         # This file
```

## Troubleshooting 🔧

**Port 3000 already in use?**

```bash
npm run dev -- -p 3001
```

**Dependencies not installing?**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Build fails?**

- Ensure Node.js version is v16 or higher
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is open source and available under the MIT License.
