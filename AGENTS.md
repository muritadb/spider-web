# Repository Guidelines

## Project Structure & Module Organization

This workspace currently contains no application source, dependency manifest, tests, or assets. Establish the structure when initializing the project, and update this guide accordingly. For a React application, use `src/` for components and application logic, `public/` for static assets, and colocated test files beside the modules they exercise. Group related features together as the application grows.

## Build, Test, and Development Commands

No build, development, lint, or test commands are configured yet. After selecting tooling, define scripts in `package.json` and document the exact commands here. Suggested script names are `dev` for local development, `build` for production output, `lint` for static checks, and `test` for automated tests. Do not assume these commands work until implemented. Commit the chosen package manager’s lockfile.

## Coding Style & Naming Conventions

Follow the formatter and linter configuration introduced with the application. Until then, use two-space indentation in JavaScript, TypeScript, JSON, and CSS. Use PascalCase for React components, camelCase for functions and variables, and descriptive filenames matching their primary exports. Keep components focused and avoid unnecessary dependencies.

## Testing Guidelines

No testing framework or coverage threshold is configured. When introducing tests, document the runner and execution command. Name tests `*.test.ts`, `*.test.tsx`, or equivalent extensions for the selected language. Prioritize observable behavior and regression cases for bug fixes.

## Commit & Pull Request Guidelines

Git history is unavailable, so no existing commit convention can be verified. Use concise, imperative commit subjects, such as `Add navigation component`. Pull requests should explain the change, link relevant issues, report validation performed, and include screenshots for visible interface changes. State any checks that could not run.

## Agent Instructions & Configuration

For GetLayers builds, always call `getlayers_start` first and follow the skill at https://storage.getlayers.ai/skill/getlayers/SKILL.md. If the tool or skill is unavailable, report the limitation before proceeding with GetLayers work. Keep credentials out of committed files; document required environment variables using placeholders.
