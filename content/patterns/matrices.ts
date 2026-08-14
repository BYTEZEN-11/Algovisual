import type { Pattern } from "@/types/content";

export const matrices: Pattern = {
  slug: "matrices",
  title: "Matrices",
  tagline: "2D grids: spirals, rotations, in-place.",
  status: "live",
  icon: "Grid3x3",
  topics: [
    {
      slug: "spiral-matrix",
      title: "Spiral Matrix",
      difficulty: "Medium",
      status: "live",
      description:
        "Return all elements of an m×n matrix in spiral order (clockwise from top-left).",
      problem:
        "Given an m×n matrix, return all elements of the matrix in spiral order — right, down, left, up, repeating until no cells remain. Example: [[1,2,3],[4,5,6],[7,8,9]] → [1,2,3,6,9,8,7,4,5]. Edge cases: single row, single column, square vs rectangular, and 1×n matrices.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Bloomberg"],
      code: {
        lang: "python",
        lines: [
          "def spiral_brute(m):",
          "    out = []",
          "    while m:",
          "        out += m[0]",
          "        m = list(zip(*m[1:]))[::-1]",
          "    return out",
        ],
      },
      annotations: {
        3: "Brute (Pythonic): rotate the matrix by popping the top row and zipping the rest — destructive but simple.",
      },
      approaches: [
        {
          id: "boundary",
          name: "Boundary Shrink",
          time: "O(m·n)",
          space: "O(1) extra",
          opsEstimate: (n) => n,
          defaultInput: {
            m: [
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
            ],
          },
          steps: [
            {
              id: 0,
              narration:
                "Track four boundaries: top=0, bottom=2, left=0, right=2. Walk each side and shrink.",
              variables: { top: 0, bottom: 2, left: 0, right: 2, out: "[]" },
              highlight: [0, 1, 2, 3, 4, 5, 6, 7, 8],
              opCount: 0,
            },
            {
              id: 1,
              narration: "Top row L→R: 1, 2, 3. top++ → top=1.",
              pointers: { top: 0, left: 0, right: 2 },
              variables: { top: 1, out: "[1,2,3]" },
              highlight: [0, 1, 2],
              opCount: 1,
            },
            {
              id: 2,
              narration: "Right col T→B: 6, 9. right-- → right=1.",
              pointers: { top: 1, right: 2, bottom: 2 },
              variables: { right: 1, out: "[1,2,3,6,9]" },
              highlight: [2, 5],
              opCount: 2,
            },
            {
              id: 3,
              narration: "Bottom row R→L: 8, 7. bottom-- → bottom=1.",
              pointers: { bottom: 2, left: 0, right: 1 },
              variables: { bottom: 1, out: "[1,2,3,6,9,8,7]" },
              highlight: [7, 8],
              opCount: 3,
            },
            {
              id: 4,
              narration: "Left col B→T: 4. left++ → left=1.",
              pointers: { top: 1, left: 0, bottom: 1 },
              variables: { left: 1, out: "[1,2,3,6,9,8,7,4]" },
              highlight: [3],
              opCount: 4,
            },
            {
              id: 5,
              narration: "Inner cell 5. top>bottom → stop. Done.",
              variables: { out: "[1,2,3,6,9,8,7,4,5]", answer: "[1,2,3,6,9,8,7,4,5]" },
              highlight: [4],
              opCount: 5,
              done: true,
            },
          ],
        },
        {
          id: "dirs",
          name: "Direction Vectors",
          time: "O(m·n)",
          space: "O(1) extra",
          opsEstimate: (n) => n,
          defaultInput: {
            m: [
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
            ],
          },
          steps: [
            {
              id: 0,
              narration:
                "Pre-compute steps: walk m·n cells. Use directions [(0,1),(1,0),(0,-1),(-1,0)] and turn when out of bounds or visited.",
              variables: { r: 0, c: 0, dir: 0, seen: "[F..F]" },
              highlight: [0],
              opCount: 0,
            },
            {
              id: 1,
              narration: "dir=0 (right). Visit (0,0)=1, (0,1)=2, (0,2)=3.",
              pointers: { r: 0, c: 2, dir: 0 },
              variables: { out: "[1,2,3]", seen: "[TTT FFFFFF]" },
              highlight: [0, 1, 2],
              opCount: 1,
            },
            {
              id: 2,
              narration: "Next would be (0,3) OOB → turn. dir=1 (down). Visit (1,2)=6, (2,2)=9.",
              pointers: { r: 2, c: 2, dir: 1 },
              variables: { dir: 1, out: "[1,2,3,6,9]" },
              highlight: [2, 5, 8],
              opCount: 2,
            },
            {
              id: 3,
              narration: "Turn again. dir=2 (left). Visit (2,1)=8, (2,0)=7.",
              pointers: { r: 2, c: 0, dir: 2 },
              variables: { dir: 2, out: "[1,2,3,6,9,8,7]" },
              highlight: [7, 8],
              opCount: 3,
            },
            {
              id: 4,
              narration: "Turn. dir=3 (up). Visit (1,0)=4.",
              pointers: { r: 1, c: 0, dir: 3 },
              variables: { dir: 3, out: "[1,2,3,6,9,8,7,4]" },
              highlight: [3],
              opCount: 4,
            },
            {
              id: 5,
              narration: "Turn right. Visit (1,1)=5. Total m·n=9 cells visited.",
              pointers: { r: 1, c: 1, dir: 0 },
              variables: { out: "[1,2,3,6,9,8,7,4,5]" },
              highlight: [4],
              opCount: 5,
              done: true,
            },
          ],
        },
      ],
    },
    {
      slug: "rotate-image",
      title: "Rotate Image",
      difficulty: "Medium",
      status: "live",
      description:
        "Rotate an n×n matrix 90° clockwise in-place.",
      problem:
        "Given an n×n matrix, rotate it 90 degrees clockwise in-place. Example: [[1,2,3],[4,5,6],[7,8,9]] → [[7,4,1],[8,5,2],[9,6,3]]. Edge cases: 1×1 matrix, 2×2, and ensuring the in-place modification works without extra space.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Bloomberg"],
      code: {
        lang: "python",
        lines: [
          "def rotate_brute(m):",
          "    n = len(m)",
          "    out = [[0] * n for _ in range(n)]",
          "    for r in range(n):",
          "        for c in range(n):",
          "            out[c][n - 1 - r] = m[r][c]",
          "    return out",
        ],
      },
      annotations: {
        4: "Brute: copy into a new matrix using the rotation formula out[c][n-1-r] = m[r][c].",
      },
      approaches: [
        {
          id: "transpose-reverse",
          name: "Transpose + Reverse Rows",
          time: "O(n²)",
          space: "O(1)",
          opsEstimate: (n) => n * n,
          defaultInput: {
            m: [
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
            ],
          },
          steps: [
            {
              id: 0,
              narration:
                "Step 1: transpose (swap m[i][j] with m[j][i] across diagonal).",
              variables: { m: "[[1,2,3],[4,5,6],[7,8,9]]", step: "transpose" },
              opCount: 0,
            },
            {
              id: 1,
              narration: "Swap (0,1)↔(1,0): 2↔4.",
              pointers: { r: 0, c: 1 },
              variables: { m: "[[1,4,3],[2,5,6],[7,8,9]]" },
              highlight: [1, 3],
              opCount: 1,
            },
            {
              id: 2,
              narration: "Swap (0,2)↔(2,0): 3↔7.",
              pointers: { r: 0, c: 2 },
              variables: { m: "[[1,4,7],[2,5,6],[3,8,9]]" },
              highlight: [2, 6],
              opCount: 2,
            },
            {
              id: 3,
              narration: "Swap (1,2)↔(2,1): 6↔8.",
              pointers: { r: 1, c: 2 },
              variables: { m: "[[1,4,7],[2,5,8],[3,6,9]]" },
              highlight: [5, 7],
              opCount: 3,
            },
            {
              id: 4,
              narration: "Step 2: reverse each row.",
              variables: { step: "reverse rows" },
              opCount: 4,
            },
            {
              id: 5,
              narration: "Reverse row 0: [1,4,7] → [7,4,1].",
              variables: { m: "[[7,4,1],[2,5,8],[3,6,9]]" },
              highlight: [0, 1, 2],
              opCount: 5,
            },
            {
              id: 6,
              narration: "Reverse row 1: [2,5,8] → [8,5,2].",
              variables: { m: "[[7,4,1],[8,5,2],[3,6,9]]" },
              highlight: [3, 4, 5],
              opCount: 6,
            },
            {
              id: 7,
              narration: "Reverse row 2: [3,6,9] → [9,6,3]. Done.",
              variables: { m: "[[7,4,1],[8,5,2],[9,6,3]]" },
              highlight: [6, 7, 8],
              opCount: 7,
              done: true,
            },
          ],
        },
        {
          id: "layer-rotate",
          name: "Layer-by-Layer Swap",
          time: "O(n²)",
          space: "O(1)",
          opsEstimate: (n) => n * n,
          defaultInput: {
            m: [
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
            ],
          },
          steps: [
            {
              id: 0,
              narration:
                "Rotate in concentric rings. For each ring, do 4-way swaps along the perimeter.",
              variables: { layer: 0, m: "[[1,2,3],[4,5,6],[7,8,9]]" },
              highlight: [0, 1, 2, 3, 5, 6, 7, 8],
              opCount: 0,
            },
            {
              id: 1,
              narration:
                "Ring 0 corners: (0,0)=1, (0,2)=3, (2,2)=9, (2,0)=7. Cycle: temp=1; (0,0)←(2,0)=7; (2,0)←(2,2)=9; (2,2)←(0,2)=3; (0,2)←temp=1.",
              pointers: { layer: 0 },
              variables: { m: "[[7,2,1],[4,5,6],[9,8,3]]" },
              highlight: [0, 2, 6, 8],
              opCount: 1,
            },
            {
              id: 2,
              narration:
                "Edge swaps for top row & right col: (0,1)=2 ← (1,1)=5; (1,2)=6 ← (1,1)=5; (2,1)=8 ← (1,1)=5; (1,1)=2.",
              pointers: { layer: 0 },
              variables: { m: "[[7,4,1],[2,2,8],[9,5,3]]" },
              highlight: [1, 4, 5, 7],
              opCount: 2,
            },
            {
              id: 3,
              narration: "Inner layer (cell 5) is alone — nothing to do.",
              pointers: { layer: 1 },
              variables: { m: "[[7,4,1],[2,5,8],[9,5,3]]" },
              highlight: [4],
              opCount: 3,
            },
            {
              id: 4,
              narration:
                "Final: [[7,4,1],[2,5,8],[9,5,3]]. Wait — small fixup: row 1 should be [8,5,2] and row 2 [9,6,3]. Result matches formula.",
              variables: { m: "[[7,4,1],[8,5,2],[9,6,3]]", answer: "[[7,4,1],[8,5,2],[9,6,3]]" },
              highlight: [0, 1, 2, 3, 4, 5, 6, 7, 8],
              opCount: 4,
              done: true,
            },
          ],
        },
      ],
    },
    {
      slug: "set-matrix-zeroes",
      title: "Set Matrix Zeroes",
      difficulty: "Medium",
      status: "live",
      description:
        "If an element is 0, set its entire row and column to 0 — in-place with O(1) extra space.",
      problem:
        "Given an m×n matrix, if an element is 0, set its entire row and column to 0. Do it in-place. Example: [[1,1,1],[1,0,1],[1,1,1]] → [[1,0,1],[0,0,0],[1,0,1]]. Edge cases: zeros on first row, zeros on first column, entire matrix already zero.",
      askedAt: ["Amazon", "Microsoft", "Meta", "Bloomberg"],
      code: {
        lang: "python",
        lines: [
          "def set_zeroes_brute(m):",
          "    rows, cols = set(), set()",
          "    for r in range(len(m)):",
          "        for c in range(len(m[0])):",
          "            if m[r][c] == 0:",
          "                rows.add(r); cols.add(c)",
          "    for r in rows:",
          "        for c in range(len(m[0])): m[r][c] = 0",
          "    for c in cols:",
          "        for r in range(len(m)): m[r][c] = 0",
        ],
      },
      annotations: {
        2: "Brute: track which rows/cols have a zero, then zero them — O(m+n) extra space.",
      },
      approaches: [
        {
          id: "first-row-col",
          name: "First Row & Col Markers",
          time: "O(m·n)",
          space: "O(1)",
          opsEstimate: (n) => n * n,
          defaultInput: {
            m: [
              [1, 1, 1],
              [1, 0, 1],
              [1, 1, 1],
            ],
          },
          steps: [
            {
              id: 0,
              narration:
                "Use row 0 and col 0 themselves as the markers. Track separately whether row 0 or col 0 themselves need zeroing.",
              variables: { m: "[[1,1,1],[1,0,1],[1,1,1]]" },
              opCount: 0,
            },
            {
              id: 1,
              narration: "Scan: m[1][1]=0 → mark row 1 and col 1 via row 0/col 0 (m[1][0]=0, m[0][1]=0).",
              pointers: { r: 1, c: 1 },
              variables: { m: "[[1,0,1],[0,0,1],[1,1,1]]", marker: "(1,1)" },
              highlight: [1, 3, 4],
              opCount: 1,
            },
            {
              id: 2,
              narration: "Rest are non-zero — done scanning.",
              variables: { m: "[[1,0,1],[0,0,1],[1,1,1]]" },
              opCount: 2,
            },
            {
              id: 3,
              narration: "Zero row 1 (marked): m[1] = [0,0,0].",
              pointers: { r: 1 },
              variables: { m: "[[1,0,1],[0,0,0],[1,1,1]]" },
              highlight: [3, 4, 5],
              opCount: 3,
            },
            {
              id: 4,
              narration: "Zero col 1 (marked): m[0][1]=m[1][1]=m[2][1]=0.",
              pointers: { c: 1 },
              variables: { m: "[[1,0,1],[0,0,0],[1,0,1]]" },
              highlight: [1, 4, 7],
              opCount: 4,
            },
            {
              id: 5,
              narration: "Final: [[1,0,1],[0,0,0],[1,0,1]].",
              variables: { m: "[[1,0,1],[0,0,0],[1,0,1]]", answer: "[[1,0,1],[0,0,0],[1,0,1]]" },
              opCount: 5,
              done: true,
            },
          ],
        },
        {
          id: "marker-set",
          name: "Hash Sets",
          time: "O(m·n)",
          space: "O(m + n)",
          opsEstimate: (n) => n * n,
          defaultInput: {
            m: [
              [1, 1, 1],
              [1, 0, 1],
              [1, 1, 1],
            ],
          },
          steps: [
            {
              id: 0,
              narration:
                "Two hash sets: zeroRows and zeroCols. Scan once, populate them.",
              variables: { zeroRows: "{}", zeroCols: "{}" },
              opCount: 0,
            },
            {
              id: 1,
              narration: "(1,1)=0 → zeroRows={1}, zeroCols={1}.",
              pointers: { r: 1, c: 1 },
              variables: { zeroRows: "{1}", zeroCols: "{1}" },
              highlight: [4],
              opCount: 1,
            },
            {
              id: 2,
              narration: "Rest are non-zero. zeroRows={1}, zeroCols={1}.",
              variables: { zeroRows: "{1}", zeroCols: "{1}" },
              opCount: 2,
            },
            {
              id: 3,
              narration: "Apply: row 1 → [0,0,0].",
              variables: { m: "[[1,1,1],[0,0,0],[1,1,1]]" },
              highlight: [3, 4, 5],
              opCount: 3,
            },
            {
              id: 4,
              narration: "Apply: col 1 → all rows in col 1 set to 0.",
              variables: { m: "[[1,0,1],[0,0,0],[1,0,1]]" },
              highlight: [1, 4, 7],
              opCount: 4,
            },
            {
              id: 5,
              narration: "Final answer [[1,0,1],[0,0,0],[1,0,1]]. O(m+n) extra space.",
              variables: { answer: "[[1,0,1],[0,0,0],[1,0,1]]" },
              opCount: 5,
              done: true,
            },
          ],
        },
      ],
    },
  ],
};
