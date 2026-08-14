import type { Pattern } from "@/types/content";

export const prefixSum: Pattern = {
  slug: "prefix-sum",
  title: "Prefix Sum",
  tagline: "Precompute sums for O(1) range queries.",
  status: "live",
  icon: "Sigma",
  topics: [
    {
      slug: "count-vowels",
      title: "Count Vowels in Range",
      difficulty: "Medium",
      status: "live",
      description:
        "For each query [l, r], count how many vowels are in s[l..r]. Preprocess with prefix counts.",
      problem:
        "Given a string `s` of lowercase letters and a list of queries where each query is [l, r], answer how many vowels (a, e, i, o, u) are in s[l..r] inclusive. Example: s='abeicd', queries=[[0,2],[1,4]] → [2,2]. Edge cases: queries with l=r (single character), queries outside the string, and empty string.",
      askedAt: ["Amazon", "Google"],
      code: {
        lang: "python",
        lines: [
          "def count_brute(s, queries):",
          "    out = []",
          "    for l, r in queries:",
          "        c = 0",
          "        for i in range(l, r + 1):",
          "            if s[i] in 'aeiou':",
          "                c += 1",
          "        out.append(c)",
          "    return out",
        ],
      },
      annotations: {
        4: "Brute: for each query, scan [l, r] and count vowels — O(n·q) total.",
      },
      approaches: [
        {
          id: "prefix-array",
          name: "Prefix Count Array",
          time: "O(n + q)",
          space: "O(n)",
          opsEstimate: (n) => n,
          defaultInput: { s: "abeicd", queries: [[0, 2], [1, 4]] },
          steps: [
            {
              id: 0,
              narration:
                "Build prefix[i] = number of vowels in s[0..i-1]. prefix[0]=0.",
              variables: { s: "abeicd", prefix: "[0]" },
              opCount: 0,
            },
            {
              id: 1,
              narration: "i=1, s[0]='a' is vowel. prefix[1]=1.",
              pointers: { i: 1 },
              variables: { prefix: "[0,1]" },
              highlight: [0],
              opCount: 1,
            },
            {
              id: 2,
              narration: "i=2, s[1]='b' not vowel. prefix[2]=1.",
              pointers: { i: 2 },
              variables: { prefix: "[0,1,1]" },
              opCount: 2,
            },
            {
              id: 3,
              narration: "i=3, s[2]='e' is vowel. prefix[3]=2.",
              pointers: { i: 3 },
              variables: { prefix: "[0,1,1,2]" },
              highlight: [2],
              opCount: 3,
            },
            {
              id: 4,
              narration: "i=4, s[3]='i' is vowel. prefix[4]=3.",
              pointers: { i: 4 },
              variables: { prefix: "[0,1,1,2,3]" },
              highlight: [3],
              opCount: 4,
            },
            {
              id: 5,
              narration: "i=5, s[4]='c' not vowel. prefix[5]=3.",
              pointers: { i: 5 },
              variables: { prefix: "[0,1,1,2,3,3]" },
              opCount: 5,
            },
            {
              id: 6,
              narration: "i=6, s[5]='d' not vowel. prefix[6]=3.",
              pointers: { i: 6 },
              variables: { prefix: "[0,1,1,2,3,3,3]" },
              opCount: 6,
              done: true,
            },
          ],
        },
        {
          id: "in-place",
          name: "Inline Counts",
          time: "O(n + q)",
          space: "O(n)",
          opsEstimate: (n) => n,
          defaultInput: { s: "abeicd", queries: [[0, 2], [1, 4]] },
          steps: [
            {
              id: 0,
              narration:
                "Use a single array pref of length n. pref[i] = pref[i-1] + isVowel(s[i]).",
              variables: { s: "abeicd", pref: "[]" },
              opCount: 0,
            },
            {
              id: 1,
              narration: "i=0: pref[0] = 0 + 1 = 1 ('a' is vowel).",
              pointers: { i: 0 },
              variables: { pref: "[1]" },
              highlight: [0],
              opCount: 1,
            },
            {
              id: 2,
              narration: "i=1: pref[1] = 1 + 0 = 1.",
              pointers: { i: 1 },
              variables: { pref: "[1,1]" },
              opCount: 2,
            },
            {
              id: 3,
              narration: "i=2: pref[2] = 1 + 1 = 2 ('e' is vowel).",
              pointers: { i: 2 },
              variables: { pref: "[1,1,2]" },
              highlight: [2],
              opCount: 3,
            },
            {
              id: 4,
              narration: "i=3: pref[3] = 2 + 1 = 3 ('i' is vowel).",
              pointers: { i: 3 },
              variables: { pref: "[1,1,2,3]" },
              highlight: [3],
              opCount: 4,
            },
            {
              id: 5,
              narration:
                "Query [0,2]: count = pref[2] - (pref[-1] if l>0 else 0) = 2. Query [1,4]: count = pref[4] - pref[0] = 3 - 1 = 2.",
              variables: { answers: "[2, 2]" },
              opCount: 5,
              done: true,
            },
          ],
        },
      ],
    },
    {
      slug: "subarray-sum-equals-k",
      title: "Subarray Sum Equals K",
      difficulty: "Medium",
      status: "live",
      description:
        "Count the number of continuous subarrays whose sum equals k.",
      problem:
        "Given an integer array `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals `k`. Example: nums=[1,1,1], k=2 → 2 ([1,1] at indices 0..1 and 1..2). Edge cases: empty array, all zeros with k=0, no matching subarrays, k=0 with negative numbers.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Google"],
      code: {
        lang: "python",
        lines: [
          "def subarray_sum_brute(nums, k):",
          "    n = len(nums)",
          "    count = 0",
          "    for i in range(n):",
          "        s = 0",
          "        for j in range(i, n):",
          "            s += nums[j]",
          "            if s == k:",
          "                count += 1",
          "    return count",
        ],
      },
      annotations: {
        6: "Brute: enumerate every subarray start i and end j, summing — O(n²).",
      },
      approaches: [
        {
          id: "hashmap-prefix",
          name: "HashMap of Prefix Sums",
          time: "O(n)",
          space: "O(n)",
          opsEstimate: (n) => n,
          defaultInput: { nums: [1, 2, 3, -2, 1], k: 3 },
          steps: [
            {
              id: 0,
              narration:
                "If prefix[j] - prefix[i] = k then nums[i..j-1] sums to k. Count past prefix sums.",
              variables: { prefix: "0", counts: "{0:1}", result: 0 },
              opCount: 0,
            },
            {
              id: 1,
              narration: "i=0, n=1. prefix=1. Need prefix-k=-2. Not in counts.",
              pointers: { i: 0 },
              variables: { prefix: "1", counts: "{0:1, 1:1}" },
              highlight: [0],
              opCount: 1,
            },
            {
              id: 2,
              narration: "i=1, n=2. prefix=3. Need 0. counts[0]=1 → result=1.",
              pointers: { i: 1 },
              variables: { prefix: "3", counts: "{0:1,1:1,3:1}", result: 1 },
              highlight: [1],
              opCount: 2,
            },
            {
              id: 3,
              narration: "i=2, n=3. prefix=6. Need 3. counts[3]=1 → result=2.",
              pointers: { i: 2 },
              variables: { prefix: "6", counts: "{0:1,1:1,3:1,6:1}", result: 2 },
              highlight: [2],
              opCount: 3,
            },
            {
              id: 4,
              narration: "i=3, n=-2. prefix=4. Need 1. counts[1]=1 → result=3.",
              pointers: { i: 3 },
              variables: { prefix: "4", counts: "{0:1,1:1,3:1,6:1,4:1}", result: 3 },
              highlight: [3],
              opCount: 4,
            },
            {
              id: 5,
              narration: "i=4, n=1. prefix=5. Need 2. Not in counts.",
              pointers: { i: 4 },
              variables: { prefix: "5", counts: "{…, 5:1}", result: 3 },
              highlight: [4],
              opCount: 5,
              done: true,
            },
          ],
        },
        {
          id: "prefix-only",
          name: "Prefix Sum List + Counts",
          time: "O(n)",
          space: "O(n)",
          opsEstimate: (n) => n,
          defaultInput: { nums: [1, 2, 3, -2, 1], k: 3 },
          steps: [
            {
              id: 0,
              narration:
                "Compute the full prefix array first. Then for each j, look at how many i<j have prefix[i]=prefix[j]-k.",
              variables: { prefix: "[0]", nums: "[1,2,3,-2,1]" },
              opCount: 0,
            },
            {
              id: 1,
              narration: "prefix=[0,1,3,6,4,5].",
              variables: { prefix: "[0,1,3,6,4,5]" },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "j=1: prefix[1]=1, need -2. prefix values equal -2: 0 → count 0.",
              pointers: { j: 1 },
              variables: { prefix: "[0,1,3,6,4,5]", count: 0 },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "j=2: prefix[2]=3, need 0. prefix values =0: 1 → count 1.",
              pointers: { j: 2 },
              variables: { count: 1 },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "j=3: prefix[3]=6, need 3. prefix values =3: 1 → count 2.",
              pointers: { j: 3 },
              variables: { count: 2 },
              opCount: 4,
            },
            {
              id: 5,
              narration:
                "j=4: prefix[4]=4, need 1. prefix values =1: 1 → count 3.",
              pointers: { j: 4 },
              variables: { count: 3 },
              opCount: 5,
            },
            {
              id: 6,
              narration:
                "j=5: prefix[5]=5, need 2. prefix values =2: 0 → count 3.",
              pointers: { j: 5 },
              variables: { count: 3, answer: 3 },
              opCount: 6,
              done: true,
            },
          ],
        },
      ],
    },
  ],
};
