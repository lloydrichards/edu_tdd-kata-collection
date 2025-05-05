# TDD Kata Collection

This repository is a collection of coding katas from
[cyber-dojo.org](https://cyber-dojo.org/) to practice and improve Test-Driven
Development (TDD) skills. Each kata is organized as a separate project within
the `./kata` directory.

## Structure

- `kata/`  
   Contains subfolders for each kata exercise.

  ```txt
  . kata
  └── 🗂️ yatze     # Simple dice game of Yatze
  ```

## Getting Started

Each kata is a standalone TypeScript project. To set up and run a kata:

1. **Navigate to the kata directory**  
   For example, for the Yatzy kata:

   ```sh
   cd kata/yatze
   ```

2. **Install dependencies**  
   This project uses [bun](https://bun.sh/) as the package manager.  
   If you don't have bun installed, follow the instructions at
   [https://bun.sh/docs/installation](https://bun.sh/docs/installation).

   ```sh
   bun install
   ```

3. **Run tests**  
   Each kata includes tests to verify the implementation.

   ```sh
   bun test
   ```

4. **Lint and type-check**  
   To check code style and types:

   ```sh
   bun run lint
   bun run typecheck
   ```

## Adding a New Kata

1. Create a new folder under `kata/` (e.g., `kata/new-kata`).
2. Initialize a new TypeScript project (copy `package.json`, `tsconfig.json`,
   etc. from an existing kata).
3. Add your implementation and tests in the `src/` directory.
