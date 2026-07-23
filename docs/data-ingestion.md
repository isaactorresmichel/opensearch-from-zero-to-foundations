---
sidebar_position: 7
id: data-ingestion
---

# Data Ingestion

## Overview

There are several ways to ingest data into OpenSearch:

Ingest individual documents.
Index multiple documents in bulk.
Use Data Prepper—an OpenSearch server-side data collector that can enrich data for downstream analysis and visualization.
Use other ingestion tools.

The **data ingestion pipeline** is the complete journey your data takes from source to being searchable in OpenSearch. It's the backbone of any search system.

### The Simple View

```
Source Data
    ↓
Transform
    ↓
Index into OpenSearch
    ↓
Available for Search
```

## Pipeline Architecture

```
┌──────────────────────────────────────────────────────┐
│                    Data Sources                      │
├──────────┬──────────┬──────────┬──────────┬──────────┐
│ Database │  APIs    │   Logs   │  Streams │  Files   │
│          │          │          │          │          │
└──────────┴──────────┴──────────┴──────────┴──────────┘
                        ↓
         ┌──────────────────────────────┐
         │    Data Ingestion Layer      │
         │  (Beats, Logstash, Kafka)    │
         └──────────────────────────────┘
                        ↓
         ┌──────────────────────────────┐
         │  Data Prepper (Optional)     │
         │  Advanced Processing         │
         └──────────────────────────────┘
                        ↓
         ┌──────────────────────────────┐
         │  Processing & Enrichment     │
         │  - Transform                 │
         │  - Filter                    │
         │  - Aggregate                 │
         └──────────────────────────────┘
                        ↓
         ┌──────────────────────────────┐
         │   OpenSearch Bulk API        │
         │   Index Documents            │
         └──────────────────────────────┘
                        ↓
         ┌──────────────────────────────┐
         │   OpenSearch Index           │
         │   (Shards, Replicas)         │
         └──────────────────────────────┘
                        ↓
              Ready for Search!
```

## Pipeline Components

### 1. **Data Collection** 📦

**What it is:** Identifying and connecting to your data sources.

**Common sources:**
- **Databases** (MySQL, PostgreSQL, MongoDB)
- **Applications** (Direct API calls)
- **Log files** (System logs, application logs)
- **Message queues** (Kafka, RabbitMQ)
- **APIs** (Third-party data streams)
- **Files** (CSV, JSON, Parquet)

**Example:**
```
Web Server Access Log:
192.168.1.1 - - [22/Jan/2024:10:30:45] "GET /index.html" 200 1234
```

### 2. **Data Ingestion** 🔌

**What it is:** Pulling data from sources and preparing it as a stream.

**Common tools:**
- **Beats** (Lightweight agents)
  - Filebeat (logs)
  - Metricbeat (metrics)
  - Packetbeat (network)
- **Logstash** (Heavy processing & parsing)
- **Kafka** (Streaming events)
- **API direct** (Direct HTTP calls)

**Example output:**
```json
{
  "timestamp": "2024-01-22T10:30:45Z",
  "source": "web-server",
  "message": "GET /index.html",
  "status": 200,
  "bytes": 1234
}
```

### 3. **Data Prepper (Optional Advanced Layer)** 🔧

**When to use:** For complex transformations, real-time aggregations, or splitting data across multiple indices.

**OpenSearch Data Prepper** is a specialized data processor that runs between ingestion and indexing:

**Capabilities:**
- Real-time data processing with stateful operations
- Complex transformations and aggregations
- Batch operations and windowing
- Splitting data into multiple indices
- Enrichment with geo-IP, DNS lookups, etc.

**Example configuration:**
```yaml
version: "2"
log-pipeline:
  source:
    http:
      port: 2021
  
  processor:
    - grok:
        pattern: '%{COMMONAPACHELOG}'
        match:
          log: message
    - parse_json:
        from: "request"
  
  sink:
    - opensearch:
        hosts: ["localhost:9200"]
        index: "access_logs-%{now/d}"
```

**Data Prepper vs Logstash:**
| Feature | Data Prepper | Logstash |
|---------|--------------|----------|
| State Management | ✅ Yes | Limited |
| Windowing/Aggregation | ✅ Yes | No |
| Performance | ✅ Optimized for high throughput | Good |
| Ease of Use | YAML config | More plugins |
| Typical Use | Complex pipelines | Simple transforms |

