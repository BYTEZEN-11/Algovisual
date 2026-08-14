import type { LLDModule, Lesson } from "@/types/content";

// =====================================================================
// 1. GETTING STARTED
// =====================================================================

const howToReadDiagrams: Lesson = {
  slug: "how-to-read-diagrams",
  title: "How to read these diagrams",
  duration: "5 min",
  summary: "UML conventions, naming, and the visual grammar used throughout.",
  body: "Every lesson in this track is illustrated with class, sequence, or state diagrams. Class names live in bold rectangles, attributes with a leading `+` are public and `#` are protected, and arrows with hollow triangles mean inheritance while solid lines with diamonds mean composition. Sequence diagrams read top-to-bottom: time flows downward, lifelines are the vertical dashed lines, and message arrows are labelled with the method call. When you can read these primitives fluently, every later design lesson collapses into a glance.",
  keyTerms: ["class diagram", "sequence diagram", "multiplicity", "lifecycle"],
  seeAlso: ["uml-relationships"],
};

// =====================================================================
// 2. OOP FOUNDATIONS
// =====================================================================

const objectsAndClasses: Lesson = {
  slug: "objects-classes",
  title: "Objects & Classes",
  duration: "10 min",
  summary: "The mental model that makes everything else make sense.",
  body: "A class is a blueprint; an object is an instance built from it. Each object owns its own state (instance fields) and shares behaviour with siblings (instance methods). Identity, state, and behaviour are the three properties every object has — and every design conversation boils down to choosing which objects own which state and how they collaborate. Get this mental model crisp and every later principle drops into place.",
  keyTerms: ["instance", "identity", "state", "behaviour"],
  seeAlso: ["encapsulation", "uml-relationships"],
};

const encapsulation: Lesson = {
  slug: "encapsulation",
  title: "Encapsulation",
  duration: "8 min",
  summary: "Hide the state, expose the behaviour.",
  body: "Encapsulation binds state and the code that mutates it into one unit, and walls off the state from outside callers behind controlled access. The benefits aren't privacy for its own sake — they're about preserving the freedom to change representation later. A setter that validates, a list exposed as a read-only view, a balance that cannot go negative: all are encapsulated invariants. If the caller can poke your fields directly, you've handed them the freedom to break your invariants.",
  keyTerms: ["invariant", "access modifier", "getter/setter", "data hiding"],
  seeAlso: ["abstraction", "srp"],
};

const abstraction: Lesson = {
  slug: "abstraction",
  title: "Abstraction",
  duration: "8 min",
  summary: "Model the right level of detail for the decision at hand.",
  body: "Abstraction is the practice of exposing only the relevant features of an object while hiding its implementation. It isn't the same as encapsulation: encapsulation is the mechanism (private fields, accessors), abstraction is the design choice about which details to bury. A `Database.connect(url)` is more abstract than `Database.tcpHandshake(...)`; both can be encapsulated. The right abstraction makes code readable; the wrong one conceals the things you actually need to see.",
  keyTerms: ["interface", "implementation hiding", "essential features", "cohesion"],
  seeAlso: ["encapsulation", "inheritance", "dip"],
};

const inheritance: Lesson = {
  slug: "inheritance",
  title: "Inheritance",
  duration: "9 min",
  summary: "Reuse behaviour through subtype relationships.",
  body: "Inheritance models an \"is-a\" relationship and gives subclasses code reuse for free: every public method on the parent is callable on the child. The cost is the strongest coupling your code can have — the child is wired into the parent's contract, including its private implementation choices. Single inheritance for reuse, interface implementation for type, composition when the relationship is \"has-a\" — these three rules carry most real-world designs.",
  keyTerms: ["is-a", "superclass", "protected", "overriding"],
  seeAlso: ["polymorphism", "composition-over-inheritance", "lsp"],
};

const polymorphism: Lesson = {
  slug: "polymorphism",
  title: "Polymorphism",
  duration: "10 min",
  summary: "One interface, many implementations.",
  body: "Polymorphism is the ability to treat objects of different concrete types through a shared interface, choosing the right method at runtime. It's what makes a `List<Shape>.render()` call the right `render` whether `Shape` is a Circle, Square, or Triangle. Without polymorphism, every call site needs an `instanceof` ladder. With it, new shapes drop in without touching old callers — that's OCP in action.",
  keyTerms: ["dynamic dispatch", "subtype", "virtual call", "open recursion"],
  seeAlso: ["inheritance", "ocp", "strategy"],
};

