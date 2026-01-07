# Roblox-TS Template

A comprehensive Roblox-TS game template featuring:

- **[Lapis](https://github.com/nezuo/lapis)** - DataStore wrapper with automatic retries and session locking
- **[Remo](https://github.com/littensy/remo)** - Type-safe networking library
- **[Reflex](https://github.com/littensy/reflex)** - Rodux-inspired state management
- **[React](https://github.com/littensy/rbxts-react)** - React 18 for Roblox UI
- **[Mantle](https://mantledeploy.vercel.app/)** - Infrastructure as code for deployment
- **[Tarmac](https://github.com/Roblox/tarmac)** - Asset management and syncing

## 🚀 Use This Template

### Option 1: GitHub (One-Click)
Click the green **"Use this template"** button at the top of this repository, then clone your new repo.

### Option 2: GitHub CLI
```bash
gh repo create my-new-game --template Morbius45/Fullstack-Roblox-TS-Template --clone
cd my-new-game
npm install
```

### Option 3: Degit (No Git History)
```bash
npx degit Morbius45/Fullstack-Roblox-TS-Template my-new-game
cd my-new-game
npm install
```

### After Cloning
1. Update `package.json` with your project name
2. Update `mantle.yml` with your game's place IDs
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start development

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Rojo](https://rojo.space/) (v7+)
- [Mantle](https://mantledeploy.vercel.app/docs/installation)
- [Tarmac](https://github.com/Roblox/tarmac)
- [Rokit](https://github.com/rojo-rbx/rokit) (recommended for tool management)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Start development mode:**
   ```bash
   npm run dev
   ```

4. **Sync with Roblox Studio:**
   - Install the Rojo plugin in Roblox Studio
   - Click "Connect" in the Rojo plugin panel

## Project Structure

```
.
├── src/
│   ├── client/            # Client-side code
│   │   ├── controllers/   # Client controllers
│   │   ├── components/    # Client components
│   │   ├── ui/            # React UI components
│   │   └── runtime.client.ts
│   │
│   ├── server/            # Server-side code
│   │   ├── services/      # Server services
│   │   ├── components/    # Server components
│   │   └── runtime.server.ts
│   │
│   └── shared/            # Shared code
│       ├── network/       # Remo network definitions
│       ├── store/         # Reflex state management
│       ├── data/          # Lapis data schemas
│       └── types/         # Shared types
│
├── assets/                # Game assets (Tarmac)
│   ├── images/
│   └── sounds/
│
├── mantle.yml             # Mantle deployment config
├── tarmac.toml            # Tarmac asset config
├── default.project.json   # Rojo project config
└── tsconfig.json          # TypeScript config

```

## Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to Lua |
| `npm run watch` | Watch mode compilation |
| `npm run serve` | Start Rojo server |
| `npm run dev` | Watch + serve concurrently |
| `npm run mantle:deploy` | Deploy with Mantle |
| `npm run tarmac:sync` | Sync assets to Roblox |
| `npm run tarmac:sync-dev` | Sync assets locally |

## Architecture

### Data Flow
```
Client Action → Remo → Server Service → Lapis (DataStore)
                                      ↓
                               Reflex Store
                                      ↓
Client ← Remo Broadcast ← Store Changes
                ↓
           React UI Update
```

## License

MIT
