---
sidebar_position: 5
---

# Mappings

> **What is a Mapping?**  
> A **mapping** defines the schema of your OpenSearch index. It dictates how documents and their fields are stored, indexed, and analyzed.

---

## 1. Dynamic vs. Explicit Mapping

* **Dynamic Mapping (Automatic)**
  * OpenSearch automatically detects and assigns data types when new fields are indexed.
  * **Pros:** Quick prototyping and flexible data.
  * **Cons:** Risk of incorrect type inference (e.g., numbers stored as strings, or full-text instead of keyword).

* **Explicit Mapping (Recommended)**
  * You manually define field names, data types, and analyzer settings *before* indexing.
  * **Pros:** Optimal search performance, accurate aggregations, and predictable storage footprint.

**Inmmutability:** Existing field mappings **cannot** be changed without reindexing data.

---

## 2. Key Data Types

| Category | Common Field Types | Primary Use Case |
| :--- | :--- | :--- |
| **Strings** | `text` | Full-text search (analyzed, tokenized). |
| **Strings** | `keyword` | Exact matches, filtering, sorting, aggregations. |
| **Numeric** | `integer`, `long`, `float`, `double` | Quantities, metrics, pricing. |
| **Date** | `date` | Timestamps, time-series data, event logs. |
| **Complex** | `object`, `nested` | Hierarchical JSON data or arrays of objects. |
| **Spatial** | `geo_point`, `geo_shape` | Location coordinates and geographic boundaries. |

---

## 3. Practical Example: Index Creation

```json
PUT /events_index
{
  "mappings": {
    "properties": {
      "event_id":   { "type": "keyword" },
      "title":      { "type": "text" },
      "category":   { "type": "keyword" },
      "timestamp":  { "type": "date" },
      "attendees":  { "type": "integer" }
    }
  }
}
```