const compositionOverInheritance: Lesson = {
  slug: "composition-over-inheritance",
  title: "Composition over Inheritance",
  duration: "10 min",
  summary: "Build behaviour by combining objects, not by extending them.",
  body: "Composition means each class exposes its behaviour by holding references to other objects that do the work, rather than by inheriting from them. It's favoured because it lets you swap behaviours at runtime, avoid fragile-base-class problems, and keep each component small and testable. The rule of thumb: if the relationship isn't clearly \"is-a\" in the real world, model it as composition. \"Strategy pattern\" and \"decorator pattern\" are composition in disguise.",
  keyTerms: ["has-a", "delegation", "plugin", "strategy"],
  seeAlso: ["polymorphism", "strategy", "decorator"],
};

const umlRelationships: Lesson = {
  slug: "uml-relationships",
  title: "UML Relationships",
  duration: "12 min",
  summary: "Association, aggregation, composition, dependency.",
  body: "UML defines four flavours of \"connected to\" and mixing them up muddles the design. Association is a plain reference — a `User` knows about `Address`. Aggregation is a whole/container relationship where parts can outlive the whole — a `Department` aggregates `Employee`s. Composition is the strong form: the part has no life outside the whole — a `House` composes `Room`s. Dependency is the weakest: a class merely receives another as a parameter. Read carefully and the lifecycle story of every object in the system becomes obvious.",
  keyTerms: ["association", "aggregation", "composition", "dependency"],
  seeAlso: ["objects-classes", "class-diagram"],
};

const abstractVsInterface: Lesson = {
  slug: "abstract-vs-interface",
  title: "Abstract Class vs Interface",
  duration: "8 min",
  summary: "When to extend, when to implement.",
  body: "An abstract class can carry shared state and partial implementation; an interface is a pure contract with no state. Most modern languages separate the two explicitly (Java's `abstract class` vs `interface`, C#'s `abstract` vs `interface`, TypeScript's `abstract class` vs `interface`). Reach for the abstract class when a clear \"is-a\" hierarchy shares a non-trivial base implementation; reach for the interface when many unrelated classes must satisfy the same contract.",
  keyTerms: ["abstract class", "interface", "concrete method", "contract"],
  seeAlso: ["polymorphism", "isp", "abstract-factory"],
};

// =====================================================================
// 3. SOLID (existing, enriched where useful)
// =====================================================================

const srp: Lesson = {
  slug: "srp",
  title: "Single Responsibility",
  duration: "8 min",
  summary: "One class, one reason to change.",
  body: "The Single Responsibility Principle says a class should have one, and only one, reason to change. \"Reason to change\" maps to the people who request changes — if a class serves two distinct stakeholders (say, the accounting team and the formatting team), it has two responsibilities, even if it only has one method. The cost of violating SRP shows up the first time a change to one responsibility forces recompilation, redeployment, or regression of the other.",
  keyTerms: ["responsibility", "cohesion", "actor", "concern"],
  seeAlso: ["ocp", "dip"],
};

const ocp: Lesson = {
  slug: "ocp",
  title: "Open / Closed",
  duration: "7 min",
  summary: "Open to extension, closed to modification.",
  body: "Software entities should be open for extension but closed for modification. You should be able to add new behaviour without changing existing code that already works and is tested. In practice this means leaning on polymorphism and abstractions: define a stable interface, then add new implementations as new classes. The classic counter-example is a switch statement on type — every new type requires editing the existing switch, breaking the closed-for-modification half.",
  keyTerms: ["extension", "polymorphism", "strategy pattern", "abstraction"],
  seeAlso: ["srp", "lsp", "dip"],
};

const lsp: Lesson = {
  slug: "lsp",
  title: "Liskov Substitution",
  duration: "9 min",
  summary: "Subtypes must be substitutable for base types.",
  body: "If S is a subtype of T, then objects of type T may be replaced with objects of type S without altering any of the desirable properties of the program. The visible symptom of an LSP violation is code that has to check the runtime type to behave correctly — `if (obj instanceof Square) ...`. Stronger preconditions in a subtype, weaker postconditions, or thrown exceptions not thrown by the base type all break substitution.",
  keyTerms: ["substitutability", "precondition", "postcondition", "covariance"],
  seeAlso: ["ocp", "isp"],
};

