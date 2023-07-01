import fs from "fs"
import path from "path"

import * as p from "@clack/prompts"
import * as i from "./imports.js"
import * as c from "./colors.js"

let tailwind,
	layout,
	iconkit,
	typescript,
	tsfile,
	jsfile = null

import { logSpin, promiseHandler } from "./cli-fns.js"
import { execSync } from "child_process"
;(async function initFn() {
	try {
		execSync(`npm list tailwindcss`)
		tailwind = true
	} catch (err) {
		tailwind = false
	}

	fs.existsSync(i.layoutPath) ? (layout = true) : (layout = false)
	fs.existsSync(i.iconkitCSSPath) ? (iconkit = true) : (iconkit = false)

	try {
		execSync(`npm list typescript`)
		typescript = true
	} catch (err) {
		typescript = false
	}

	fs.existsSync(i.iconkitIconsTsFilePath) ? (tsfile = true) : (tsfile = false)
	fs.existsSync(i.iconkitIconsJsFilePath) ? (jsfile = true) : (jsfile = false)
})()
const s = p.spinner()

export async function configCLI() {
	if (tailwind) {
		if (!layout) {
			// create layout and import iconkit global sizes
			try {
				s.start("cli working")
				fs.mkdirSync(path.dirname(i.layoutPath), { recursive: true })

				await logSpin(s.stop(`${c.success} +layout.svelte created`))
			} catch (err) {
				await logSpin(s.stop(`${c.error} failed to create +layout.svelte`))
			}

			try {
				s.start("cli working")
				fs.writeFileSync(i.layoutPath, i.importForNewLayout)

				await logSpin(s.stop(`${c.success} icon global sizes added to +layout.svelte`))
			} catch (err) {
				await logSpin(s.stop(`${c.error} failed to add icon global sizes to +layout.svlete`))
			}
		}

		if (layout) {
			// import iconkit global sizes before closing script
			const layoutContent = fs.readFileSync(i.layoutPath, "utf-8")

			const lqPkg = "@liquidiqq/iconkit"
			const escapedSlash = lqPkg.replace(/[-/\\^$*+?.()|[\]{}@]/g, "\\$&")
			const pkgRegex = new RegExp(`import .* from ['"]${escapedSlash}['"]`)
			const importRegex = /(regularSize.*miniSize)|(miniSize.*regularSize)/

			const match = layoutContent.match(pkgRegex)

			if (match && importRegex.test(match[0])) {
				s.start("cli working")

				await logSpin(s.stop(`${c.info} +layout.svelte exists`))

				s.start("cli working")
				await logSpin(s.stop(`${c.info} iconkit imports exist`))
				return
			}

			const scriptIndex = layoutContent.indexOf("<script")

			if (scriptIndex !== -1) {
				const scriptCloseIndex = layoutContent.indexOf("</script>", scriptIndex)
				const updatedLayoutContent = layoutContent.slice(0, scriptCloseIndex) + `\n${i.importForExistingLayout}\n` + layoutContent.slice(scriptCloseIndex)

				try {
					s.start("cli working")
					fs.writeFileSync(i.layoutPath, updatedLayoutContent)

					await logSpin(s.stop(`${c.success} added iconkit imports to +layout.svelte`))
				} catch (err) {
					await logSpin(s.stop(`${c.error} failed to add iconkit imports to +layout.svelte`))
				}
			} else {
				try {
					s.start("cli working")
					fs.writeFileSync(i.layoutPath, i.importForNewLayout)

					await logSpin(s.stop(`${c.success} added iconkit imports to +layout.svelte`))
				} catch (err) {
					await logSpin(s.stop(`${c.error} failed to add iconkit imports to +layout.svelte`))
				}
			}
		}
	}

	if (!tailwind) {
		// ! when iconkit.css doesn't exist
		if (!iconkit) {
			// create iconkit.css
			try {
				s.start("cli working")
				fs.mkdirSync(path.dirname(i.iconkitCSSPath), { recursive: true })
				fs.writeFileSync(i.iconkitCSSPath, i.iconkitCSS)

				await logSpin(s.stop(`${c.success} iconkit.css created with icon global sizes`))
			} catch (err) {
				await logSpin(s.stop(`${c.error} failed to create iconkit.css and add icon global sizes to it`))
			}
		} else {
			s.start("cli working")

			await logSpin(s.stop(`${c.info} iconkit.css exists`))
		}
		// ! when layout doesn't exist
		if (!layout) {
			// create layout and import iconkit.css
			try {
				s.start("cli working")
				fs.mkdirSync(path.dirname(i.layoutPath), { recursive: true })

				await logSpin(s.stop(`${c.success} +layout.svelte created`))
			} catch (err) {
				await logSpin(s.stop(`${c.error} failed to create +layout.svelte`))
			}

			try {
				s.start("cli working")
				fs.writeFileSync(i.layoutPath, i.newLayoutCSSImport)

				await logSpin(s.stop(`${c.success} iconkit.css import added to +layout.svelte`))
			} catch (err) {
				await logSpin(s.stop(`${c.error} failed to add iconkit.css import to +layout.svelte`))
			}
		}
		// ! when layout exists
		if (layout) {
			const filename = "iconkit.css"
			const importRegex = /import\s+['"]\..\/iconkit.css['"]/
			const successMsg = `added ${filename} import to +layout.svelte`
			const errorMsg = `failed to add ${filename} import to +layout.svelte`

			addImportToLayout(i.layoutPath, filename, importRegex, i.existingLayoutCSSImport, successMsg, errorMsg)
		}
	}

	if (!typescript) {
		// when iconkit-icons.js doesn't exist
		if (!jsfile) {
			// create iconkit-icons.js
			try {
				s.start("cli working")
				fs.mkdirSync(path.dirname(i.iconkitIconsJsFilePath), { recursive: true })
				fs.writeFileSync(i.iconkitIconsJsFilePath, i.iconkitIconsJsContent)

				await logSpin(s.stop(`${c.success} iconkit-icons.js created`))
			} catch (err) {
				await logSpin(s.stop(`${c.error} failed to create iconkit-icons.js`))
			}
		} else {
			s.start("cli working")

			await logSpin(s.stop(`${c.info} iconkit-icons.js exists`))
		}
	}

	if (typescript) {
		// when iconkit-icons.ts doesn't exist
		if (!tsfile) {
			// create iconkit-icons.ts
			try {
				s.start("cli working")
				fs.mkdirSync(path.dirname(i.iconkitIconsTsFilePath), { recursive: true })
				fs.writeFileSync(i.iconkitIconsTsFilePath, i.iconkitIconsTsContent)

				await logSpin(s.stop(`${c.success} iconkit-icons.ts created`))
			} catch (err) {
				await logSpin(s.stop(`${c.error} failed to create iconkit-icons.ts`))
			}
		} else {
			s.start("cli working")

			await logSpin(s.stop(`${c.info} iconkit-icons.ts exists`))
		}
	}

	await addCustomIconImporToLayout()
}
async function addCustomIconImporToLayout() {
	const filename = tsfile ? "iconkit-icons.ts" : "iconkit-icons.js"
	const importRegex = /import\s+['"]\..\/iconkit-icons['"]/
	const successMsg = `${filename} import added to +layout.svelte`
	const errorMsg = `failed to add ${filename} import to +layout.svelte`

	addImportToLayout(i.layoutPath, filename, importRegex, i.iconkitIconsImport, successMsg, errorMsg)
}

async function addImportToLayout(layoutPath, filename, importRegex, importContent, successMsg, errorMsg) {
	const layoutContent = fs.readFileSync(layoutPath, "utf-8")

	if (importExistsInLayout(layoutContent, importRegex)) {
		// s.start("cli working")
		// await logSpin(s.stop(`${c.info} +layout.svelte exists`))

		s.start("cli working")
		await logSpin(s.stop(`${c.info} ${filename} import exists in +layout.svelte`))
		return
	}

	const scriptIndex = layoutContent.indexOf("<script")

	if (scriptIndex !== -1) {
		const scriptCloseIndex = layoutContent.indexOf("</script>", scriptIndex)
		const updatedLayoutContent = layoutContent.slice(0, scriptCloseIndex) + `\n${importContent}\n` + layoutContent.slice(scriptCloseIndex)

		try {
			s.start("cli working")
			fs.writeFileSync(layoutPath, updatedLayoutContent)

			await logSpin(s.stop(`${c.success} ${successMsg}`))
		} catch (err) {
			await logSpin(s.stop(`${c.error} ${errorMsg}`))
		}
	} else {
		try {
			s.start("cli working")
			fs.writeFileSync(layoutPath, importContent)

			await logSpin(s.stop(`${c.success} ${successMsg}`))
		} catch (err) {
			await logSpin(s.stop(`${c.error} ${errorMsg}`))
		}
	}
}

function importExistsInLayout(layoutContent, importRegex) {
	const match = layoutContent.match(importRegex)
	return match && importRegex.test(match[0])
}
