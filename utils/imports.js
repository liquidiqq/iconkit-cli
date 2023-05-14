import fs from "fs"
import path from "path"

// paths
export const layoutPath = path.join(process.cwd(), "src", "routes", "+layout.svelte")
export const iconkitCSSPath = path.resolve(process.cwd(), "src", "iconkit.css")

// data

export const importForNewLayout = `<script>
// Iconkit global sizes imported by Iconkit CLI
	import { regularSize, miniSize } from '@liquidiqq/iconkit'
	$: {
		$regularSize = "h-6 w-6"
		$miniSize = "h-5 w-5"
	}
</script>

<slot />
`

export const importForExistingLayout = `	// Iconkit global sizes imported by Iconkit CLI
	import { regularSize, miniSize } from '@liquidiqq/iconkit'
	$: {
		$regularSize = "h-6 w-6"
		$miniSize = "h-5 w-5"
	}
`

export const newLayoutCSSImport = `<script>
	// Iconkit global sizes imported by Iconkit CLI
	import './iconkit.css'
</script>

<slot />
`
export const existingLayoutCSSImport = `	// Iconkit global sizes imported by Iconkit CLI
	import './iconkit.css'
`

export const iconkitCSS = `/* --- Iconkit regular icon size --- */
.h-6 {
	height: 1.5rem;
}
.w-6 {
	width: 1.5rem;
}

/* --- Iconkit mini icon size --- */
.h-5 {
	height: 1.25rem;
}
.w-5 {
	width: 1.25rem;
}
`