const isp: Lesson = {
  slug: "isp",
  title: "Interface Segregation",
  duration: "6 min",
  summary: "Prefer small, focused interfaces.",
  body: "Many client-specific interfaces are better than one general-purpose interface. A class should not be forced to depend on methods it does not use. The litmus test: when an interface change forces changes in classes that don't care about the change, the interface is too fat. ISP is the reason Java's collection hierarchy splits Iterable, Collection, List, Set, and Map instead of one mega-Collection interface.",
  keyTerms: ["interface", "client", "fat interface", "role interface"],
  seeAlso: ["srp", "lsp"],
};

const dip: Lesson = {
  slug: "dip",
  title: "Dependency Inversion",
  duration: "9 min",
  summary: "Depend on abstractions, not concretions.",
  body: "High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details — details should depend on abstractions. In code: a service class should not `new` a concrete repository; it should receive an interface and have its container wire up the concrete. This is what makes testing with mocks possible and what lets you swap implementations without recompiling consumers.",
  keyTerms: ["abstraction", "injection", "IoC container", "mocking"],
  seeAlso: ["srp", "ocp"],
};

// =====================================================================
// 4. DESIGN PRINCIPLES
// =====================================================================

const cohesionCoupling: Lesson = {
  slug: "cohesion-coupling",
  title: "Cohesion & Coupling",
  duration: "8 min",
  summary: "Maximize the first, minimize the second.",
  body: "Cohesion measures how strongly the responsibilities inside a single module belong together; coupling measures how tightly two modules depend on each other. The good design has high cohesion (every method on a class pulls its weight toward the same goal) and low coupling (modules talk through narrow, stable interfaces). A change inside one module shouldn't ripple across half the codebase — that's the test of low coupling. The two qualities are not independent: as you split responsibilities apart to raise cohesion, the modules must talk to each other, and the question becomes how that conversation is wired.",
  keyTerms: ["cohesion", "coupling", "module boundary", "stable interface"],
  seeAlso: ["srp", "composition-over-inheritance"],
};

const dryKissYagni: Lesson = {
  slug: "dry-kiss-yagni",
  title: "DRY · KISS · YAGNI",
  duration: "7 min",
  summary: "Three short principles that save months.",
  body: "DRY says every piece of knowledge has a single source of truth — duplication is a liability. KISS says the simplest solution that solves the problem is usually the right one — cleverness ages poorly. YAGNI says don't add capability you don't need today — speculative flexibility is expensive and usually wrong. Read together they form a filter: pick the simple, non-duplicative solution; only add complexity when a real requirement forces it.",
  keyTerms: ["DRY", "KISS", "YAGNI", "speculative generality"],
  seeAlso: ["ocp", "composition-over-inheritance"],
};

const lawOfDemeter: Lesson = {
  slug: "law-of-demeter",
  title: "Law of Demeter",
  duration: "8 min",
  summary: "Talk only to your immediate collaborators.",
  body: "A method should only call methods on its own object, on objects it created, on objects passed in as parameters, or on its direct fields. Anything beyond that is a \"train-wreck\" like `a.getB().getC().getD()`. Each dot is an extra coupling. The principle is sometimes overstated — strict Demeter turned into a religion produces bloated wrappers — but the spirit matters: a long dot chain tells you your caller is reaching across trust boundaries and growing fragile as those internals change.",
  keyTerms: ["Demeter", "train wreck", "delegate", "leaky abstraction"],
  seeAlso: ["encapsulation", "law-of-demeter"],
};

// =====================================================================
// 5. CREATIONAL PATTERNS
// =====================================================================

const singleton: Lesson = {
  slug: "singleton",
  title: "Singleton",
  duration: "6 min",
  summary: "Ensure a class has only one instance.",
  body: "The Singleton pattern restricts a class to a single instance and provides a global point of access. Modern best practice is dependency-injected singletons rather than classic `getInstance()` — you keep the single-instance guarantee but the lifetime is owned by the container. Reach for it when exactly one object must coordinate actions across the system (config registries, device drivers). Avoid it when all you want is a global — global state is the smell, not the instance count.",
  keyTerms: ["instance", "global access", "lifetime", "testability"],
  seeAlso: ["factory", "observer"],
};

