# Commit Message Rules

When generating commit messages, strictly follow these rules:

1.  **Analyze Staged Changes Only**: Look ONLY at `git diff --staged`. Do NOT include details from unstaged files.
2.  **Conventional Commits**: Use the [Conventional Commits](https://www.conventionalcommits.org/) specification.
    - Format: `<type>(<scope>): <subject>`
    - Scope is optional but recommended.
    - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`.
3.  **Imperative Mood**: Use "Add feature" not "Added feature" or "Adds feature".
4.  **STRICT BODY FORMAT**:
    - The commit body **MUST** start with a blank line after the subject.
    - The commit body **MUST** consist of a bulleted list (`-`) of changes.
    - **DO NOT** use paragraph text in the body. Only bullet points.
    - **TEMPLATE**:

      ```text
      <type>(<scope>): <subject>

      - <Detailed change 1>
      - <Detailed change 2>
      - <Detailed change 3>
      ```

5.  **No Unstaged Files**: Do not mention files that are not in the staged area.
