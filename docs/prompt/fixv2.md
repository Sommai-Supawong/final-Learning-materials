# MASTER PROMPT — Learning materials
## Product-to-Learning Transformation | Architecture Audit | Artistic UI/UX Redesign | Production Quality | E2E Testing

### ROLE

Act as a Principal Software Architect, Senior Full-Stack Engineer, Product Designer, Motion Designer, Design Systems Engineer, and QA Automation Engineer.

Your mission is to transform the existing application from a Product Management-oriented project into a polished, production-grade **Learning materials** website.

This is an existing codebase that must be audited and intentionally transformed. Do not merely change labels, colors, or the homepage.

You must understand the current implementation, identify obsolete product-related functionality, preserve useful infrastructure, redesign the information architecture, implement the changes in the actual repository, and verify the result through automated tests and real browser interactions.

**Do not stop after analysis or provide recommendations without implementation.** Work through the entire process, subject to the capabilities and permissions of the environment.

---

# 1. PROJECT CONTEXT

Target application name: `Learning materials`

Brand direction:
- Preserve the existing monochrome visual identity and overall color tone.
- Use the existing project logo as the primary brand reference.
- Introduce refined, artistic animations and smooth interaction feedback.
- Use professional lighting, shadows, depth, and layered surfaces derived from the logo's existing colors.
- Create a premium educational resource browsing and management experience.
- Maintain excellent readability, accessibility, and responsive behavior.

The intended result must look like a carefully art-directed, professionally engineered web product rather than a basic CRUD template or generic AI-generated dashboard.

### Important repository paths

Current project:
- Start from the current working directory.
- Discover the actual repository root before modifying files.

Logo reference directory:

`D:\maiy\FINAL-PROJECT\final-product-management-1-69\frontend\public\logo`

The logo directory is a reference source. Inspect its contents and identify the correct logo assets before choosing one.

Do not assume the directory contains a particular filename, format, color, or number of assets.

If the current repository is different from the logo source repository, verify that the path is accessible from the active environment before copying or referencing anything.

For WSL or Linux environments, inspect the corresponding mounted Windows path, if available. Do not blindly convert Windows paths or assume the drive is mounted.

Prefer copying the selected asset into the target project's public asset directory when appropriate. Preserve the original asset and avoid introducing fragile references to files outside the deployed application.

If the logo directory is inaccessible, report the limitation and continue with safe implementation work that does not depend on guessing the logo.

---

# 2. PHASE ONE — REPOSITORY DISCOVERY

Before editing any files, conduct a thorough audit.

## 2.1 Understand the application

Inspect:

- Repository structure.
- `AGENTS.md` and other applicable project instructions.
- README and development documentation.
- Frontend and backend package manifests.
- Frameworks, dependencies, and available scripts.
- Routes, layouts, pages, components, and shared utilities.
- CSS architecture, design tokens, fonts, icons, and assets.
- API services, endpoints, request/response contracts, and error handling.
- Database models, migrations, schemas, and existing records.
- Authentication, authorization, and protected routes, if present.
- Existing automated tests and E2E configuration.
- Deployment configuration and environment variables.
- Current Git status and uncommitted changes.

Run the existing application and tests where practical to establish a baseline.

Record existing failures before attributing them to new changes.

## 2.2 Identify product-related functionality

Search the entire relevant codebase for product-oriented concepts, including but not limited to:

- Products and product catalogs.
- Product inventory and stock management.
- Product pricing and currency.
- Product variants and SKUs.
- Product purchasing or checkout.
- Shopping carts and order management.
- Product-specific categories, filters, and forms.
- Product creation and editing workflows.
- Product-specific API routes, controllers, models, and database fields.
- Product-oriented navigation, dashboards, statistics, and terminology.
- Product-specific demo data, fixtures, and test cases.
- Product-specific validation rules and business logic.

Do not rely on keyword search alone. Trace dependencies, imports, route usage, database access, and user workflows to establish what each component actually does.

## 2.3 Classify every major feature

Classify discovered functionality into four groups:

**A. Remove**

Features exclusively related to product management that are no longer needed.

Examples include shopping carts, stock quantity, SKU administration, product pricing, and order workflows when those features are not part of the new learning materials requirements.

