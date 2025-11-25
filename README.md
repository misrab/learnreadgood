# learnreadgood

learnreadgood.com - global literacy should be 100% in any language in the 21st century

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Requirements before `make dev`
- Install dependencies once with `make install` (or `npm install`).  
  Without this step, `make dev` will fail with errors like `sh: vite: command not found`.
- Ensure both Node.js and npm are available on your PATH (`node -v`, `npm -v`).

### Installation

```bash
make install
```

Or manually:
```bash
npm install
```

### Development

Start the development server:
```bash
make dev
```

> Tip: if you see `vite: command not found`, rerun `make install` to ensure dependencies are present.

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
make build
```

Preview the production build:
```bash
make preview
```

### Available Commands

Run `make help` to see all available commands:

- `make install` - Install dependencies
- `make dev` - Start development server
- `make build` - Build for production
- `make preview` - Preview production build
- `make clean` - Clean node_modules and dist

## Features

- **Multi-language support** - i18n with 6 languages (English, Spanish, French, Arabic, Chinese, Hindi)
- **Smart language selector** - Prominent on first visit, compact afterwards
- **Browser compatibility indicators** - Visual icons showing supported browsers
- **First-time user detection** - Uses localStorage to track returning visitors
- **Icon-based UI** - Designed for pre-literate users
- **Fully responsive** - Works on all screen sizes

## Tech Stack

- React 18
- Vite 5
- i18next & react-i18next for internationalization
- Modern CSS with responsive design
