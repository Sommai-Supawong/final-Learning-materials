# MASTER PROMPT: Learning materials — Production-Grade UI/UX Overhaul & E2E Validation

## 1. ROLE & OBJECTIVE

Act as a **Senior Frontend Engineer, Product Designer, UX Architect, Design Systems Engineer, Accessibility Specialist, and QA Automation Engineer**.

Your task is to inspect, understand, refactor, and improve the existing project into a polished, production-ready web application named **Learning materials**.

This is an existing project, NOT a greenfield project.

Do not blindly rewrite the application or replace working features. First understand the current architecture, business logic, routes, components, data flow, and design patterns. Then implement a coherent UI/UX overhaul based on the existing codebase.

The current UI feels visually unbalanced, inconsistent, and insufficiently refined. Improve its proportions, hierarchy, typography, spacing, component consistency, responsiveness, and overall product quality.

**You are expected to execute the work, modify the code, run available checks, fix discovered problems, and perform end-to-end testing. Do not stop after producing an audit or implementation plan.**

---

## 2. PROJECT IDENTITY & DESIGN DIRECTION

Application name: **Learning materials**

Product category: Learning materials / educational resource management web application.

Primary design direction:

- Minimalist monochrome interface.
- White and black as the primary visual identity.
- Subtle Liquid Glass surfaces.
- Refined Soft UI details.
- Editorial typography with excellent readability.
- Balanced layouts with intentional whitespace.
- Professional, trustworthy, modern, and practical.
- English-first interface.
- Thai typography support where needed, especially in input fields and user-generated content.

The result should feel like a carefully designed, professionally maintained commercial product — not a generic AI-generated dashboard or a collection of trendy UI effects.

### Visual references by design principle

Use the following as conceptual inspiration, not as templates to copy:

- Apple-inspired restraint and surface hierarchy.
- Modern SaaS dashboard information architecture.
- Carefully executed monochrome editorial design.
- Subtle translucent surfaces with restrained blur.
- Soft UI used selectively for depth, not as a replacement for contrast.

Avoid overdesigning. Every visual element must have a functional or informational purpose.

---

## 3. PHASE 1 — REPOSITORY DISCOVERY & SAFETY

Before modifying any source code, inspect the entire relevant project structure.

### Required investigation

1. Determine the current working directory and repository root.
2. Read the project instructions, including applicable `AGENTS.md`, README files, and development documentation.
3. Inspect package manifests and identify the actual framework, package manager, scripts, dependencies, and runtime requirements.
4. Inspect the existing routing structure, layouts, pages, shared components, stylesheets, design tokens, and asset organization.
5. Identify the existing authentication flow, authorization rules, API integrations, database interactions, and business logic where applicable.
6. Identify existing forms, tables, search, filtering, pagination, dialogs, dropdowns, notifications, and loading states.
7. Identify current testing tools, E2E configuration, fixtures, test accounts, and CI scripts.
8. Run Git status and review recent changes before editing.
9. Identify existing errors, incomplete components, inconsistent styling, duplicated UI patterns, and obvious usability problems.

### Safety rules

- Preserve existing business functionality and data contracts.
- Never expose secrets, API keys, credentials, or environment variables in logs or reports.
- Never reset, truncate, or delete databases.
- Never overwrite user changes without understanding their purpose.
- Never use destructive Git commands to force a clean working tree.
- Do not replace major dependencies or the framework without a clear technical necessity.
- Do not invent API endpoints, database fields, environment variables, or product requirements.
- Preserve the current architecture unless refactoring is justified.
- Prefer incremental, maintainable changes over unnecessary rewrites.

After the audit, create a concise implementation checklist internally and proceed with the implementation.

Do not wait for user approval for ordinary design decisions that can be safely inferred from the existing project.

---

## 4. PHASE 2 — DESIGN SYSTEM

Create or consolidate a consistent design system using the styling conventions already present in the repository.

Avoid introducing an entirely separate styling system when the existing one can be extended cleanly.

### 4.1 Color palette

