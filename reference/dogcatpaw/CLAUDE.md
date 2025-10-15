# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the development server on http://localhost:3000
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code style and catch errors

## Project Architecture

This is a Next.js 15 application using the App Router pattern with TypeScript and Tailwind CSS.

### Key Architecture Points

- **Framework**: Next.js 15 with App Router (not Pages Router)
- **Styling**: Tailwind CSS v4 with PostCSS integration
- **TypeScript**: Strict mode enabled with path mapping (@/* → ./src/*)
- **Font Optimization**: Uses next/font with Geist Sans and Geist Mono fonts
- **Project Structure**: App directory-based routing in `src/app/`

### Directory Structure

- `src/app/` - App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global styles with Tailwind directives
- Root config files for Next.js, TypeScript, PostCSS, and ESLint

### Important Development Notes

- Uses React 19.1.0 and React DOM 19.1.0
- TypeScript strict mode is enabled
- Path aliases configured: `@/*` maps to `./src/*`
- ESLint is configured with next/core-web-vitals rules
- No existing test framework configured