# CONTEXT — EK_DAT_Node.js_2026_Autumn

Personal working context for my semester repo. Written 2026-09-18 (supersedes the 2026-09-11 version).
Purpose: pick up where I left off from any device without re-reading the whole tree.

---

## 1. Repo identity

| | |
|---|---|
| Course | Full Stack Node.js (KEA, EK_DAT), autumn 2026 |
| My fork | `https://github.com/Phaberen/EK_DAT_Node.js_2026_Autumn` (remote `origin`, only remote configured) |
| Upstream | `anderslatif/EK_DAT_Node.js_2026_Autumn` (instructor Anders Latif) — merged once in `61f385c`, not tracked as a remote |
| Branch | `main` |
| Teaching day | Friday |
| Root | `C:\Users\Bohnmiz\Programmering\4. Semester\Node.Js\EK_DAT_Node.js_2026_Autumn` |

`README.adoc` (semester plan) still only lists **Week 01 — Introduction (Aug 28)** and **Week 02 — First Server (Sept 4)**. No Week 03 entry yet — the instructor hasn't pushed it, even though my own work has moved past "First Server" into the Animals REST API and a body-parsing/XSS lecture.

---

## 2. Directory map

```
00._Course_Material/            <- INSTRUCTOR-OWNED (from upstream merge, don't edit)
  00._Meta_Course_Material/
    about_the_course.md         course structure, mandatories, AI policy
    debugging_tips.md
    linters_overview.md
  01._Assignments/
    01._Introduction/
      Introduction_Exercises.md brief: fork the intro-exercises repo, PR it
      REST_API_Design.md        brief: design (not implement) a CRUD REST API
      Birds - REST API Design.csv  instructor's worked example
      01._Introduction_Exercises/  <- MY solutions live here
        1._Basics.js  2._Strings.js  3._Objects.js  4._Arrays.js  README.md
    02._First_Server/
      REST_API_Part_I.md        brief: Animals API, GET only, in-memory

01._Miscellaneous/              <- lecture-along code (week 1-2)
  variables_I.js  variables_II.js  functions.js  person.json
  loops.js                      <- NEW, untracked. Array loop methods (.map/.filter/.reduce) lecture-along

02._First_Server/               <- INSTRUCTOR-ORIGIN folder, but now where MY week-2 lecture-along edits land
  app.js                        <- MODIFIED, uncommitted (see §3)
  build_tools.md  package.json  package-lock.json  node_modules/
  index.html                    <- NEW, untracked
  xxs.html                      <- NEW, untracked (note the filename — see bug below)

02_First_Server/                <- MY OWN original express walkthrough (underscore, no dot). Untouched since initial commits, now stale/superseded by 02._First_Server.
  app.js  package.json  package-lock.json

03_Animals_API/                 <- MY Animals REST API (the actual "REST_API_Part_I" assignment)
  app.js                        GET /animals, GET /animals/:id — done, matches the brief
  REST_API_Design.md            my design notes (naming + ordering conventions)
  package.json  package-lock.json  node_modules/

LICENSE  README.adoc  .gitignore
```

`README.adoc` is the semester plan table (dates, learning goals, links to briefs).

---

## 3. Where I actually am

**Week 01 — Introduction (Aug 28)**

- Intro exercises:
  - `1._Basics.js` — Exercise 1 done. Exercise 2 has exploratory `console.log`s comparing `parseInt`, `Number`, and unary `+` coercion, but never lands on the actual required one-liner answer (`year + increment === 2026`) — worth finishing properly, not just leaving the experiments in.
  - `2._Strings.js` — Exercises 1–3 done. Exercises 4–7 are still untouched stubs (2 decimals sum, avg to 5 decimals, char-by-index, capitalize-J replace). The `letters.Po(3)` typo noted in the previous version of this file is **not present** in the current working tree — that was already fixed or the note was stale.
  - `3._Objects.js` and `4._Arrays.js` — **entirely unsolved stubs**, all exercises.
- Hand-in went through a separate fork of `anderslatif/EK_Node.js_Intro_Exercises_2026_Autumn` plus a PR (deadline was Sept 1, 12:00 — already past).
- REST API design: topic assigned in class was **Languages**. No `Languages` design file exists anywhere in the tree — only the instructor's `Birds` CSV example and my own `Animals` design (built for week 2, not week 1). **The Languages design was never done.**

**Week 02 — First Server (Sept 4)**

