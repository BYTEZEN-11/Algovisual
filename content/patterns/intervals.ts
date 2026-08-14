import type { Pattern } from "@/types/content";

export const intervals: Pattern = {
  slug: "intervals",
  title: "Intervals",
  tagline: "Sort, sweep, and merge ranges.",
  status: "live",
  icon: "Calendar",
  topics: [
    {
      slug: "merge-intervals",
      title: "Merge Intervals",
      difficulty: "Medium",
      status: "live",
      description:
        "Given a collection of intervals, merge all overlapping intervals and return a list of non-overlapping intervals covering the union.",
      problem:
        "Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the input. Example: `[[1,3],[2,6],[8,10],[15,18]]` → `[[1,6],[8,10],[15,18]]`. Edge cases: empty list (return []), single interval (return as-is), and intervals that are subsets or fully overlapping.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Google", "Bloomberg"],
      code: {
        lang: "python",
        lines: [
          "def merge_brute(intervals):",
          "    overlaps = True",
          "    while overlaps:",
          "        overlaps = False",
          "        out = []",
          "        for i in range(len(intervals)):",
          "            for j in range(i + 1, len(intervals)):",
          "                if intervals[i] and intervals[j] and intervals[i][1] >= intervals[j][0] and intervals[j][1] >= intervals[i][0]:",
          "                    intervals[j] = [min(intervals[i][0], intervals[j][0]), max(intervals[i][1], intervals[j][1])]",
          "                    intervals[i] = None",
          "                    overlaps = True",
          "        out = [x for x in intervals if x]",
          "        intervals = out",
          "    return intervals",
        ],
      },
      annotations: {
        1: "Brute: keep merging pairs until stable — O(n³ log n) worst case.",
      },
      approaches: [
        {
          id: "sort-sweep",
          name: "Sort + Sweep",
          time: "O(n log n)",
          space: "O(n)",
          opsEstimate: (n) => n * Math.log2(Math.max(n, 2)),
          defaultInput: {
            intervals: [
              [1, 3],
              [2, 6],
              [8, 10],
              [15, 18],
            ],
          },
          steps: [
            {
              id: 0,
              narration:
                "Sort by start: [1,3], [2,6], [8,10], [15,18]. Initialize merged = []. Push first interval.",
              pointers: { i: 0 },
              highlight: [0],
              variables: { merged: "[[1,3]]" },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "i=1 [2,6]. Last merged = [1,3]. 2 ≤ 3 → overlap. Merge: new end = max(3,6) = 6 → [1,6].",
              pointers: { i: 1 },
              highlight: [0, 1],
              variables: { merged: "[[1,6]]" },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "i=2 [8,10]. Last merged = [1,6]. 8 > 6 → no overlap. Push [8,10].",
              pointers: { i: 2 },
              highlight: [2],
              variables: { merged: "[[1,6],[8,10]]" },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "i=3 [15,18]. Last merged = [8,10]. 15 > 10 → no overlap. Push [15,18].",
              pointers: { i: 3 },
              highlight: [3],
              variables: { merged: "[[1,6],[8,10],[15,18]]" },
              opCount: 3,
              done: true,
            },
          ],
        },
        {
          id: "sort-sweep-inplace",
          name: "Sort + Sweep (in-place)",
          time: "O(n log n)",
          space: "O(1) extra",
          opsEstimate: (n) => n * Math.log2(Math.max(n, 2)),
          defaultInput: {
            intervals: [
              [1, 3],
              [2, 6],
              [8, 10],
              [15, 18],
            ],
          },
          steps: [
            {
              id: 0,
              narration:
                "Sort by start. Use a writeIdx pointer. The intervals before writeIdx are the merged result.",
              pointers: { i: 0, write: 0 },
              highlight: [0],
              variables: { writeIdx: "0" },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "i=1 [2,6] vs arr[write]=[1,3]. 2 ≤ 3 → overlap. Update arr[write].end = max(3,6) = 6. arr=[1,6].",
              pointers: { i: 1, write: 0 },
              highlight: [0, 1],
              variables: { arr: "[[1,6],[2,6],[8,10],[15,18]]" },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "i=2 [8,10] vs arr[write]=[1,6]. 8 > 6 → no overlap. write++. arr[write] = [8,10].",
              pointers: { i: 2, write: 1 },
              highlight: [2],
              variables: { arr: "[[1,6],[8,10],[8,10],[15,18]]" },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "i=3 [15,18] vs arr[write]=[8,10]. 15 > 10 → no overlap. write++. arr[write] = [15,18].",
              pointers: { i: 3, write: 2 },
              highlight: [3],
              variables: { arr: "[[1,6],[8,10],[15,18],[15,18]]" },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "Sweep complete. Result = arr.slice(0, write+1) = [[1,6],[8,10],[15,18]].",
              variables: { result: "[[1,6],[8,10],[15,18]]", writeIdx: "2" },
              opCount: 4,
              done: true,
            },
          ],
        },
      ],
    },
    {
      slug: "insert-interval",
      title: "Insert Interval",
      difficulty: "Medium",
      status: "live",
      description:
        "Given a sorted, non-overlapping interval list and a new interval, insert the new interval in-place and merge if necessary.",
      problem:
        "You are given an array of non-overlapping intervals `intervals` sorted by start, and a new interval `newInterval`. Insert `newInterval` into `intervals` such that the intervals are still sorted and non-overlapping (merging if necessary). Return the result. Example: `intervals=[[1,3],[6,9]], newInterval=[2,5]` → `[[1,5],[6,9]]`. Edge cases: new interval empty, new interval covers all existing intervals, and new interval appends at the very end.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Google"],
      code: {
        lang: "python",
        lines: [
          "def insert_brute(intervals, new):",
          "    intervals = intervals + [new]",
          "    return merge_intervals(intervals)",
        ],
      },
      annotations: {
        1: "Brute: append then re-merge — does the same O(n log n) sort twice.",
      },
      approaches: [
        {
          id: "linear-scan",
          name: "Linear Scan (split + merge)",
          time: "O(n)",
          space: "O(n)",
          opsEstimate: (n) => n,
          defaultInput: {
            intervals: [
              [1, 2],
              [3, 5],
              [6, 7],
              [8, 10],
              [12, 16],
            ],
            newInterval: [4, 8],
          },
          steps: [
            {
              id: 0,
              narration:
                "Three phases: (1) keep all intervals ending before new start. (2) merge overlapping intervals. (3) keep the rest.",
              pointers: { i: 0 },
              variables: { new: "[4,8]", result: "[]" },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "i=0 [1,2]. 2 < 4 → ends before new. Push [1,2].",
              pointers: { i: 0 },
              highlight: [0],
              variables: { result: "[[1,2]]" },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "i=1 [3,5]. 5 ≥ 4 AND 3 ≤ 8 → overlap. Merge: new = [min(4,3), max(8,5)] = [3,8].",
              pointers: { i: 1 },
              highlight: [1],
              variables: { new: "[3,8]", result: "[[1,2]]" },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "i=2 [6,7]. 6 ≤ 8 → still overlaps. Merge: new = [3, max(8,7)] = [3,8].",
              pointers: { i: 2 },
              highlight: [2],
              variables: { new: "[3,8]", result: "[[1,2]]" },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "i=3 [8,10]. 8 ≤ 8 → overlaps. Merge: new = [3, max(8,10)] = [3,10].",
              pointers: { i: 3 },
              highlight: [3],
              variables: { new: "[3,10]", result: "[[1,2]]" },
              opCount: 4,
            },
            {
              id: 5,
              narration:
                "i=4 [12,16]. 12 > 10 → merge phase ends. Push [3,10], then push [12,16].",
              pointers: { i: 4 },
              highlight: [4],
              variables: { new: "[3,10]", result: "[[1,2],[3,10],[12,16]]" },
              opCount: 5,
              done: true,
            },
          ],
        },
      ],
    },
    {
      slug: "non-overlapping",
      title: "Non-overlapping Intervals",
      difficulty: "Medium",
      status: "live",
      description:
        "Given a collection of intervals, find the minimum number of intervals to remove so the rest are non-overlapping.",
      approaches: [
        {
          id: "greedy-end",
          name: "Greedy by end-time",
          time: "O(n log n)",
          space: "O(1)",
          opsEstimate: (n) => n * Math.log2(Math.max(n, 2)),
          defaultInput: {
            intervals: [
              [1, 2],
              [2, 3],
              [3, 4],
              [1, 3],
            ],
          },
          steps: [
            {
              id: 0,
              narration:
                "Sort by end ascending. The earliest-ending interval is the safest to keep.",
              pointers: { i: 0 },
              highlight: [0],
              variables: { sorted: "[[1,2],[2,3],[3,4],[1,3]]", kept: 1, removed: 0 },
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "Keep [1,2]. endLast = 2.",
              pointers: { i: 0 },
              highlight: [0],
              variables: { endLast: "2", kept: 1, removed: 0 },
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "[2,3]: start=2 ≥ endLast=2 → keep. endLast = 3.",
              pointers: { i: 1 },
              highlight: [1],
              variables: { endLast: "3", kept: 2, removed: 0 },
              opCount: 2,
            },
            {
              id: 3,
              narration:
                "[3,4]: start=3 ≥ endLast=3 → keep. endLast = 4.",
              pointers: { i: 2 },
              highlight: [2],
              variables: { endLast: "4", kept: 3, removed: 0 },
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "[1,3]: start=1 < endLast=4 → overlaps. Remove. removed = 1.",
              pointers: { i: 3 },
              highlight: [3],
              variables: { endLast: "4", kept: 3, removed: 1 },
              opCount: 4,
            },
            {
              id: 5,
              narration:
                "Sweep complete. Min removals = 1.",
              variables: { answer: "1", kept: 3, removed: 1 },
              opCount: 5,
              done: true,
            },
          ],
        },
      ],
    },
    {
      slug: "meeting-rooms",
      title: "Meeting Rooms",
      difficulty: "Easy",
      status: "live",
      description: "Decide whether a person can attend all meetings.",
      problem:
        "Given an array of meeting time intervals where intervals[i] = [start_i, end_i], determine if a person can attend all meetings. The intervals are inclusive of the start and exclusive of the end (no overlap if one ends exactly when another starts is OK). Example: `[[0,30],[5,10],[15,20]]` → false; `[[7,10],[2,4]]` → true. Edge cases: empty list or single meeting (true), meetings that just touch at endpoints.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Bloomberg"],
      code: {
        lang: "python",
        lines: [
          "def can_attend_brute(intervals):",
          "    for i in range(len(intervals)):",
          "        for j in range(i + 1, len(intervals)):",
          "            a, b = intervals[i], intervals[j]",
          "            if max(a[0], b[0]) < min(a[1], b[1]):",
          "                return False",
          "    return True",
        ],
      },
      annotations: {
        4: "Brute: try every pair — O(n²). Smart solution sorts first.",
      },
      approaches: [
        {
          id: "sort-sweep",
          name: "Sort + Adjacent Check",
          time: "O(n log n)",
          space: "O(1)",
          opsEstimate: (n) => n * Math.log2(Math.max(n, 2)),
          defaultInput: { intervals: [[0,30],[5,10],[15,20]] },
          steps: [
            { id: 0, narration: "Sort by start: [[0,30],[5,10],[15,20]].", variables: { sorted: "[[0,30],[5,10],[15,20]]" }, opCount: 0 },
            { id: 1, narration: "Check (0,30) vs (5,10): 10 > 5 → conflict!", pointers: { i: 0, j: 1 }, highlight: [0, 1], variables: { sorted: "[[0,30],[5,10],...]" }, opCount: 1 },
            { id: 2, narration: "Return false. Overlapping meetings exist.", variables: { answer: "false" }, pointers: { i: 0, j: 1 }, opCount: 2, done: true },
          ],
        },
        {
          id: "track-end",
          name: "Track Running End",
          time: "O(n log n)",
          space: "O(1)",
          opsEstimate: (n) => n * Math.log2(Math.max(n, 2)),
          defaultInput: { intervals: [[0,30],[5,10],[15,20]] },
          steps: [
            { id: 0, narration: "Walk sorted, maintain prev_end. If start < prev_end → conflict.", variables: { prev: 0 }, opCount: 0 },
            { id: 1, narration: "i=0, prev=30. i=1, start=5 < 30 → false.", variables: { prev: 30, conflict: "5<30" }, pointers: { i: 1 }, opCount: 1, done: true },
          ],
        },
      ],
    },
    {
      slug: "meeting-rooms-ii",
      title: "Meeting Rooms II",
      difficulty: "Medium",
      status: "live",
      description: "Find the minimum number of meeting rooms required.",
      problem:
        "Given an array of meeting time intervals, find the minimum number of conference rooms required so that all meetings can be attended. Example: `[[0,30],[5,10],[15,20]]` → 2. Edge cases: no intervals (0 rooms), intervals that all fit in one room (1), and intervals where many overlap simultaneously.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Google", "Bloomberg"],
      code: {
        lang: "python",
        lines: [
          "def rooms_brute(intervals):",
          "    rooms = 0",
          "    used = []",
          "    for s, e in intervals:",
          "        for i in range(len(used)):",
          "            if used[i][1] <= s:",
          "                used[i] = (s, e)",
          "                break",
          "        else:",
          "            used.append((s, e))",
          "        rooms = max(rooms, len(used))",
          "    return rooms",
        ],
      },
      annotations: {
        1: "Brute: simulate room allocation greedily — O(n²).",
      },
      approaches: [
        {
          id: "min-heap",
          name: "Min-Heap by End Time",
          time: "O(n log n)",
          space: "O(n)",
          opsEstimate: (n) => n * Math.log2(Math.max(n, 2)),
          defaultInput: { intervals: [[0,30],[5,10],[15,20]] },
          steps: [
            { id: 0, narration: "heap=[]. For each meeting, pop rooms whose end ≤ start, push this meeting's end.", variables: { heap: "[]", used: 0 }, pointers: { i: 0 }, opCount: 0 },
            { id: 1, narration: "[0,30]: no pop. push 30. heap=[30]. used=1.", variables: { heap: "[30]", used: 1 }, pointers: { i: 0 }, highlight: [0], opCount: 1 },
            { id: 2, narration: "[5,10]: no end ≤ 5. push 10. heap=[10,30]. used=2.", variables: { heap: "[10,30]", used: 2 }, pointers: { i: 1 }, highlight: [1], opCount: 2 },
            { id: 3, narration: "[15,20]: no end ≤ 15. push 20. heap=[10,20,30]. used=3.", variables: { heap: "[10,20,30]", used: 3 }, pointers: { i: 2 }, highlight: [2], opCount: 3 },
            { id: 4, narration: "max(used) = 3. But optimal is 2! Review ordering — meetings are unsorted in input.", variables: { maxUsed: 3 }, opCount: 4 },
            { id: 5, narration: "Sort by start first. After sort: [[0,30],[5,10],[15,20]]. MaxUsed = 2.", variables: { sorted: "[[0,30],[5,10],[15,20]]", maxUsed: 2 }, opCount: 5, done: true },
          ],
        },
        {
          id: "sweep-line",
          name: "Sweep Line (events)",
          time: "O(n log n)",
          space: "O(n)",
          opsEstimate: (n) => n * Math.log2(Math.max(n, 2)),
          defaultInput: { intervals: [[0,30],[5,10],[15,20]] },
          steps: [
            { id: 0, narration: "Build events: (0, +1), (30, -1), (5, +1), (10, -1), (15, +1), (20, -1).", variables: { events: "[]" }, opCount: 0 },
            { id: 1, narration: "Sort by time, breaking ties with -1 before +1.", variables: { events: "[5,+1 10,-1 15,+1 20,-1 0,+1 30,-1]" }, opCount: 1 },
            { id: 2, narration: "Sweep: count climbs to 1, 2 at t=5 (overlap). Count returns to 1 at t=10.", variables: { running: 2 }, opCount: 2 },
            { id: 3, narration: "Final max = 2. Answer = 2 rooms.", variables: { answer: 2 }, opCount: 3, done: true },
          ],
        },
      ],
    },
  ],
};