Use monochrome as the default identity.

Suggested design tokens:

- Primary background: `#FFFFFF`
- Secondary background: `#F7F7F7`
- Subtle surface: `#F1F1F1`
- Primary text: `#171717`
- Secondary text: `#666666`
- Muted text: `#858585`
- Primary border: `#E7E7E7`
- Strong border: `#D5D5D5`
- Primary action: `#171717`
- Primary action text: `#FFFFFF`
- Glass surface: `rgba(255, 255, 255, 0.72)`
- Glass border: `rgba(255, 255, 255, 0.8)`

These values are starting points, not rigid requirements. Adapt them to the existing application and verify readability in actual usage.

Use color intentionally for status indicators, validation feedback, and meaningful actions. Do not introduce unnecessary colorful gradients, neon accents, or random accent colors.

### 4.2 Typography — Kanit

Use **Kanit** as the application's primary typeface, with appropriate fallbacks.

Requirements:

- Load Kanit through the project's existing font-loading mechanism where possible.
- Prefer an existing local font asset or a reliable, optimized font delivery method supported by the project.
- Include appropriate Thai and Latin glyph coverage.
- Avoid loading unnecessary font weights.
- Define consistent font weights and line heights.
- Ensure Thai characters render correctly without clipping or awkward vertical alignment.
- Use a clear hierarchy for page titles, section headings, body text, labels, metadata, and helper text.

Suggested typography scale:

- Page title: 28–36px desktop; responsive on smaller screens.
- Section title: 20–24px.
- Card title: 16–18px.
- Body text: 14–16px.
- Form labels: 13–14px.
- Helper text and metadata: 12–13px.

Adjust these values to the real content density and layout.

Use `font-display: swap` when appropriate and avoid layout shifts caused by font loading.

### 4.3 Global font coverage

Kanit must apply consistently to:

- Navigation and menus.
- Buttons and button labels.
- Inputs and textareas.
- Selects and dropdown options where styling is supported.
- Search fields.
- Form validation messages.
- Dialogs and confirmation prompts.
- Tables and pagination.
- Tooltips and notifications.
- Empty states and loading states.
- User-generated content where appropriate.
- Native form controls where browser styling permits.

Do not limit Kanit to static headings while leaving forms or dynamically rendered content in another font.

Set sensible global typography defaults and explicitly correct components or third-party widgets that do not inherit the font.

Respect any third-party rendering limitations and document unavoidable exceptions.

### 4.4 Spacing and sizing system

Establish a consistent spacing scale, preferably based on multiples of 4px.

Use consistent rules for:

- Page gutters.
- Content width.
- Section spacing.
- Card padding.
- Form field spacing.
- Button height.
- Icon alignment.
- Table density.
- Border radius.
- Modal sizing.

Avoid arbitrary values scattered across components.

Use CSS variables or the project's existing token mechanism for repeated values.

---

## 5. PHASE 3 — LIQUID GLASS & SOFT UI

Implement Liquid Glass and Soft UI as restrained supporting design techniques.

### Liquid Glass

Use translucent surfaces only where they improve visual hierarchy, such as:

- Floating navigation elements.
- Sticky toolbars.
- Selected overlays.
- Modal backdrops or floating panels.
- Small utility controls.

Implementation guidelines:

- Use subtle transparency.
- Apply restrained `backdrop-filter: blur(...)`.
- Add delicate borders and realistic surface separation.
- Maintain sufficient foreground/background contrast.
- Provide opaque fallbacks when backdrop filtering is unsupported.
- Prevent blur and transparency from reducing text readability.
- Avoid applying glass effects to every card or every section.
- Avoid excessive shadows, glowing borders, and decorative gradients.

### Soft UI

Use subtle depth for:

- Interactive controls.
- Selected filters.
- Small floating action elements.
- Cards that genuinely need separation.
- Pressed, focused, or selected states.

Avoid excessive neumorphism, low-contrast embossed text, and shadows that make the interface appear outdated.

### Interaction quality

Every interactive component should have intentional states:

