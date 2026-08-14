import type { Chapter } from "@/types/content";

const ch = (
  slug: string,
  title: string,
  summary: string,
  body: string,
  keyTerms: string[],
  sections: number,
): Chapter => ({
  slug,
  title,
  track: "os",
  status: "live",
  summary,
  body,
  keyTerms,
  sections,
});

// ---------------------------------------------------------------------------
// A · Foundations (7 chapters)
// ---------------------------------------------------------------------------
const partA: Chapter[] = [
  ch(
    "intro",
    "What an Operating System Actually Is",
    "The kernel, the user–kernel boundary, and why the OS exists.",
    "An operating system is the layer between hardware and application programs. It manages CPU, memory, I/O, and filesystem resources, and provides a syscall interface for programs to request them. The two main goals are resource utilisation (keep the disk and CPU busy) and fair sharing (give every user a reasonable slice). Modern OSes also enforce isolation between processes and between users and the kernel.",
    ["kernel", "syscall", "resource", "isolation"],
    6,
  ),
  ch(
    "history-zoo",
    "A Short History & the OS Zoo",
    "Mainframes to mobile: how we got here, and what's running today.",
    "Operating systems evolved alongside the hardware: batch monitors on mainframes, time-sharing systems on minicomputers, Unix and the rise of portable C, MS-DOS and the IBM PC, the GUI era of Mac OS and Windows, and finally mobile OSes like iOS and Android. Today the OS zoo spans Linux, BSDs, macOS, Windows, ChromeOS, and embedded RTOSes. Each generation traded off the same fundamental tensions: performance vs portability, power vs simplicity, openness vs control.",
    ["batch", "time-sharing", "Unix", "RTOS"],
    6,
  ),
  ch(
    "hardware",
    "The Hardware an OS Drives",
    "CPU, memory, buses, devices — what the OS is actually sitting on.",
    "The OS is a hardware-aware program. It schedules threads on one or more CPUs, allocates physical memory, drives devices over buses (PCIe, USB, SATA), and handles interrupts raised by devices. Modern hardware adds layers the OS must respect: MMUs, privilege rings, DMA engines, NUMA nodes, and heterogeneous cores. A good mental model of the hardware is the prerequisite for understanding why the OS looks the way it does.",
    ["CPU", "MMU", "DMA", "NUMA"],
    8,
  ),
  ch(
    "structures-arch",
    "OS Structures & Architectures",
    "Monolithic, microkernel, modular, hybrid — and why it matters.",
    "A monolithic kernel (Linux, BSD) runs most services in kernel space — drivers, filesystem, network stack — for speed but with the cost that any bug can crash the whole system. A microkernel (QNX, Minix) pushes drivers and services into user space; messages pass through the kernel. Hybrid kernels (macOS's XNU, Windows NT) borrow from both. Modular designs (loadable kernel modules) give some of the benefits of both: small core, optional drivers.",
    ["monolithic", "microkernel", "loadable module", "kernel space"],
    7,
  ),
  ch(
    "boot-process",
    "The Boot Process",
    "From power-on to your first user-space process.",
    "When power is applied, the CPU resets to a fixed address and runs firmware (BIOS or UEFI). The firmware enumerates devices, finds a bootloader, and hands control to it. The bootloader (GRUB, systemd-boot) loads the kernel and an initial ramdisk, then transfers control. The kernel initialises hardware, mounts the root filesystem, and starts init (or systemd), which brings up the rest of user space. Every step is constrained by what's already running — early boot is fragile.",
    ["BIOS", "UEFI", "bootloader", "init"],
    7,
  ),
  ch(
    "syscalls",
    "System Calls & the User–Kernel Boundary",
    "How user code asks the kernel to do something.",
    "System calls are the controlled entry points from user code into the kernel. A syscall traps into the kernel, the kernel switches to a privileged stack, runs the requested service, and returns to user space. The libc wrappers (open, read, write, fork) are thin — they marshal arguments and trigger the trap. The syscall number selects the service; the arguments are passed in registers or a designated area. The user-kernel boundary is also the security boundary: the kernel enforces every check.",
    ["trap", "syscall number", "privilege level", "wrapper"],
    8,
  ),
  ch(
    "source-to-process",
    "From Source Code to a Running Process",
    "Compile, link, load, exec — the journey of a program.",
    "A source file becomes an executable through compile (per file, to object code), link (combining objects and libraries into a binary), and load (mapping the binary into memory). The kernel's exec() then replaces the calling process's address space with the loaded binary and starts it from the entry point. Dynamic linking adds another step: shared libraries (libc, libm) are mapped into the process at load time or on first call (lazy binding).",
    ["compile", "link", "load", "dynamic linking"],
    8,
  ),
];

