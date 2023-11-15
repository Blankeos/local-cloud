https://user-images.githubusercontent.com/38070918/283199618-5f2b540a-fe93-4bf9-ac27-cdb46934b818.mp4

# ☁️⚡ Local-Cloud

An awesome tool for transferring files from your phone <-> computer or any device in your local network.

The concept is a lot like Google Drive, but works locally. The only prerequisite is that your own computer
has to run this program and it will act as the server of the network. From there, you can upload to your computer's
folder from any device on your network. Because it's on your own network, you can experience
super fast speeds unlike uploading it on Google Drive!

## How do I use it?

It's an executable! You don't even need NodeJS to run it!

1. Just make sure to have the executable `main-win.exe`, and an `.env` file in the same directory.

2. The env file should contain

```properties
# File Size Limit of what can be uploaded.
BODY_SIZE_LIMIT=0

# The Root Folder next to the `.exe` where the files will be uploaded.
CLOUD_ROOT="uploads"
```

3. Just open up `main-win.exe` on Windows. (I have no builds for Mac and Linux yet.), and go to http://localhost:3000.

🧡 Made with SvelteKit!

<!-- # create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment. -->
