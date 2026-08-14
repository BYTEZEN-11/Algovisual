import type { Chapter, SubTopic } from "@/types/content";

// =============================================================================
// Networking track — 55 chapters + 19 sub-topics, organised in 4 parts
// (Foundations, Link & Internet, Protocols, Going Further).
// =============================================================================

const ch = (
  slug: string,
  title: string,
  summary: string,
  body: string,
  keyTerms: string[],
  sections: number,
  subTopics?: SubTopic[],
): Chapter => ({
  slug,
  title,
  track: "networking",
  status: "live",
  summary,
  body,
  keyTerms,
  sections,
  ...(subTopics ? { subTopics } : {}),
});

const st = (
  slug: string,
  title: string,
  summary: string,
  body: string,
  keyTerms: string[] = [],
  duration: string = "5 min",
): SubTopic => ({ slug, title, summary, body, keyTerms, duration });

// =============================================================================
// PART A — Foundations (11 chapters)
// =============================================================================

const partAFundamentals: Chapter[] = [
  ch(
    "networking-fundamentals",
    "Networking Fundamentals & the OSI Model",
    "Why layered networks exist, and the seven-layer model that organises them.",
    "Networking is the practice of moving bytes between processes, sometimes on the same machine, sometimes across the planet. The OSI (Open Systems Interconnection) model breaks the work into seven layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. Each layer has a single job and a strict contract with the layers above and below it. The Internet uses a simpler four-layer model (Link, Internet, Transport, Application) but the OSI mental model is the universal shorthand for talking about where a protocol lives.",
    ["OSI", "layer", "abstraction", "encapsulation"],
    8,
    [
      st(
        "why-layers",
        "Why layered networks?",
        "The case for separation of concerns in protocol design.",
        "Each layer solves one problem and exposes a clean interface to the layer above. The Application layer asks for a byte stream; the Transport layer provides it; the Internet layer routes packets; the Link layer ships frames across a wire. When the layers are independent, you can swap Ethernet for Wi-Fi without touching TCP, and you can swap IPv4 for IPv6 with the help of a shim. The layers are not just a teaching aid — they are the contract that lets a thousand vendors interoperate.",
        ["interface", "independence", "swap"],
        "6 min",
      ),
      st(
        "osi-seven-layers",
        "The seven OSI layers",
        "From Physical to Application, one job per layer.",
        "Physical (bits on a wire), Data Link (frames between adjacent nodes), Network (packets across networks), Transport (in-order byte streams), Session (dialog management), Presentation (encoding, encryption), Application (HTTP, DNS, SMTP). The TCP/IP model collapses Session and Presentation into Application because in practice nobody implements them separately. OSI is the language; TCP/IP is what actually runs.",
        ["physical", "data link", "network", "transport"],
        "7 min",
      ),
      st(
        "tcp-ip-model",
        "The TCP/IP four-layer model",
        "What actually runs on the Internet.",
        "Link, Internet, Transport, Application. The Link layer covers whatever delivers frames to the next hop — Ethernet, Wi-Fi, fibre. The Internet layer is IPv4 or IPv6 plus routing. The Transport layer is TCP or UDP. The Application layer is HTTP, DNS, TLS, SSH, and everything else. The four-layer model is what vendors implement; the OSI seven-layer model is what they argue about in interviews.",
        ["link", "internet", "transport", "application"],
        "5 min",
      ),
      st(
        "encapsulation-decapsulation",
        "Encapsulation & decapsulation",
        "Bytes wrap bytes wrap bytes.",
        "Every layer adds its own header to the payload from the layer above. HTTP adds a TCP header, TCP adds an IP header, IP adds an Ethernet header, and the bits go on the wire. On the receiving side, each layer strips its own header and hands the payload up. The packet you see at any point is a stack of nested envelopes; only the layer you're working at is meaningful.",
        ["header", "payload", "PDU", "stack"],
        "5 min",
      ),
    ],
  ),
  ch(
    "types-of-networks",
    "Types of Networks",
    "PAN, LAN, MAN, WAN, and the networks in between.",
    "Networks are classified by geographic reach. A PAN (Personal Area Network) covers a few metres — Bluetooth, USB. A LAN (Local Area Network) covers a building or campus — Ethernet, Wi-Fi. A MAN (Metropolitan Area Network) covers a city — cable TV, metro Ethernet. A WAN (Wide Area Network) covers a country or the planet — the Internet itself, plus corporate WANs built on MPLS. The same protocols work at every scale; the technology that wires them up changes.",
    ["PAN", "LAN", "MAN", "WAN"],
    5,
    [
      st(
        "lan-ethernet-wifi",
        "LAN — Ethernet and Wi-Fi",
        "The network under your desk.",
        "A LAN is the network you own: the switches in your office, the Wi-Fi access points, the cables in the walls. Ethernet at 1 Gbps / 10 Gbps is the wired default; Wi-Fi (802.11) covers the wireless side. LANs are typically full-duplex and switched, so every host has a dedicated path to every other host and collisions are a thing of the past.",
        ["Ethernet", "802.11", "switched"],
        "5 min",
      ),
      st(
        "wan-the-internet",
        "WAN — the Internet",
        "Where routers do the heavy lifting.",
        "A WAN connects LANs across distance. The Internet is the canonical WAN — a confederation of autonomous networks that agree to exchange packets via BGP. Corporate WANs use MPLS, SD-WAN, or just encrypted tunnels over the public Internet. WANs are characterised by higher latency, lower bandwidth, and a much larger attack surface than LANs.",
        ["BGP", "MPLS", "autonomous system"],
        "5 min",
      ),
    ],
  ),
  ch(
    "network-topologies",
    "Network Topologies",
    "Bus, star, ring, mesh, and how they shape what your network can do.",
    "Topology is the shape of the network — physical (where the wires actually go) and logical (how the packets flow). A bus topology has everyone on a single cable. A star topology has everyone wired to a central switch. A ring topology has each node connected to two neighbours, with traffic flowing one direction (or both). A mesh topology has every node connected to every other, fully or partially. The choice of topology drives cost, fault tolerance, and performance.",
    ["bus", "star", "ring", "mesh"],
    5,
  ),
  ch(
    "transmission-media",
    "Transmission Media",
    "Copper, fibre, and air — and why each has its place.",
    "Bits travel on guided media (copper twisted pair, coaxial cable, fibre optic) or unguided media (radio, microwave, infrared). Twisted pair (Cat 5e, Cat 6) carries Ethernet up to 100 m. Coaxial cable carries cable Internet and older Ethernet. Fibre optic carries light over glass for tens of kilometres at terabit speeds. Radio (Wi-Fi, cellular, satellite) trades bandwidth for the freedom of no wires. The medium dictates bandwidth, latency, range, and cost.",
    ["twisted pair", "fibre", "wireless", "bandwidth"],
    6,
  ),
  ch(
    "network-devices",
    "Network Devices",
    "Repeaters, hubs, bridges, switches, routers, gateways.",
    "Devices are classified by the layer they operate at. Repeaters and hubs operate at Layer 1 — they just regenerate bits. Bridges and switches operate at Layer 2 — they forward frames based on MAC addresses. Routers operate at Layer 3 — they forward packets based on IP addresses. Gateways operate at Layer 7 — they translate between protocols (e.g. email gateway, API gateway). The progression is also a progression in intelligence: more decisions per packet, more state per device.",
    ["repeater", "bridge", "switch", "router", "gateway"],
    6,
  ),
  ch(
    "switching-techniques",
    "Switching Techniques",
    "Circuit, packet, and message switching — and the trade-offs each makes.",
    "Circuit switching reserves a dedicated path for the duration of a call (the original telephone network). Packet switching breaks the message into independent packets, each routed separately (the Internet). Message switching stores the whole message at each hop before forwarding (rare today). The trade-off: circuit switching gives steady latency but wastes bandwidth during silence; packet switching uses bandwidth efficiently but has variable latency. The Internet picked packet switching because it is more resilient and efficient for bursty traffic.",
    ["circuit", "packet", "message", "latency"],
    5,
  ),
  ch(
    "encoding-modulation",
    "Data Encoding & Modulation",
    "How bits become signals on a wire or radio wave.",
    "Encoding turns bits into voltage levels, light pulses, or radio waves. NRZ (non-return-to-zero) is the simplest: 1 is high, 0 is low. Manchester encoding combines clock and data in one signal by XORing the bit with the clock — useful for Ethernet. Modulation maps bits onto a carrier wave by varying amplitude (ASK), frequency (FSK), or phase (PSK). Modern schemes (QAM, OFDM) combine many bits per symbol and pack them tightly into the available spectrum.",
    ["NRZ", "Manchester", "modulation", "QAM"],
    6,
  ),
  ch(
    "transmission-modes",
    "Transmission Modes",
    "Simplex, half-duplex, full-duplex — and which one your network uses.",
    "Simplex: one direction only (a broadcast radio). Half-duplex: both directions but not at the same time (a walkie-talkie, old Ethernet). Full-duplex: both directions simultaneously (modern Ethernet, phone calls). Full-duplex needs separate channels (or echo cancellation) and roughly doubles the throughput. Most modern links are full-duplex; the cases where you still see half-duplex are mostly legacy or shared-media wireless.",
    ["simplex", "half-duplex", "full-duplex"],
    4,
  ),
  ch(
    "line-discipline",
    "Line Discipline",
    "Who gets to talk when on a shared medium.",
    "When two devices share a wire, only one can transmit at a time or the signals collide. Line discipline is the protocol that decides who goes next. The simplest: ENQ/ACK (the sender asks, the receiver acknowledges). Polling: a central controller asks each device in turn. Token passing: a special token circulates; only the holder can transmit. Modern switches sidestep most of this by giving every device its own dedicated link, so line discipline is implicit in the hardware.",
    ["ENQ/ACK", "polling", "token passing"],
    4,
  ),
  ch(
    "data-link-layer",
    "Data Link Layer & Flow Control",
    "Framing, error handling, and keeping a fast sender from drowning a slow receiver.",
    "The Data Link layer takes a raw bit stream from the Physical layer and turns it into frames, detects errors, and manages flow. Framing marks the start and end of each frame (length field, flag byte, or physical-layer encoding). Error detection uses CRC or checksums to catch bit errors. Flow control stops a fast sender from overwhelming a slow receiver — Stop-and-Wait, Sliding Window, and credit-based schemes are the three families of solutions.",
    ["framing", "CRC", "flow control", "sliding window"],
    7,
    [
      st(
        "framing",
        "Framing",
        "How bits become frames.",
        "The receiver needs to know where each frame starts and ends. Options: a length field at the start of every frame (used in Ethernet), a flag byte that doesn't appear in the payload (used in HDLC, PPP), or physical-layer tricks like Manchester encoding that keep the line busy between frames. Each method has edge cases: length fields can be wrong, flag bytes need byte-stuffing, and physical-layer breaks only work on synchronous links.",
        ["flag", "byte stuffing", "length prefix"],
        "5 min",
      ),
      st(
        "flow-control",
        "Flow control",
        "Stop-and-wait, sliding window, and credit-based.",
        "Stop-and-Wait: sender sends one frame, waits for ACK, sends the next. Simple, but uses the link at one-frame-at-a-time throughput. Sliding Window: sender can have N frames in flight before ACKs; the window slides as ACKs come in. Credit-based: receiver gives the sender a number of credits; sender decrements per frame. Sliding window is the most common — TCP, HDLC, and many link-layer protocols use it.",
        ["window", "ACK", "credit"],
        "6 min",
      ),
    ],
  ),
  ch(
    "error-detection-correction",
    "Error Detection & Correction",
    "Parity, CRC, and the rare case of forward error correction.",
    "Errors happen. A single-bit parity check catches 1-bit errors in a frame. A CRC (cyclic redundancy check) catches all single-bit errors and most burst errors up to a length related to the polynomial. Checksums are lighter but weaker. Most networks detect errors and retransmit; the cost is round-trip latency. Forward error correction (FEC) adds enough redundancy that the receiver can fix errors without retransmission — satellite and storage use it because retransmission is too expensive, but it adds bandwidth overhead.",
    ["parity", "CRC", "FEC", "retransmission"],
    6,
  ),
];

