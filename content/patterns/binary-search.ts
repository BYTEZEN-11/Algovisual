import type { Pattern } from "@/types/content";

export const binarySearch: Pattern = {
  slug: "binary-search",
  title: "Binary Search",
  tagline: "Halve the search space each iteration.",
  status: "live",
  icon: "Search",
  topics: [
    {
      slug: "classic-bs",
      title: "Classic Binary Search",
      difficulty: "Easy",
      status: "live",
      description: "Find target in a sorted array, return -1 if absent.",
      problem:
        "Given an array of integers `nums` sorted in non-decreasing order and an integer `target`, write a function to search `target` inside `nums`. If `target` exists, return its index; otherwise return -1. The algorithm must run in O(log n) time. Example: `nums=[-1,0,3,5,9,12], target=9` → 4; `target=2` → -1. Edge cases: empty array (return -1), target equals the first/last element, and duplicates (any matching index is fine).",
      askedAt: ["Amazon", "Microsoft", "Meta", "Apple"],
      code: {
        lang: "python",
        lines: [
          "def search_brute(nums, target):",
          "    for i in range(len(nums)):",
          "        if nums[i] == target:",
          "            return i",
          "    return -1",
        ],
      },
      annotations: {
        1: "Brute: scan every element until found. Loses the O(log n) on sorted input.",
      },
      approaches: [
        {
          id: "binary",
          name: "Binary Search",
          time: "O(log n)",
          space: "O(1)",
          opsEstimate: (n) => Math.log2(Math.max(n, 2)),
          defaultInput: { array: [1, 3, 5, 7, 9, 11, 13], target: 7 },
          steps: [
            { id: 0, narration: "L=0, R=6. mid=3. arr[3]=7 == target. Found!", pointers: { L: 0, R: 6, mid: 3 }, highlight: [3], variables: { arr: "[1,3,5,7,…]" }, opCount: 1, done: true },
          ],
        },
      ],
    },
    {
      slug: "search-rotated",
      title: "Search in Rotated Sorted Array",
      difficulty: "Medium",
      status: "live",
      description: "Find target in a sorted array that has been rotated at some pivot.",
      problem:
        "There is an integer array `nums` sorted in non-decreasing order, but it is rotated at an unknown pivot. Given the rotated array and a `target`, return the index of `target` if it is in `nums`, else -1. The runtime must be O(log n). Example: `nums=[4,5,6,7,0,1,2], target=0` → 4. Edge cases: not rotated (`[1,2,3,4,5]`), target smaller than the minimum, target larger than the maximum, and inputs with duplicates.",
      askedAt: ["Amazon", "Microsoft", "Meta", "LinkedIn", "Bloomberg"],
      code: {
        lang: "python",
        lines: [
          "def search_rotated_brute(nums, target):",
          "    for i in range(len(nums)):",
          "        if nums[i] == target:",
          "            return i",
          "    return -1",
        ],
      },
      annotations: {
        1: "Brute: linear scan — works but loses the O(log n) for sorted arrays.",
      },
      approaches: [
        {
          id: "binary",
          name: "Binary Search",
          time: "O(log n)",
          space: "O(1)",
          opsEstimate: (n) => Math.log2(Math.max(n, 2)),
          defaultInput: { array: [4, 5, 6, 7, 0, 1, 2], target: 0 },
          steps: [
            { id: 0, narration: "L=0, R=6. mid=3. arr[3]=7.", pointers: { L: 0, R: 6, mid: 3 }, highlight: [3], opCount: 1 },
            { id: 1, narration: "arr[L]=4 > arr[mid]=7? No. Target 0 < 7 → search left.", pointers: { L: 0, R: 2, mid: 1 }, highlight: [0, 1, 2], opCount: 2 },
            { id: 2, narration: "arr[L]=4 > arr[mid]=5? No. Target 0 < 5 → search left. L=0,R=0,mid=0.", pointers: { L: 0, R: 0, mid: 0 }, highlight: [0], opCount: 3 },
            { id: 3, narration: "arr[0]=4 ≠ 0. But L>R now — actually shrink further: target < arr[mid]? No, target=0 < arr[mid]=4 → R=mid-1=-1. Not found.", variables: { found: "-1" }, opCount: 4 },
            { id: 4, narration: "Reframe: in original array, 0 is at idx 4. After first step, since arr[L]=4 > arr[mid]=7 is false AND target(0) < arr[mid](7), search left half [0..2]. There: arr[L]=4 ≤ arr[mid]=5, target=0 < arr[mid]=5 → search left half [0..0]. arr[0]=4 ≠ 0 → not in [0..0]. Try [4..6]: L=4,R=6,mid=5 arr[5]=1. arr[mid]=1 < arr[R]=2 (left sorted). target=0 < arr[mid]=1 → R=4,m=4 arr[4]=0 == target. Found.", pointers: { L: 4, R: 6, mid: 4 }, highlight: [4], variables: { found: 4 }, opCount: 5, done: true },
          ],
        },
      ],
    },
    {
      slug: "find-min-rotated",
      title: "Find Minimum in Rotated Sorted Array",
      difficulty: "Medium",
      status: "live",
      description: "Find the minimum element in a sorted-and-rotated array with no duplicates.",
      problem:
        "Suppose an array of length n sorted in non-decreasing order is rotated between 1 and n times. Find the minimum element. The array has no duplicates. The runtime must be O(log n). Example: `[3,4,5,1,2]` → 1; `[4,5,6,7,0,1,2]` → 0. Edge cases: original (un-rotated) array, rotated exactly once, and a single-element array.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Bloomberg"],
      code: {
        lang: "python",
        lines: [
          "def find_min_brute(nums):",
          "    return min(nums)",
        ],
      },
      annotations: {
        1: "Brute: linear scan to find the minimum — O(n).",
      },
      approaches: [
        {
          id: "binary",
          name: "Binary Search",
          time: "O(log n)",
          space: "O(1)",
          opsEstimate: (n) => Math.log2(Math.max(n, 2)),
          defaultInput: { array: [3, 4, 5, 1, 2] },
          steps: [
            { id: 0, narration: "L=0, R=4. mid=2. arr[2]=5.", pointers: { L: 0, R: 4, mid: 2 }, highlight: [2], opCount: 1 },
            { id: 1, narration: "arr[mid]=5 > arr[R]=2 → min is on the right. L=3.", pointers: { L: 3, R: 4, mid: 3 }, highlight: [3, 4], opCount: 2 },
            { id: 2, narration: "mid=3. arr[3]=1 ≤ arr[R]=2. mid might be min. R=3.", pointers: { L: 3, R: 3, mid: 3 }, highlight: [3], opCount: 3 },
            { id: 3, narration: "L==R. arr[L]=1 is the minimum.", pointers: { L: 3, R: 3 }, variables: { min: 1 }, opCount: 4, done: true },
          ],
        },
      ],
    },
    {
      slug: "koko-bananas",
      title: "Koko Eating Bananas",
      difficulty: "Medium",
      status: "live",
      description: "Find the minimum eating speed Koko needs to finish all banana piles within h hours.",
      problem:
        "Koko loves bananas. There are n piles of bananas, the i-th pile has `piles[i]` bananas. The guards have gone and will return in `h` hours. Koko eats at a constant speed of `k` bananas per hour. Each hour she chooses some pile and eats `k` bananas from it. If the pile has fewer than `k` bananas, she eats the whole pile and waits (wasted time) the rest of the hour. Return the minimum integer `k` such that she can eat all bananas within `h`. Example: `piles=[3,6,7,11], h=8` → 4. Edge cases: h equals number of piles (k = max piles), h just barely enough, and extremely large piles with small h.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Google"],
      code: {
        lang: "python",
        lines: [
          "def koko_brute(piles, h):",
          "    speed = 1",
          "    while True:",
          "        hours = sum((p + speed - 1) // speed for p in piles)",
          "        if hours <= h: return speed",
          "        speed += 1",
        ],
      },
      annotations: {
        4: "For each candidate speed, simulate how long it takes.",
        5: "Linear search from speed=1 upward — O(M * n) where M = max(piles).",
      },
      approaches: [
        {
          id: "binary-search-speed",
          name: "Binary Search on Speed",
          time: "O(n log M)",
          space: "O(1)",
          opsEstimate: (n) => n * Math.log2(Math.max(n, 2)),
          defaultInput: { piles: [3, 6, 7, 11], h: 8 },
          steps: [
            { id: 0, narration: "lo=1, hi=max(piles)=11. Binary search.", variables: { lo: 1, hi: 11 }, pointers: { lo: 1, hi: 11 }, opCount: 0 },
            { id: 1, narration: "mid=6. hours = ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6)=1+1+2+2=6 ≤ 8. hi=mid=6.", variables: { mid: 6, hours: 6 }, pointers: { lo: 1, hi: 6 }, highlight: [0, 1, 2, 3], opCount: 1 },
            { id: 2, narration: "mid=3. hours = 1+2+3+4 = 10 > 8. lo=4.", variables: { mid: 3, hours: 10 }, pointers: { lo: 4, hi: 6 }, opCount: 2 },
            { id: 3, narration: "mid=5. hours=1+2+2+3=8 ≤ 8. hi=5.", variables: { mid: 5, hours: 8 }, pointers: { lo: 4, hi: 5 }, opCount: 3 },
            { id: 4, narration: "mid=4. hours = 1+2+2+3 = 8 ≤ 8. hi=4.", variables: { mid: 4, hours: 8 }, pointers: { lo: 4, hi: 4 }, opCount: 4 },
            { id: 5, narration: "lo==hi=4. Answer = 4.", variables: { answer: 4 }, opCount: 5, done: true },
          ],
        },
        {
          id: "compute-hours",
          name: "Hour-Count Helper",
          time: "O(n) per call",
          space: "O(1)",
          opsEstimate: (n) => n,
          defaultInput: { piles: [3, 6, 7, 11], h: 8 },
          steps: [
            { id: 0, narration: "Helper hours(speed): sum(ceil(p/speed) for p in piles).", variables: { formula: "Σceil(p/s)" }, opCount: 0 },
            { id: 1, narration: "hours(4) = 1+2+2+3 = 8 ≤ 8. Test.", variables: { hours: 8 }, opCount: 1, done: true },
          ],
        },
      ],
    },
    {
      slug: "search-2d-matrix",
      title: "Search a 2D Matrix",
      difficulty: "Medium",
      status: "live",
      description: "Search target in a row-and-column sorted 2D matrix.",
      problem:
        "Write an efficient algorithm that searches for a value `target` in an m x n integer matrix `matrix` with the following properties: each row is sorted in non-decreasing order and the first integer of each row is greater than the last integer of the previous row. Example: `matrix=[[1,3,5,7],[10,11,16,20],[23,30,34,60]], target=3` → true. Edge cases: target smaller than the minimum, larger than maximum, single row matrix, and single column matrix.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Bloomberg"],
      code: {
        lang: "python",
        lines: [
          "def search_brute(matrix, target):",
          "    for row in matrix:",
          "        for v in row:",
          "            if v == target: return True",
          "    return False",
        ],
      },
      annotations: {
        1: "Brute: linear scan over every cell of the matrix.",
      },
      approaches: [
        {
          id: "binary-each-row",
          name: "Binary Search Per Row",
          time: "O(m log n)",
          space: "O(1)",
          opsEstimate: (n) => n * Math.log2(Math.max(n, 2)),
          defaultInput: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 3 },
          steps: [
            { id: 0, narration: "For each row, binary search. Stop early when row start > target.", variables: { row: 0 }, pointers: { row: 0 }, opCount: 0 },
            { id: 1, narration: "Row 0 [1,3,5,7]. mid=5; target=3 < 5 → search left. Found 3.", variables: { row: 0, found: "true" }, highlight: [1], opCount: 1, done: true },
          ],
        },
        {
          id: "flattened-bs",
          name: "Flattened Binary Search",
          time: "O(log(m*n))",
          space: "O(1)",
          opsEstimate: (n) => Math.log2(Math.max(n, 2)),
          defaultInput: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 3 },
          steps: [
            { id: 0, narration: "Treat matrix as a 1-D array of length m*n. lo=0, hi=11.", variables: { lo: 0, hi: 11 }, pointers: { lo: 0, hi: 11 }, opCount: 0 },
            { id: 1, narration: "mid=5 → cell (1,1)=11. target=3 < 11 → hi=4.", variables: { mid: 5 }, pointers: { lo: 0, hi: 4 }, opCount: 1 },
            { id: 2, narration: "mid=2 → cell (0,2)=5. target < 5 → hi=1.", variables: { mid: 2 }, pointers: { lo: 0, hi: 1 }, opCount: 2 },
            { id: 3, narration: "mid=0 → cell (0,0)=1. target > 1 → lo=1.", variables: { mid: 0 }, pointers: { lo: 1, hi: 1 }, opCount: 3 },
            { id: 4, narration: "mid=1 → cell (0,1)=3 == target. Found.", variables: { mid: 1, answer: "true" }, highlight: [1], opCount: 4, done: true },
          ],
        },
      ],
    },
    {
      slug: "split-array-largest-sum",
      title: "Split Array Largest Sum",
      difficulty: "Hard",
      status: "live",
      description: "Split array into m subarrays minimizing the largest subarray sum.",
      problem:
        "Given an integer array `nums` and an integer `m`, split `nums` into `m` non-empty continuous subarrays such that the largest sum among these subarrays is minimized. Return the minimized largest sum. Example: `nums=[7,2,5,10,8], m=2` → 18 (split as [7,2,5] + [10,8]). Edge cases: m = 1 (return sum of all), m = len(nums) (return max element), and arrays with very large elements.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Google"],
      code: {
        lang: "python",
        lines: [
          "def split_brute(nums, m):",
          "    from functools import lru_cache",
          "    n = len(nums)",
          "    @lru_cache(None)",
          "    def dp(i, k):",
          "        if k == 1: return sum(nums[i:])",
          "        best = float('inf')",
          "        for j in range(i + 1, n - k + 2):",
          "            cur = max(sum(nums[i:j]), dp(j, k - 1))",
          "            best = min(best, cur)",
          "        return best",
          "    return dp(0, m)",
        ],
      },
      annotations: {
        5: "Base: last partition — must take all remaining elements.",
        7: "Try every split point j and take the worst (max) of the left and the rest.",
        8: "Best = min over all split points.",
      },
      approaches: [
        {
          id: "binary-search-bound",
          name: "Binary Search on the Bound",
          time: "O(n log sum)",
          space: "O(1)",
          opsEstimate: (n) => n * Math.log2(Math.max(n, 2)),
          defaultInput: { array: [7, 2, 5, 10, 8], m: 2 },
          steps: [
            { id: 0, narration: "lo=max(nums)=10, hi=sum(nums)=32. Binary search the cap.", variables: { lo: 10, hi: 32 }, opCount: 0 },
            { id: 1, narration: "mid=21. Need to split. Greedy: 7+2+5=14, +10=24>21. Start new: [14],[10,12?]. 8 fits → [14],[18]. count=2 ≤ m=2. hi=21.", variables: { mid: 21, splits: 2 }, opCount: 1 },
            { id: 2, narration: "mid=15. Greedy: [7,2,5]->14, +10 new → [14],[10]. 8 in second: 18>15 new → [14],[10],[8]. count=3 > 2. lo=16.", variables: { mid: 15, splits: 3 }, opCount: 2 },
            { id: 3, narration: "mid=18. Greedy: [7,2,5]->14, +10=24>18 new → [14],[10,8]=18. count=2 ≤ 2. hi=18.", variables: { mid: 18, splits: 2 }, opCount: 3 },
            { id: 4, narration: "mid=17. [7,2,5,2]=16 — wait [7,2,5]+10=24>17 new → [14],[10,8]=18>17 new → [14],[10],[8]. count=3>2. lo=18.", variables: { mid: 17, splits: 3 }, opCount: 4 },
            { id: 5, narration: "lo==hi=18. Answer=18.", variables: { answer: 18 }, opCount: 5, done: true },
          ],
        },
        {
          id: "dp-top-down",
          name: "DP (recursive)",
          time: "O(n²·m)",
          space: "O(n·m)",
          opsEstimate: (n) => n * n,
          defaultInput: { array: [7, 2, 5, 10, 8], m: 2 },
          steps: [
            { id: 0, narration: "dp[i][k] = min largest sum splitting nums[i:] into k parts.", variables: { dp: "{}" }, opCount: 0 },
            { id: 1, narration: "dp[0][2] = min over j: max(sum(nums[0:j]), dp[j][1]).", variables: { dp: "{}" }, opCount: 1 },
            { id: 2, narration: "Try j=3 → max(14, dp[3][1]=18) = 18. Try j=1 → max(7, 25)=25. Min = 18.", variables: { dp: "{0,2:18}" }, opCount: 2, done: true },
          ],
        },
      ],
    },
    {
      slug: "kth-smallest-matrix",
      title: "Kth Smallest Element in a Sorted Matrix",
      difficulty: "Medium",
      status: "live",
      description: "Find the kth smallest element in a row-and-column sorted matrix.",
      problem:
        "Given an n x n matrix `matrix` where each of the rows and columns is sorted in non-decreasing order, return the kth smallest element in the matrix. Note that it is the kth smallest in sorted order, not the kth distinct. Example: `matrix=[[1,5,9],[10,11,13],[12,13,15]], k=8` → 13. Edge cases: k = 1 (smallest), k = n² (largest), and matrices with many duplicates.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Google"],
      code: {
        lang: "python",
        lines: [
          "def kth_smallest_brute(matrix, k):",
          "    vals = []",
          "    for row in matrix:",
          "        vals.extend(row)",
          "    vals.sort()",
          "    return vals[k - 1]",
        ],
      },
      annotations: {
        4: "Brute: flatten, sort, return k-1 — works but O(n² log(n²)).",
      },
      approaches: [
        {
          id: "binary-count",
          name: "Binary Search + Count",
          time: "O(n log(max-min))",
          space: "O(1)",
          opsEstimate: (n) => n * Math.log2(Math.max(n, 2)),
          defaultInput: { matrix: [[1,5,9],[10,11,13],[12,13,15]], k: 8 },
          steps: [
            { id: 0, narration: "lo=1, hi=15. Binary search the value v; count elements ≤ v per row.", variables: { lo: 1, hi: 15 }, pointers: { lo: 1, hi: 15 }, opCount: 0 },
            { id: 1, narration: "v=8: row0 [1,5,9] → 2 ≤ 8. row1 [10,…]→0. row2 [12,…]→0. count=2 < k=8. lo=9.", variables: { v: 8, count: 2 }, pointers: { lo: 9, hi: 15 }, opCount: 1 },
            { id: 2, narration: "v=12: row0 [1,5,9]→3; row1 [10,11]→2; row2 [12]→1. count=6 < 8. lo=13.", variables: { v: 12, count: 6 }, pointers: { lo: 13, hi: 15 }, opCount: 2 },
            { id: 3, narration: "v=14: row0→3, row1→3, row2→3 (≤14) → count=9 ≥ 8. hi=13.", variables: { v: 14, count: 9 }, pointers: { lo: 13, hi: 13 }, opCount: 3 },
            { id: 4, narration: "lo==hi=13. Answer=13.", variables: { answer: 13 }, opCount: 4, done: true },
          ],
        },
        {
          id: "min-heap",
          name: "Min-Heap (k Pops)",
          time: "O(k log n)",
          space: "O(n)",
          opsEstimate: (n) => n,
          defaultInput: { matrix: [[1,5,9],[10,11,13],[12,13,15]], k: 8 },
          steps: [
            { id: 0, narration: "Push first element from each row into a min-heap along with its (row, col) coord.", variables: { heap: "[(1,0,0),(10,1,0),(12,2,0)]" }, opCount: 0 },
            { id: 1, narration: "Pop 8 times. Pop order: 1, 5, 9, 10, 11, 12, 13, 13.", variables: { pops: "1,5,9,10,11,12,13,13" }, opCount: 1 },
            { id: 2, narration: "8th pop = 13. Answer = 13.", variables: { answer: 13 }, opCount: 2, done: true },
          ],
        },
      ],
    },
  ],
};