- `03_Animals_API/app.js` — the actual "REST_API_Part_I" brief (GET-only, in-memory, ids not overwritable). **Implemented**: `GET /animals` (list) and `GET /animals/:id` (single, 404 on miss, converts `req.params.id` to `Number` before comparing). This satisfies the brief as written. Minor loose end: `package.json` still says `"main": "main.js"` though the real entry point is `app.js` — harmless since there's no `start` script to trip over it, but worth fixing if you ever add one.
- `02._First_Server/app.js` — **uncommitted, in-progress lecture-along edits**, layered on top of the original instructor walkthrough:
  - Added `app.use(express.json())` so `req.body` gets populated on POST/PATCH.
  - Added a **second** `app.get('/', ...)` handler right after the first. Express only ever dispatches the first matching route, so the second one (`res.sendFile(__dirname + '/xss.html')`) is dead code — same "route ordering" gotcha as the `/blablabla` duplication from the previous session.
  - **Even if that second route were reachable, it would 404**: it requests `xss.html`, but the file actually created on disk is `xxs.html` (typo in the filename, not the code). If the XSS demo is meant to work, either rename the file to `xss.html` or fix the route.
  - `xxs.html` itself has a markup bug: `<h1>XSS<h1></h1>` — a stray opening `<h1>` before the closing tag. Doesn't break rendering (browsers recover), but it's not valid HTML.
  - Added `POST /dictators` (echoes `req.body`) and `PATCH /dictators/:name` (canned response) — looks like a body-parsing / verb-conventions demo, unrelated to the Animals assignment.
  - Console-logs `__dirname` — noted in the code as "the directory node is run from, not the file's location" (this is actually backwards for CommonJS: `__dirname` *is* the file's own directory, regardless of where `node` was invoked from — worth double-checking this against what was actually said in class, since the comment as written is misleading).
- `01._Miscellaneous/loops.js` — new, untracked. Walks through `.map`, `.filter`, and the "avoid `forEach`/bare `for`" convention. Two things to know before running it:
  1. `numbers.map((value, index, array) => console.log(...))` — using `.map` purely for its side effect with no `return` produces an array of `undefined`s. The file logs this (`numbersIterated`) as presumably a deliberate "map is for transforming, not iterating" cautionary example — but if that's not the intent, it's a misuse of `.map` where `.forEach` belongs.
  2. There's a **bare `return i * 2;` inside a top-level `for` loop**. This isn't inside a function — but because Node wraps every CommonJS module in a function wrapper, the `return` is legal and **terminates the entire script** on the first iteration (`i === 0`). Practically: running `node loops.js` prints the two lines above it and then **silently exits** — the `countries` / `richCountries` section below never executes. If the intent was to demonstrate "for loops are clunky," fine, but it also means the back half of the file is currently dead when run as-is.
- Duplicate-folder situation is now worse, not resolved: there are **three** "week 2 server" folders — `02._First_Server` (dotted, instructor-origin, now where my new edits live), `02_First_Server` (no dot, my original walkthrough, stale/untouched), and `03_Animals_API` (correctly separated, the real assignment). The dotted one doing double duty as both "instructor material" and "my active scratch space" is the most likely place to lose track of what's mine vs. merged-in.

**Uncommitted right now** (`git status`):
- Modified: `02._First_Server/app.js`
- Untracked: `01._Miscellaneous/loops.js`, `02._First_Server/index.html`, `02._First_Server/xxs.html`

None of this is staged or committed yet.

---

## 4. The duplicate-directory trap

`02._First_Server/` and `02_First_Server/` are two versions of the same lecture, and a third, `03_Animals_API/`, holds the actual graded-in-class assignment for that week:

- `02._First_Server/` (with the dot) — arrived via the upstream merge `0d87c7c`. Originally the instructor's clean walkthrough; **now also where my week-2 lecture-along XSS/body-parsing experiments live**, uncommitted (§3).
- `02_First_Server/` (no dot) — mine, from commits `529594d` and `6d6d985`, heavily commented. Not touched since. Likely safe to archive/rename once you're sure nothing in it is still needed.
- `03_Animals_API/` — mine, correctly separated, holds the actual Animals REST API implementation.

**Still-open decision** from last time: rename `02_First_Server/` (no dot) to something unambiguous, or fold it away entirely, since the dotted folder is now actively being used for new work and the risk of editing the wrong one is real.

---

## 5. Course requirements to keep in view

- **Mandatory I** — build a documentation website. *Start documenting now* (instructor's words). Not started.
- **Mandatory II** — build an auth system. Not started.
- **Exam project** — solo or group, full-stack, must include Mandatory II's auth. Both mandatories are prerequisites for sitting the exam.
- Clean code is a hard requirement (a linter is recommended but optional).
- The exam is **live coding**.

**AI policy** (from `about_the_course.md`, quoting the KEA course description):

> "Det er ikke tilladt at bruge AI til udarbejdelse af kode."
> — AI may not be used to produce code.

Notes, structure, explanations and debugging conversations are one thing; generated exercise or exam code is another. Recording the line here on purpose so the constraint travels with the file.

---

## 6. The three REST conventions (course core tenet — expect these at the exam)

1. **Right HTTP verb for the action.**
2. **Ordering** of the HTTP methods (GET → POST → PUT → PATCH → DELETE).
3. **Naming**: nouns, plural, mapping to the collections that actually exist in the system.

Canonical shape, per the Birds example (and now demonstrated for real in `03_Animals_API`):

```
GET    /things        list
GET    /things/{id}   read one
POST   /things        create
PUT    /things/{id}   full replace
PATCH  /things/{id}   partial update
DELETE /things/{id}   delete
```

Also referenced in the semester plan: the Richardson Maturity Model.

---

## 7. JS/Node rules drilled in class

- Strict equality `===` / `!==` always — avoid type coercion.
- `const` by default, `let` only when reassignment is needed, never `var`.
- `console.log(a, b)` with commas, not `+` — concatenation coerces.
- `const` freezes the *binding*, not the object; `person.age = 123` on a `const` object is legal.
- Data types: String, Boolean, Number, BigInt, null, undefined, Object, Symbol.
- Hoisting: function declarations hoist, function expressions and arrows do not.
- `var` leaks out of block scope; `let` in a `for` loop gives each iteration its own binding (the `setTimeout` demo in `variables_II.js`).
- Loop methods (from `loops.js`): prefer `.map`/`.filter`/`.reduce` over bare `for`; use `.map` only when you need the returned array, otherwise `.forEach`; `.map` without a `return` gives you an array of `undefined`s, not a no-op.
- **Gotcha**: a bare `return` at the top level of a `.js` file works in Node (CommonJS module-wrapper function) and will silently end script execution right there — easy to trip over if you paste a `return` from inside a function into top-level code, as in `loops.js`.
- Express: `require('express')` → `express()` → `app.get(path, callback)` → `app.listen(8080)`.
- `app.use(express.json())` is required before `req.body` is populated on POST/PATCH/PUT — otherwise it's `undefined`.
- `req.params` for `/:pathVariables`, `req.query` for `?key=value`.
- `res.send({...})` serializes to JSON automatically; `res.sendFile(path)` serves a static file — the path must resolve exactly (case- and name-sensitive), see the `xss.html`/`xxs.html` mismatch in §3.
- `__dirname` is the directory of the *file it's used in*, not the directory `node` was invoked from — double-check any in-code comment that says otherwise (see §3).
- Express route dispatch is first-match-wins: declaring the same method+path twice makes the second one permanently dead code.
- npm ↔ Maven mapping: `package.json` ↔ `pom.xml`; meta / dependencies / scripts ↔ meta / dependencies / lifecycles.
- Never commit `node_modules`, `.vscode`, `.idea`. The root `.gitignore` is the standard Node one and already covers these.

---

## 8. Next actions

1. Finish `2._Strings.js` ex. 4–7, then `3._Objects.js` and `4._Arrays.js`.
2. Design the **Languages** REST API (the week-1 brief) — still doesn't exist anywhere in the repo — and push it.
3. Properly finish `1._Basics.js` Exercise 2 with an actual one-line answer instead of leaving only the exploratory coercion logs.
4. Decide on `02._First_Server/app.js`: rename `xxs.html` → `xss.html` (or fix the route) if the XSS demo should actually work, and remove/fix the duplicate `app.get('/', ...)` route before committing.
5. Sanity-check the `__dirname` comment in `02._First_Server/app.js` against what was actually taught — as written it's backwards.
6. Decide whether `loops.js`'s stray top-level `return` is a deliberate demo of a gotcha or a leftover — if the `countries`/`richCountries` section is meant to run, remove or relocate the `return`.
7. Commit the current uncommitted work (§3) once the above are resolved, with a message that doesn't just say "wip."
8. Resolve the `02._First_Server` / `02_First_Server` duplication — the dotted folder is now actively used for new work, raising the risk of confusion.
9. Fix `03_Animals_API/package.json`'s `"main": "main.js"` → `"main": "app.js"` (cosmetic, low priority).
10. Start the documentation site (Mandatory I) — the longer this waits, the more retro-documenting it costs.