// =============================================================================
// PART B — Media Access & Data Link (5 chapters)
// =============================================================================

const partBLinkLayer: Chapter[] = [
  ch(
    "sliding-window-protocol",
    "Sliding Window Protocol",
    "The link-layer prototype that TCP later copied.",
    "Sliding Window lets the sender have multiple frames in flight, with the receiver acknowledging the highest contiguous frame received. Go-Back-N: sender retransmits everything from the lost frame onward. Selective Repeat: sender retransmits only the lost frame. Different trade-offs in buffer space and complexity. The protocol became the basis for TCP's byte-stream sliding window — the same idea, applied to a longer stream of bytes instead of discrete frames.",
    ["Go-Back-N", "Selective Repeat", "window"],
    7,
  ),
  ch(
    "multiple-access-protocols",
    "Multiple Access Protocols",
    "Sharing a wire when there is no central controller.",
    "When many stations share a single medium, the protocol must decide who transmits and when. ALOHA (Hawaii, 1970s): just transmit; if a collision happens, retransmit after a random delay. The maximum throughput is about 18%. Slotted ALOHA doubles that to 36%. CSMA (Carrier Sense Multiple Access): listen first, transmit if the line is idle. CSMA/CD (Collision Detection): also listen while transmitting; back off and retry on collision — the original Ethernet. CSMA/CA (Collision Avoidance): Wi-Fi, because collisions are hard to detect on radio. Token passing guarantees a bound but is more complex.",
    ["ALOHA", "CSMA/CD", "CSMA/CA", "token"],
    7,
    [
      st(
        "aloha",
        "ALOHA & slotted ALOHA",
        "The origin story of random-access protocols.",
        "Norman Abramson's ALOHAnet at the University of Hawaii (1970) was the first wireless packet network. Stations transmit whenever they have data; if no ACK arrives, retransmit after a random delay. Pure ALOHA caps at 18% channel efficiency (well, 1/(2e)). Slotted ALOHA divides time into slots and forces transmissions to start at slot boundaries, doubling the limit to 1/e ≈ 36%. Slotted ALOHA is the conceptual ancestor of Ethernet and Wi-Fi.",
        ["Abramson", "retransmission", "efficiency"],
        "5 min",
      ),
      st(
        "csma-cd",
        "CSMA/CD — Ethernet",
        "Listen, talk, listen again.",
        "Carrier Sense: don't transmit if the wire is busy. Collision Detection: while transmitting, listen for someone else's signal — if you detect a collision, stop immediately and send a jam signal so everyone else knows. After a collision, wait a random backoff time (exponential backoff: 1 slot, 2 slots, 4 slots, ...) and retry. The CSMA/CD algorithm is the reason Ethernet cables used to have a minimum length (to ensure collisions could be detected). Modern full-duplex switched Ethernet doesn't need it.",
        ["carrier sense", "backoff", "jam signal"],
        "6 min",
      ),
      st(
        "csma-ca",
        "CSMA/CA — Wi-Fi",
        "Avoid collisions instead of detecting them.",
        "Radio is half-duplex and hard to listen on while transmitting, so Wi-Fi can't do collision detection the way Ethernet can. Instead, it does collision avoidance: wait a random backoff, then transmit. To avoid the hidden-node problem (where two clients can both reach the AP but not each other), 802.11 uses RTS/CTS — the sender asks for the channel, the AP grants it, and the sender transmits. The overhead is large for small frames, so RTS/CTS is often disabled in practice.",
        ["RTS/CTS", "hidden node", "backoff"],
        "6 min",
      ),
    ],
  ),
  ch(
    "ethernet",
    "Ethernet",
    "The dominant wired LAN, and why it kept winning.",
    "Ethernet started at 10 Mbps on coax in the 1970s, moved to twisted pair and 100 Mbps (Fast Ethernet), then 1 Gbps, 10 Gbps, 40 Gbps, 100 Gbps, and beyond. The frame format is unchanged (almost — 802.1Q added VLAN tags). Switched full-duplex Ethernet made collisions extinct. Ethernet is the boring, reliable, ubiquitous layer 2 of the modern Internet — and most of the reason your laptop works the moment you plug it in.",
    ["802.3", "MAC", "frame format", "full-duplex"],
    6,
  ),
  ch(
    "ieee-802-11",
    "IEEE 802.11 — Wi-Fi",
    "Wireless Ethernet, with all the radio thrown in.",
    "Wi-Fi is the 802.11 family of standards. Each generation (a/b/g/n/ac/ax/be) brings higher throughput, more spectrum, and smarter antenna techniques (MIMO, MU-MIMO, beamforming). The MAC layer is CSMA/CA with binary exponential backoff. Security has gone through WEP (broken), WPA (broken in practice), WPA2 (current, with KRACK), and WPA3 (latest). Wi-Fi is half-duplex in practice, shared across all clients on a channel, and degrades quickly with distance and interference.",
    ["802.11", "MIMO", "WPA2", "CSMA/CA"],
    7,
    [
      st(
        "wifi-physical",
        "Wi-Fi physical layer",
        "Channels, frequencies, MIMO.",
        "Wi-Fi operates in 2.4 GHz, 5 GHz, and (with 802.11ax) 6 GHz bands. Channels are 20/40/80/160 MHz wide; wider channels mean more throughput but more interference. MIMO uses multiple antennas to send multiple spatial streams simultaneously. OFDM (Orthogonal Frequency Division Multiplexing) packs many subcarriers into each channel, allocating some to pilots and others to data. The physics is messy; the practical lesson is that real-world Wi-Fi is much slower than the spec.",
        ["OFDM", "MIMO", "channels"],
        "6 min",
      ),
      st(
        "wifi-security",
        "Wi-Fi security — WPA2 and WPA3",
        "WEP, WPA, WPA2, WPA3 — and why each matters.",
        "WEP (Wired Equivalent Privacy) was broken in 2001 — its 40-bit key was recoverable in minutes. WPA was a stopgap using TKIP. WPA2 (2004) introduced AES-CCMP and is the standard today, with the notable 2017 KRACK vulnerability against the 4-way handshake. WPA3 (2018) replaces the shared PSK with SAE (Simultaneous Authentication of Equals), preventing offline dictionary attacks, and adds forward secrecy. Most networks still run WPA2 because of legacy devices.",
        ["WPA2", "WPA3", "SAE", "KRACK"],
        "7 min",
      ),
    ],
  ),
  ch(
    "ipv4-addressing",
    "IP Addressing — IPv4",
    "32 bits, dotted-decimal, and the network/host split.",
    "An IPv4 address is 32 bits, written as four decimal octets (192.168.1.1). The address has a network prefix (the upper bits) and a host suffix (the lower bits). Classful addressing (A/B/C classes) gave way to CIDR (Classless Inter-Domain Routing) in the 1990s, which lets the boundary be anywhere — a /24 means 24 network bits, leaving 8 host bits = 256 addresses. Special addresses: 0.0.0.0 (this host), 127.0.0.1 (loopback), 255.255.255.255 (broadcast), 169.254.0.0/16 (link-local).",
    ["IPv4", "CIDR", "subnet", "broadcast"],
    7,
  ),
];

