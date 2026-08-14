import type { Pattern } from "@/types/content";

export const trie: Pattern = {
  slug: "trie",
  title: "Trie",
  tagline: "Prefix trees for word lookups.",
  status: "live",
  icon: "TreePine",
  topics: [
    {
      slug: "implement-trie",
      title: "Implement Trie",
      difficulty: "Medium",
      status: "live",
      description:
        "Design a Trie (prefix tree) supporting insert, search (exact match), and startsWith (prefix) in O(|word|).",
      problem:
        "Implement a Trie (prefix tree) class that supports three operations in O(|word|) time: `insert(word)`, `search(word)` (exact match), and `startsWith(prefix)`. The words consist of lowercase English letters. Example: insert('apple'), search('apple')→true, search('app')→false, startsWith('app')→true. Edge cases: empty string operations, words that are prefixes of others, and many words sharing a common prefix.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Google"],
      code: {
        lang: "python",
        lines: [
          "class TrieBrute:",
          "    def __init__(self):",
          "        self.words = set()",
          "    def insert(self, word): self.words.add(word)",
          "    def search(self, word): return word in self.words",
          "    def startsWith(self, prefix):",
          "        return any(w.startswith(prefix) for w in self.words)",
        ],
      },
      annotations: {
        1: "Brute: just store every inserted string and check prefix membership.",
      },
      approaches: [
        {
          id: "array-children",
          name: "Array of children (26)",
          time: "O(|word|)",
          space: "O(26·n)",
          opsEstimate: (n) => n,
          defaultInput: {
            ops: ["insert(apple)", "search(apple)", "startsWith(app)"],
          },
          steps: [
            {
              id: 0,
              narration:
                "Each node has 26 child slots (one per letter). isEnd marks a word boundary. root = {}.",
              variables: { trie: "{root}" },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "insert('apple'): start at root. 'a' → create child.",
              pointers: { depth: 0 },
              variables: { trie: "{root → a}" },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "At 'a' node: 'p' → create child.",
              pointers: { depth: 1 },
              variables: { trie: "{root → a → p}" },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "'p' → 'p' → 'l' → 'e'. Each step creates the next node along the path.",
              pointers: { depth: 4 },
              variables: { trie: "{root → a → p → p → l → e*}" },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "Mark 'e' as isEnd=true. Marked with '*'.",
              pointers: { depth: 4 },
              variables: { trie: "{root → a → p → p → l → e*} " },
              opCount: 4,
            },
            {
              id: 5,
              narration:
                "search('apple'): walk a → p → p → l → e. Final node has isEnd=true → return true.",
              variables: { search: "true", trie: "{root → a → p → p → l → e*}" },
              opCount: 5,
            },
            {
              id: 6,
              narration:
                "startsWith('app'): walk a → p → p. Path exists, no need to check isEnd → return true.",
              variables: { startsWith: "true", trie: "{root → a → p → p → l → e*}" },
              opCount: 6,
              done: true,
            },
          ],
        },
        {
          id: "hashmap-children",
          name: "HashMap children",
          time: "O(|word|)",
          space: "O(n)",
          opsEstimate: (n) => n,
          defaultInput: {
            ops: ["insert(apple)", "search(apple)", "startsWith(app)"],
          },
          steps: [
            {
              id: 0,
              narration:
                "Each node has a Map<char, Node> and an isEnd flag. root = {}.",
              variables: { trie: "{root: {}}" },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "insert('apple'): at root, ensure child 'a'.",
              pointers: { depth: 0 },
              variables: { trie: "{root: {a:{}}}" },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "At 'a', ensure child 'p'.",
              pointers: { depth: 1 },
              variables: { trie: "{root: {a:{p:{}}}}" },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "Continue: p → p → l → e.",
              pointers: { depth: 4 },
              variables: { trie: "{root: {a:{p:{p:{l:{e:{}}}}}}}" },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "Set isEnd=true at 'e'. HashMap uses space proportional to actual children, not 26.",
              pointers: { depth: 4 },
              variables: { trie: "{root: {a:{p:{p:{l:{e:{end:true}}}}}}}" },
              opCount: 4,
            },
            {
              id: 5,
              narration:
                "search('apple'): traverse a→p→p→l→e. end=true → true.",
              variables: { search: "true", trie: "{root: {a:{p:{p:{l:{e:{end:true}}}}}}}" },
              opCount: 5,
            },
            {
              id: 6,
              narration:
                "startsWith('app'): traverse a→p→p. Path exists → true.",
              variables: { startsWith: "true", trie: "{root: {a:{p:{p:{l:{e:{end:true}}}}}}}" },
              opCount: 6,
              done: true,
            },
          ],
        },
      ],
    },
    {
      slug: "word-search-ii",
      title: "Word Search II",
      difficulty: "Hard",
      status: "live",
      description:
        "Given a 2D board and a list of words, find all words that can be formed by sequentially adjacent cells.",
      problem:
        "Given an m×n board of characters and a list of strings `words`, return all words that can be constructed by sequentially adjacent cells (horizontally or vertically), without reusing a cell in a single word. Example: board=[[o,a,a,n],[e,t,a,e],[i,h,k,r],[i,f,l,v]], words=['oath','pea','eat','rain'] → ['eat','oath']. Edge cases: words list with no matches, board with isolated cells, and overlapping prefixes (oat, oath share a path).",
      askedAt: ["Amazon", "Microsoft", "Meta", "Airbnb"],
      code: {
        lang: "python",
        lines: [
          "def find_brute(board, words):",
          "    found = set()",
          "    for w in words:",
          "        if any(_exists(board, w, 0, r, c, set())",
          "               for r in range(len(board))",
          "               for c in range(len(board[0]))):",
          "            found.add(w)",
          "    return list(found)",
        ],
      },
      annotations: {
        3: "Brute: for every word, scan every cell and run DFS to see if it forms the word.",
      },
      approaches: [
        {
          id: "backtrack-trie",
          name: "Backtracking + Trie",
          time: "O(m·n·4^L)",
          space: "O(words·L)",
          opsEstimate: (n) => n,
          defaultInput: {
            board: [
              ["o", "a", "a", "n"],
              ["e", "t", "a", "e"],
              ["i", "h", "k", "r"],
              ["i", "f", "l", "v"],
            ],
            words: ["oath", "oat", "rain", "oatn"],
          },
          steps: [
            {
              id: 0,
              narration:
                "Build a trie from words: oath, oat, rain, oatn. DFS from each cell, following trie edges.",
              variables: {
                trie: "{root: {o:{a:{t:{h:{end}},n:{end}}},r:{a:{i:{n:{end}}}}}}",
                found: "[]",
              },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "Start DFS at (0,0)='o'. Prefix 'o' is in trie — descend.",
              pointers: { r: 0, c: 0 },
              highlight: [0],
              variables: { path: "(0,0)", prefix: "o", trie: "{…}" },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "Move to (0,1)='a'. Prefix 'oa' is in trie — descend.",
              pointers: { r: 0, c: 1 },
              highlight: [0, 1],
              variables: { path: "(0,0)→(0,1)", prefix: "oa" },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "Move to (1,1)='t'. Prefix 'oat' is in trie AND isEnd=true → FOUND 'oat'. Add to result.",
              pointers: { r: 1, c: 1 },
              highlight: [0, 1, 5],
              variables: { path: "(0,0)→(0,1)→(1,1)", prefix: "oat", found: "['oat']" },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "Continue from 'oat': (2,1)='h' → 'oath' isEnd=true → FOUND 'oath'.",
              pointers: { r: 2, c: 1 },
              highlight: [0, 1, 5, 9],
              variables: { path: "(0,0)→(0,1)→(1,1)→(2,1)", prefix: "oath", found: "['oat','oath']" },
              opCount: 4,
            },
            {
              id: 5,
              narration:
                "Backtrack. From 'oat' node, also try (0,2)='a' → 'oata' not in trie. Dead end.",
              pointers: { r: 0, c: 2 },
              highlight: [2],
              variables: { path: "(0,0)→(0,1)→(0,2)", prefix: "oaa", found: "['oat','oath']" },
              opCount: 5,
            },
            {
              id: 6,
              narration:
                "DFS exhausted. Result = ['oat', 'oath']. Trie pruning avoided re-scanning prefixes.",
              variables: { found: "['oat','oath']", note: "trie prunes by prefix" },
              opCount: 6,
              done: true,
            },
          ],
        },
      ],
    },
    {
      slug: "add-search-word",
      title: "Add and Search Word",
      difficulty: "Medium",
      status: "live",
      description:
        "Design a data structure that supports adding words and searching with the wildcard '.' that matches any single character.",
      problem:
        "Design a data structure that supports adding new words and finding whether a string matches any previously added string. The search string may contain the dot character '.' which matches any single letter. Example: addWord('bad'), addWord('dad'), addWord('mad'), search('pad')→false, search('bad')→true, search('.ad')→true, search('b..')→true. Edge cases: searching with all dots, very long pattern, and patterns shorter than stored words.",
      askedAt: ["Amazon", "Facebook", "Google"],
      code: {
        lang: "python",
        lines: [
          "class WordSetBrute:",
          "    def __init__(self): self.w = []",
          "    def addWord(self, word): self.w.append(word)",
          "    def search(self, pattern):",
          "        for w in self.w:",
          "            if len(w) != len(pattern): continue",
          "            if all(p == '.' or p == c for p, c in zip(pattern, w)):",
          "                return True",
          "        return False",
        ],
      },
      annotations: {
        6: "Brute: linear scan all stored words, checking character-by-character with '.' as wildcard.",
      },
      approaches: [
        {
          id: "trie-dfs",
          name: "Trie + DFS",
          time: "O(|word|) without '.', up to 26^d with d dots",
          space: "O(words·|word|)",
          opsEstimate: (n) => n,
          defaultInput: {
            ops: ["add(bad)", "add(dad)", "add(mad)", "search(pad)", "search(.ad)", "search(b..)"],
          },
          steps: [
            {
              id: 0,
              narration:
                "Build a trie. add() walks chars, creating nodes. search() walks chars; on '.', DFS all children.",
              variables: { trie: "{root: {}}", adds: 0 },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "add('bad'): root → b → a → d*. Mark 'd' isEnd.",
              variables: { trie: "{root → b → a → d*}", adds: 1 },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "add('dad'): root → d → a → d*. Trie now has branches 'b' and 'd' at root.",
              variables: { trie: "{root → {b:{a:{d*}}, d:{a:{d*}}}}", adds: 2 },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "add('mad'): root → m → a → d*. Three branches now.",
              variables: { trie: "{root → {b,d,m}:{a:{d*}}}", adds: 3 },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "search('pad'): walk p → no 'p' child under root → return false.",
              variables: { search: "false", trie: "{root → {b,d,m}:{a:{d*}}}" },
              opCount: 4,
            },
            {
              id: 5,
              narration:
                "search('.ad'): walk '.' → DFS all children. Try 'b': b → a → d*. end=true → match!",
              variables: { search: "true", trie: "{root → {b,d,m}:{a:{d*}}}", branch: "b" },
              opCount: 5,
            },
            {
              id: 6,
              narration:
                "search('b..'): walk b → '.' DFS from 'a' → '.': try 'd'. d* → end=true → match!",
              variables: { search: "true", trie: "{root → {b,d,m}:{a:{d*}}}", branch: "b→d" },
              opCount: 6,
              done: true,
            },
          ],
        },
        {
          id: "hashmap-bfs",
          name: "HashMap + BFS",
          time: "O(words·|word|) build, O(26^d) per search",
          space: "O(words·|word|)",
          opsEstimate: (n) => n,
          defaultInput: {
            ops: ["add(bad)", "add(dad)", "add(mad)", "search(.ad)", "search(b..)"],
          },
          steps: [
            {
              id: 0,
              narration:
                "Index every word by length. For each search length L, check only L-length words; for each '.' try all L-length words.",
              variables: { byLen: "{3: []}" },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "add 'bad': byLen[3] = ['bad'].",
              variables: { byLen: "{3: ['bad']}" },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "add 'dad' and 'mad': byLen[3] = ['bad','dad','mad'].",
              variables: { byLen: "{3: ['bad','dad','mad']}" },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "search('.ad'): length 3. Compare against each word char-by-char; '.' matches anything.",
              variables: { byLen: "{3: ['bad','dad','mad']}", candidates: 3 },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "'.ad' vs 'bad': '.'='b' ✓, 'a'='a' ✓, 'd'='d' ✓ → match! Return true.",
              variables: { match: "'bad'", byLen: "{3: ['bad','dad','mad']}", result: "true" },
              opCount: 4,
            },
            {
              id: 5,
              narration:
                "search('b..'): length 3. 'bad' matches: 'b','.'='a','.'='d' → true. Others fail first letter.",
              variables: { match: "'bad'", byLen: "{3: ['bad','dad','mad']}", result: "true" },
              opCount: 5,
              done: true,
            },
          ],
        },
      ],
    },
  ],
};