- Default.
- Hover.
- Focus-visible.
- Active or pressed.
- Disabled.
- Loading, where applicable.
- Selected, where applicable.
- Error or success, where applicable.

Respect `prefers-reduced-motion`. Animation must never be required to understand the interface.

---

## 6. PHASE 4 — UX & LAYOUT REFINEMENT

Inspect all existing routes and important user flows.

Do not redesign only the homepage while leaving the rest of the application inconsistent.

### 6.1 Layout proportions

Correct visual imbalance by reviewing:

- Content width relative to viewport width.
- Sidebar-to-content proportions.
- Header height.
- Page title and action alignment.
- Card widths and heights.
- Grid column counts.
- Vertical rhythm.
- Table readability.
- Empty space distribution.
- Text wrapping and line lengths.
- Responsive breakpoints.

Avoid oversized hero sections, excessively large headings, unnecessarily tall cards, and large empty areas without a clear purpose.

Prefer content-driven layouts over fixed dimensions whenever practical.

Use consistent alignment lines and spacing relationships throughout the application.

### 6.2 Navigation

Improve navigation clarity without changing the existing route behavior.

Ensure:

- Active navigation items are immediately recognizable.
- Labels are concise and consistent.
- Icons are visually consistent in size and style.
- Navigation works with keyboard input.
- Mobile navigation remains usable.
- Long labels do not overflow or collide with adjacent elements.

Do not add decorative navigation items or nonfunctional links.

### 6.3 Cards and content sections

Cards should communicate meaningful content, not merely act as containers.

- Establish clear title, content, and action hierarchy.
- Use consistent padding and alignment.
- Avoid unnecessary nested cards.
- Avoid giving every card the same visual prominence.
- Use subtle dividers where they communicate grouping.
- Ensure consistent corner radii.
- Avoid excessive badges and decorative icons.
- Use a consistent content density appropriate to educational materials.

### 6.4 Forms and input UX

Forms are a critical part of the redesign.

Ensure:

- Every field has a clear label.
- Placeholder text is supplementary, not a replacement for labels.
- Inputs and textareas use Kanit.
- Input text supports both Thai and English.
- Validation messages are understandable and positioned consistently.
- Required fields are communicated clearly.
- Focus indicators are visible.
- Error messages do not cause unnecessary layout jumps.
- Buttons communicate loading and disabled states correctly.
- Form submission prevents accidental duplicate requests where appropriate.
- Keyboard navigation and Enter-key behavior work as intended.
- Server-side validation remains intact.

Do not weaken validation or security to make the interface appear smoother.

### 6.5 Tables, search, and filters

Where these features exist:

- Keep column alignment consistent.
- Make headings easy to scan.
- Avoid unnecessary horizontal scrolling on desktop.
- Use responsive table patterns on mobile.
- Ensure filters and search are visually grouped.
- Provide clear reset or empty states where appropriate.
- Preserve existing sorting, filtering, and pagination behavior.
- Ensure Thai and English text do not break column sizing.

### 6.6 Feedback and application states

Implement or improve appropriate:

- Loading indicators or skeletons.
- Empty states.
- Error messages.
- Success notifications.
- Confirmation dialogs for destructive actions.
- Disabled states.
- Retry mechanisms where appropriate.
- Optimistic updates only when safe and consistent with existing data behavior.

Never display a false success state before an operation has actually succeeded.

---

## 7. PHASE 5 — RESPONSIVE DESIGN

Verify the application at these representative viewport sizes:

- Mobile: 360 × 800.
- Mobile: 390 × 844.
- Tablet: 768 × 1024.
- Laptop: 1366 × 768.
- Desktop: 1440 × 900.
- Wide desktop: 1920 × 1080.

These are test targets, not the only supported screen sizes.

Requirements:

- No unintended horizontal overflow.
- No clipped headings or form labels.
- No overlapping buttons or navigation.
- No unusable dropdowns or modals.
- Appropriate touch target sizes.
- Readable Thai and English text.
- Consistent spacing across breakpoints.
- Images and media preserve appropriate proportions.
- Primary actions remain accessible on smaller screens.

