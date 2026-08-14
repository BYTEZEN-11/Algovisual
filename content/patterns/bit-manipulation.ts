import type { Pattern } from "@/types/content";

export const bitManipulation: Pattern = {
  slug: "bit-manipulation",
  title: "Bit Manipulation",
  tagline: "XOR, masks, and bit tricks.",
  status: "live",
  icon: "Binary",
  topics: [
    {
      slug: "single-number",
      title: "Single Number",
      difficulty: "Easy",
      status: "live",
      description:
        "Every number appears twice except one. Find the unique number in O(n) without extra space.",
      problem:
        "Given a non-empty array of integers `nums` where every element appears twice except for one, find that single one. Must run in O(n) time and O(1) extra space. Example: `[4,1,2,1,2]` → 4. Edge cases: array of length 1 (return that element), negative numbers, and arrays where the unique element is at the start, middle, or end.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Apple"],
      code: {
        lang: "python",
        lines: [
          "def single_brute(nums):",
          "    from collections import Counter",
          "    counts = Counter(nums)",
          "    for k, v in counts.items():",
          "        if v == 1: return k",
        ],
      },
      annotations: {
        1: "Brute: hash counter — O(n) time but O(n) extra space.",
      },
      approaches: [
        {
          id: "xor",
          name: "XOR (O(n))",
          time: "O(n)",
          space: "O(1)",
          opsEstimate: (n) => n,
          defaultInput: { array: [4, 1, 2, 1, 2] },
          steps: [
            {
              id: 0,
              narration:
                "XOR is its own inverse: a ^ a = 0. Pairwise XOR cancels duplicates, leaving the singleton.",
              variables: { x: "0", binary: "0000" },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "x ^= 4 → x = 0 ^ 4 = 4.",
              pointers: { i: 0 },
              highlight: [0],
              variables: { x: "4", binary: "0100" },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "x ^= 1 → x = 4 ^ 1 = 5.",
              pointers: { i: 1 },
              highlight: [1],
              variables: { x: "5", binary: "0101" },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "x ^= 2 → x = 5 ^ 2 = 7.",
              pointers: { i: 2 },
              highlight: [2],
              variables: { x: "7", binary: "0111" },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "x ^= 1 → x = 7 ^ 1 = 6. (The '1' cancels with the earlier '1'.)",
              pointers: { i: 3 },
              highlight: [3],
              variables: { x: "6", binary: "0110" },
              opCount: 4,
            },
            {
              id: 5,
              narration:
                "x ^= 2 → x = 6 ^ 2 = 4. (The '2' cancels too.) Result = 4.",
              pointers: { i: 4 },
              highlight: [4],
              variables: { x: "4", binary: "0100" },
              opCount: 5,
              done: true,
            },
          ],
        },
        {
          id: "sort",
          name: "Sort + Adjacent Compare",
          time: "O(n log n)",
          space: "O(1)",
          opsEstimate: (n) => n * Math.log2(Math.max(n, 2)),
          defaultInput: { array: [4, 1, 2, 1, 2] },
          steps: [
            {
              id: 0,
              narration:
                "Sort so identical numbers sit next to each other. Pairs occupy indices 2k and 2k+1.",
              variables: { sorted: "[1,1,2,2,4]" },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "i=0: arr[0]=1, arr[1]=1. Equal pair — skip ahead.",
              pointers: { i: 0, j: 1 },
              highlight: [0, 1],
              variables: { sorted: "[1,1,2,2,4]" },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "i=2: arr[2]=2, arr[3]=2. Equal pair — skip ahead.",
              pointers: { i: 2, j: 3 },
              highlight: [2, 3],
              variables: { sorted: "[1,1,2,2,4]" },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "i=4: arr[4]=4, no partner at 5. Singleton! Return 4.",
              pointers: { i: 4 },
              highlight: [4],
              variables: { answer: "4", sorted: "[1,1,2,2,4]" },
              opCount: 3,
              done: true,
            },
          ],
        },
      ],
    },
    {
      slug: "number-of-1-bits",
      title: "Number of 1 Bits",
      difficulty: "Easy",
      status: "live",
      description:
        "Count the number of set bits (Hamming weight) in the binary representation of a non-negative integer.",
      problem:
        "Write a function that takes the binary representation of a non-negative integer and returns the number of 1 bits it has (also known as the Hamming weight). Example: input 11 (binary 1011) → 3. Edge cases: 0 → 0, 1 → 1, and very large 32-bit unsigned inputs.",
      askedAt: ["Amazon", "Microsoft", "Meta"],
      code: {
        lang: "python",
        lines: [
          "def count_ones_brute(n):",
          "    count = 0",
          "    while n > 0:",
          "        if n & 1: count += 1",
          "        n >>= 1",
          "    return count",
        ],
      },
      annotations: {
        1: "Brute: shift and check lowest bit — O(32) per number.",
      },
      approaches: [
        {
          id: "kernighan",
          name: "Brian Kernighan (n & (n-1))",
          time: "O(popcount)",
          space: "O(1)",
          opsEstimate: (n) => Math.log2(Math.max(n, 2)),
          defaultInput: { n: 11 },
          steps: [
            {
              id: 0,
              narration:
                "n=11 = 0000 1011. count=0. The trick: n & (n-1) clears the lowest set bit.",
              variables: { n: "11", binary: "00001011", count: 0 },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "n-1 = 10 = 0000 1010. n & (n-1) = 0000 1010 = 10. Cleared bit 0. count=1.",
              variables: { n: "10", binary: "00001010", count: 1 },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "n-1 = 9 = 0000 1001. n & (n-1) = 0000 1000 = 8. Cleared bit 1. count=2.",
              variables: { n: "8", binary: "00001000", count: 2 },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "n-1 = 7 = 0000 0111. n & (n-1) = 0. Cleared bit 3. count=3. n=0 → stop.",
              variables: { n: "0", binary: "00000000", count: 3 },
              opCount: 3,
              done: true,
            },
          ],
        },
        {
          id: "builtin",
          name: "Built-in popcount",
          time: "O(1) word / O(n/word) array",
          space: "O(1)",
          opsEstimate: (n) => 1,
          defaultInput: { n: 11 },
          steps: [
            {
              id: 0,
              narration:
                "Use the CPU's hardware popcount: __builtin_popcount in C, Integer.bitCount in Java, bin(x).count('1') in Python.",
              variables: { n: "11", binary: "00001011" },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "Single instruction (POPCNT on x86) returns the Hamming weight.",
              variables: { n: "11", binary: "00001011", count: 3 },
              opCount: 1,
              done: true,
            },
          ],
        },
      ],
    },
    {
      slug: "reverse-bits",
      title: "Reverse Bits",
      difficulty: "Easy",
      status: "live",
      description:
        "Reverse the bits of a 32-bit unsigned integer.",
      problem:
        "Reverse the bits of a 32-bit unsigned integer. Example: input 43261596 (binary 00000010100101000001111010011100) → output 964176192 (binary 00111001011110000010100101000000). Edge cases: input 0 → 0, and inputs with trailing zeros that should become leading zeros in the result.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Apple"],
      code: {
        lang: "python",
        lines: [
          "def reverse_brute(n):",
          "    bits = []",
          "    while n > 0:",
          "        bits.append(n & 1)",
          "        n >>= 1",
          "    while len(bits) < 32: bits.append(0)",
          "    result = 0",
          "    for b in reversed(bits):",
          "        result = (result << 1) | b",
          "    return result",
        ],
      },
      annotations: {
        1: "Brute: collect bits, then reverse them. O(32) but uses O(32) memory.",
      },
      approaches: [
        {
          id: "bit-by-bit",
          name: "Bit-by-bit",
          time: "O(1) — 32 iters",
          space: "O(1)",
          opsEstimate: (n) => 32,
          defaultInput: { n: 0b00000010100101000001111010011100 },
          steps: [
            {
              id: 0,
              narration:
                "Walk 32 positions. Extract the lowest bit of n with (n & 1), shift it into the result.",
              variables: {
                n: "00000010100101000001111010011100",
                result: "00000000000000000000000000000000",
              },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "i=0: n&1 = 0. result = (result<<1) | 0. n >>= 1.",
              variables: {
                n: "00000001010010100000111101001110",
                result: "00000000000000000000000000000000",
              },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "i=1: n&1 = 0. result = 0. n >>= 1.",
              variables: {
                n: "00000000101001010000011110100111",
                result: "00000000000000000000000000000000",
              },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "i=2: n&1 = 1. result = (0<<1) | 1 = 1. n >>= 1.",
              variables: {
                n: "00000000010100101000001111010011",
                result: "00000000000000000000000000000001",
              },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "i=3: n&1 = 1. result = (1<<1) | 1 = 3. n >>= 1.",
              variables: {
                n: "00000000001010010100000111101001",
                result: "00000000000000000000000000000011",
              },
              opCount: 4,
            },
            {
              id: 5,
              narration:
                "…continue for all 32 bits. Final result = 00111001011110000010100101000000 (decimal 964176192).",
              variables: {
                result: "00111001011110000010100101000000",
                decimal: "964176192",
              },
              opCount: 32,
              done: true,
            },
          ],
        },
        {
          id: "divide-conquer",
          name: "Divide & Conquer (swap pairs)",
          time: "O(1) — 5 passes",
          space: "O(1)",
          opsEstimate: (n) => 5,
          defaultInput: { n: 0b00000010100101000001111010011100 },
          steps: [
            {
              id: 0,
              narration:
                "Swap bits in pairs, then quadruples, then octets, etc. After 5 passes, bits are fully reversed.",
              variables: {
                n: "00000010100101000001111010011100",
              },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "Swap odd/even: n = ((n & 0xAAAAAAAA) >>> 1) | ((n & 0x55555555) << 1).",
              variables: { n: "00000001010010100000111101001110", pass: "swap 1-bit pairs" },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "Swap 2-bit chunks: n = ((n & 0xCCCCCCCC) >>> 2) | ((n & 0x33333333) << 2).",
              variables: { n: "00000101001010000011110100111000", pass: "swap 2-bit chunks" },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "Swap 4-bit chunks: n = ((n & 0xF0F0F0F0) >>> 4) | ((n & 0x0F0F0F0F) << 4).",
              variables: { n: "10100101000001111010011100000000", pass: "swap 4-bit nibbles" },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "Swap bytes: n = ((n & 0xFF00FF00) >>> 8) | ((n & 0x00FF00FF) << 8).",
              variables: { n: "00011110100111000000101001010000", pass: "swap bytes" },
              opCount: 4,
            },
            {
              id: 5,
              narration:
                "Swap halves: n = (n >>> 16) | (n << 16). Final result = 00111001011110000010100101000000.",
              variables: {
                n: "00111001011110000010100101000000",
                result: "964176192",
                pass: "swap 16-bit halves",
              },
              opCount: 5,
              done: true,
            },
          ],
        },
      ],
    },
    {
      slug: "missing-number",
      title: "Missing Number",
      difficulty: "Easy",
      status: "live",
      description: "Find the missing number in [0..n] given n distinct numbers.",
      problem:
        "Given an array `nums` containing n distinct numbers taken from the range `[0, n]`, return the single number that is missing from the array. Example: `[3,0,1]` → 2; `[0,1]` → 2 (n=2, range 0..2). Edge cases: missing number is 0 (array is `[1,2,3]`), missing number is n (array is `[0,1,2]`), and arrays of length 1.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Apple"],
      code: {
        lang: "python",
        lines: [
          "def missing_brute(nums):",
          "    n = len(nums)",
          "    for i in range(n + 1):",
          "        if i not in nums: return i",
        ],
      },
      annotations: {
        1: "Brute: scan [0..n] and look up each — O(n²).",
      },
      approaches: [
        {
          id: "xor",
          name: "XOR",
          time: "O(n)",
          space: "O(1)",
          opsEstimate: (n) => n,
          defaultInput: { array: [3, 0, 1] },
          steps: [
            { id: 0, narration: "x = 0..n XORed with all nums. Duplicates cancel; missing x's out.", variables: { x: 0, expected: "[0,1,2,3]" }, opCount: 0 },
            { id: 1, narration: "x ^= 0 → 0. x ^= 3 → 3.", variables: { x: 3 }, pointers: { i: 0 }, highlight: [0], opCount: 1 },
            { id: 2, narration: "x ^= 1 → 2. x ^= 0 → 2.", variables: { x: 2 }, pointers: { i: 1 }, opCount: 2 },
            { id: 3, narration: "x ^= 1 → 3. Expected XOR missing left x = 2. Answer = 2.", variables: { x: 2, answer: 2 }, opCount: 3, done: true },
          ],
        },
        {
          id: "sum",
          name: "Sum Formula",
          time: "O(n)",
          space: "O(1)",
          opsEstimate: (n) => n,
          defaultInput: { array: [3, 0, 1] },
          steps: [
            { id: 0, narration: "Sum 0..n = n(n+1)/2 = 3*4/2 = 6.", variables: { expected: 6 }, opCount: 0 },
            { id: 1, narration: "Sum of nums = 4.", variables: { actual: 4 }, opCount: 1 },
            { id: 2, narration: "Missing = 6 - 4 = 2.", variables: { answer: 2 }, opCount: 2, done: true },
          ],
        },
      ],
    },
    {
      slug: "sum-of-two-ints",
      title: "Sum of Two Integers",
      difficulty: "Medium",
      status: "live",
      description: "Compute a+b without using + or - operators.",
      problem:
        "Given two integers a and b, return the sum of the two integers without using the + or - operators. The function should handle negative numbers (in two's complement). Example: a=2, b=3 → 5; a=-1, b=1 → 0. Edge cases: one input is zero, both inputs at the boundaries of 32-bit signed integers, and inputs that cause carry chains.",
      askedAt: ["Microsoft", "Amazon", "Meta"],
      code: {
        lang: "python",
        lines: [
          "def add(a, b):",
          "    while b != 0:",
          "        carry = a & b",
          "        a = a ^ b",
          "        b = carry << 1",
          "    return a",
        ],
      },
      annotations: {
        2: "Add without +: a XOR b = bits without carry, then carry = a & b << 1.",
        3: "Repeat with the carry until no bits propagate.",
      },
      approaches: [
        {
          id: "bit-add",
          name: "Bitwise Add with Carry",
          time: "O(1) per bit, O(32) total",
          space: "O(1)",
          opsEstimate: (n) => 32,
          defaultInput: { a: 2, b: 3 },
          steps: [
            { id: 0, narration: "a=2 (10), b=3 (11). carry = 10 & 11 = 10 (decimal 2). a = 10 ^ 11 = 01 (1). b = 2.", variables: { a: 2, b: 3 }, opCount: 0 },
            { id: 1, narration: "a=1, b=2. carry = 1 & 2 = 0. a = 1 ^ 2 = 3. b = 0.", variables: { a: 1, b: 2 }, opCount: 1 },
            { id: 2, narration: "b=0 → loop ends. Answer = 3.", variables: { answer: 3 }, opCount: 2, done: true },
          ],
        },
        {
          id: "sub-with-borrow",
          name: "Subtraction (a - b)",
          time: "O(1) per bit",
          space: "O(1)",
          opsEstimate: (n) => 32,
          defaultInput: { a: 7, b: 3 },
          steps: [
            { id: 0, narration: "Sub with borrow: borrow = (~a & b) << 1. a = a ^ b. b = borrow.", variables: { a: 7, b: 3 }, opCount: 0 },
            { id: 1, narration: "a=7^3=4. borrow = (~7 & 3) << 1 = 0. Loop ends. Answer = 4.", variables: { answer: 4 }, opCount: 1, done: true },
          ],
        },
      ],
    },
  ],
};
