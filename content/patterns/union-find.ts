import type { Pattern } from "@/types/content";

export const unionFind: Pattern = {
  slug: "union-find",
  title: "Union-Find / DSU",
  tagline: "Path compression + union by rank.",
  status: "live",
  icon: "Network",
  topics: [
    {
      slug: "redundant-connection",
      title: "Redundant Connection",
      difficulty: "Medium",
      status: "live",
      description:
        "Given a graph that started as a tree with N nodes and then had one extra edge added, find the edge that creates a cycle.",
      problem:
        "In this problem, a tree rooted at node 1 has N nodes and N-1 edges. One additional edge is added; this edge creates a cycle. Given the resulting edge list, return the edge that can be removed to restore the tree. If multiple answers exist, return the one that appears last. Example: edges=[[1,2],[1,3],[2,3]] → [2,3]. Edge cases: input is already a valid tree (impossible per problem), edges where the redundant connection is the very first or last in the list.",
      askedAt: ["Amazon", "Google", "Microsoft"],
      code: {
        lang: "python",
        lines: [
          "def find_redundant_brute(edges):",
          "    n = len(edges)",
          "    adj = [set() for _ in range(n + 1)]",
          "    for u, v in edges:",
          "        visited = [False] * (n + 1)",
          "        if _path_exists(adj, u, v, visited):",
          "            return [u, v]",
          "        adj[u].add(v); adj[v].add(u)",
        ],
      },
      annotations: {
        5: "Brute: for each new edge, DFS to see if its endpoints are already connected — if so, removing it breaks a cycle.",
      },
      approaches: [
        {
          id: "union-find-rank",
          name: "Union-Find with rank",
          time: "O(N · α(N)) ≈ O(N)",
          space: "O(N)",
          opsEstimate: (n) => n,
          defaultInput: {
            edges: [
              [1, 2],
              [1, 3],
              [2, 3],
            ],
          },
          steps: [
            {
              id: 0,
              narration:
                "Initialize parent[i] = i, rank[i] = 0 for nodes 1, 2, 3.",
              variables: {
                parent: "[_, 1, 2, 3]",
                rank: "[_, 0, 0, 0]",
              },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "Edge (1,2): find(1)=1, find(2)=2. Different roots → union. Attach 2 under 1. rank[1]=1.",
              pointers: { i: 0 },
              highlight: [0],
              variables: { parent: "[_, 1, 1, 3]", rank: "[_, 1, 0, 0]" },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "Edge (1,3): find(1)=1, find(3)=3. Different → union. Attach 3 under 1. rank[1]=2.",
              pointers: { i: 1 },
              highlight: [1],
              variables: { parent: "[_, 1, 1, 1]", rank: "[_, 2, 0, 0]" },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "Edge (2,3): find(2)=1 (path-compresses), find(3)=1. SAME ROOT → cycle! This is the redundant edge.",
              pointers: { i: 2 },
              highlight: [2],
              variables: {
                parent: "[_, 1, 1, 1]",
                rank: "[_, 2, 0, 0]",
                answer: "[2, 3]",
              },
              opCount: 3,
              done: true,
            },
          ],
        },
      ],
    },
    {
      slug: "number-of-connected-components",
      title: "Number of Connected Components",
      difficulty: "Medium",
      status: "live",
      description:
        "Given an undirected graph with n nodes and a list of edges, return the number of connected components.",
      problem:
        "Given n nodes labeled 0..n-1 and a list of undirected edges, return the number of connected components in the graph. A connected component is a maximal set of nodes where every pair has a path between them. Example: n=5, edges=[[0,1],[1,2],[3,4]] → 2. Edge cases: no edges (n components), one giant component (1), and self-loops or duplicate edges.",
      askedAt: ["Amazon", "Facebook", "LinkedIn"],
      code: {
        lang: "python",
        lines: [
          "def count_components_brute(n, edges):",
          "    visited = [False] * n",
          "    adj = [[] for _ in range(n)]",
          "    for u, v in edges:",
          "        adj[u].append(v); adj[v].append(u)",
          "    count = 0",
          "    for i in range(n):",
          "        if not visited[i]:",
          "            _dfs(i, adj, visited)",
          "            count += 1",
          "    return count",
        ],
      },
      annotations: {
        9: "Brute: DFS from each unvisited node, marking visited; each DFS root starts a new component.",
      },
      approaches: [
        {
          id: "union-find",
          name: "Union-Find",
          time: "O(N + E · α(N))",
          space: "O(N)",
          opsEstimate: (n) => n,
          defaultInput: {
            n: 5,
            edges: [
              [0, 1],
              [1, 2],
              [3, 4],
            ],
          },
          steps: [
            {
              id: 0,
              narration:
                "Start with n components = 5 (each node its own root). Union each edge and decrement when roots merge.",
              variables: {
                parent: "[0,1,2,3,4]",
                rank: "[0,0,0,0,0]",
                components: 5,
              },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "Edge (0,1): find(0)=0, find(1)=1. Union → parent[1]=0. components=4.",
              pointers: { i: 0 },
              highlight: [0],
              variables: {
                parent: "[0,0,2,3,4]",
                rank: "[1,0,0,0,0]",
                components: 4,
              },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "Edge (1,2): find(1)=0, find(2)=2. Union → parent[2]=0. components=3.",
              pointers: { i: 1 },
              highlight: [1],
              variables: {
                parent: "[0,0,0,3,4]",
                rank: "[2,0,0,0,0]",
                components: 3,
              },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "Edge (3,4): find(3)=3, find(4)=4. Union → parent[4]=3. components=2.",
              pointers: { i: 2 },
              highlight: [2],
              variables: {
                parent: "[0,0,0,3,3]",
                rank: "[2,0,0,1,0]",
                components: 2,
              },
              opCount: 3,
              done: true,
            },
          ],
        },
        {
          id: "dfs",
          name: "DFS",
          time: "O(N + E)",
          space: "O(N)",
          opsEstimate: (n) => n,
          defaultInput: {
            n: 5,
            edges: [
              [0, 1],
              [1, 2],
              [3, 4],
            ],
          },
          steps: [
            {
              id: 0,
              narration:
                "Build adjacency list. Walk every unvisited node, DFS-mark its component, increment count.",
              variables: {
                adj: "{0:[1],1:[0,2],2:[1],3:[4],4:[3]}",
                visited: "[F,F,F,F,F]",
                count: 0,
              },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "node 0 unvisited. DFS: visit 0 → 1 → 2. Component 1. count=1.",
              pointers: { node: 0 },
              highlight: [0, 1, 2],
              variables: {
                visited: "[T,T,T,F,F]",
                count: 1,
              },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "node 1 visited, skip. node 2 visited, skip.",
              pointers: { node: 2 },
              variables: {
                visited: "[T,T,T,F,F]",
                count: 1,
              },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "node 3 unvisited. DFS: visit 3 → 4. Component 2. count=2.",
              pointers: { node: 3 },
              highlight: [3, 4],
              variables: {
                visited: "[T,T,T,T,T]",
                count: 2,
              },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "node 4 visited, skip. Done. count=2.",
              variables: {
                visited: "[T,T,T,T,T]",
                answer: 2,
              },
              opCount: 4,
              done: true,
            },
          ],
        },
      ],
    },
    {
      slug: "accounts-merge",
      title: "Accounts Merge",
      difficulty: "Medium",
      status: "live",
      description:
        "Merge accounts that share any email address. Each account is [name, email1, email2, …].",
      problem:
        "Given a list of accounts where each account is [name, email1, email2, ...], merge accounts that share at least one email. Return the merged accounts where each has the name followed by sorted unique emails. Example: [[John,johnsmith@mail.com,john00@mail.com],[John,johnnybravo@mail.com],[John,johnsmith@mail.com,john_new@mail.com],[Mary,mary@mail.com]] → [[John,john00@mail.com,john_new@mail.com,johnsmith@mail.com],[John,johnnybravo@mail.com],[Mary,mary@mail.com]]. Edge cases: single account, accounts with no shared emails.",
      askedAt: ["Facebook", "Amazon", "Google"],
      code: {
        lang: "python",
        lines: [
          "def merge_brute(accounts):",
          "    graph = {}",
          "    for i, acc in enumerate(accounts):",
          "        for email in acc[1:]:",
          "            graph.setdefault(email, []).append(i)",
          "    visited = [False] * len(accounts)",
          "    out = []",
          "    for i, acc in enumerate(accounts):",
          "        if visited[i]: continue",
          "        emails = set()",
          "        _dfs_gather(i, graph, visited, emails)",
          "        out.append([acc[0]] + sorted(emails))",
          "    return out",
        ],
      },
      annotations: {
        4: "Brute: build an email→accounts graph, then DFS from each unvisited account to gather all reachable emails.",
      },
      approaches: [
        {
          id: "union-find-emails",
          name: "Union-Find + Email mapping",
          time: "O(N · K · α)",
          space: "O(N · K)",
          opsEstimate: (n) => n,
          defaultInput: {
            accounts: [
              ["John", "johnsmith@mail.com", "john00@mail.com"],
              ["John", "johnnybravo@mail.com"],
              ["John", "johnsmith@mail.com", "john_new@mail.com"],
              ["Mary", "mary@mail.com"],
            ],
          },
          steps: [
            {
              id: 0,
              narration:
                "For each email seen for the first time, record which account index owns it. Subsequent sightings → union that account with the owner.",
              variables: {
                emailToIdx: "{}",
                parent: "[0,1,2,3]",
                rank: "[0,0,0,0]",
              },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "Account 0: 'johnsmith@mail.com' new → map to 0. 'john00@mail.com' new → map to 0.",
              pointers: { acc: 0 },
              variables: {
                emailToIdx: "{johnsmith@mail.com:0, john00@mail.com:0}",
                parent: "[0,1,2,3]",
              },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "Account 1: 'johnnybravo@mail.com' new → map to 1.",
              pointers: { acc: 1 },
              variables: {
                emailToIdx: "{…, johnnybravo@mail.com:1}",
                parent: "[0,1,2,3]",
              },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "Account 2: 'johnsmith@mail.com' already in account 0 → union(2,0). parent[2]=0.",
              pointers: { acc: 2 },
              variables: {
                emailToIdx: "{…, john_new@mail.com:2}",
                parent: "[0,1,0,3]",
                rank: "[1,0,0,0]",
              },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "'john_new@mail.com' new → map to 2. Account 2's root is 0 (the John group).",
              variables: {
                emailToIdx: "{…, john_new@mail.com:2}",
                parent: "[0,1,0,3]",
              },
              opCount: 4,
            },
            {
              id: 5,
              narration:
                "Account 3: 'mary@mail.com' new → map to 3. No unions.",
              pointers: { acc: 3 },
              variables: {
                emailToIdx: "{…, mary@mail.com:3}",
                parent: "[0,1,0,3]",
              },
              opCount: 5,
            },
            {
              id: 6,
              narration:
                "Group by root. Root 0 → {John, johnsmith@mail.com, john00@mail.com, john_new@mail.com}. Root 1 → {John, johnnybravo@mail.com}. Root 3 → {Mary, mary@mail.com}.",
              variables: {
                merged:
                  "[[John,john00@mail.com,john_new@mail.com,johnsmith@mail.com],[John,johnnybravo@mail.com],[Mary,mary@mail.com]]",
              },
              opCount: 6,
              done: true,
            },
          ],
        },
      ],
    },
  ],
};
