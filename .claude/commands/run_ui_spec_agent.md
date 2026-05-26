Use this updated Claude custom slash command description:

```md
Description: Orchestrates the complete Next.js UI feature workflow: UX Specification → Implementation → Visual Verification

Arguments:

user_story (required): The UI feature, product idea, or user story to design, implement, and verify.

You are implementing a complete UI feature for a Next.js application using a three-phase workflow.

## Phase 1: UX Specification

Launch the `ux-spec-agent` using the Task tool:

subagent_type: "ux-spec-agent"

prompt:
Pass the full user story below exactly as provided.

The ux-spec-agent must produce a complete Next.js UI/UX blueprint covering:

- user goal
- page/layout structure
- App Router considerations
- required components
- Server Component vs Client Component guidance
- interaction flow
- loading, empty, error, and success states
- accessibility requirements
- implementation checklist
- Playwright verification steps

Wait until the ux-spec-agent ends with exactly:

Ready for coding.

Do not begin implementation until this signal is received.

## Phase 2: Implementation

After receiving the UX specification:

- Implement the feature according to the specification
- Follow the existing Next.js project structure
- Use App Router conventions
- Respect existing layouts, components, styling, and architecture
- Prefer Server Components unless interactivity requires Client Components
- Add or update route handlers, Server Actions, Prisma models, or validation only when required
- Handle loading, empty, error, and success states
- Preserve accessibility requirements
- Avoid unrelated refactors
- Keep file changes focused on the requested feature

After implementation:

- Run type checks
- Run linting
- Run unit tests if available
- Add or update tests where appropriate
- Fix any failures before continuing

Do not proceed to visual verification until the implementation is complete and checks pass, or until any blocking issue is clearly documented.

## Phase 3: Visual Verification

Launch the `ui-testing-agent` using the Task tool:

subagent_type: "ui-testing-agent"

prompt:
Describe exactly what was implemented, including:

- new or modified routes/pages
- components created or changed
- forms/interactions added
- expected user flow
- important states to verify
- any authentication requirements
- any known limitations or setup notes

The ui-testing-agent must:

- start or connect to the Next.js app at `http://localhost:3000`
- verify the implemented feature using Playwright
- test realistic user interactions
- check routing, UI states, responsiveness, and accessibility basics
- watch for console or hydration errors
- capture screenshots in `test-output/`
- provide a structured verification report

## Final Response

After visual verification, provide a concise final summary including:

- UX specification completed
- implementation completed
- checks/tests run
- visual verification result
- screenshots captured
- bugs or follow-up items, if any
- how many tokens used

If the ui-testing-agent finds issues, summarize them clearly and recommend the next fix.
```