### 4. **Processing & Enrichment** 🔄

**What it is:** Transforming raw data into a structured, searchable format.

**Operations:**
- **Parsing** - Extract fields from unstructured data
- **Filtering** - Include/exclude specific data
- **Enrichment** - Add additional context or data
- **Mapping** - Define field types and analyzers
- **Deduplication** - Remove duplicate records

**Before processing:**
```
timestamp=2024-01-22T10:30:45Z method=GET path=/index.html status=200
```

**After processing:**
```json
{
  "@timestamp": "2024-01-22T10:30:45Z",
  "http": {
    "method": "GET",
    "path": "/index.html",
    "status": 200
  },
  "host": "web-server-01",
  "region": "US-East"
}
```

### 5. **Indexing** 📚

**What it is:** Sending processed documents to OpenSearch for storage and indexing.

**API call:**
```bash
POST /logs/_doc
{
  "timestamp": "2024-01-22T10:30:45Z",
  "message": "GET /index.html",
  "status": 200
}
```

**OpenSearch then:**
- Creates/updates the index
- Tokenizes text fields
- Builds inverted index
- Replicates across nodes
- Makes data searchable

### 6. **Search Ready** 🔍

```bash
GET /logs/_search
{
  "query": {
    "match": {"message": "index"}
  }
}
```

Results return instantly!

## Design Considerations

### Throughput 📊

**Goal:** Maximize documents indexed per second.

**Strategies:**
- **Bulk indexing** for large volumes
- Batch documents (100-1000 per request)
- Parallel ingestion threads for concurrency
- Monitor and optimize refresh intervals

### Latency ⚡

**Goal:** Balance between volume and speed.

**Trade-offs:**
- Real-time indexing = lower latency, lower throughput
- Batching = higher latency, higher throughput
- Choose based on your use case

### Reliability ✅

**Goal:** Ensure no data loss and handle failures gracefully.

**Implementation:**
- Retry mechanisms for failed ingestions
- Acknowledgments before processing
- Dead letter queues for problematic data
- Monitoring and alerting on ingestion health

### Schema & Mapping Strategy 🔧

**Goal:** Consistent data structure for reliable searching.

**Best practice:**
- Define field mappings **before** indexing
- Ensure data type consistency
- Validate schemas at ingestion time
- Plan for future field additions

## Common Ingestion Patterns

### Pattern 1: Simple API Integration

Perfect for small-scale applications or direct integrations.

```
Application
    ↓
Direct HTTP to OpenSearch Bulk API
    ↓
Index documents
```

**Use case:** Mobile app indexing user activity in real-time

### Pattern 2: Log Aggregation

Standard for monitoring and observability across infrastructure.

```
Multiple Servers
    ↓
Filebeat (collection)
    ↓
Logstash (processing)
    ↓
OpenSearch (indexing)
    ↓
Kibana/OpenSearch Dashboard (visualization)
```

**Use case:** Centralized logging across 50+ servers

### Pattern 3: Stream Processing with Data Prepper

Advanced pattern for complex transformations and aggregations.

```
Data Stream (Kafka)
    ↓
Data Prepper (aggregation & enrichment)
    ↓
OpenSearch Bulk API
    ↓
Index
```

**Use case:** Real-time metrics aggregation from IoT devices

## Real-World Example: E-commerce Product Search

```
1. Source: Product Database (MySQL)
   → Product ID, Name, Description, Price, Category

2. Ingestion: Scheduled job (every hour)
   → Read from MySQL
   → Format to JSON

3. Processing (with Data Prepper):
   → Add search score boost for popular items
   → Combine name + description for full-text
   → Convert price to numeric
   → Track metrics on products indexed

4. Indexing:
   → Bulk insert 1000 products
   → Create 5 shards, 1 replica

5. Result:
   → Products instantly searchable
   → Fuzzy matching on typos
   → Fast filtering by category
   → Relevance-ranked results
```

## Best Practices

✅ **Do:**
- Plan your mappings before indexing
- Use bulk APIs for volume
- Monitor ingestion rates
- Set up error handling
- Use appropriate refresh intervals
- Use Data Prepper for complex transformations

❌ **Don't:**
- Send one document at a time
- Index everything without filtering
- Change mappings on live data
- Ignore failures silently
- Process complex logic in indexing pipeline (use Data Prepper)
