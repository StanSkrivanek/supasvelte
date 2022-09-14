# create-svelte

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

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

---

## Supabase

1. install `supabase` CLI

```bash
pnpm install @supabase/supabase-js@rc
```

2. add credential
   create `.env` file in root directory and add the following

to get your credentials, go to your supabase project `settings` and click on `API` on the left side menu bar
to get your `Project URL` for `VITE_SUPABASE_URL` and `anon` from `Projects API keys` for `VITE_SUPABASE_ANON_KEY`

```bash
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

3. create Supabase Client
   to be able connect with your Supabase project, you need to create a Supabase client in `src/lib/supabase.js` and add the following

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## LINKS

### Supabase

- [Supabase-Sveltekit](https://supabase.com/docs/guides/with-sveltekit)
- [Supabase-CLI](https://supabase.io/docs/guides/cli)

### Icons

- [phosphoricons](https://phosphoricons.com)

### Editor JS

- [EditorJs API](https://editorjs.io/getting-started)

- #### Editor JS - Plugins

- [Awesome EditorJS](https://github.com/editor-js/awesome-editorjs)
- [Image](https://github.com/editor-js/image)
- [Attaches](https://github.com/editor-js/attaches)
- [Link Autocomplete](https://github.com/editor-js/link-autocomplete)
- [Embed](https://github.com/editor-js/embed)
- [Nested list](https://github.com/editor-js/nested-list)
- [Change Case](https://github.com/maziyank/editorjs-change-case)