**B. Retain**

Reusable infrastructure that remains valuable.

Examples include API clients, database connectivity, environment configuration, reusable form controls, shared layouts, notification systems, authentication infrastructure, logging, and test tooling.

**C. Refactor**

Existing features that have useful foundations but incorrect domain assumptions.

Examples include product listing pages, product detail pages, category filtering, create/edit forms, status badges, and content management tables.

**D. Build**

Missing functionality specifically required for Learning materials.

Examples include learning resource discovery, resource details, educational categories, publication status, resource creation, and resource editing.

Do not remove infrastructure merely because it currently serves product pages.

Produce a concise audit and migration checklist, then proceed with implementation.

Do not wait for user confirmation for ordinary, reversible engineering decisions.

---

# 3. PHASE TWO — DEFINE THE NEW PRODUCT DOMAIN

The new application must use learning resources as its primary domain rather than products.

Before implementing the domain model, inspect the existing requirements, database schema, and application behavior.

Use the following as a default target model, adapting it to the real repository.

## 3.1 Core learning resource

A learning resource may contain:

- `id`
- `title`
- `creator`
- `category`
- `publishedDate`
- `description`
- `status`

Preserve the actual field names and API contracts required by the existing application unless a justified migration is necessary.

If the existing project already uses an equivalent schema, reuse it rather than duplicating the data model.

If the project is subject to a fixed academic specification, preserve that specification exactly.

Do not invent requirements such as file uploads, ratings, course enrollment, payment, user roles, or additional database relationships unless they are already required or clearly supported by the project.

## 3.2 Core user journeys

Inspect which journeys already exist and implement the applicable ones:

1. Browse learning resources.
2. Search by resource title or other supported searchable fields.
3. Filter by category.
4. View complete resource details.
5. Create a learning resource when the user has permission.
6. Edit an existing resource.
7. Delete a resource with explicit confirmation.
8. Distinguish published resources from drafts.
9. Handle loading, empty, success, and error states.
10. Recover from API errors without displaying misleading success messages.

If the application supports both public browsing and administration, separate these experiences clearly.

Do not introduce authentication or permissions that do not exist without a justified product requirement.

## 3.3 Remove obsolete domain references

Replace obsolete product-oriented content throughout the application, including:

- Page titles.
- Navigation labels.
- Breadcrumbs.
- Headings and helper text.
- Form labels.
- Empty states.
- Error messages.
- Notifications.
- Table columns.
- Search placeholders.
- API service naming.
- Documentation.
- Test descriptions.
- Seed data and demo fixtures.

Remove genuinely unused product-only modules and dependencies when safe.

Do not blindly delete files based on their names. Verify that they are not used by shared features.

Avoid compatibility layers that keep obsolete product workflows alive indefinitely unless backwards compatibility is required.

---

# 4. PHASE THREE — BRAND AND LOGO INTEGRATION

Use the existing logo as the source of truth for the visual identity.

## 4.1 Logo investigation

Inspect the logo assets and determine:

- Which logo is intended for the main application.
- Whether a light or dark variant exists.
- The actual dominant colors.
- Whether the logo contains transparent margins.
- Appropriate usage on light and dark surfaces.
- Whether an icon-only asset is available.
- Whether SVG, PNG, or another format is most appropriate.

Do not recreate, recolor, distort, or replace the official logo without a clear reason.

Preserve its original proportions and transparency.

## 4.2 Logo-derived visual system

Derive supporting design tokens from the logo's real colors.

Keep the existing monochrome identity as the foundation.

Use logo-derived color values for restrained:

- Ambient lighting.
- Diffused shadows.
- Focus rings.
- Hover glows.
- Active navigation indicators.
- Selected controls.
- Decorative motion accents.
- Background illumination.

Do not introduce unrelated accent colors.

Do not assume the logo contains red, blue, purple, or any other particular accent until the actual asset has been inspected.

## 4.3 Asset implementation

Place the selected logo in the target project's existing public asset directory, following repository conventions.

Use a stable asset path within the deployed application.

Verify that the logo loads in development and production builds.

Check the logo's rendering against both light and dark surfaces where applicable.

