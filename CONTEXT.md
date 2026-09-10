# CONTEXT — EK_DAT_Node.js_2026_Autumn

Personal working context for my semester repo. Written 2026-09-11.
Purpose: pick up where I left off from any device without re-reading the whole tree.

---

## 1. Repo identity

| | |
|---|---|
| Course | Full Stack Node.js (KEA, EK_DAT), autumn 2026 |
| My fork | `https://github.com/Phaberen/EK_DAT_Node.js_2026_Autumn` (remote `origin`) |
| Upstream | `anderslatif/EK_DAT_Node.js_2026_Autumn` (instructor Anders Latif) |
| Branch | `main` |
| Teaching day | Friday |
| Root | `C:\Programmering\4.Semester\EK_DAT_Node.js_2026_Autumn` |

I merged upstream in `61f385c`, so the tree now mixes **instructor material** and **my own work**. See §4 — this matters.

---

## 2. Directory map

```
00._Course_Material/            <- INSTRUCTOR-OWNED (comes from upstream, don't edit)
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
  variables_I.js                type coercion, const/let, data types, template literals
  variables_II.js               var vs let scoping, the setTimeout-in-a-loop classic
  functions.js                  hoisting, anonymous vs arrow, callbacks, first-class fns
  person.json

02._First_Server/               <- INSTRUCTOR'S express walkthrough (from upstream merge)
  app.js  package.json  package-lock.json  build_tools.md

02_First_Server/                <- MY OWN express walkthrough (note: underscore, no dot)
  app.js  package.json  package-lock.json

LICENSE  README.adoc  .gitignore
```

`README.adoc` is the semester plan table (dates, learning goals, links to briefs).

---

## 3. Where I actually am

**Week 01 — Introduction (Aug 28)**

- Intro exercises: **partially done.** `1._Basics.js` complete. `2._Strings.js` done through exercise 3; exercises 4–7 are untouched stubs, and **ex. 6 has a bug**: `letters.Po(3)` is not a method — should be `letters.charAt(2)` or `letters[2]`. `3._Objects.js` and `4._Arrays.js` are **entirely unsolved stubs**.
- Hand-in went through a *separate* fork of `anderslatif/EK_Node.js_Intro_Exercises_2026_Autumn` plus a PR. Deadline was Sept 1, 12:00.
- REST API design: the topic assigned in class was **Languages**. The `Birds` CSV in the repo is the instructor's example, **not my hand-in**. My Languages design does not exist yet. No formal hand-in, just push it.

**Week 02 — First Server (Sept 4)**

- Express server on port 8080 in `02_First_Server/app.js`. Working routes: `/blablabla`, `/myTestEndpoint`, `/beers/:beerType/:amount` (path params), `/bars/:forgottenItems` (query params).
- **Known bug in my version**: `/bars/:forgottenItems` mixes a path param with `req.query.forgottenItem` (singular, and never sent), so it returns `undefined`. The instructor's version uses a literal path `/bars/forgottenItems` and echoes `req.query` wholesale.
- I declare `/blablabla` **twice**. Express only ever runs the first, which is why `data2` never appears. Left in as a demo of route ordering.
- The dangling `beers` / `forgottenItem` objects at the bottom of my `app.js` are unused.
- **Animals REST API (Part I) is not started.** That is the actual assignment for week 2.

**Uncommitted right now**: modifications to `1._Basics.js` and `2._Strings.js`.

---

## 4. The duplicate-directory trap

`02._First_Server/` and `02_First_Server/` are two versions of the same lecture:

- `02._First_Server/` (with the dot) — instructor's, arrived via the upstream merge `0d87c7c`. Cleaner, has a `/` root route, pins `"express": "5.2.1"` exactly.
- `02_First_Server/` (no dot) — **mine**, from my own commits `529594d` and `6d6d985`, heavily commented with my own notes. Uses `"^5.2.1"`.

**Decision needed:** either rename mine to something unambiguous (`02_First_Server_MINE/`) or fold my comments into a single folder. Right now it is easy to open the wrong one and lose work. Every future upstream merge re-introduces the dotted folders, so my work should live in clearly distinct paths.

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

Canonical shape, per the Birds example:

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
- Express: `require('express')` → `express()` → `app.get(path, callback)` → `app.listen(8080)`.
- `req.params` for `/:pathVariables`, `req.query` for `?key=value`.
- `res.send({...})` serializes to JSON automatically.
- npm ↔ Maven mapping: `package.json` ↔ `pom.xml`; meta / dependencies / scripts ↔ meta / dependencies / lifecycles.
- Never commit `node_modules`, `.vscode`, `.idea`. The root `.gitignore` is the standard Node one and already covers these.

---

## 8. Next actions

1. Finish `2._Strings.js` ex. 4–7 (fix the `letters.Po(3)` bug), then `3._Objects.js` and `4._Arrays.js`.
2. Design the **Languages** REST API in my own format — the brief asks for something different from the class example — and push it.
3. Build the **Animals** REST API: GET only, in-memory, no database, no persistence layer. Ids must not be overwritable; content is otherwise schema-free.
4. Resolve the `02._First_Server` / `02_First_Server` duplication.
5. Fix the `/bars/...` query-param route in my `app.js`; remove the dead `beers` / `forgottenItem` objects.
6. Start the documentation site (Mandatory I) — the longer this waits, the more retro-documenting it costs.