// ---------------------------------------------------------------------------
// B · Processes, Threads & Scheduling (6 chapters)
// ---------------------------------------------------------------------------
const partB: Chapter[] = [
  ch(
    "process-pcb",
    "The Process & the PCB",
    "Creation, lifecycle, and the data structure that tracks it all.",
    "A process is a running program with its own address space, registers, file descriptors, and credentials. The kernel tracks each process in a Process Control Block (PCB) — a struct holding everything needed to resume the process later. fork() duplicates the current process; exec() replaces the address space with a new program; wait() blocks until a child exits. The lifecycle is create → ready → running → blocked → terminated, with the scheduler moving processes between states.",
    ["PCB", "fork", "exec", "lifecycle"],
    9,
  ),
  ch(
    "threads",
    "Threads",
    "Multiple execution contexts inside one process.",
    "A thread is a schedulable execution context within a process. Threads share the process's address space, file descriptors, and credentials but have their own stack, registers, and thread-local storage. Kernel threads are scheduled by the OS; user threads are scheduled by a runtime library (goroutines, Java threads on old JVMs). The M:N model multiplexes M user threads on N kernel threads. Threads make parallelism and concurrency cheap — but they introduce shared-state bugs.",
    ["kernel thread", "user thread", "TLS", "M:N model"],
    8,
  ),
  ch(
    "context-switching",
    "Context Switching & the Dispatcher",
    "What it costs to swap one thread for another.",
    "A context switch saves the state of the outgoing thread (registers, program counter, stack pointer) and loads the state of the incoming one. The cost is dominated by cache effects: the new thread's working set is cold, so the first few hundred instructions are slow. Direct switch (thread yields voluntarily) is cheaper than preemptive switch (timer interrupt fires). The dispatcher is the routine that actually performs the switch, while the scheduler picks who runs.",
    ["context switch", "dispatcher", "preemption", "cold cache"],
    6,
  ),
  ch(
    "cpu-scheduling-basics",
    "CPU Scheduling I — The Basics",
    "Throughput, latency, fairness — and the classic algorithms.",
    "The scheduler chooses which runnable thread runs next on each CPU. Goals include throughput, latency, fairness, and avoiding starvation. Metrics are turnaround time, waiting time, response time, and CPU utilisation. FCFS, SJF, Round Robin, and Priority are the canonical algorithms. The scheduler is invoked whenever a thread blocks, unblocks, or its time slice expires — many times per second.",
    ["throughput", "latency", "fairness", "response time"],
    9,
  ),
  ch(
    "cpu-scheduling-real",
    "CPU Scheduling II — Real Schedulers",
    "MLFQ, CFS, and how Linux actually picks the next thread.",
    "Real schedulers combine multiple ideas. MLFQ uses multiple queues with different priorities and RR within each: threads start high, sink on CPU use, get boosted on I/O. Linux's CFS (Completely Fair Scheduler) tracks virtual runtime per thread and always picks the lowest — using a red-black tree for O(log n) selection. Windows' scheduler is similar but adds per-queue locks for scalability. The interesting bit is the heuristics: how aggressively to demote, how to credit I/O-bound threads.",
    ["MLFQ", "CFS", "virtual runtime", "nice"],
    8,
  ),
  ch(
    "ipc",
    "Interprocess Communication (IPC)",
    "Pipes, sockets, shared memory, and the messaging primitives.",
    "Processes need to talk: pipes carry byte streams between related processes; FIFOs extend pipes to unrelated ones; Unix domain sockets give bidirectional byte streams with file-like semantics; TCP sockets cross machines. Shared memory maps the same pages into two processes — fastest, but the processes must synchronize access themselves. Message queues and signals round out the toolkit. Choosing the right IPC is half the design of any multi-process system.",
    ["pipe", "socket", "shared memory", "signal"],
    9,
  ),
];