Use appropriate alternative text for meaningful logos. Decorative duplicates should not produce redundant screen-reader announcements.

---

# 5. PHASE FOUR — ART DIRECTION AND VISUAL LANGUAGE

Create a coherent visual system that combines monochrome minimalism with expressive but disciplined motion.

The interface must not feel plain, static, or unfinished. It should have visual character without sacrificing usability.

## 5.1 Visual principles

Prioritize:

- Strong typographic hierarchy.
- Asymmetric but balanced compositions where appropriate.
- Carefully controlled negative space.
- Layered surfaces.
- Subtle ambient lighting.
- Refined depth and shadow.
- Consistent geometry.
- Clear visual grouping.
- Meaningful interactive states.
- Motion that communicates relationships and user actions.

Avoid:

- Generic dashboard templates.
- Identical cards repeated everywhere.
- Oversized headings without purpose.
- Excessive rounded containers.
- Unnecessary gradients.
- Random decorative blobs.
- Overuse of glass effects.
- Excessive drop shadows.
- Neon effects unrelated to the logo.
- Constant animation that distracts from reading.
- Artificial counters or statistics that have no real data source.
- Decorative controls that do not perform a real action.

## 5.2 Liquid Glass and Soft UI

Use restrained glass surfaces for appropriate floating elements, such as:

- Navigation overlays.
- Search panels.
- Floating utility controls.
- Dialogs and popovers.
- Selected content panels.

Use subtle translucency, borders, background blur, and shadows.

Provide readable fallback surfaces when backdrop filtering is unavailable.

Use Soft UI for selective interactive depth, not as a blanket treatment for every component.

Maintain sufficient contrast and visible boundaries.

## 5.3 Lighting and shadows

Develop a consistent lighting system based on the logo's colors.

Consider:

- Soft ambient background illumination.
- Low-opacity radial light sources.
- Subtle edge highlights.
- Diffused card shadows.
- Controlled inset highlights.
- Small hover illumination effects.
- Clear separation between foreground and background.

Lighting must remain understated and must not reduce text contrast.

Avoid applying expensive blur effects to numerous full-screen elements.

Prefer CSS-driven effects over large images or heavy animation libraries when practical.

---

# 6. PHASE FIVE — ARTISTIC MOTION SYSTEM

Motion is a major part of the redesign.

Design a reusable motion language rather than adding unrelated animations to individual components.

Every animation must have a purpose: orientation, continuity, feedback, hierarchy, or delight.

## 6.1 Page entrance

Where appropriate, introduce:

- Subtle staggered content reveals.
- Smooth opacity and transform transitions.
- Controlled entrance timing.
- Gentle section reveals.
- Consistent transitions between page states.

Avoid long intro sequences that delay access to content.

The page must remain usable immediately, even if animations are disabled or interrupted.

## 6.2 Scroll interactions

Use tasteful scroll-driven effects where they improve the experience:

- Subtle section reveals.
- Small parallax offsets on decorative layers.
- Progressive content transitions.
- Gentle background-light movement.
- Navigation state changes where justified.
- Smooth transitions between visually distinct sections.

Prefer CSS scroll-driven animations or lightweight observers when supported by the existing stack.

Do not use scroll listeners that perform expensive calculations on every event.

Avoid excessive parallax, scroll hijacking, forced scrolling, and animation that makes reading difficult.

Keep the main content stable and easy to follow.

## 6.3 Click and hover feedback

Provide consistent interaction feedback for:

- Buttons.
- Navigation links.
- Resource cards.
- Search controls.
- Filters.
- Dropdowns.
- Dialogs.
- Tabs.
- Pagination.
- Expandable details.

Use small, deliberate transitions in opacity, transform, shadow, border, and logo-derived lighting.

Hover effects must not be the only indication of interactivity.

Support touch devices and keyboard navigation.

Do not animate decorative elements when the user is interacting with unrelated controls.

## 6.4 Resource card interactions

Learning resource cards should feel tactile and polished.

Consider:

- Slight elevation on hover.
- A subtle logo-colored ambient glow.
- Smooth border transitions.
- Small icon movements.
- Clear active and selected states.
- Gentle content transitions when filters change.

