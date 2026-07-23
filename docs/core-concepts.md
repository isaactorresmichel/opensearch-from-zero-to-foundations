---
sidebar_position: 4
---

# Core Concepts

## The Building Blocks

To understand OpenSearch, you need to understand three fundamental concepts:

### 1. **Index** 📚
An **index** is like a database table or a collection. It's where your data lives.

```
OpenSearch Cluster
├── Index: "products"
│   ├── Document 1: { name: "Laptop", price: 999 }
│   ├── Document 2: { name: "Mouse", price: 25 }
│   └── Document 3: { name: "Keyboard", price: 75 }
├── Index: "logs"
│   └── Document N: { timestamp: "2024-01-22", level: "ERROR" }
```

- Each index contains documents of similar type
- Multiple indexes in one cluster
- Can be sharded and replicated for scalability

### 2. **Document** 📄
A **document** is a single record in an index. It's JSON. ([learn more](https://docs.opensearch.org/latest/getting-started/intro/#document))

```json
{
  "_id": "1",
  "title": "OpenSearch Tutorial",
  "author": "John Doe",
  "views": 1500,
  "published": "2024-01-22"
}
```

- JSON format (flexible schema)
- Contains fields with values
- Has metadata: `_id`, `_type`, `_index` ([learn more](https://docs.opensearch.org/latest/mappings/metadata-fields/index/))



### 3. **Mapping** 🗺️
A **mapping** is the schema definition for an index. It defines field names, types, and how they're analyzed.

**Mapping Example:**
```json
{
  "properties": {
    "title": {
      "type": "text",        // Full-text searchable
      "analyzer": "standard"
    },
    "category": {
      "type": "keyword"      // Exact match only
    },
    "price": {
      "type": "float"        // Numeric type
    },
    "published": {
      "type": "date"         // Date type
    }
  }
}
```

**Key Mapping Concepts:**

- **Field Types** - Define what kind of data a field holds
  - `text` - Full-text searchable (analyzed, tokenized)
  - `keyword` - Exact match only (not analyzed)
  - `integer`, `float`, `double` - Numeric types
  - `date` - Timestamp data
  - `object`, `nested` - Complex structures

- **Text Analysis** - How text fields are processed for search
  - Tokenization: "The quick brown fox" → ["the", "quick", "brown", "fox"]
  - Lowercasing, stop word removal, stemming
  - Custom analyzers for specific needs

- **Dynamic vs Explicit Mapping**
  - **Explicit**: You define mapping before indexing (✅ recommended)
  - **Dynamic**: OpenSearch auto-detects types (⚠️ risky in production)

**Why Mappings Matter:**
```
✅ Predictable search behavior
✅ Better performance with correct indexing
✅ Proper aggregations and filtering
✅ Type safety and data validation

❌ Without mapping: unpredictable field types, search failures
```

### 4. **Field** 🏷️
A **field** is an individual piece of data within a document.

```
Document: Article
├── title: "OpenSearch Basics" (text field)
├── views: 1500 (numeric field)
├── published: "2024-01-22" (date field)
└── tags: ["search", "database"] (array field)
```

- Each field can have different data types
- OpenSearch analyzes fields for search
- Searchable and sortable fields

## Additional Concepts

### **Shard** 🔪
A **shard** is a subdivision of an index for horizontal scaling.

- An index can be split into multiple shards
- Each shard is a standalone Lucene index
- Allows parallel processing
- Enables scaling beyond single node capacity

### **Replica** 🔄
A **replica** is a copy of a shard for redundancy.

- Each shard can have replicas
- Provides high availability
- Improves read performance
- Fault tolerance

### **Cluster** 🌐
A **cluster** is a collection of nodes working together.

```
OpenSearch Cluster
├── Node 1 (Master)
├── Node 2 (Data)
├── Node 3 (Data)
└── Coordination among all nodes
```

- All nodes share the same cluster name
- Data is distributed across nodes
- Automatic failover and recovery

## The Relationship

```
Cluster
  └── Index: "products"
        ├── Shard 0
        │   ├── Primary
        │   └── Replica
        └── Shard 1
            ├── Primary
            └── Replica
              └── Documents (JSON records)
                  └── Fields (data within documents)
```

## Mental Model

Think of it like a library:
- **Cluster** = The entire library system
- **Index** = A section (Fiction, Non-Fiction, etc.)
- **Shard** = Individual shelves
- **Replica** = Backup copies of shelves
- **Document** = A single book
- **Field** = Chapters/information in a book