// ---------------------------------------------------------------------------
// C · Concurrency & Synchronization (6 chapters)
// ---------------------------------------------------------------------------
const partC: Chapter[] = [
  ch(
    "race-conditions",
    "Race Conditions & the Critical Section",
    "When two threads access shared state without coordination.",
    "When two threads access shared state without coordination, the result depends on the interleaving — a race condition. The cure is mutual exclusion: ensure that only one thread at a time executes the critical section. The challenge is implementing mutual exclusion efficiently on hardware that offers only atomic primitives like test-and-set. Race conditions are bugs that may never appear in testing but corrupt production data at the worst possible moment.",
    ["race condition", "critical section", "mutual exclusion", "interleaving"],
    7,
  ),
  ch(
    "locks-semaphores",
    "Locks, Semaphores & Condition Variables",
    "The three primitives every concurrent program rests on.",
    "A mutex is a flag that grants exclusive access to a critical section. A spinlock busy-waits (cheap when the hold time is short and the lock is uncontended; wasteful otherwise). A futex is a kernel-mediated lock: spin in user space first, sleep in the kernel if contention. Semaphores generalise mutexes with a count; condition variables let a thread wait for a predicate to become true. Producer/consumer, readers/writers, and bounded buffers all fall out of these primitives.",
    ["mutex", "semaphore", "condition variable", "futex"],
    9,
  ),
  ch(
    "classic-sync-problems",
    "Classic Synchronization Problems",
    "Readers–writers, dining philosophers, sleeping barber.",
    "Three problems recur in textbooks and in production. Readers–writers: many readers can hold the lock at once, but a writer needs exclusive access — and you must choose fairness. Dining philosophers: a circular deadlock puzzle that motivates lock ordering and the resource hierarchy solution. Sleeping barber: a producer/consumer with a finite waiting room that motivates condition variables. Each one isolates a different bug class; getting them right is the apprenticeship of concurrent programming.",
    ["readers-writers", "dining philosophers", "sleeping barber", "fairness"],
    7,
  ),
  ch(
    "hw-primitives",
    "Hardware Primitives & Lock-Free Programming",
    "CAS, memory barriers, and why lock-free is harder than it looks.",
    "Modern CPUs expose atomic compare-and-swap (CAS): read a location, compare to expected, write new value if equal, return whether it succeeded. CAS is the foundation of lock-free data structures — but it requires memory barriers to be correct on weak-memory-ordering CPUs (ARM, POWER). Lock-free is fast under contention but tricky to get right: the ABA problem, the need for hazard pointers or epoch-based reclamation, and the impossibility of making some composite operations atomic.",
    ["CAS", "memory barrier", "ABA", "lock-free"],
    7,
  ),
  ch(
    "deadlocks-prevention",
    "Deadlocks I — Prevention & Avoidance",
    "Coffman conditions, lock ordering, and Banker's algorithm.",
    "Deadlock requires four conditions: mutual exclusion, hold-and-wait, no preemption, and circular wait. Break any one and deadlock is impossible. The practical strategies: impose a global order on lock acquisition (breaks circular wait), acquire all locks atomically (breaks hold-and-wait), or use a lock hierarchy with timeouts. The Banker's algorithm grants a request only if a safe sequence exists — provably deadlock-free, but rarely used in practice because every process must declare its maximum upfront.",
    ["Coffman conditions", "lock order", "Banker's algorithm", "safe state"],
    8,
  ),
  ch(
    "deadlocks-detection",
    "Deadlocks II — Detection & Recovery",
    "Wait-for graphs, kill-and-restart, and living with deadlock.",
    "Some systems cannot prevent deadlock — databases are the canonical example. Instead they detect it: build a wait-for graph and look for cycles. On detection, the recovery is to abort one of the participants (victim selection) and roll back its work. Database engines pick the cheapest transaction to abort; OSes pick the lowest-priority process. Prevention is always better than detection, but detection is sometimes the only viable option when locks are held across long-running operations.",
    ["wait-for graph", "victim", "rollback", "cycle"],
    6,
  ),
];

