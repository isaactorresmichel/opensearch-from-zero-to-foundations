---
sidebar_position: 12
---

# Basic Search

## From Documents to Insights

Now that you know how to add data, let's learn to search effectively.

## Simple Full-Text Search

### Match Query

Find documents containing a word:

```
GET /products/_search
{
  "query": {
    "match": {
      "name": "laptop"
    }
  }
}
```

Returns: Any product with "laptop" in name (case-insensitive)

### Match Phrase Query

Find exact phrase:

```
GET /products/_search
{
  "query": {
    "match_phrase": {
      "description": "gaming laptop"
    }
  }
}
```

Returns: "gaming laptop" as exact phrase, not "laptop gaming"

### Multi-Match Query

Search across multiple fields:

```
GET /products/_search
{
  "query": {
    "multi_match": {
      "query": "apple",
      "fields": ["name", "brand", "description"]
    }
  }
}
```

Searches for "apple" in 3 fields at once.

## Filtering & Combining Queries

### Boolean Query

Combine multiple conditions:

```
GET /products/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "category": "electronics" } }
      ],
      "filter": [
        { "range": { "price": { "gte": 100, "lte": 1000 } } }
      ],
      "must_not": [
        { "match": { "status": "discontinued" } }
      ]
    }
  }
}
```

Returns:
- ✅ Category is electronics
- ✅ Price between $100-$1000
- ❌ Not discontinued

### Query Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| **must** | AND - must match | Both conditions required |
| **should** | OR - at least one | Improve score if matches |
| **must_not** | NOT - exclude | Definitely exclude |
| **filter** | AND - exclude score | Like must, but faster |

## Range Queries

Search by number or date ranges:

```
GET /products/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 500,    # greater than or equal
        "lte": 2000    # less than or equal
      }
    }
  }
}
```

```
GET /events/_search
{
  "query": {
    "range": {
      "date": {
        "gte": "2024-01-01",
        "lte": "2024-12-31"
      }
    }
  }
}
```

## Sorting & Pagination

### Sort Results

```
GET /products/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    { "price": { "order": "asc" } }
  ]
}
```

Orders by price (ascending). Use `"desc"` for descending.

### Pagination

```
GET /products/_search
{
  "from": 10,
  "size": 20,
  "query": {
    "match": { "category": "electronics" }
  }
}
```

- `from`: 10 → Skip first 10 results
- `size`: 20 → Return 20 results
- Result: Items 11-30

## Text Search Features

### Fuzzy Matching (Typo Tolerance)

Find similar words despite typos:

```
GET /products/_search
{
  "query": {
    "fuzzy": {
      "name": {
        "value": "latop",
        "fuzziness": "AUTO"
      }
    }
  }
}
```

Returns: "laptop" (matched despite typo)

### Wildcard Search

Use `*` for partial matches:

```
GET /products/_search
{
  "query": {
    "wildcard": {
      "name": "mac*"
    }
  }
}
```

Returns: "MacBook", "Mac Mini", "Macbook Pro"

### Prefix Search

Match from the beginning:

```
GET /products/_search
{
  "query": {
    "prefix": {
      "category": "elec"
    }
  }
}
```

Returns: "electronics", "electrical"

## Aggregations & Analytics

### Count by Category

```
GET /products/_search
{
  "size": 0,
  "aggs": {
    "categories": {
      "terms": {
        "field": "category"
      }
    }
  }
}
```

Returns count of products per category:
```json
{
  "aggregations": {
    "categories": {
      "buckets": [
        { "key": "electronics", "doc_count": 150 },
        { "key": "clothing", "doc_count": 87 },
        { "key": "books", "doc_count": 42 }
      ]
    }
  }
}
```

### Average Price

```
GET /products/_search
{
  "aggs": {
    "avg_price": {
      "avg": { "field": "price" }
    }
  }
}
```

Returns: Average price of all products

### Grouped Aggregation

Price range by category:

```
GET /products/_search
{
  "aggs": {
    "by_category": {
      "terms": { "field": "category" },
      "aggs": {
        "avg_price": {
          "avg": { "field": "price" }
        }
      }
    }
  }
}
```

Returns: Average price for each category

## Real-World Search Examples

### Example 1: E-commerce Product Search

Find discounted electronics with good reviews:

```
GET /products/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "category": "electronics" } }
      ],
      "filter": [
        { "range": { "discount_percent": { "gte": 10 } } },
        { "range": { "rating": { "gte": 4 } } }
      ]
    }
  },
  "sort": [
    { "discount_percent": { "order": "desc" } }
  ]
}
```

### Example 2: Log Analytics

Find errors in the last 24 hours:

```
GET /logs/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "level": "ERROR" } },
        { "range": { "@timestamp": { "gte": "now-24h" } } }
      ]
    }
  },
  "aggs": {
    "errors_by_service": {
      "terms": { "field": "service_name" }
    }
  }
}
```

### Example 3: Search Autocomplete

Find products starting with text:

```
GET /products/_search
{
  "query": {
    "prefix": {
      "name": "mac"
    }
  },
  "size": 5
}
```

Returns: Top 5 products starting with "mac"

## Response Structure

Every search returns:

```json
{
  "took": 5,
  "timed_out": false,
  "_shards": { "total": 1, "successful": 1, "failed": 0 },
  "hits": {
    "total": { "value": 150, "relation": "eq" },
    "max_score": 0.95,
    "hits": [
      {
        "_index": "products",
        "_id": "1",
        "_score": 0.95,
        "_source": {
          "name": "Laptop",
          "price": 999.99
        }
      }
    ]
  }
}
```

- **took** - Query time in milliseconds
- **total** - Total matches found
- **max_score** - Highest relevance score
- **_score** - Relevance of each result (higher = better match)

## Search Tips

✅ **Do:**
- Use `match` for full-text search
- Use `term` for exact keyword matching
- Combine with `bool` for complex queries
- Use `filter` for non-scoring conditions
- Check your field types

❌ **Don't:**
- Use `match` on `keyword` fields
- Search without setting field mappings
- Ignore relevance scores
- Retrieve huge result sets without pagination

## Next Steps

✅ Basic searches working  
✅ Filtering, sorting, aggregations  
✅ Ready for production queries  

Check out [Resources](./resources) for more learning materials!