// =============================================================================
// PART C — Protocols (16 chapters)
// =============================================================================

const partCProtocols: Chapter[] = [
  ch(
    "ip-structure",
    "IP Structure & Header",
    "Datagrams, fields, TTL.",
    "An IPv4 datagram is a header followed by a payload. The header carries version, header length, total length, identification, flags, fragment offset, TTL, protocol, header checksum, source address, and destination address — plus options. TTL protects the Internet from routing loops: every router decrements it and drops the packet when it reaches zero. Understanding the fields is what lets you read a packet capture with confidence.",
    ["IPv4 header", "TTL", "fragmentation", "protocol"],
    8,
    [
      st(
        "ipv4-header-fields",
        "IPv4 header fields walkthrough",
        "Every byte of the 20-byte header.",
        "Version (4 bits), IHL (4 bits — header length in 32-bit words), Total Length (16 bits), Identification (16 bits), Flags (3 bits), Fragment Offset (13 bits), TTL (8 bits), Protocol (8 bits), Header Checksum (16 bits), Source Address (32 bits), Destination Address (32 bits), Options (variable). Knowing these fields by heart is unnecessary, but being able to recognise them in a hex dump is.",
        ["IHL", "flags", "protocol number"],
        "6 min",
      ),
      st(
        "ttl-and-fragmentation",
        "TTL & fragmentation",
        "Keeping the Internet loop-free and the packets whole.",
        "TTL is decremented at every router; a packet with TTL=0 is dropped with an ICMP Time Exceeded. This stops packets from looping forever if a routing table has a cycle. Fragmentation happens when a packet is bigger than the link's MTU. Routers can fragment, but mostly they don't (the Don't Fragment bit is usually set), and the sender does path MTU discovery instead. IPv6 removed fragmentation from routers entirely.",
        ["TTL", "MTU", "DF bit"],
        "6 min",
      ),
    ],
  ),
  ch(
    "subnet-masks-cidr",
    "Subnet Masks & CIDR",
    "Prefixes, masks, host counts.",
    "A subnet mask separates the network portion of an address from the host portion. CIDR notation (/24, /20) is just a shortcut for the same idea: the slash is the number of network bits. A /24 gives 256 addresses, a /20 gives 4096, a /30 gives 4 (used for point-to-point links). Knowing how to translate between dotted-decimal masks and prefix lengths is the first arithmetic trick every network engineer learns.",
    ["subnet mask", "CIDR", "prefix length", "host count"],
    7,
  ),
  ch(
    "default-gateway-routing",
    "Default Gateway & Routing Basics",
    "Where the packet goes next.",
    "A host's routing table is tiny: usually just 'the local subnet is on this interface' and 'everything else goes to the default gateway'. The gateway is the router that knows how to reach the rest of the Internet. Each router along the path makes the same decision independently: longest-prefix match against its own table, forward out the chosen interface. The path a packet takes is the chain of those local decisions.",
    ["routing table", "default gateway", "longest-prefix match", "hop"],
    8,
  ),
  ch(
    "subnetting-examples",
    "Subnetting Worked Examples",
    "Split a /24, design a VPC.",
    "The theory is easy; the practice is doing it under interview pressure. This chapter walks several end-to-end subnetting exercises: split a /24 into four equal pieces, carve a /20 into a VPC plan with subnets of known sizes, calculate the network, broadcast, and usable ranges. The trick is to write down the bit boundaries before doing any arithmetic and to check your work against the address count.",
    ["subnet boundary", "VPC plan", "broadcast address", "usable range"],
    8,
  ),
  ch(
    "mac-addresses",
    "MAC Addresses",
    "48 bits, OUI, local vs universal.",
    "A MAC address is a 48-bit identifier burned into a NIC at manufacture. The first 24 bits are the OUI (organisationally unique identifier) — the manufacturer — and the last 24 bits are the NIC number. Universally administered addresses are globally unique; locally administered addresses (the second-least-significant bit of the first byte is 1) override that and are used for virtual machines and some mobile devices.",
    ["OUI", "U/L bit", "NIC", "locally administered"],
    7,
  ),
  ch(
    "mac-vs-ip",
    "MAC vs IP",
    "Two addresses, two questions.",
    "MAC identifies the next hop on the current link; IP identifies the end-to-end source and destination across the whole Internet. A packet keeps the same IP addresses from source to destination but gets new MAC addresses at every router hop. This separation is what lets IP work over any link technology — Ethernet, Wi-Fi, fibre — without the IP layer caring which one is in use.",
    ["link-local", "end-to-end", "next hop", "layer separation"],
    6,
  ),
  ch(
    "arp",
    "ARP & Address Resolution",
    "IP → MAC on a LAN.",
    "To send an IP packet on a LAN you need the destination's MAC address. ARP broadcasts 'who has 192.168.1.5? tell 192.168.1.1' and the owner replies with its MAC. Switches flood the broadcast; every host on the segment hears it. The result is cached in an ARP table for minutes. ARP has no authentication, which is why ARP spoofing is a thing and why some networks run ARP inspection on switches.",
    ["broadcast", "ARP table", "MAC resolution", "spoofing"],
    8,
  ),
  ch(
    "packets-frames",
    "Packets, Frames & Encapsulation",
    "Bytes wrap bytes wrap bytes.",
    "Each layer wraps the payload of the layer above with its own header (and sometimes trailer). HTTP bytes get a TCP header → an IP header → a frame header → bits on the wire. At each hop, the relevant header is read and rewritten; the payload above is opaque. This is why a router doesn't need to understand HTTP to forward packets and why a web server doesn't need to know about Ethernet to respond.",
    ["header", "trailer", "PDU", "opaque payload"],
    6,
  ),
  ch(
    "icmp",
    "ICMP",
    "Ping, traceroute, error signalling.",
    "ICMP carries control messages between hosts and routers: destination unreachable, time exceeded, redirect, echo request/reply. Ping uses echo; traceroute abuses time-exceeded by sending packets with incrementing TTL. ICMP is also used for path MTU discovery. It is not a transport protocol — it has no port numbers and is normally not carried by applications.",
    ["echo", "time exceeded", "path MTU", "control message"],
    7,
    [
      st(
        "ping-traceroute",
        "Ping & traceroute",
        "The two tools that answer 90% of network questions.",
        "Ping sends an ICMP Echo Request with a sequence number; the receiver replies with Echo Reply. Round-trip time is the difference. Traceroute sends packets with TTL=1, then TTL=2, and so on; each intermediate router decrements TTL to zero and sends back ICMP Time Exceeded. The list of Time Exceeded sources is the path. Traceroute has a flaw: modern routers deprioritise ICMP, so some hops show as `* * *`.",
        ["echo", "TTL", "round-trip"],
        "5 min",
      ),
      st(
        "path-mtu-discovery",
        "Path MTU discovery",
        "Finding the largest packet that fits end-to-end.",
        "Sender sets the Don't Fragment bit and sends a packet the size of the local MTU. If a router can't forward it, it sends back ICMP Fragmentation Needed with the next-hop MTU. Sender reduces its packet size and tries again. The smallest MTU on the path is the path MTU, and the sender caches it. Modern IPv6 removed fragmentation from routers entirely, making path MTU discovery mandatory.",
        ["DF bit", "MTU", "Fragmentation Needed"],
        "5 min",
      ),
    ],
  ),
  ch(
    "udp-datagram",
    "UDP Datagram",
    "Connectionless, fast, lossy.",
    "User Datagram Protocol is a thin wrapper over IP: source port, destination port, length, checksum, payload. No connection, no retransmission, no ordering — send a datagram, hope it arrives. UDP wins for low-latency, loss-tolerant traffic: DNS, video, voice, gaming. QUIC (HTTP/3) builds reliability on top of UDP rather than on top of TCP, because the kernel is faster at UDP than at TCP.",
    ["datagram", "checksum", "connectionless", "low latency"],
    8,
  ),
  ch(
    "tcp-intro",
    "TCP Intro",
    "Reliable byte stream over IP.",
    "TCP gives applications the illusion of an in-order, lossless byte stream on top of best-effort IP. It does this with sequence numbers, acknowledgements, retransmission, flow control, and congestion control — all in the kernel. The cost is overhead: the handshake, the state, the buffers. The benefit is that every application that needs reliability gets it for free.",
    ["byte stream", "sequence number", "retransmission", "ACK"],
    8,
  ),
  ch(
    "tcp-handshake",
    "TCP 3-Way Handshake",
    "SYN, SYN-ACK, ACK.",
    "A TCP connection opens with three packets: the client sends SYN with an initial sequence number; the server replies SYN-ACK with its own ISN; the client sends ACK. The ISNs are randomised to prevent off-path attackers from guessing them. The handshake negotiates MSS, window scale, and SACK. After the third ACK both sides can send data.",
    ["SYN", "ISN", "negotiation", "MSS"],
    7,
  ),
  ch(
    "tcp-seq-ack",
    "TCP Sequencing & ACKs",
    "Sliding window, SACK, dup-ACKs.",
    "Every byte sent has a sequence number; every ACK tells the sender 'I have received everything up to N-1, next byte I want is N'. The sliding window lets the sender have many bytes in flight at once. Selective ACK lets the receiver tell the sender exactly which segments arrived, so only the missing ones are retransmitted. Duplicate ACKs are a fast signal of packet loss.",
    ["sequence number", "ACK", "SACK", "duplicate ACK"],
    8,
  ),
  ch(
    "tcp-mtu-mss",
    "TCP MTU & MSS",
    "Avoiding fragmentation.",
    "MTU is the largest packet that can traverse a link without fragmentation. MSS is the largest TCP segment, computed as MTU minus IP and TCP headers. Path MTU discovery sends large packets with the 'don't fragment' bit set; if a router can't forward them it returns an ICMP 'too big' message and the sender shrinks its MSS. Modern networks usually settle on 1500-byte Ethernet MTU and 1460-byte MSS.",
    ["MTU", "MSS", "don't fragment", "path MTU discovery"],
    6,
  ),
  ch(
    "tcp-flow-control",
    "TCP Flow Control",
    "Receiver-driven backpressure.",
    "TCP's receive window tells the sender how many bytes the receiver can buffer. As the application reads data, the window opens; as the application falls behind, the window closes, throttling the sender. This is end-to-end backpressure independent of the network — distinct from congestion control, which reacts to router congestion.",
    ["receive window", "rwnd", "zero window", "application buffer"],
    7,
  ),
  ch(
    "tcp-congestion",
    "TCP Congestion Control",
    "Slow start, AIMD, fast retransmit.",
    "TCP probes for available bandwidth: open the congestion window rapidly (slow start), back off on loss (multiplicative decrease), and probe again (additive increase). Modern congestion control — CUBIC, BBR — departs from this classical model for better performance on high-bandwidth, high-latency links. The 'sawtooth' of window over time is the visual signature of TCP.",
    ["cwnd", "slow start", "AIMD", "fast retransmit"],
    8,
  ),
];