// ---------------------------------------------------------------------------
// D · Memory Management (6 chapters)
// ---------------------------------------------------------------------------
const partD: Chapter[] = [
  ch(
    "memory-no-abstraction",
    "Memory Without Abstraction",
    "Early systems, swapping, and the cost of running multiple programs.",
    "The earliest OSes ran one program at a time and gave it all of physical memory — no abstraction at all. Multiprogramming demanded isolation, so the OS introduced swapping: move whole processes in and out of memory to disk. Without virtual memory, every program had to be linked for the exact physical layout. External fragmentation made allocation painful: a process's holes were scattered through memory, and compaction was expensive.",
    ["swapping", "multiprogramming", "external fragmentation", "compaction"],
    7,
  ),
  ch(
    "address-spaces-seg",
    "Address Spaces & Segmentation",
    "Logical memory units with base and limit registers.",
    "Segmentation divides memory into variable-sized logical units — code, data, stack, heap — each with its own base and limit. A reference is (segment, offset); the MMU adds the base and checks the offset against the limit. Segmentation catches out-of-bounds accesses per segment and supports sharing at segment granularity. Most modern CPUs retain segmentation (x86 still does), but OSes use paging for the heavy lifting and ignore segmentation for protection.",
    ["segment", "base/limit", "logical unit", "segment selector"],
    7,
  ),
  ch(
    "paging-mmu",
    "Paging & the MMU",
    "Fixed-size pages, page tables, and translation lookaside.",
    "Memory is divided into fixed-size pages (virtual) and frames (physical); a page table maps virtual to physical. Paging eliminates external fragmentation (every free frame can satisfy any page request) but introduces internal fragmentation (a 4 KiB page wastes part of its last frame if the process doesn't need all of it). Multi-level page tables keep the table size manageable, and the TLB caches recent translations so the cost of a page table walk is paid only on a miss.",
    ["page", "frame", "page table", "TLB"],
    9,
  ),
  ch(
    "virtual-memory",
    "Virtual Memory & Demand Paging",
    "Pages loaded on first touch, copy-on-write, and the page fault.",
    "Virtual memory gives each process its own address space, separate from every other process and from the kernel. The MMU translates every reference; a violation (writing to a read-only page, jumping to a non-executable page) traps as a fault. The isolation is what makes it safe to run untrusted code: a misbehaving program can crash itself but cannot read or write another process's memory. Demand paging loads pages only on first touch — copy-on-write (fork) makes process creation nearly free.",
    ["MMU", "demand paging", "copy-on-write", "page fault"],
    9,
  ),
  ch(
    "page-replacement",
    "Page Replacement Algorithms",
    "FIFO, LRU, clock, and the optimal that can't be built.",
    "When a page fault occurs and no frame is free, the OS must evict a page. FIFO evicts the oldest page (cheap, often poor). LRU evicts the least recently used (good, but expensive to implement exactly). Clock (a.k.a. second-chance) is a cheap LRU approximation that uses a reference bit. Optimal evicts the page that will be used farthest in the future — provably best, unimplementable. Practical systems use variants of clock with reference and modify bits, and Belady's anomaly shows that more frames can mean more faults.",
    ["FIFO", "LRU", "clock algorithm", "Belady's anomaly"],
    9,
  ),
  ch(
    "paging-design",
    "Paging Design & Thrashing",
    "Working sets, PFF, and what to do when memory isn't enough.",
    "A system thrashes when the working set of running processes exceeds physical memory: every page fault evicts a page the process still needs, which causes another fault, ad infinitum. The CPU spends all its time in the page-fault handler. The fix is to swap out some processes entirely; the swapped-out set's pages stop competing for frames. PFF (Page Fault Frequency) adapts the resident set to keep the fault rate below a threshold. Beyond algorithms, the OS must choose page sizes, allocate kernel memory carefully, and handle huge pages for databases.",
    ["working set", "page fault", "swapping", "PFF"],
    7,
  ),
];

