#!/usr/bin/env node

import { bold } from "kleur/colors"
import * as p from "@clack/prompts"
import * as c from "./utils/colors.js"

import { configCLI } from "./utils/config-cli.js"
import { installIconkit, usageExample } from "./utils/cli-fns.js"

async function runCLI() {
	console.log("")

	p.intro(bold(`${c.ligtning}  Welcome to Iconkit CLI`))

	const cli = await p.group(
		{
			confirm: () =>
				p.select({
					message: "Configure Iconkit via the CLI?",
					options: [
						{ value: "yes", label: "Yes" },
						{ value: "no", label: "No, I'll do it myself", hint: "follow the docs to configure Iconkit" }
					]
				})
			// pkgmanager: () =>
			// 	p.select({
			// 		message: "Install via:",
			// 		options: [
			// 			{ value: "npm", label: "npm" },
			// 			{ value: "pnpm", label: "pnpm" }
			// 		]
			// 	})
		},
		{
			onCancel: () => {
				p.cancel(bold(`${c.warning}  Iconkit CLI cancelled.`))
				process.exit(0)
			}
		}
	)

	if (cli.confirm === "yes") {
		await installIconkit()
		await configCLI()
	} else {
		await installIconkit()
	}

	await usageExample(cli.confirm)
}

await runCLI()