const factory: Lesson = {
  slug: "factory",
  title: "Factory Method",
  duration: "8 min",
  summary: "Defer instantiation to subclasses.",
  body: "Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses, removing the hard-coded `new ConcreteClass()` from the caller. It's the underlying mechanism behind `Calendar.getInstance()`, `NumberFormat.getInstance()`, and most plugin loaders. The pattern keeps the creator loosely coupled to the products.",
  keyTerms: ["creator", "product", "polymorphic creation", "plugin"],
  seeAlso: ["singleton", "observer"],
};

const abstractFactory: Lesson = {
  slug: "abstract-factory",
  title: "Abstract Factory",
  duration: "12 min",
  summary: "A factory of factories, bound by theme.",
  body: "Abstract Factory groups related object-creation responsibilities behind a single interface, returning factories that produce a consistent family of products. Need a `WindowsFactory` and a `MacFactory`? Each one knows how to make a Button, a Checkbox, and a ScrollBar that look the part. Clients code against the abstract factory and swap it out for a different theme with one line. The price is rigidity: adding a new product variant means editing every factory implementation.",
  keyTerms: ["product family", "theme", "kit", "cross-platform UI"],
  seeAlso: ["factory", "factory-method", "di"],
};

const builder: Lesson = {
  slug: "builder",
  title: "Builder",
  duration: "12 min",
  summary: "Assemble complex objects step by step.",
  body: "Builder separates the construction of a complex object from its representation, letting the same construction process create different representations. Each `withX(...)` call returns the builder so the calls chain. Builders shine when an object has many optional parameters or when its construction has invariants that a telescoping constructor can't enforce. Use it for HTTP requests, query DSLs, and immutable value objects with optional fields.",
  keyTerms: ["fluent API", "immutable construction", "optional parameter", "director"],
  seeAlso: ["factory-method", "prototype"],
};

const prototype: Lesson = {
  slug: "prototype",
  title: "Prototype",
  duration: "8 min",
  summary: "Clone instead of constructing from scratch.",
  body: "Prototype creates new objects by cloning an existing instance, sidestepping the cost of re-running expensive construction. It shines when object initialization is heavy — database lookups, deep graph walks, resolved-by-name resource loads. Languages with first-class clone support (Java's `Cloneable`, Python's `copy.deepcopy`) make this pattern nearly free. The catch is the deep-copy versus shallow-copy decision: clone too shallow and the copy shares mutable state, clone too deep and performance degrades.",
  keyTerms: ["clone", "shallow copy", "deep copy", "registry"],
  seeAlso: ["builder", "factory-method"],
};

// =====================================================================
// 6. STRUCTURAL PATTERNS
// =====================================================================

const decorator: Lesson = {
  slug: "decorator",
  title: "Decorator",
  duration: "10 min",
  summary: "Add behaviour by wrapping, not by inheriting.",
  body: "Decorator attaches additional responsibilities to an object dynamically, keeping the original class unchanged. The wrapping object has the same interface as the wrapped one, so the outer world is none the wiser. Decorators stack — a `BufferedReader` wrapped around a `FileReader` reads in chunks, then a `LineNumberReader` counts lines — each layer adds one concern. The pattern is the standard answer when inheritance would multiply into an explosion of subclasses.",
  keyTerms: ["wrapper", "conformance", "open/closed", "layered behaviour"],
  seeAlso: ["adapter", "proxy", "composition-over-inheritance"],
};

const adapter: Lesson = {
  slug: "adapter",
  title: "Adapter",
  duration: "8 min",
  summary: "Translate one interface into another.",
  body: "Adapter converts the interface of a class into another interface clients expect. It lets incompatible classes work together — you didn't control the original class, you don't want to edit it, and you need its functionality behind a more convenient interface. Object adapters compose the adaptee; class adapters inherit from it. The pattern is a one-way translation: clients see the target interface, never the original. In Java it's the entire `InputStreamReader`/`OutputStreamWriter` bridge between byte and character streams.",
  keyTerms: ["translation", "target interface", "adaptee", "bridge"],
  seeAlso: ["facade", "decorator"],
};

const facade: Lesson = {
  slug: "facade",
  title: "Facade",
  duration: "8 min",
  summary: "A simple front door to a complex subsystem.",
  body: "Facade provides a unified interface to a set of interfaces in a subsystem, defining a higher-level operation that makes the subsystem easier to use. It is not a god object and it doesn't hide the subsystem — clients can still reach into the underlying components when they need to. The pattern is about reducing cognitive load for the common path: \"I just want to render a chart\", not \"I want to set up the renderer, the data adapter, the legend and the axis\".",
  keyTerms: ["simplification", "subsystem boundary", "convenience layer", "API"],
  seeAlso: ["adapter", "law-of-demeter"],
};