Do not rotate cards aggressively, tilt text, or create large movement that harms readability.

## 6.5 Motion architecture

Before introducing a motion library:

1. Inspect the existing dependencies.
2. Identify whether a suitable animation solution already exists.
3. Prefer native CSS transitions for simple interactions.
4. Use the existing animation library for more complex sequences where justified.
5. Add a new dependency only if its benefits outweigh the maintenance and bundle cost.

Centralize reusable motion tokens and easing curves.

Suggested starting values:

- Micro-interaction: approximately 120–200ms.
- Standard interface transition: approximately 180–300ms.
- Larger decorative transition: approximately 300–500ms.

Adjust timing to suit the real interaction.

Use transform and opacity where practical to reduce layout work.

## 6.6 Reduced motion

Respect `prefers-reduced-motion`.

When reduced motion is enabled:

- Disable or substantially reduce decorative parallax.
- Remove unnecessary entrance sequences.
- Replace large movement with simple opacity changes where appropriate.
- Preserve functional state feedback.
- Keep every interaction fully usable.

Motion must enhance the experience, never become a requirement for using the application.

---

# 7. PHASE SIX — INFORMATION ARCHITECTURE AND PAGE REDESIGN

Redesign the real pages discovered during the audit. Do not invent a large set of unnecessary pages.

## 7.1 Primary learning experience

If the project supports public browsing, make the main experience focused on discovering useful educational content.

Possible layout elements:

- Branded navigation.
- A clear introductory section.
- A prominent search experience.
- Category exploration.
- A featured resource or editorial content area when real data supports it.
- A carefully composed resource grid or list.
- Clear publication status where appropriate.
- Empty and loading states.

Avoid a generic hero with oversized text and no meaningful content.

The first screen should communicate the product's purpose and help users find learning materials quickly.

## 7.2 Resource listing

Make resource discovery efficient and visually refined.

- Search and filters should have clear hierarchy.
- Resource cards must use consistent proportions.
- Titles and descriptions should wrap naturally.
- Metadata should remain visually secondary.
- Published and draft states should be distinguishable.
- Layout should respond appropriately to viewport width.
- Loading and empty states should match the design system.

Do not fabricate ratings, view counts, popularity scores, or featured statistics.

## 7.3 Resource detail

Where a detail page exists or is required:

- Establish a strong reading hierarchy.
- Present title, creator, category, publication date, status, and description appropriately.
- Keep reading width comfortable.
- Use restrained separators and supporting metadata.
- Provide contextual actions based on permissions.
- Support direct navigation and browser refresh.

Do not add unnecessary sidebars, sticky panels, or decorative cards if they interfere with reading.

## 7.4 Resource management

Where CRUD administration exists:

- Use clear, consistent form layouts.
- Keep field labels visible.
- Group related fields logically.
- Use appropriate controls for category, date, description, and publication status.
- Provide inline validation.
- Preserve entered values when safe after recoverable errors.
- Clearly distinguish cancel, save, publish, and delete actions.
- Require confirmation before destructive actions.

Keep administrative UI consistent with the public learning experience while maintaining clear task-oriented layouts.

## 7.5 Navigation and terminology

Use terminology appropriate for educational resources.

Examples:

- Learning materials.
- Resources.
- Categories.
- Published.
- Draft.
- Create resource.
- Edit resource.
- View details.

Select exact labels according to the existing product behavior and supported features.

Remove product-specific terminology from the active user experience.

---

# 8. PHASE SEVEN — TYPOGRAPHY AND CONTENT QUALITY

Inspect the existing typography and apply a consistent, readable system.

If Kanit is already specified by the project, preserve and complete its integration.

If no font requirement exists, evaluate Kanit as the primary typeface with suitable fallbacks.

Ensure:

- Correct font inheritance across all interactive controls.
- Appropriate font weights.
- Readable line heights.
- Balanced title and body sizes.
- Correct Thai and English rendering.
- No clipped characters.
- Natural text wrapping.
- Consistent label and helper-text styles.

Do not use font size alone to establish hierarchy. Combine weight, spacing, contrast, and placement.

Replace product-specific sample copy with relevant educational language.

Do not replace real data with fabricated production content.