Use responsive layouts rather than simply scaling down the desktop interface.

---

## 8. PHASE 6 — ACCESSIBILITY & PERFORMANCE

Target WCAG 2.2 AA where practical.

Verify:

- Semantic HTML.
- Correct heading hierarchy.
- Accessible labels.
- Keyboard navigation.
- Visible focus states.
- Sufficient contrast.
- Appropriate accessible names for icon-only buttons.
- Proper dialog semantics and focus behavior.
- Reduced-motion support.
- Accessible form error announcements where applicable.

For performance:

- Avoid unnecessary client-side rendering.
- Avoid adding large dependencies for minor visual effects.
- Avoid unnecessary re-renders.
- Optimize image loading.
- Prevent font-related layout shifts.
- Keep animations lightweight.
- Avoid excessive backdrop filters on large surfaces.
- Preserve or improve existing build performance.

Use existing project tooling to measure performance when available. Do not claim measured performance improvements without actual measurements.

---

## 9. PHASE 7 — IMPLEMENTATION RULES

Implement the design using the project's actual stack.

### Engineering requirements

- Reuse existing components where appropriate.
- Extract reusable components when repeated UI patterns justify it.
- Keep components focused and maintainable.
- Separate presentation from business logic when appropriate.
- Follow existing naming and file organization conventions.
- Remove obsolete styling only after confirming it is no longer used.
- Avoid duplicated CSS and conflicting global styles.
- Avoid arbitrary `!important` declarations as a shortcut.
- Avoid unnecessary absolute positioning.
- Avoid hardcoded widths that break at common viewport sizes.
- Avoid placeholder content in production screens unless the existing product requires it.
- Preserve real data, permissions, authentication, and error handling.
- Do not fabricate backend responses or bypass authentication for testing.
- Do not silently remove features because they are difficult to style.

Do not perform a full rewrite simply to match a preferred design style.

If an existing implementation is fundamentally broken, make the smallest justified architectural change and explain why.

After each meaningful implementation stage, inspect the changed files and run the most relevant available checks.

---

## 10. PHASE 8 — END-TO-END TESTING

**E2E testing is mandatory.** Visual inspection alone is not sufficient.

First inspect the existing testing framework and configuration.

Use the project's existing E2E framework if it is functional. If no usable E2E setup exists, prefer Playwright when compatible with the existing stack and project constraints.

Do not install duplicate testing frameworks without justification.

### 10.1 Required baseline checks

Run the relevant available commands for:

- Dependency and configuration validation.
- Linting.
- Type checking.
- Unit or component tests.
- Production build.
- E2E tests.

Determine the actual script names from the package manifest. Do not assume commands exist.

Fix failures introduced by your changes.

Investigate pre-existing failures separately and document them clearly.

### 10.2 E2E scenarios

Create or update executable tests for the following flows, adapted to the actual application.

1. Application loads successfully.
2. The primary page renders without fatal runtime errors.
3. Navigation to important routes works.
4. Main page headings and primary actions are visible.
5. Forms accept valid English input.
6. Forms accept valid Thai input.
7. Validation handles missing or invalid data correctly.
8. Valid forms submit successfully using the real supported application flow.
9. Search and filtering work where available.
10. Tables, pagination, and sorting work where available.
11. Dialogs, dropdowns, and menus open and close correctly.
12. Loading, success, and error states behave correctly.
13. Authentication and protected routes remain secure where applicable.
14. Responsive navigation works on mobile.
15. No unexpected horizontal overflow exists at target viewports.
16. Critical user journeys remain functional after the redesign.

Do not force irrelevant tests into the project. Map each scenario to the features that actually exist and report any inapplicable scenarios.

### 10.3 Thai font verification

Add a practical verification strategy for Kanit.

Where the font is locally served, verify that the font resource loads successfully.

Use browser inspection or computed styles to confirm that important elements use Kanit, including:

- Body text.
- Buttons.
- Text inputs.
- Textareas.
- Search fields.
- Dynamically rendered form errors.