const composite: Lesson = {
  slug: "composite",
  title: "Composite",
  duration: "10 min",
  summary: "Treat single objects and groups of them uniformly.",
  body: "Composite composes objects into tree structures and lets clients treat individual leaves and compositions uniformly. `component.children().render()` works whether `component` is a single button or a whole panel containing buttons, which contain icons. Recursive behaviour falls out for free. The trade-off is over-generalizing the component interface: pushing every leaf operation up to the root means dealing with default no-op implementations in leaves, and pushing only common operations up means the tree's \"things to do\" are limited.",
  keyTerms: ["tree structure", "uniform interface", "recursive delegation", "part-whole"],
  seeAlso: ["iterator", "decorator"],
};

const proxy: Lesson = {
  slug: "proxy",
  title: "Proxy",
  duration: "10 min",
  summary: "Substitute another object to control access.",
  body: "Proxy provides a surrogate for another object to control access to it. Variants include virtual proxies (lazy creation of expensive objects), protection proxies (access checks), remote proxies (network stub), and smart references (reference counting, logging). In dynamic languages you often implement this with a metaclass or decorator; in static languages you write a wrapper that satisfies the same interface. The pattern works best when clients are unaware that they're talking to a proxy — they just see the interface.",
  keyTerms: ["surrogate", "lazy loading", "access control", "remote stub"],
  seeAlso: ["decorator", "adapter"],
};

const bridge: Lesson = {
  slug: "bridge",
  title: "Bridge",
  duration: "10 min",
  summary: "Decouple abstraction from implementation so both can vary.",
  body: "Bridge separates an abstraction from its implementation so the two can evolve independently. The \"abstraction\" is the high-level control flow the client sees; the \"implementation\" is the platform-specific guts. They're joined by a bridge — a reference held by the abstraction to its current implementation, swappable at runtime. Use bridge when you'd otherwise have a combinatorial explosion of subclasses (`CircleWindowsSquareLinux` style).",
  keyTerms: ["abstraction", "implementation", "decoupling", "composition"],
  seeAlso: ["abstract-factory", "adapter", "strategy"],
};

const flyweight: Lesson = {
  slug: "flyweight",
  title: "Flyweight",
  duration: "10 min",
  summary: "Share intrinsic state across many fine-grained objects.",
  body: "Flyweight shares common state across many objects, keeping only the per-instance extrinsic state on the outside. The result: a million tree objects in a forest renderer carry only their position and species ID, while the actual sprite data lives in a small flyweight pool. Reach for it when you have a huge number of similar objects and memory is the bottleneck. The cost is the discipline of separating intrinsic (shared) and extrinsic (per-instance) state in your design.",
  keyTerms: ["intrinsic state", "extrinsic state", "object pool", "sharing"],
  seeAlso: ["prototype", "composite"],
};

// =====================================================================
// 7. BEHAVIORAL PATTERNS
// =====================================================================

const strategy: Lesson = {
  slug: "strategy",
  title: "Strategy",
  duration: "10 min",
  summary: "Swap algorithms behind a stable interface.",
  body: "Strategy defines a family of algorithms, encapsulates each one, and makes them interchangeable. The context class holds a `Strategy` reference and delegates the work to it; clients inject whichever concrete strategy fits. It's the canonical answer to \"I have a switch on parameter type at the top of this method\" — instead of switching, you inject. Stripe, in particular, leans on strategy to plug different payment processors into one checkout.",
  keyTerms: ["policy", "algorithm", "injection", "context object"],
  seeAlso: ["polymorphism", "state", "bridge"],
};

const observer: Lesson = {
  slug: "observer",
  title: "Observer",
  duration: "10 min",
  summary: "Notify dependents of state changes.",
  body: "Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. Classic example: a stock ticker pushing to multiple displays. In modern code you'll see it as EventEmitter, RxJS Observables, React's useEffect subscriptions, or DOM addEventListener. The risk is leaky abstractions — observers that mutate state on notification can create re-entrant cascades.",
  keyTerms: ["subject", "observer", "event", "subscription"],
  seeAlso: ["singleton", "factory"],
};

