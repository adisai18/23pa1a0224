# Notification System Design

## Stage 1

## Problem
Users lose track of important notifications due to high volume.  
Goal: Always display the **top N most important unread notifications** first.

---

## Priority Scoring Approach

### Type Weights
| Type      | Weight |
|-----------|--------|
| Placement | 3      |
| Result    | 2      |
| Event     | 1      |

**Rationale:** Placement notifications are career-critical; Results are academically important; Events are informational.

### Recency Factor