<!-- <p align="center">
  <a href="https://github.com/liquidiqq/iconkit" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/18516326/211879247-75111eac-a99a-46ac-981c-076cf363a833.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/18516326/211878662-e0696425-1abb-43bb-bd0b-b589f9db8148.svg">
      <img alt="Iconkit" src="https://user-images.githubusercontent.com/18516326/211878662-e0696425-1abb-43bb-bd0b-b589f9db8148.svg" width="190"  style="max-width: 100%">
    </picture>
  </a>
</p> -->

<br />

<h1 align="center" style="font-weight:600">
  Iconkit CLI
</h1>

The fastest way to add Iconkit to your Svelte/SvelteKit project with minimal setup. It installs `@liquidiqq/iconkit`, adds classes for icon sizes and imports them to your `+layout.svelte`. Iconkit is a set of community icons that are mainly optimized for the Svelte ecosystem. Read more [here](https://github.com/liquidiqq/iconkit#readme).

<br />

## Installation

```bash
# Svelte/SvelteKit is required
npm create svelte@latest [your-app]

# Tailwindcss is optional
npx svelte-add@latest tailwindcss

# run Iconkit CLI
npx iconkitcli
```

<br/>

## Quick Usage

```html
<script>
	import { Icon } from "@liquidiqq/iconkit"
</script>

<Icon name="face-smile" />
```

## Docs & Searching Icons

Visit [iconkit](https://github.com/liquidiqq/iconkit#readme).

<br/>

## License

[MIT](LICENSE).
