---
sidebar_position: 11
---

# CRUD Operations

## Create, Read, Update, Delete

CRUD operations are the fundamental ways to interact with data in OpenSearch.

## 1. CREATE (Index a Document)

### Single Document

```
POST /products/_doc/1
{
  "name": "Laptop",
  "price": 999.99,
  "category": "electronics",
  "in_stock": true
}
```

**Response:**
```json
{
  "_index": "products",
  "_id": "1",
  "_version": 1,
  "result": "created"
}
```

The document is now searchable!

### Multiple Documents (Bulk)

For adding many documents efficiently:

```
POST /_bulk
{ "index": { "_index": "products", "_id": "2" } }
{ "name": "Mouse", "price": 25.99, "category": "electronics" }
{ "index": { "_index": "products", "_id": "3" } }
{ "name": "Keyboard", "price": 75.50, "category": "electronics" }
{ "index": { "_index": "products", "_id": "4" } }
{ "name": "Monitor", "price": 299.99, "category": "electronics" }
```

**Why bulk?**
- ✅ 10-100x faster
- ✅ Single request, multiple docs
- ✅ Recommended for production

## 2. READ (Retrieve Documents)

### Get Specific Document

```
GET /products/_doc/1
```

**Response:**
```json
{
  "_index": "products",
  "_id": "1",
  "_version": 1,
  "_source": {
    "name": "Laptop",
    "price": 999.99,
    "category": "electronics",
    "in_stock": true
  }
}
```

### Search All Documents

```
GET /products/_search
{
  "query": {
    "match_all": {}
  }
}
```

### Search with Filter

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

**Response:**
```json
{
  "hits": {
    "total": { "value": 1, "relation": "eq" },
    "hits": [
      {
        "_id": "1",
        "_score": 0.9,
        "_source": {
          "name": "Laptop",
          "price": 999.99
        }
      }
    ]
  }
}
```

### Advanced Filters

```
GET /products/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "category": "electronics" } }
      ],
      "filter": [
        { "range": { "price": { "lte": 300 } } }
      ]
    }
  }
}
```

Returns: Electronics costing $300 or less

## 3. UPDATE (Modify Document)

### Replace Entire Document

```
PUT /products/_doc/1
{
  "name": "Laptop Pro",
  "price": 1299.99,
  "category": "electronics",
  "in_stock": true,
  "warranty": "3 years"
}
```

### Partial Update

Update only specific fields:

```
POST /products/_doc/1/_update
{
  "doc": {
    "price": 1199.99,
    "warranty": "2 years"
  }
}
```

The `doc` field only updates those fields, keeps others.

### Update with Script

Advanced update logic:

```
POST /products/_doc/1/_update
{
  "script": {
    "source": "ctx._source.price *= params.factor",
    "params": {
      "factor": 1.1
    }
  }
}
```

Increases price by 10%!

### Bulk Update

```
POST /_bulk
{ "update": { "_index": "products", "_id": "1" } }
{ "doc": { "price": 1199.99 } }
{ "update": { "_index": "products", "_id": "2" } }
{ "doc": { "in_stock": false } }
```

## 4. DELETE (Remove Documents)

### Delete Single Document

```
DELETE /products/_doc/1
```

**Response:**
```json
{
  "result": "deleted",
  "_version": 2
}
```

### Delete by Query

Remove all documents matching criteria:

```
POST /products/_delete_by_query
{
  "query": {
    "range": {
      "price": {
        "lt": 50
      }
    }
  }
}
```

Deletes all items under $50

### Bulk Delete

```
POST /_bulk
{ "delete": { "_index": "products", "_id": "1" } }
{ "delete": { "_index": "products", "_id": "2" } }
{ "delete": { "_index": "products", "_id": "3" } }
```

## CRUD Summary Table

| Operation | Method | Endpoint | Purpose |
|-----------|--------|----------|---------|
| **CREATE** | POST/PUT | `/{index}/_doc/{id}` | Add new document |
| **READ** | GET | `/{index}/_search` | Retrieve documents |
| **UPDATE** | POST | `/{index}/_doc/{id}/_update` | Modify document |
| **DELETE** | DELETE | `/{index}/_doc/{id}` | Remove document |

## Practical Example: Product Catalog

### 1. Create Index with Schema

```
PUT /products
{
  "mappings": {
    "properties": {
      "name": { "type": "text" },
      "sku": { "type": "keyword" },
      "price": { "type": "float" },
      "quantity": { "type": "integer" },
      "category": { "type": "keyword" },
      "created_at": { "type": "date" }
    }
  }
}
```

### 2. Bulk Add Products

```
POST /_bulk
{ "index": { "_index": "products" } }
{ "name": "MacBook Pro", "sku": "MB001", "price": 1999, "quantity": 5, "category": "laptops" }
{ "index": { "_index": "products" } }
{ "name": "iPad Air", "sku": "IP002", "price": 599, "quantity": 15, "category": "tablets" }
{ "index": { "_index": "products" } }
{ "name": "Apple Watch", "sku": "AW003", "price": 399, "quantity": 20, "category": "wearables" }
```

### 3. Search Products

Find all laptops:
```
GET /products/_search
{
  "query": {
    "match": {
      "category": "laptops"
    }
  }
}
```

### 4. Update Price

Discount 20% on all iPad Air:
```
POST /products/_update_by_query
{
  "query": {
    "match": {
      "sku": "IP002"
    }
  },
  "script": {
    "source": "ctx._source.price *= 0.8"
  }
}
```

### 5. Delete Out of Stock

```
POST /products/_delete_by_query
{
  "query": {
    "match": {
      "quantity": 0
    }
  }
}
```

## Best Practices

### ✅ Do:
- Use bulk API for multiple documents
- Use `keyword` type for exact matches
- Use `text` type for full-text search
- Set appropriate `_id` values
- Validate data before indexing

### ❌ Don't:
- Index documents one at a time (unless necessary)
- Change field types after indexing
- Store huge nested objects
- Use analysis on `keyword` fields
- Index sensitive data without encryption

## Next Steps

✅ CRUD operations complete  
✅ You can add, read, update, delete data  

Continue to [Basic Search](./basic-search) for search techniques!