const state: Lesson = {
  slug: "state",
  title: "State",
  duration: "10 min",
  summary: "Behaviour follows state — let the object choose.",
  body: "State lets an object alter its behaviour when its internal state changes, making the object appear to change its class. Each state is its own class implementing the same interface; the context holds the current state and forwards calls to it. State machines like network protocols, traffic lights, and document editors drop out of this naturally. Contrast with strategy: in strategy the choice of algorithm is made by the client, in state it changes inside the object itself.",
  keyTerms: ["state machine", "transition", "context", "polymorphic state"],
  seeAlso: ["strategy", "finite-state machine"],
};

const command: Lesson = {
  slug: "command",
  title: "Command",
  duration: "10 min",
  summary: "Turn a request into a first-class object.",
  body: "Command turns a request into a stand-alone object, decoupling the object that issues the request from the object that knows how to execute it. Commands are then first-class: they can be queued (a task queue), logged, undone (a stack of commands), and replayed. The pattern shines in editors with undo/redo, transactional systems, and remote RPC stubs where the command is serialized over the wire.",
  keyTerms: ["encapsulated request", "undo/redo", "queue", "receiver"],
  seeAlso: ["observer", "mediator"],
};

const chainOfResponsibility: Lesson = {
  slug: "chain-of-responsibility",
  title: "Chain of Responsibility",
  duration: "10 min",
  summary: "Pass a request along until something handles it.",
  body: "Chain of Responsibility passes a request along a chain of handlers until one of them decides to handle it — or it falls off the end. Each handler either processes the request or forwards it to the next. Useful for middleware stacks in HTTP servers, event bubbling in GUIs, and layered authorization checks. The pattern keeps each handler oblivious to the others, but it can be hard to debug when a request silently disappears into the void.",
  keyTerms: ["handler chain", "middleware", "fallthrough", "pipeline"],
  seeAlso: ["command", "decorator"],
};

const templateMethod: Lesson = {
  slug: "template-method",
  title: "Template Method",
  duration: "8 min",
  summary: "Fix the skeleton; let subclasses fill in the steps.",
  body: "Template Method defines the skeleton of an algorithm in a base class and lets subclasses override specific steps without changing the algorithm's structure. The base method calls primitive operations that subclasses supply. It relies on inheritance (in contrast to strategy, which uses composition) and works best when the algorithm's shape is stable and only a few steps vary. Classic examples: `HttpServlet.service()` calling doGet/doPost, and `AbstractQueuedSynchronizer` in Java.",
  keyTerms: ["skeleton", "primitive operation", "Hollywood principle", "framework method"],
  seeAlso: ["strategy", "polymorphism"],
};

const iterator: Lesson = {
  slug: "iterator",
  title: "Iterator",
  duration: "10 min",
  summary: "Sequential access without exposing the structure.",
  body: "Iterator provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation. Modern languages fold this into for-each loops and generators; you only reach for the explicit pattern when designing custom collections. Java's `Iterable`/`Iterator`, Python's iterator protocol, and Rust's `IntoIterator` are all instances of this idea. The benefit is that the consumer code is decoupled from the data structure used to store the elements.",
  keyTerms: ["cursor", "iteration protocol", "external iterator", "internal iterator"],
  seeAlso: ["composite", "command"],
};

const mediator: Lesson = {
  slug: "mediator",
  title: "Mediator",
  duration: "10 min",
  summary: "Centralize the chaos of many-to-many chatter.",
  body: "Mediator defines an object that encapsulates how a set of objects interact, promoting loose coupling by keeping objects from referring to each other explicitly. Without a mediator, every colleague knows about every other; with one, colleagues only know about the mediator. Classically applied in chat-room UIs and dialog coordination, the pattern concentrates decision-making that would otherwise be scattered across many objects. The trade-off is that the mediator itself tends to grow into a god object if you're not careful.",
  keyTerms: ["centralized control", "colleagues", "hub-and-spoke", "decoupling"],
  seeAlso: ["facade", "observer"],
};

