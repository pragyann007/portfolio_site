export interface Blog {
    slug: string
    title: string
    excerpt: string
    date: string
    readTime: string
    tags: string[]
    content: string
  }
  
  export const blogs: Blog[] = [
    {
      slug: "js-prototypes-and-inheritance",
      title: "JavaScript Prototypes & Inheritance: The Real Story",
      excerpt: "Everyone uses JS classes. Almost nobody understands what's actually happening underneath. Prototypes aren't scary — they're elegant. Let's break it down for real.",
      date: "May 12, 2026",
      readTime: "7 min read",
      tags: ["JavaScript", "Prototypes", "Deep Dive"],
      content: `
  ## The Lie Classes Tell You
  
  When you write \`class Dog extends Animal\`, JavaScript is doing something completely different from what C++ or Java would do. There's no class in memory. There's no blueprint. There's just an object, pointing to another object.
  
  That's it. That's prototypes.
  
  ---
  
  ## Every Object Has a Secret Link
  
  Every object in JavaScript has an internal property called \`[[Prototype]]\` — you can access it via \`Object.getPrototypeOf(obj)\` or the older \`obj.__proto__\`. This link points to another object, which is the "prototype" of the first.
  
  \`\`\`js
  const animal = {
    breathe() {
      console.log("breathing...")
    }
  }
  
  const dog = Object.create(animal)
  dog.bark = function() {
    console.log("woof!")
  }
  
  dog.bark()    // "woof!" — own property
  dog.breathe() // "breathing..." — found via prototype chain
  \`\`\`
  
  When you call \`dog.breathe()\`, JS looks at \`dog\` first. Doesn't find \`breathe\`. Then walks up to \`animal\` (the prototype). Finds it there. Calls it.
  
  That walk up the chain? That's **prototypal inheritance**.
  
  ---
  
  ## The Chain Goes All the Way Up
  
  Every regular object's prototype chain eventually hits \`Object.prototype\` — the root of everything. That's where methods like \`.toString()\`, \`.hasOwnProperty()\`, and \`.valueOf()\` live.
  
  \`\`\`js
  const obj = {}
  console.log(obj.toString()) // "[object Object]"
  // Where did .toString() come from? Object.prototype.
  \`\`\`
  
  The chain looks like this:
  
  \`obj → Object.prototype → null\`
  
  When you create an array: \`[] → Array.prototype → Object.prototype → null\`
  
  ---
  
  ## What Happens With \`new\`
  
  \`\`\`js
  function Person(name) {
    this.name = name
  }
  Person.prototype.greet = function() {
    console.log(\`Hi, I'm \${this.name}\`)
  }
  
  const pragyan = new Person("Pragyan")
  pragyan.greet() // "Hi, I'm Pragyan"
  \`\`\`
  
  When you call \`new Person("Pragyan")\`, four things happen:
  
  1. A new empty object is created
  2. Its \`[[Prototype]]\` is set to \`Person.prototype\`
  3. \`Person\` is called with \`this\` pointing to that new object
  4. The new object is returned (unless you return something else explicitly)
  
  So \`pragyan.__proto__ === Person.prototype\` is \`true\`. The object doesn't *copy* the \`greet\` method — it just has a reference to the object that holds it.
  
  ---
  
  ## Classes Are Just Syntax Sugar
  
  \`\`\`js
  class Animal {
    constructor(name) {
      this.name = name
    }
    speak() {
      console.log(\`\${this.name} makes a sound\`)
    }
  }
  
  class Dog extends Animal {
    speak() {
      console.log(\`\${this.name} barks\`)
    }
  }
  \`\`\`
  
  Under the hood, JS is doing prototype chaining. \`Dog.prototype.__proto__ === Animal.prototype\`. No magic. Just linked objects.
  
  ---
  
  ## Why Does This Matter?
  
  Because when something goes wrong — and it will — you need to know what's actually happening. When you see "cannot read property of undefined" on a method you know exists, understanding the chain tells you *exactly* where the lookup failed.
  
  Prototypes are also one of the most powerful patterns in JS. Libraries like Lodash, jQuery, and even Node's \`EventEmitter\` are built on them.
  
  Stop fearing them. Start using them intentionally.
      `
    },
    {
      slug: "js-execution-context-and-memory",
      title: "How JavaScript Actually Runs: Execution Contexts, Call Stack & Memory",
      excerpt: "The JS engine isn't magic. Every time your code runs, it's creating contexts, pushing frames, and managing memory in a very specific way. Understanding this changes how you debug forever.",
      date: "May 18, 2026",
      readTime: "8 min read",
      tags: ["JavaScript", "Internals", "Memory"],
      content: `
  ## Before Your Code Runs
  
  Before JavaScript executes a single line, the engine does a "creation phase." It sets up the **Global Execution Context (GEC)** — a container for everything your code will need.
  
  Two things are created:
  - **Global Object** (\`window\` in browsers, \`global\` in Node)
  - **\`this\`** — which in the global context points to that global object
  
  ---
  
  ## The Two Phases of Every Execution Context
  
  Every execution context — global or function — goes through two phases:
  
  ### 1. Creation Phase (Hoisting)
  Variable declarations with \`var\` are registered and set to \`undefined\`. Function declarations are fully hoisted (the entire function body is available). \`let\` and \`const\` are registered but sit in the **Temporal Dead Zone (TDZ)** — accessing them before declaration throws a ReferenceError.
  
  \`\`\`js
  console.log(name)   // undefined — var is hoisted
  console.log(greet)  // [Function: greet] — fully hoisted
  console.log(city)   // ReferenceError — const in TDZ
  
  var name = "Pragyan"
  function greet() { return "hello" }
  const city = "Kathmandu"
  \`\`\`
  
  ### 2. Execution Phase
  Code runs line by line. Variables get their actual values. Functions get called, creating new execution contexts.
  
  ---
  
  ## The Call Stack
  
  Every time a function is called, a new **Function Execution Context (FEC)** is created and pushed onto the call stack. When the function returns, it's popped off.
  
  \`\`\`js
  function third() { console.log("third") }
  function second() { third() }
  function first() { second() }
  
  first()
  // Call stack:
  // first() → second() → third()
  // After third() returns: first() → second()
  // After second() returns: first()
  // After first() returns: empty (back to global)
  \`\`\`
  
  The call stack is a LIFO (Last In First Out) structure. This is *literally* why you get a "Maximum call stack size exceeded" error with infinite recursion — the stack fills up.
  
  ---
  
  ## Memory: Stack vs Heap
  
  JavaScript manages two types of memory:
  
  **Stack Memory** — stores primitive values and references. It's fast and automatically managed.
  \`\`\`js
  let x = 10    // stored directly on stack
  let y = x     // copy of value — independent
  y = 20
  console.log(x) // still 10
  \`\`\`
  
  **Heap Memory** — stores objects, arrays, functions. When you write \`const obj = {}\`, the object lives in the heap. The variable \`obj\` on the stack just holds a *reference* (memory address) to it.
  
  \`\`\`js
  const a = { name: "Pragyan" }
  const b = a       // both point to same heap object
  b.name = "Cipher"
  console.log(a.name) // "Cipher" — same reference!
  \`\`\`
  
  This is why objects are "passed by reference" and primitives are "passed by value."
  
  ---
  
  ## The Scope Chain
  
  Each execution context has a reference to its outer environment — this creates the **scope chain**. When a variable isn't found locally, JS walks up the chain to the outer context, then the global context.
  
  \`\`\`js
  const globalVar = "I'm global"
  
  function outer() {
    const outerVar = "I'm outer"
    
    function inner() {
      // inner can access both:
      console.log(globalVar) // walks up to global
      console.log(outerVar)  // walks up to outer
    }
    
    inner()
  }
  \`\`\`
  
  This chain is determined at the time the function is *written* (lexical scoping), not when it's called.
  
  ---
  
  ## Garbage Collection
  
  The JS engine periodically sweeps memory. Objects with no more references are marked for deletion. The most common algorithm is **mark-and-sweep** — it marks everything reachable from the root (global object), then sweeps away everything else.
  
  This is why closures can sometimes cause memory leaks — a closure keeps a reference alive longer than expected.
  
  Understanding execution contexts turns "why is this \`undefined\`?" from a mystery into a logical question with a logical answer. Every time.
      `
    },
    {
      slug: "why-nextjs-over-express",
      title: "Why I Switched to Next.js for Backend Over Pure Express",
      excerpt: "Express is great. But after building with both, Next.js API routes (and especially the App Router + Server Actions) changed how I think about full-stack. Here's the honest breakdown.",
      date: "May 22, 2026",
      readTime: "6 min read",
      tags: ["Next.js", "Backend", "Node.js", "Full Stack"],
      content: `
  ## I Still Like Express
  
  Let's be clear — Express is not bad. It's lean, it's flexible, and for pure API services (especially microservices), it's still a solid choice. But when you're building a full-stack web product? Next.js has quietly become the more productive option for most use cases.
  
  Here's what pushed me over.
  
  ---
  
  ## One Project, One Codebase
  
  With Express + React, you maintain two separate projects. Two \`package.json\` files. Two deployment configs. Two repos (or a monorepo with its own complexity). Two dev servers running locally.
  
  With Next.js, your API lives right next to your UI. Shared types. Shared utilities. One \`npm run dev\`. One deployment.
  
  For a solo developer or small team, this is not a small thing — it's hours of friction removed per week.
  
  ---
  
  ## API Routes That Just Work
  
  \`\`\`ts
  // app/api/user/route.ts
  import { NextResponse } from 'next/server'
  
  export async function GET(req: Request) {
    const users = await db.user.findMany()
    return NextResponse.json(users)
  }
  
  export async function POST(req: Request) {
    const body = await req.json()
    const user = await db.user.create({ data: body })
    return NextResponse.json(user, { status: 201 })
  }
  \`\`\`
  
  You get clean, typed route handlers with zero boilerplate. No \`app.use(express.json())\`. No manual CORS setup for your own frontend. No separate server file to maintain.
  
  ---
  
  ## Server Components Changed Everything
  
  This is the real reason. Express has no concept of this — but React Server Components let you fetch data *on the server*, directly in your component, with zero API round-trip.
  
  \`\`\`tsx
  // This component runs on the server
  async function UserProfile({ id }: { id: string }) {
    const user = await db.user.findUnique({ where: { id } })
    // No useEffect, no loading state, no fetch() call
    return <div>{user.name}</div>
  }
  \`\`\`
  
  The database query runs on the server. The rendered HTML goes to the client. No separate endpoint. No extra request. This pattern eliminates an entire class of over-fetching and loading state management.
  
  ---
  
  ## Server Actions — Forms Without APIs
  
  \`\`\`tsx
  async function createPost(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    await db.post.create({ data: { title } })
    revalidatePath('/posts')
  }
  
  export default function NewPostForm() {
    return (
      <form action={createPost}>
        <input name="title" />
        <button type="submit">Create</button>
      </form>
    )
  }
  \`\`\`
  
  A form that writes to a database with no separate API endpoint. The \`'use server'\` directive handles the client-server boundary. Express has no equivalent — you'd write the form, write the fetch call, write the route handler, handle the response, update the UI. Next.js collapses all of that.
  
  ---
  
  ## When Express Still Wins
  
  - You need a standalone API consumed by multiple clients (mobile app + web + third parties)
  - You need fine-grained middleware control
  - You're building a service that has no UI at all
  - Your team knows Express deeply and the project has complex custom routing logic
  
  Express is a tool. Next.js is a framework. Tools are more flexible. Frameworks are more productive for their intended use case.
  
  For full-stack web products? Next.js is the more honest choice for most devs today.
      `
    },
    {
      slug: "expo-changed-app-development",
      title: "How Expo Changed Mobile App Development for Web Devs",
      excerpt: "React Native was always promising but painful. Expo removed the friction. If you know React, you're closer to shipping a real app than you think.",
      date: "May 25, 2026",
      readTime: "5 min read",
      tags: ["Expo", "React Native", "Mobile", "App Dev"],
      content: `
  ## The Old Way Was Brutal
  
  Before Expo simplified things, getting started with React Native meant: installing Android Studio, configuring Xcode (Mac only), setting up emulators, managing native dependencies, dealing with Gradle builds, fighting with linking libraries.
  
  A developer wanting to ship a simple mobile app spent the first week just getting "Hello World" to run without errors. That's not an exaggeration.
  
  ---
  
  ## What Expo Actually Is
  
  Expo is a set of tools and services built around React Native that abstracts away most of the native setup. At its core:
  
  - **Expo CLI** — dev server, hot reload, QR code to test on your real phone instantly
  - **Expo SDK** — pre-built, well-maintained modules for camera, notifications, location, file system, etc.
  - **EAS (Expo Application Services)** — cloud builds and OTA updates without touching Xcode or Android Studio
  
  The promise: if you know React, you can build and ship a mobile app.
  
  ---
  
  ## From Zero to Real Phone in 3 Commands
  
  \`\`\`bash
  npx create-expo-app my-app
  cd my-app
  npx expo start
  \`\`\`
  
  Scan the QR code with the **Expo Go** app on your phone. You're running your code on a real device. No emulator setup. No native toolchain. This alone is a paradigm shift for developers coming from web.
  
  ---
  
  ## The File-Based Router (Expo Router)
  
  Expo Router brought the Next.js app directory model to mobile — file-based routing with deep linking built in.
  
  \`\`\`
  app/
    index.tsx        → /
    profile.tsx      → /profile
    posts/
      index.tsx      → /posts
      [id].tsx       → /posts/:id
  \`\`\`
  
  The same mental model you use in Next.js applies directly. Navigation, deep links, and URL structure — all derived from the file system.
  
  ---
  
  ## OTA Updates: Ship Without the App Store
  
  This is genuinely powerful. With EAS Update, you can push JavaScript changes to your users instantly — no App Store review, no Play Store submission.
  
  \`\`\`bash
  eas update --branch production --message "Fix login bug"
  \`\`\`
  
  Next time a user opens the app, they get the update silently in the background. For bug fixes and UI changes, this removes the 1-3 day review cycle entirely.
  
  ---
  
  ## The Tradeoffs
  
  Expo isn't perfect:
  
  - **Managed workflow limitations** — some very low-level native modules require ejecting to a "bare" workflow
  - **App size** — the Expo SDK adds to bundle size even if you don't use every module (though this has improved significantly with SDK 50+)
  - **Expo Go limitations** — custom native code won't run in Expo Go; you need a development build
  
  But for 90% of apps — CRUD-heavy apps, dashboards, content apps, tools — Expo's managed workflow is more than enough.
  
  ---
  
  ## The Verdict
  
  Expo took React Native from "technically possible for web devs" to "actually practical for web devs." If you've been putting off mobile development because the setup looked painful, the current Expo experience is worth a serious second look.
  
  Your React knowledge transfers. Your component patterns transfer. Even some of your Tailwind muscle memory transfers (NativeWind is a thing). The gap between web dev and mobile dev has never been smaller.
      `
    },
    {
      slug: "developers-forgetting-topics",
      title: "You Forgot That Topic You Mastered. That's Normal. Here's What To Do.",
      excerpt: "You spent weeks learning closures, nailed every question, felt like a god. Three months later — blank. This happens to every developer. Stop panicking. Here's the actual solution.",
      date: "May 28, 2026",
      readTime: "4 min read",
      tags: ["Developer Life", "Learning", "Mindset"],
      content: `
  ## It Happened to Me Too
  
  I spent two solid months in React. Hooks, context, state management, custom hooks, performance optimization — I felt like I genuinely understood it all. Then I took a detour into cybersecurity for three months.
  
  When I came back? I had to look up \`useEffect\` dependency arrays again. I forgot the exact syntax for \`useReducer\`. A concept I had explained to others like breathing suddenly needed a Google search.
  
  If this has happened to you — and it has, or it will — the first thing to understand is: **this is not a sign that you learned it wrong.** This is just how human memory works.
  
  ---
  
  ## Your Brain Isn't a Hard Drive
  
  Memory works by reinforcement, not storage. If you don't use information regularly, the neural pathways for it weaken. This isn't failure — it's the brain being efficient, pruning what it considers unused.
  
  The good news: re-learning something you once knew is dramatically faster than learning it for the first time. The pathways are there. They just need reactivation.
  
  ---
  
  ## The Panic Response Makes It Worse
  
  When you forget something you "should" know, there's a specific anxiety that hits — "Am I even a developer? Did I waste all that time? Maybe I'm not cut out for this."
  
  That mental spiral consumes cognitive resources you need for actually solving the problem. The panic is the enemy, not the forgetting.
  
  Here's the reframe: **a developer who knows how to quickly find and recall information is more productive than one who memorizes everything but panics when they can't.** The skill isn't raw retention. It's efficient recovery.
  
  ---
  
  ## The Actual Process
  
  **Step 1: Go to the docs first.**
  
  Before Stack Overflow, before YouTube, before asking anyone — go to the official documentation. MDN for JavaScript/browser APIs. React docs (the new ones at react.dev). Next.js docs. They are written to be found quickly, and reading them reconnects you to the source of truth rather than a three-year-old answer.
  
  \`\`\`
  Forgot how Array.reduce works?
  → https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  Reading time: 3 minutes. Problem solved.
  \`\`\`
  
  **Step 2: Use AI to reconstruct, not to replace.**
  
  Ask Claude or ChatGPT: *"Can you walk me through how useEffect cleanup works with a real example? I'm refreshing my memory."*
  
  The key word is *refreshing*. You're using AI to jog memory, not to outsource thinking. Explain back what you read. If you can't, ask a follow-up. The moment you can explain it in your own words, it's back.
  
  **Step 3: Write a tiny example.**
  
  Don't just read. Type a 10-line snippet that demonstrates the thing you forgot. Actually run it. This is the fastest way to reconnect muscle memory to conceptual memory.
  
  ---
  
  ## You Don't Need to Remember Everything
  
  Senior developers Google things constantly. They forget syntax. They look up method names. They check MDN for edge cases in APIs they've used hundreds of times.
  
  The difference between a junior and senior dev isn't that the senior memorized more. It's that the senior knows *what exists*, *when to use it*, and *how to find the rest quickly*.
  
  That map — knowing what tools exist and roughly where to look — is what you actually build over years of experience. The exact syntax? That's what docs are for.
  
  ---
  
  ## When You Feel Like Quitting
  
  There's a specific moment in every developer's journey where they think: "I'm not getting better. I'm going backwards." It usually hits right after forgetting something fundamental or struggling with something that seemed easy before.
  
  Look back. Not at this week. Look back at where you were six months ago.
  
  Could you build what you can build now? Could you debug what you debug now? Could you read code at the speed you read it now?
  
  The growth is real. The dip is temporary. The docs are right there. Keep going.
      `
    }
  ]
  
  export function getBlogBySlug(slug: string): Blog | undefined {
    return blogs.find(b => b.slug === slug)
  }
  
  export function getAllBlogs(): Blog[] {
    return blogs
  }