If sample learning resources are needed for tests, isolate them in dedicated test fixtures or explicitly identified development seed data.

---

# 9. PHASE EIGHT — RESPONSIVENESS AND ACCESSIBILITY

Verify the application at representative viewport sizes:

- 360 × 800.
- 390 × 844.
- 768 × 1024.
- 1366 × 768.
- 1440 × 900.
- 1920 × 1080.

Check:

- Navigation layout.
- Card grid proportions.
- Text wrapping.
- Form usability.
- Dialog positioning.
- Filter controls.
- Horizontal overflow.
- Touch targets.
- Image proportions.
- Scroll behavior.
- Animation performance.

Target WCAG 2.2 AA where practical.

Maintain semantic HTML, accessible names, visible focus indicators, keyboard support, sufficient contrast, correct dialog behavior, and reduced-motion support.

Do not allow artistic effects to compromise accessibility.

---

# 10. PHASE NINE — DATA, API, AND MIGRATION SAFETY

Before removing old product functionality, trace the complete dependency chain.

If the application has a backend:

- Inspect models, controllers, routes, services, and migrations.
- Identify product-only endpoints.
- Identify shared infrastructure.
- Define the new learning resource domain.
- Preserve data integrity.
- Maintain consistent API error handling.
- Validate all incoming data.
- Ensure authorization remains intact.
- Update API documentation and tests.

If database changes are required, implement an explicit, reversible migration strategy where practical.

Do not drop production tables or delete production data automatically.

Do not assume that renaming a frontend component changes the backend domain model.

Do not leave dead product endpoints, unused database models, or broken imports without a clear compatibility reason.

If product data must be retained, determine whether it is needed for backward compatibility or can safely remain outside the new application's active workflows.

Never destroy existing data merely to make the codebase look cleaner.

If a destructive change is genuinely necessary, document the impact and stop before executing irreversible production operations without explicit authorization.

---

# 11. PHASE TEN — IMPLEMENTATION AND CODE QUALITY

Implement changes using the existing framework and architecture.

Requirements:

- Reuse appropriate components.
- Create a consistent design token system.
- Centralize repeated styling and motion patterns.
- Remove dead code only after dependency verification.
- Avoid unnecessary dependencies.
- Preserve established naming conventions where useful.
- Avoid duplicated styling systems.
- Avoid brittle selectors and excessive `!important`.
- Avoid arbitrary absolute positioning for primary layouts.
- Avoid hardcoded dimensions that break responsiveness.
- Preserve API contracts unless deliberately migrated.
- Update tests alongside behavior changes.
- Keep business logic separate from presentation where appropriate.

After each meaningful stage, run relevant checks.

Do not rewrite the entire application when a smaller refactor is sufficient.

---

# 12. PHASE ELEVEN — END-TO-END TESTING

E2E testing is mandatory.

Inspect the existing test framework first. Reuse it if appropriate. If no usable E2E framework exists, consider Playwright if compatible with the repository.

Do not claim a test passed unless it actually ran.

## Required scenarios

Adapt each test to the application's real features.

1. The application loads successfully.
2. The correct Learning materials brand and logo appear.
3. Primary navigation works.
4. Product-specific navigation is no longer exposed in the active user interface.
5. Learning resource listings render correctly.
6. Search works.
7. Category filtering works.
8. Search and filtering work together where supported.
9. Resource details can be opened.
10. Create and edit flows work where applicable.
11. Delete confirmation works and can be canceled.
12. Successful operations persist through the actual API.
13. Validation errors are displayed correctly.
14. Loading, empty, success, and error states behave correctly.
15. Protected routes and permissions remain intact.
16. Important interactions work using keyboard input.
17. Responsive layouts work at mobile and desktop sizes.
18. Reduced-motion preferences are respected.
19. Logo and other required assets load successfully.
20. No critical browser runtime errors occur during primary flows.

## Visual and motion checks

Capture screenshots of key pages at desktop and mobile sizes.

Inspect actual browser output for:

- Layout imbalance.
- Incorrect typography.
- Missing assets.
- Unexpected overflow.
- Broken alignment.
- Excessive shadows.
- Poor contrast.
- Broken animations.
- Content hidden behind overlays.
- Inconsistent component states.