Enter Thai text into at least one relevant form field and verify that it renders correctly without clipping.

A computed font-family value alone does not prove that the intended font file loaded; verify resource loading when feasible.

### 10.4 Visual regression and layout checks

At minimum, capture screenshots of important pages at desktop and mobile sizes.

Inspect the screenshots for:

- Misalignment.
- Unexpected overflow.
- Clipped content.
- Inconsistent spacing.
- Poor text wrapping.
- Broken responsive layouts.
- Missing assets.
- Incorrect modal placement.
- Visual regressions.

If the existing project supports visual regression testing, use it appropriately.

Do not automatically approve screenshots without reviewing the actual output.

### 10.5 Test environment and data safety

- Use existing test fixtures or dedicated test accounts.
- Never use production credentials or destructive production data.
- Avoid modifying real user records during testing.
- Do not disable authentication or security controls merely to make tests pass.
- Clean up only test data created by the tests.
- If a required external service is unavailable, report the limitation and test the remaining functionality.
- Never claim that E2E tests passed unless they actually executed successfully.

---

## 11. PHASE 9 — FINAL QUALITY GATE

Before declaring the work complete, verify all of the following.

### Design

- [ ] The application consistently uses the Learning materials identity.
- [ ] Monochrome remains the primary visual language.
- [ ] Liquid Glass and Soft UI are subtle and purposeful.
- [ ] Kanit is applied consistently, including form controls.
- [ ] Thai and English text render correctly.
- [ ] Layout proportions and spacing are coherent.
- [ ] Components follow a consistent design system.
- [ ] The application looks professionally designed rather than generically AI-generated.

### Functionality

- [ ] Existing routes remain functional.
- [ ] Existing business logic is preserved.
- [ ] Forms and validation work.
- [ ] Navigation and interactive controls work.
- [ ] Responsive layouts have been checked.
- [ ] Accessibility and performance concerns have been reviewed.

### Quality assurance

- [ ] Linting executed where available.
- [ ] Type checking executed where available.
- [ ] Relevant tests executed.
- [ ] Production build executed.
- [ ] E2E tests executed.
- [ ] Screenshots reviewed.
- [ ] Regressions introduced by the changes fixed or explicitly documented.

A checkbox must reflect actual verification, not intention.

---

## 12. FINAL REPORT

After implementation and testing, provide a concise but informative report containing:

### A. Repository assessment
- Framework and major technologies discovered.
- Existing problems that materially affected the redesign.

### B. Implemented improvements
- Pages and components modified.
- Design system and typography changes.
- Responsive and accessibility improvements.
- UX changes and preserved functionality.

### C. Files changed
List the most important changed files and explain their purpose.

### D. Verification results

For each relevant command, report:

- Actual command executed.
- PASS, FAIL, or BLOCKED.
- A concise explanation of the result.

Include E2E results and the number of tests passed, failed, skipped, or not run when the runner provides those details.

### E. Remaining issues
Identify known regressions, pre-existing failures, missing test coverage, or external dependencies that prevented full verification.

### F. Recommended next steps
List only high-value follow-up work.

Do not claim the application is production-ready if critical checks remain unresolved.

---

## EXECUTION DIRECTIVE

Start by inspecting the repository and its instructions.

Then implement the UI/UX improvements, validate the code, run E2E tests, inspect screenshots, fix regressions, and produce the final report.

**Do not stop at analysis, mockups, recommendations, or a proposed plan. Make the actual changes in the current project.**

Prioritize this order:

1. Preserve existing functionality and establish a reliable baseline.
2. Fix major layout and hierarchy problems.
3. Establish the monochrome design system and Kanit typography.
4. Refine Liquid Glass and Soft UI details.
5. Improve responsive behavior, accessibility, and interaction states.
6. Run tests and inspect actual browser output.
7. Fix issues and report verified results.

The final result must feel balanced, deliberate, accessible, maintainable, and production-oriented — with visual polish serving usability rather than distracting from it.