const memento: Lesson = {
  slug: "memento",
  title: "Memento",
  duration: "8 min",
  summary: "Capture and restore an object's state.",
  body: "Memento captures and externalizes an object's internal state — without violating encapsulation — so the object can be restored to this state later. The classic use case is undo: every edit pushes a memento onto a stack, undo pops the latest one. Editors, transactions, and snapshot-based schedulers all use this shape. The care point is memento size: a deep object graph will produce large mementos, and that's where deep-copy versus shallow-copy decisions start to matter.",
  keyTerms: ["snapshot", "undo", "token", "originator"],
  seeAlso: ["command", "prototype"],
};

const visitor: Lesson = {
  slug: "visitor",
  title: "Visitor",
  duration: "10 min",
  summary: "Add new operations without changing the element classes.",
  body: "Visitor lets you define a new operation without changing the classes of the elements on which it operates. You double-dispatch: the element accepts a visitor, the visitor's method executes with the right concrete type. It's the right tool when you have a stable structure (an AST, a document model) but the set of operations on it grows over time — compilers are the textbook example. The price is that adding a new element type requires editing every visitor.",
  keyTerms: ["double dispatch", "operation", "element", "stable structure"],
  seeAlso: ["iterator", "strategy"],
};

// =====================================================================
// 8. MACHINE-CODING CASE STUDIES
// =====================================================================

const requirements: Lesson = {
  slug: "requirements",
  title: "Requirements & Estimations",
  duration: "10 min",
  summary: "Functional and non-functional requirements.",
  body: "Before drawing a single class, interview the stakeholder and split requirements into functional (what the system does) and non-functional (how it does it — latency, scale, durability). Quantify: how many lots, how many entry/exit gates per hour, peak load, expected concurrent users. The numbers drive every later decision — sharded tables, queue-based entry, payment retries. Skipping this step is the single most common cause of designs that look right and behave wrong.",
  keyTerms: ["functional requirements", "non-functional", "throughput", "latency"],
  seeAlso: ["class-diagram"],
};

const classDiagram: Lesson = {
  slug: "class-diagram",
  title: "Class Diagram",
  duration: "12 min",
  summary: "Model entities, behaviors, and relationships.",
  body: "Translate requirements into entities (Lot, Vehicle, Ticket, Gate, Payment), each with attributes and methods, then draw the relationships: Lot HAS-MANY Floors; Floor HAS-MANY Spots; Spot allots to ONE Vehicle; Ticket associates ONE Vehicle to ONE Spot. Add multiplicities and arrowheads carefully — they're the part that actually carries information. From the diagram, the database schema writes itself.",
  keyTerms: ["entity", "association", "multiplicity", "aggregation vs composition"],
  seeAlso: ["requirements"],
};

const vendingMachine: Lesson = {
  slug: "vending-machine",
  title: "Design Vending Machine",
  duration: "15 min",
  summary: "States, denominations, and a tiny state machine.",
  body: "Vending Machine is a tight exercise in state-driven design. Model the machine with explicit states (Idle, HasMoney, Dispensing, OutOfStock), each transitioning on events (coinInserted, productSelected, itemDispensed). Keep coin inventory in a `CoinInventory` so change-making becomes its own little strategy. The interview usually expands it with credit cards, refunds, and remote monitoring — each addition is a chance to apply open/closed: define the payment interface and plug new implementations in.",
  keyTerms: ["state machine", "inventory", "denomination", "refund"],
  seeAlso: ["state", "strategy", "requirements"],
};

const splitwise: Lesson = {
  slug: "splitwise",
  title: "Design Splitwise",
  duration: "15 min",
  summary: "Expense groups, balances, and settlement graphs.",
  body: "Splitwise centres on User, Group, Expense, and Share. Each Expense records who paid, the total, and the split (equal, exact, percent) across participants. Balance computation is the design's heart: maintain a per-user net balance, update it on every expense, and surface the minimum-cash-flow settlement graph when the group wants to clear debts. Ledger-style updates keep auditability simple — every cent's history is replayable.",
  keyTerms: ["expense split", "balance", "settlement", "ledger"],
  seeAlso: ["strategy", "parking-lot", "requirements"],
};

const ticTacToe: Lesson = {
  slug: "tic-tac-toe",
  title: "Design Tic-Tac-Toe",
  duration: "12 min",
  summary: "Board, players, win-detection, and a strategy hook.",
  body: "TicTacToe is small enough to design in 30 minutes on a whiteboard but rich enough to test every basic OOP idea. Model `Board`, `Player`, `Move`, and a `Game` orchestrator. Win detection is a tiny set of checks across rows, columns, and diagonals. For extra credit, abstract `Player` behind a strategy interface so AI players, network players and human players all plug in identically — a satisfying application of strategy and polymorphism at very small scale.",
  keyTerms: ["board state", "win detection", "strategy", "turn management"],
  seeAlso: ["strategy", "uml-relationships", "requirements"],
};