Verify animation behavior through browser interaction, computed styles, or suitable automated assertions where practical.

Do not rely exclusively on screenshots to prove animation behavior.

## Regression checks

Run relevant available commands for:

- Lint.
- Type checking.
- Unit tests.
- Component tests.
- Production build.
- E2E tests.

Inspect and resolve failures introduced by the redesign.

Separate pre-existing failures from new regressions.

Do not silently skip failing tests or disable assertions simply to obtain a green result.

---

# 13. PHASE TWELVE — FINAL CLEANUP

After implementation:

1. Search for obsolete product terminology across active application pages.
2. Check for unused product-only components and imports.
3. Check for dead routes and broken navigation.
4. Verify asset paths and deployment compatibility.
5. Check that the logo is included in the actual build.
6. Verify that required environment variables are documented without exposing secrets.
7. Inspect Git diff and changed files.
8. Confirm that no unrelated user changes were overwritten.
9. Run the final verification suite.
10. Ensure documentation reflects the new Learning materials domain.

Avoid deleting historical records, migration files, or infrastructure solely because they mention products.

Distinguish active obsolete functionality from intentional historical references.

---

# 14. REQUIRED FINAL REPORT

Provide a clear report containing the following.

## A. Architecture audit

- Frameworks and technologies discovered.
- Original product-related modules.
- Reusable modules retained.
- Features removed.
- Features refactored.
- Features added.

## B. Domain transformation

Explain how the application changed from Product Management to Learning materials.

List important frontend, backend, API, and database changes.

## C. Design implementation

Report:

- Logo asset selected and its actual location.
- Color tokens derived from the logo.
- Typography changes.
- Layout and component redesign.
- Animation system implemented.
- Responsive and accessibility improvements.

## D. Files changed

List the important files and explain their purposes.

## E. Verification results

For each executed check, report:

- Actual command.
- PASS, FAIL, or BLOCKED.
- Relevant result details.

Include the real E2E test counts where available.

## F. Remaining issues

List unresolved problems, pre-existing failures, inaccessible services, or test limitations.

## G. Production readiness

State what was verified and what remains unverified.

Do not claim production readiness merely because the development server starts.

---

# EXECUTION DIRECTIVE

Begin by inspecting the current repository and the logo directory.

Then perform the following workflow:

1. Establish the existing baseline.
2. Audit the current architecture and product-specific dependencies.
3. Classify features into REMOVE, RETAIN, REFACTOR, and BUILD.
4. Define the new Learning materials domain.
5. Integrate the real logo and derive the supporting visual system.
6. Implement the new information architecture.
7. Redesign the interface with artistic, smooth, purposeful motion.
8. Remove obsolete product workflows safely.
9. Verify responsive behavior and accessibility.
10. Run automated checks and E2E tests.
11. Inspect actual browser output and fix regressions.
12. Review the final diff and produce the report.

Make actual changes in the existing repository.

Do not stop after producing a plan.

Do not fabricate assets, test results, API responses, or completed work.

**Final quality target:** A coherent Learning materials application with the correct domain, the original brand identity, refined artistic motion, purposeful lighting and shadows, production-quality UX, maintainable code, and verified core user journeys.
# ADDITIONAL DESIGN DIRECTIVE — Premium Rounded Soft UI & Visual Depth

This directive extends the existing Master Prompt and takes priority over any conflicting visual styling instructions. Preserve all existing requirements for functionality, architecture, branding, responsiveness, accessibility, and E2E testing.

## 1. PRIMARY VISUAL GOAL

Refine the Learning materials website into a **premium, rounded, dimensional Soft UI experience** with subtle Liquid Glass details and smooth artistic interactions.

The interface must feel:

- Soft, rounded, tactile, and inviting.
- Visually rich without becoming cluttered.
- Spacious but not empty.
- Dimensional rather than flat.
- Substantial rather than thin or fragile.
- Modern and elegant without looking like a generic AI-generated template.
- Consistent with the existing monochrome palette and the actual colors of the project logo.

**Avoid an overly thin, flat, skeletal, or excessively minimal interface.** Minimalism should come from clarity and restraint, not from removing all visual depth, surface separation, or meaningful visual detail.