// ---------------------------------------------------------------------------
// E · Storage, I/O & File Systems (5 chapters)
// ---------------------------------------------------------------------------
const partE: Chapter[] = [
  ch(
    "io-hardware",
    "I/O Hardware & Software Layers",
    "Devices, controllers, drivers, and the kernel I/O stack.",
    "Three I/O styles. Polling: the CPU spins reading the device status register — wastes CPU but simple. Interrupts: the device raises an interrupt when done — CPU does other work in between. DMA: the device reads/writes memory directly, interrupting only at the end — the CPU is free for the whole transfer. Most modern I/O is DMA + interrupts. The kernel I/O stack layers the driver (talks to the device), the generic block layer (schedules and queues requests), and the filesystem above.",
    ["polling", "interrupt", "DMA", "driver"],
    8,
  ),
  ch(
    "disks-ssds",
    "Disks, SSDs & Disk Scheduling",
    "Seek time, rotational latency, and the elevator algorithm.",
    "Rotating disks (still around in HDDs) suffer from seek time and rotational latency. FCFS serves requests in arrival order. SSTF picks the closest request (starves far ones). SCAN moves the head in one direction, serving requests on the way, then reverses — the elevator algorithm. C-SCAN wraps to the start after reaching the end, giving uniform wait time. SSDs have no seek time, so these algorithms are largely irrelevant — but wear leveling and TRIM matter instead, and the FTL emulates a block device on top of flash.",
    ["seek", "elevator", "wear leveling", "TRIM"],
    8,
  ),
  ch(
    "files-dirs",
    "Files & Directories",
    "Naming, hierarchies, paths, and the abstraction of a byte stream.",
    "A file system organises bytes into named files and directories. The directory is itself a file — a special one whose contents are name-to-inode mappings. The mount namespace binds device directories onto a single tree rooted at '/'. The VFS layer abstracts over ext4, NTFS, FAT, and network filesystems so applications see a uniform interface. File permissions, ownership, and timestamps ride alongside the data; the OS enforces access on every open.",
    ["inode", "directory", "mount", "VFS"],
    8,
  ),
  ch(
    "fs-implementation",
    "File-System Implementation",
    "Inodes, FAT, journaling, and how a directory entry becomes bytes on disk.",
    "Every file is an inode (index node) that owns its metadata and a list of direct and indirect block pointers. The directory entry is just a (name, inode-number) pair. This gives O(1) random access (the inode gives the block) and trivial file creation (no chain to walk). A power failure in the middle of a write can leave a filesystem inconsistent — so journaling filesystems write every metadata change to a log before applying it, and replay the journal on recovery. ext4 adds extents (contiguous ranges) for big files.",
    ["inode", "direct block", "journal", "extent"],
    9,
  ),
  ch(
    "real-fs",
    "Real File Systems",
    "ext4, NTFS, APFS, ZFS, and what production actually looks like.",
    "Real filesystems make different trade-offs. ext4 is the workhorse of Linux — journaling, extents, online defragmentation. NTFS adds per-file ACLs, alternate data streams, and change journals. APFS (Apple) is copy-on-write with snapshots and clones. ZFS (Solaris, illumos, FreeNAS) adds end-to-end checksums, snapshots, and software RAID. Each adds features; each adds complexity. The lesson: a filesystem is a database, and durability is not free.",
    ["ext4", "NTFS", "APFS", "ZFS"],
    7,
  ),
];

// ---------------------------------------------------------------------------
// F · Modern & Distributed Systems (3 chapters)
// ---------------------------------------------------------------------------
const partF: Chapter[] = [
  ch(
    "virt-hypervisors",
    "Virtualization & Hypervisors",
    "Running many OSes on one machine, and the trap of privileged instructions.",
    "A hypervisor runs multiple guest OSes on one host. Type 1 (Xen, ESXi) runs directly on the hardware; Type 2 (VirtualBox, the original VMware) runs on a host OS. Hardware-assisted virtualization (Intel VT-x, AMD-V) adds a new CPU mode that lets the guest run privileged instructions directly while the hypervisor retains control. Without VT-x, the VMM had to binary-translate guest code — slow. Paravirtualization gives the guest a modified kernel that cooperates with the hypervisor for IO and memory.",
    ["hypervisor", "VT-x", "guest", "paravirtualization"],
    8,
  ),
  ch(
    "containers",
    "Containers, Namespaces & cgroups",
    "Process-level isolation without a second kernel.",
    "A container is a process (or set of processes) with its own view of the system: its own filesystem, PID space, network namespace, and resource limits. The kernel feature is namespaces (what the process sees) plus cgroups (what the process can use). The user-space toolkit (Docker, containerd) packages the filesystem image, sets up the namespaces, and starts the process. Containers share the host kernel — they are not VMs — so they start in milliseconds and pack much more densely than VMs.",
    ["namespace", "cgroup", "overlay FS", "OCI image"],
    8,
  ),
  ch(
    "multiprocessors",
    "Multiprocessors, Multicomputers & Distributed Systems",
    "Shared memory, message passing, and what changes when machines are far apart.",
    "A multiprocessor has many CPUs sharing memory; cache coherence (MESI, MOESI) keeps their caches consistent. A multicomputer has many nodes, each with its own memory, connected by a network. Distributed systems take that further: nodes fail, networks partition, clocks drift. Consensus (Raft, Paxos) lets a cluster agree on a value even when some nodes fail. Replication keeps data on multiple nodes; quorum reads and writes avoid split-brain. The CAP theorem bounds what's possible: pick two of consistency, availability, and partition tolerance.",
    ["coherence", "consensus", "replication", "CAP"],
    8,
  ),
];