const bookMyShow: Lesson = {
  slug: "bookmyshow",
  title: "Design BookMyShow",
  duration: "18 min",
  summary: "Theatres, shows, seats, and concurrency-safe booking.",
  body: "BookMyShow layers a theatre-catalog above a show-schedule above a seat-map. The hard part is the seat: concurrent users clicking the same seat must not double-book it. Solutions range from optimistic locking on the seat row with version numbers to a short-lived seat-hold reservation that expires if payment doesn't arrive. Pricing strategy (peak/off-peak, seat class) slots in as a strategy. The exercise reinforces real-world trade-offs: latency versus correctness, and the cost of distributed locks.",
  keyTerms: ["seat hold", "concurrency", "pricing strategy", "show schedule"],
  seeAlso: ["strategy", "state", "parking-lot"],
};

const elevatorSystem: Lesson = {
  slug: "elevator-system",
  title: "Design Elevator System",
  duration: "18 min",
  summary: "Cars, requests, schedulers, and dispatching strategies.",
  body: "An elevator system is an exercise in concurrent state and choice of scheduling policy. Model `Building`, `ElevatorCar`, `Floor`, and a `Request` queue. The big decision: where does the dispatcher live, and what algorithm does it run? Classic answers — nearest car, sector dispatch, destination control — are different strategy implementations plugged into the same interface. Real systems add safety constraints (door interlocks, maintenance state), each handled as a state-machine sub-pattern layered on the cars.",
  keyTerms: ["dispatching algorithm", "request queue", "car state", "destination control"],
  seeAlso: ["state", "strategy", "mediator"],
};

// =====================================================================
// MODULES
// =====================================================================

export const lldModules: LLDModule[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    tagline: "Read this first — visual grammar for the rest of the track.",
    status: "live",
    icon: "Compass",
    lessons: [howToReadDiagrams],
  },
  {
    slug: "oop-foundations",
    title: "OOP Foundations",
    tagline: "Objects, encapsulation, inheritance — the building blocks.",
    status: "live",
    icon: "Box",
    lessons: [
      objectsAndClasses,
      encapsulation,
      abstraction,
      inheritance,
      polymorphism,
      compositionOverInheritance,
      umlRelationships,
      abstractVsInterface,
    ],
  },
  {
    slug: "solid",
    title: "SOLID Principles",
    tagline: "Five principles for object-oriented design.",
    status: "live",
    icon: "Shield",
    lessons: [srp, ocp, lsp, isp, dip],
  },
  {
    slug: "design-principles",
    title: "Design Principles",
    tagline: "Cohesion, coupling, DRY/KISS/YAGNI, Law of Demeter.",
    status: "live",
    icon: "Compass",
    lessons: [cohesionCoupling, dryKissYagni, lawOfDemeter],
  },
  {
    slug: "creational-patterns",
    title: "Creational Patterns",
    tagline: "Object creation — the patterns that bend `new` to your will.",
    status: "live",
    icon: "Plus",
    lessons: [singleton, factory, abstractFactory, builder, prototype],
  },
  {
    slug: "structural-patterns",
    title: "Structural Patterns",
    tagline: "Compose objects into larger structures.",
    status: "live",
    icon: "Layers",
    lessons: [decorator, adapter, facade, composite, proxy, bridge, flyweight],
  },
  {
    slug: "behavioral-patterns",
    title: "Behavioral Patterns",
    tagline: "Responsibility, communication, and control flow.",
    status: "live",
    icon: "Workflow",
    lessons: [
      strategy,
      observer,
      state,
      command,
      chainOfResponsibility,
      templateMethod,
      iterator,
      mediator,
      memento,
      visitor,
    ],
  },
  {
    slug: "machine-coding",
    title: "Machine-Coding Case Studies",
    tagline: "End-to-end designs you might be asked to code in an interview.",
    status: "live",
    icon: "Cpu",
    lessons: [
      requirements,
      classDiagram,
      vendingMachine,
      splitwise,
      ticTacToe,
      bookMyShow,
      elevatorSystem,
    ],
  },
];
