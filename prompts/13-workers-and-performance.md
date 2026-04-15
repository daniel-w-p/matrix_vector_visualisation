# Prompt 13 — Workers and Performance

**Recommended mode:** Ask first, then Code

```text
First inspect the repo and identify which computations, if any, are currently expensive enough to justify a Web Worker.

Return:
1. the candidate workloads
2. the evidence or reasoning for moving them off the main thread
3. the smallest safe worker boundary
4. the exact code task you recommend next

Do not implement the worker yet in the first response.
```

If the reasoning looks good, follow up in Code mode with:

```text
Implement the smallest justified worker boundary from your previous analysis.

Requirements:
- keep the worker API narrow
- keep math logic reusable and testable
- add fallback behavior if needed
- document what moved into the worker and why

Verification:
- run tests/build
- report results
```
