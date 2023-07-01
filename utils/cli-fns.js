import fs from "fs"
import path from "path"

export const lqpath = path.join(process.cwd(), "node_modules", "@liquidiqq", "iconkit", "index.js")

import { bold, cyan, green, grey, yellow, magenta } from "kleur/colors"
import * as p from "@clack/prompts"
import * as c from "./colors.js"
import { execSync } from "child_process"

// +++ install conkit
export async function installIconkit() {
	let iconkit = null

	try {
		execSync(`npm list @liquidiqq/iconkit`)
		iconkit = false
	} catch (err) {}

	const s = p.spinner()

	if (!iconkit) {
		return new Promise(resolve => {
			s.start(`${green("📦")}  installing @liquidiqq/iconkit`)
			resolve(execSync(`npm install -D @liquidiqq/iconkit`))
			s.stop(`${c.success} @liquidiqq/iconkit successfully installed`)
			iconkit = true

			/* if (pkgmanager === "pnpm") {
				s.start(`${green("📦")}  installing @liquidiqq/iconkit`)
				resolve(execSync(`pnpm install -D @liquidiqq/iconkit`))
				s.stop(`${c.success} @liquidiqq/iconkit successfully installed`)
				iconkit = true
			} */
		})
	} else {
		iconkit = false
		p.outro(bold(`  ${c.error}  @liquidiqq/iconkit installation failed`))
		process.exit(0)
	}
}

// +++ example usage
export async function usageExample(confirm) {
	if (confirm === "yes") {
		await logPromiseShort(p.outro(bold("🎉 Iconkit successfully configured")))
		await logPromiseShort(console.log(bold("  Usage:")))
		await logPromiseShort(
			console.log(`
  ${grey("<!-- svelte component, e.g. +page.svelte -->")}

  <${green("script")}>
     ${magenta("import")} { ${yellow("Icon")} } ${magenta("from")} ${cyan("'@liquidiqq/iconkit'")}
  </${green("script")}>

  <${green("Icon")} ${cyan("name")}=${cyan('"face-smile"')} />
	`)
		)
	} else {
		await logPromiseShort(p.outro(bold("👉 Follow the docs to configure Iconkit:") + " " + cyan("https://github.com/liquidiqq/iconkit#readme")))
	}
}

// +++ log promise long
export async function logPromise(message) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
			console.log(message)
		}, 1000)
	})
}

// +++ log promise short
export async function logPromiseShort(msg) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
			msg
		}, 50)
	})
}

// +++ log promise Spin
export async function logSpin(msg) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
			msg
		}, 20)
	})
}

// +++ log promise short
export async function promiseHandler(time, msg) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
			msg
		}, time)
	})
}