// =============================================================================
// PART D — Going Further (23 chapters)
// =============================================================================

const partDGoingFurther: Chapter[] = [
  ch(
    "dns-records",
    "DNS Records",
    "A, AAAA, CNAME, MX, NS, TXT.",
    "Each record type carries different data: A maps a name to an IPv4 address; AAAA maps to IPv6; CNAME aliases one name to another; MX says where to deliver mail for the domain; NS delegates the zone; TXT carries arbitrary text (SPF, DKIM, domain verification). TTL controls how long resolvers cache the record. A name can have many A records — that's how DNS-based load balancing works.",
    ["A record", "AAAA", "CNAME", "TTL"],
    8,
  ),
  ch(
    "dns-resolution",
    "DNS Resolution",
    "Recursive vs iterative queries.",
    "A recursive resolver does the walking for you: it asks a root, gets referred to a TLD, gets referred to an authoritative, and returns the final answer. Iterative resolvers return referrals themselves; the caller has to walk the chain. Most clients use recursive resolvers (ISP, 8.8.8.8, 1.1.1.1). Walking the chain takes multiple round trips — that's why DNS-over-HTTPS and QNAME minimisation matter.",
    ["recursive", "iterative", "referral", "QNAME minimisation"],
    7,
  ),
  ch(
    "http-basics",
    "HTTP Basics",
    "Request/response, methods, headers.",
    "HTTP is a request/response protocol over TCP. Methods (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS) declare intent; headers carry metadata; the body carries the payload. Status codes split into five classes: 1xx informational, 2xx success, 3xx redirection, 4xx client error, 5xx server error. HTTP is stateless — every request stands alone — which is why cookies and tokens exist.",
    ["method", "status code", "header", "stateless"],
    8,
  ),
  ch(
    "http-versions",
    "HTTP Versions",
    "HTTP/1.1, HTTP/2, HTTP/3.",
    "HTTP/1.1 opened one request per TCP connection (or a few, after keep-alive). HTTP/2 multiplexes many requests over one TCP connection using binary frames and HPACK-compressed headers. HTTP/3 replaces TCP with QUIC, a UDP-based transport with built-in reliability and encryption, eliminating the head-of-line blocking that HTTP/2 inherits from TCP. Each version traded simplicity for performance.",
    ["keep-alive", "multiplexing", "QUIC", "0-RTT"],
    7,
  ),
  ch(
    "websockets",
    "WebSockets",
    "Full-duplex over a single TCP connection.",
    "WebSockets start life as an HTTP request with an 'Upgrade: websocket' header; on success the connection switches to a framed, full-duplex protocol. Either side can send messages at any time, the framing is tiny (2-6 bytes per frame), and there is no request/response pairing. WebSockets are how chat, live dashboards, and multiplayer games stay open without paying HTTP's overhead on every exchange.",
    ["upgrade", "frame", "full-duplex", "ping/pong"],
    6,
  ),
  ch(
    "cors",
    "Cross-Origin Resource Sharing (CORS)",
    "Why browsers block cross-origin requests, and how to allow them.",
    "Same-origin policy prevents a page served from one origin from reading responses from another. For most APIs, that's too restrictive. CORS is the protocol that lets a server say 'yes, origin X is allowed to read this response'. The browser sends a preflight OPTIONS request; the server replies with Access-Control-Allow-Origin. CORS is enforced by the browser, not by the server — non-browser clients can ignore it entirely.",
    ["preflight", "Access-Control-Allow-Origin", "credentials"],
    6,
  ),
  ch(
    "tls-https",
    "TLS & HTTPS",
    "Handshake, certificates, ciphers.",
    "TLS sits between TCP and the application protocol and provides confidentiality, integrity, and server (and optionally client) authentication. The handshake negotiates a cipher suite, exchanges key material, and validates certificates against a chain of trust rooted at a CA. TLS 1.3 cuts the handshake to one round trip and removes cipher suites with known weaknesses. HTTPS is just HTTP over TLS.",
    ["handshake", "certificate", "cipher suite", "CA chain"],
    8,
    [
      st(
        "tls-handshake",
        "TLS handshake walkthrough",
        "ClientHello, ServerHello, key exchange, finished.",
        "TLS 1.2 (legacy): two round trips. Client sends ClientHello with cipher suites; server replies ServerHello, certificate, ServerHelloDone. Client validates the certificate, sends key exchange, ChangeCipherSpec, Finished. Server replies with its own Finished. After that, the connection is encrypted. TLS 1.3 (current): one round trip, with 0-RTT resumption for repeat connections. The reduction in round trips is the main reason TLS 1.3 is faster on the wire.",
        ["ClientHello", "ServerHello", "0-RTT"],
        "6 min",
      ),
      st(
        "certificates-and-pki",
        "Certificates & PKI",
        "Who trusts the certificate, and how.",
        "X.509 certificates bind a public key to an identity (a hostname or an organisation). The certificate is signed by a Certificate Authority. Browsers trust a list of root CAs (the trust store). Let's Encrypt automated this process for free DV certificates. The chain of trust: leaf cert → intermediate CA → root CA. A certificate is only as trusted as its chain — and the chain is only as trusted as the weakest root.",
        ["X.509", "CA", "chain of trust", "Let's Encrypt"],
        "6 min",
      ),
    ],
  ),
  ch(
    "cryptography",
    "Cryptography for Network Engineers",
    "Symmetric, asymmetric, hashing, and what each is for.",
    "Three primitives do most of the work. Symmetric encryption (AES, ChaCha20): one key, fast, used for bulk data. Asymmetric encryption (RSA, ECDSA, Ed25519): a key pair, slow, used for key exchange and signatures. Hashing (SHA-256, SHA-3): one-way, used for integrity and fingerprints. TLS uses all three: RSA or ECDHE for key exchange, AES for the bulk channel, SHA-256 for HMAC. The right tool for the right job is what makes the system secure.",
    ["symmetric", "asymmetric", "hash", "HMAC"],
    7,
  ),
  ch(
    "smtp",
    "SMTP — Simple Mail Transfer Protocol",
    "Why email has been around since 1971, and why it still mostly works.",
    "SMTP is the protocol that moves mail between servers. A client opens a TCP connection on port 25 (or 587 for submission), says EHLO, then MAIL FROM, RCPT TO, and DATA to send the message. The receiving server stores it in a mailbox (Maildir, mbox), and the recipient fetches it via POP3 or IMAP. SMTP is plain text, line-based, and extensible — the EXTENSIONS mechanism has added STARTTLS, authentication, size limits, and more over the decades.",
    ["MAIL FROM", "RCPT TO", "EHLO", "submission"],
    6,
  ),
  ch(
    "pop-imap",
    "POP & IMAP",
    "Two ways to read your mail from a server.",
    "POP3 (Post Office Protocol v3) is the older, simpler protocol: download mail to the local client, optionally delete it from the server. Works offline, but terrible for multi-device. IMAP (Internet Message Access Protocol) keeps mail on the server and synchronises state (read/unread, folders, flags) across devices. Almost every modern client uses IMAP. Both are now typically wrapped in TLS.",
    ["download", "synchronise", "folders", "flags"],
    5,
  ),
  ch(
    "dhcp",
    "DHCP",
    "Lease an IP automatically.",
    "DHCP leases an IP, plus gateway, DNS, lease time, and other options, in a four-step exchange: Discover, Offer, Request, Acknowledge. The client broadcasts because it has no address yet; the server may broadcast or unicast the reply. Leases are renewed at 50% of the lifetime. DHCP relay forwards requests across subnets so a single server can serve an entire enterprise.",
    ["DORA", "lease", "relay", "options"],
    7,
  ),
  ch(
    "nat",
    "Network Address Translation (NAT)",
    "Translate private/public addresses.",
    "Network Address Translation rewrites source or destination addresses as packets traverse a router. Most home and office networks use it to share one public IPv4 address among many private hosts (RFC 1918: 10/8, 172.16/12, 192.168/16). NAT breaks end-to-end connectivity — incoming connections can't reach internal hosts without port forwarding — which complicates peer-to-peer protocols.",
    ["RFC 1918", "private IP", "port forwarding", "endpoint"],
    8,
  ),
  ch(
    "routing-algorithms",
    "Routing Algorithms",
    "Distance vector, link state, path vector.",
    "Routing protocols build the tables routers use to forward packets. Distance vector (RIP) shares 'I can reach X in N hops' with neighbours and converges by iteration. Link state (OSPF, IS-IS) floods the full topology, every router runs Dijkstra, and convergence is fast. Path vector (BGP) carries the AS path and policy decisions — it's the protocol that glues the Internet together.",
    ["distance vector", "link state", "Dijkstra", "BGP"],
    8,
  ),
  ch(
    "ipv6",
    "IPv6",
    "Why, headers, addressing, transition.",
    "IPv6 expands addresses from 32 to 128 bits, simplifies the header (no header checksum, no fragmentation in routers), and adds features like stateless address autoconfiguration. Deployment has been slow — the world runs on dual stacks, with NAT and address-sharing buying IPv4 time. The header is fixed at 40 bytes; extension headers carry options that IPv4 crammed into its main header.",
    ["128-bit address", "stateless autoconfig", "extension header", "dual stack"],
    6,
  ),
  ch(
    "ports-sockets",
    "Ports & Sockets",
    "Multiplexing, well-known ports, sockets.",
    "Ports (16-bit numbers, 0-65535) identify endpoints; well-known ports (0-1023) are reserved for services (80, 443, 22). A socket is the (IP, port) tuple; TCP and UDP both build on sockets. The transport layer's job is to deliver bytes between sockets — reliably for TCP, best-effort for UDP. Knowing the standard ports is half of reading a packet capture.",
    ["port", "socket", "multiplexing", "well-known port"],
    6,
  ),
  ch(
    "hubs-switches-routers",
    "Hubs, Switches, Routers",
    "L1 vs L2 vs L3 devices.",
    "A hub repeats every bit out every port — every collision is everyone's problem. A switch learns which MAC lives behind which port and forwards frames only where they need to go. A router connects networks at L3 and forwards packets based on IP. The progression from hub to switch to router is also a progression from shared media to collision domains to broadcast domains.",
    ["hub", "switch", "router", "broadcast domain"],
    6,
  ),
  ch(
    "proxies-cdns-vpns",
    "Proxies, CDNs, VPNs",
    "Middleboxes that bend the path.",
    "A forward proxy sits between clients and the Internet, hiding the client's IP. A reverse proxy sits in front of servers, terminating TLS and balancing load. A CDN caches content at edge nodes close to users, cutting latency and origin load. A VPN tunnels packets through an encrypted channel to make a remote network look local. Each is a different way of inserting a middlebox into the path.",
    ["forward proxy", "reverse proxy", "CDN", "VPN tunnel"],
    6,
  ),
  ch(
    "wireless-networks",
    "Wireless Networks",
    "Cellular, satellite, and the wireless long-haul.",
    "Beyond Wi-Fi, wireless networks carry the long-haul traffic. Cellular networks (4G LTE, 5G NR) divide geography into cells, hand off mobiles between base stations, and use licensed spectrum. Satellite networks (Starlink, geostationary) cover remote areas at high latency. Fixed wireless (point-to-point microwave) connects buildings without cables. Each has its own latency, bandwidth, and cost profile; the trade-offs are physics-driven.",
    ["cellular", "satellite", "spectrum", "handoff"],
    6,
  ),
  ch(
    "mobile-ad-hoc-networks",
    "Mobile Ad Hoc Networks (MANETs)",
    "Networks with no infrastructure.",
    "A MANET is a collection of mobile nodes that route among themselves, with no fixed routers or access points. Every node is a router. Protocols like AODV (Ad hoc On-demand Distance Vector) and OLSR (Optimized Link State Routing) discover routes on the fly. MANETs are niche — military, disaster response, ad-hoc conferences — but the protocol ideas (mesh routing, gossip) show up in modern IoT systems.",
    ["mesh", "AODV", "OLSR", "no infrastructure"],
    5,
  ),
  ch(
    "network-security",
    "Network Security Basics",
    "Threats, defences, and the assumption that you are always under attack.",
    "Network security is the practice of defending the network and the traffic on it. Threats: eavesdropping (passive), spoofing (impersonation), tampering (modification), replay (capture-and-resend), DoS (flooding). Defences: TLS for confidentiality, MACs/HMACs for integrity, certificates for authentication, rate limits and firewalls for DoS. The shift in modern thinking is zero-trust: assume the network is hostile, authenticate every request, encrypt every byte.",
    ["threat model", "zero-trust", "firewall", "DoS"],
    7,
  ),
  ch(
    "network-management",
    "Network Management",
    "SNMP, NetFlow, telemetry, and the dashboards that watch them.",
    "Production networks are observed, not just configured. SNMP polls device counters; NetFlow and sFlow sample packet headers; streaming telemetry pushes counters in real time. On top of the data, monitoring systems (Prometheus, Grafana) alert on thresholds and dashboards show trends. The discipline is to instrument the things that fail before they fail, not after.",
    ["SNMP", "NetFlow", "telemetry", "dashboard"],
    6,
  ),
  ch(
    "sdn",
    "Software Defined Networking (SDN)",
    "When the control plane and the data plane split.",
    "Traditional routers make forwarding decisions in the same box that runs the protocols. SDN separates the concerns: a controller (logically central) computes the forwarding table and pushes it to switches (which just execute). OpenFlow was the first widely deployed protocol for this. The advantages: global optimisation, faster innovation, easier management. The disadvantages: a single controller is a single point of failure unless you cluster it. Modern networks blend SDN and traditional routing.",
    ["control plane", "data plane", "OpenFlow", "controller"],
    6,
  ),
  ch(
    "wireshark",
    "Wireshark",
    "Capturing and reading packets.",
    "Wireshark is the default tool for looking at packets on the wire. It captures frames from an interface, decodes every protocol it knows, and lets you filter by anything from MAC address to HTTP header. The first lesson is 'capture in promiscuous mode on the right interface'; the second is 'learn the display filters'. Reading a real capture is the fastest way to make the textbook stick.",
    ["capture", "display filter", "follow stream", "expert info"],
    6,
  ),
];

// =============================================================================
// Aggregate exports
// =============================================================================

export interface NetworkingPart {
  id: string; // "A", "B", "C", "D"
  title: string;
  blurb: string;
  chapters: Chapter[];
}

export const networkingParts: NetworkingPart[] = [
  {
    id: "A",
    title: "Foundations",
    blurb:
      "The OSI model, transmission media, topologies, and the vocabulary of networking.",
    chapters: partAFundamentals,
  },
  {
    id: "B",
    title: "Media Access & Data Link",
    blurb: "How shared wires get shared fairly, and how frames get where they're going.",
    chapters: partBLinkLayer,
  },
  {
    id: "C",
    title: "Protocols",
    blurb:
      "The transport and application protocols that make the Internet work.",
    chapters: partCProtocols,
  },
  {
    id: "D",
    title: "Going Further",
    blurb:
      "IPv6, middleboxes, security, and the tools engineers reach for every day.",
    chapters: partDGoingFurther,
  },
];

// Flat export for backwards compatibility.
export const networkingChapters: Chapter[] = networkingParts.flatMap(
  (p) => p.chapters,
);