## 2. ROUNDED GEOMETRY SYSTEM

Establish a consistent, generously rounded visual language.

Use the following values as starting points and adapt them to the actual component sizes:

- Large feature panels: 28–36px radius.
- Main content cards: 22–28px radius.
- Secondary cards and dropdowns: 16–22px radius.
- Inputs and search fields: 14–18px radius.
- Buttons: 14–18px radius.
- Compact chips and badges: 10–14px radius.
- Circular icon controls: fully circular when appropriate.

Use a coherent radius scale instead of assigning arbitrary corner radii to individual components.

Large surfaces should feel softly sculpted, while small controls should remain precise and easy to operate.

Do not force every component into a pill shape. Avoid excessive rounding that makes the interface look childish, inflated, or visually repetitive.

## 3. CREATE REAL VISUAL DEPTH

Build depth through carefully layered surfaces rather than relying on flat white backgrounds and thin gray borders.

Combine, where appropriate:

- A subtle base background.
- Slightly elevated content surfaces.
- Soft ambient shadows.
- Delicate inset highlights.
- Low-opacity borders.
- Restrained logo-colored illumination.
- Small differences in surface brightness.
- Clear separation between primary and secondary content.

Example shadow direction:

- Ambient shadow: broad, soft, and low opacity.
- Elevation shadow: slightly more defined beneath floating components.
- Inset highlight: subtle, positioned along the upper edge of a surface.
- Hover shadow: a gentle increase in elevation and depth.
- Focus ring: clearly visible and accessible.

Use CSS variables or the existing design token system to keep shadow behavior consistent.

Avoid harsh black shadows, excessive blur, glowing outlines everywhere, and multiple heavy shadow layers that make the UI look artificial.

**Every important surface should have an intentional relationship with its background.** Cards must not disappear into the page, but they should also not look like thick, dark-bordered boxes.

## 4. BAN UNINTENTIONALLY FLAT UI

Inspect the existing pages and correct components that appear too thin, flat, or visually weak.

Specifically review:

- Cards with insufficient padding or no surface distinction.
- Buttons that look like plain text or thin outlined rectangles.
- Inputs that disappear into their surroundings.
- Navigation elements with weak active states.
- Sections separated only by excessive whitespace.
- Icons that appear too small relative to their controls.
- Containers that feel narrow, empty, or disproportionately shallow.
- Layouts where every element has identical visual weight.
- Cards with inconsistent heights or awkward content alignment.

Introduce appropriate surface contrast, stronger component proportions, consistent padding, and subtle depth.

Do not solve flatness by adding arbitrary borders or shadows to everything. Correct the component hierarchy and dimensions first.

## 5. COMPONENT PROPORTIONS — NOT TOO THIN OR TOO SMALL

The website must have balanced, substantial proportions.

### Cards

- Give cards comfortable internal padding.
- Use a clear relationship between headings, descriptions, metadata, and actions.
- Allow enough height for content to breathe.
- Avoid extremely short cards with cramped text.
- Avoid oversized empty cards containing very little information.
- Keep related cards visually consistent.
- Use content-driven minimum heights only where they improve grid alignment.

### Buttons

- Use comfortable horizontal padding.
- Maintain adequate height and touch targets.
- Keep icon-to-label spacing consistent.
- Use clear filled, secondary, and subtle action variants.
- Give primary actions enough visual weight to be immediately recognizable.
- Use gentle hover elevation and pressed-state feedback.

### Inputs

- Make fields visually substantial and easy to identify.
- Use comfortable internal padding and rounded corners.
- Keep labels, entered text, and helper messages properly aligned.
- Provide a clear focus state with restrained brand-colored illumination.
- Preserve readable text sizes and correct Kanit typography wherever required by the existing design.

### Navigation

- Make the navigation feel like a deliberate interface component, not a thin strip of links.
- Give interactive items comfortable hit areas.
- Use rounded active-state backgrounds or subtle surface elevation where appropriate.
- Preserve a clear relationship between the logo, navigation, and primary action.

## 6. RICH BUT CONTROLLED SURFACE STYLING