// ---------------------------------------------------------------------------
// G · Case Studies & Capstone (4 chapters)
// ---------------------------------------------------------------------------
const partG: Chapter[] = [
  ch(
    "case-linux-android",
    "Case Study: Linux & Android",
    "Two siblings: a server kernel and a phone kernel, side by side.",
    "Linux started as a Unix-clone for the 386 and grew into the most widely deployed kernel. Its modular monolithic design (loadable kernel modules), the VFS layer, and the CFS scheduler are exemplary. Android is Linux plus a userspace: Bionic libc, the ART runtime, Binder IPC, and a permission model that mediates every app's access to sensors, network, and storage. Studying both is the best way to see how a kernel is shaped by its workloads — servers vs phones.",
    ["Linux", "Android", "VFS", "Binder"],
    9,
  ),
  ch(
    "case-windows",
    "Case Study: Windows",
    "NT, the registry, and the Win32 API.",
    "Windows NT (the kernel behind every modern Windows) is a hybrid kernel: a microkernel-inspired core with most services in kernel space for performance. The registry is a hierarchical configuration database. The Win32 API defines what a Windows program looks like — handles, messages, DLLs. Studying Windows is a tour of design decisions made for backward compatibility and a single vendor's market: NTFS, the SID-based security model, and the user-mode graphics stack.",
    ["NT", "registry", "Win32", "NTFS"],
    7,
  ),
  ch(
    "os-engineers",
    "OS for Engineers: Performance & Debugging",
    "perf, ftrace, eBPF, and the tools that make an OS observable.",
    "An OS is only as good as your ability to see into it. Linux has perf for sampling, ftrace for tracing kernel functions, eBPF for safe in-kernel programs, and /proc and /sys for ad-hoc inspection. Windows has ETW, xperf, and the Windows Performance Analyzer. macOS has Instruments and DTrace. Every modern kernel exposes the same idea: events are first-class, samples are cheap, and the bottleneck is always interpretation — not collection.",
    ["perf", "eBPF", "ftrace", "ETW"],
    8,
  ),
  ch(
    "capstone-os-for-dbs",
    "Capstone: Operating Systems for Databases",
    "Why a database engineer must know the kernel.",
    "A database is mostly an OS-aware program. Page cache, fsync, and the page-replacement algorithm decide whether your writes are durable. The TLB and huge pages decide whether your scans are fast. NUMA decides which cores touch which memory. Async I/O (io_uring on Linux) decides whether you can saturate the disk. The capstone chapter walks through the OS features that matter most for database performance, with the experiments you can run to measure each one.",
    ["page cache", "huge pages", "io_uring", "NUMA"],
    9,
  ),
];

// ---------------------------------------------------------------------------
// The seven parts
// ---------------------------------------------------------------------------
export interface OsPart {
  id: string;
  title: string;
  blurb: string;
  chapters: Chapter[];
}

export const osParts: OsPart[] = [
  {
    id: "A",
    title: "Foundations",
    blurb:
      "What an OS is, where it came from, and how a computer boots into one.",
    chapters: partA,
  },
  {
    id: "B",
    title: "Processes, Threads & Scheduling",
    blurb:
      "The kernel's main job: turn many programs into a smooth stream of work.",
    chapters: partB,
  },
  {
    id: "C",
    title: "Concurrency & Synchronization",
    blurb:
      "When two threads touch the same byte — and how to keep them from tearing it.",
    chapters: partC,
  },
  {
    id: "D",
    title: "Memory Management",
    blurb:
      "From swapping to paging to virtual memory — the illusion every process gets for free.",
    chapters: partD,
  },
  {
    id: "E",
    title: "Storage, I/O & File Systems",
    blurb:
      "Bytes on disk: devices, drivers, schedulers, inodes, and journals.",
    chapters: partE,
  },
  {
    id: "F",
    title: "Modern & Distributed Systems",
    blurb:
      "Hypervisors, containers, and what changes when CPUs and machines multiply.",
    chapters: partF,
  },
  {
    id: "G",
    title: "Case Studies & Capstone",
    blurb:
      "Linux, Android, Windows — and how an OS engineer actually debugs one.",
    chapters: partG,
  },
];

// Backwards-compatible flat export.
export const osChapters: Chapter[] = osParts.flatMap((p) => p.chapters);
