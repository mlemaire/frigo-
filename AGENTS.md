# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# Repo conventions

- Never credit Claude or any AI tool as the author of this codebase in commit bodies,
  PR descriptions, code comments, or documentation. Legitimate product references are
  fine (e.g. "Claude" as a BYOK provider option, "AI" describing the meal-suggestion
  feature) — only authorship/attribution mentions are banned.
- All code identifiers (files, routes, components, variables, functions) and
  markdown docs must be written in English. In-app UI copy stays in French,
  since the app itself is French-facing.
- Session branch names (`claude/...`), the `Co-Authored-By` commit trailer, and
  the git commit author identity itself (global `user.name`/`user.email` set to
  Claude, commits signed with a platform-managed key) are all assigned by the
  Claude Code platform before a session starts. None of this can be changed
  from within the session — flag the constraint instead of trying to rename
  branches, strip trailers, or override the git identity to make commits look
  human-authored.