Use Soft UI as the primary surface language and Liquid Glass as a supporting technique.

Prioritize:

- Softly elevated cards.
- Rounded feature sections.
- Tactile buttons.
- Layered search and filter panels.
- Floating utility elements.
- Refined modal surfaces.
- Subtle translucent navigation where appropriate.

For light surfaces, create depth with very light gray transitions, soft shadows, and restrained highlights.

For dark surfaces, if the existing design uses them, create depth through slightly different dark surface values and subtle edge illumination.

Keep the established black-and-white brand identity. Derive any additional lighting colors from the actual logo rather than introducing unrelated accent colors.

Do not turn every component into glass. Use glass selectively so the overall interface retains visual hierarchy.

## 7. ARTISTIC INTERACTIONS WITH PHYSICAL FEEDBACK

Every major interactive element should feel responsive and carefully designed.

### Hover

Use subtle combinations of:

- Slight elevation.
- Soft shadow expansion.
- Gentle border-color transitions.
- Low-opacity brand-colored light.
- Small icon movement.
- Controlled surface brightness changes.

### Click and pressed states

Use restrained tactile feedback:

- A small reduction in elevation.
- A subtle transform.
- A clear pressed state.
- A smooth return to the resting state.

### Scroll and entrance

Use smooth, carefully timed reveals for meaningful content sections.

Combine opacity, small positional shifts, and staggered timing when they improve the experience.

Avoid excessive movement, aggressive perspective effects, large card rotations, and animations that delay interaction.

Keep the interface functional when motion is disabled and respect `prefers-reduced-motion`.

## 8. VISUAL HIERARCHY AND COMPOSITION

Do not make the entire page equally rounded, equally elevated, and equally prominent.

Establish three intentional levels:

1. **Primary surfaces:** feature sections, major content areas, and the most important resource collections.
2. **Secondary surfaces:** resource cards, search panels, filters, and supporting content.
3. **Tertiary controls:** badges, compact actions, metadata, and small utility elements.

Use different degrees of elevation, contrast, radius, and spacing to distinguish these levels.

The page should feel composed and art-directed, not like a collection of unrelated rounded rectangles.

Balance soft surfaces with occasional clean edges, dividers, and open space.

Use asymmetry selectively when it improves the composition, but maintain clear alignment and a predictable reading flow.

## 9. RESPONSIVE SOFT UI

Preserve the same visual quality across desktop, tablet, and mobile.

- Reduce corner radii proportionally on smaller screens when appropriate.
- Keep cards comfortably sized.
- Prevent buttons and form controls from becoming too small.
- Avoid narrow columns with excessive empty margins.
- Avoid oversized rounded panels that consume the entire mobile viewport.
- Preserve readable content widths.
- Prevent horizontal overflow.
- Maintain usable spacing between touch targets.

Do not simply shrink the desktop design. Recompose layouts where necessary.

## 10. IMPLEMENTATION AND VISUAL VALIDATION

Implement these changes directly in the existing project.

Before completing the work:

1. Inspect all major page types and shared components.
2. Identify where the current UI looks too flat, thin, or disproportionate.
3. Correct the design tokens before applying individual component fixes.
4. Refine cards, buttons, inputs, navigation, dialogs, and content sections consistently.
5. Run the application in a real browser where the available tools permit.
6. Capture and inspect desktop and mobile screenshots.
7. Review component proportions, visual depth, spacing, and corner-radius consistency.
8. Test hover, focus, pressed, selected, and disabled states.
9. Verify that the new styling does not break application behavior.
10. Run the relevant existing automated tests and E2E suite.

Do not report visual validation as complete if the browser output was not actually inspected.

## FINAL DESIGN ACCEPTANCE CRITERIA

The finished Learning materials website must be:

- Rounded but not excessively bubbly.
- Soft but not weak.
- Minimal but not empty.
- Dimensional but not overloaded with shadows.
- Artistic but not distracting.
- Smooth but not slow.
- Premium but still practical.
- Visually substantial without unnecessary bulk.
- Consistent with the original logo and monochrome identity.

**The final result should feel like a premium, tactile, carefully art-directed digital product — not a flat wireframe, not a thin minimalist template, and not a generic collection of glass cards.**