---
sidebar_position: 10
---

# Access the Panel

## OpenSearch Dashboards GUI

**OpenSearch Dashboards** is the web interface to interact with your OpenSearch cluster visually.

## Login

1. Open your browser
2. Navigate to: `http://localhost:5601`
3. Enter credentials:
   - **Username**: `admin`
   - **Password**: `YourStrongPassword123!`

## The Dashboard Interface

```
┌─────────────────────────────────────────────────────┐
│ OpenSearch Dashboards                               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────┐                                      │
│  │ Sidebar  │  ┌─────────────────────────────────┐ │
│  │          │  │                                 │ │
│  │ Dev      │  │      Main Content Area          │ │
│  │ Tools    │  │                                 │ │
│  │          │  │  - Create indexes               │ │
│  │ Discover │  │  - View data                    │ │
│  │          │  │  - Run queries                  │ │
│  │ Visualize│  │  - Create dashboards           │ │
│  │          │  │                                 │ │
│  │ Dev      │  └─────────────────────────────────┘ │
│  │ Console  │                                      │
│  │          │                                      │
│  └──────────┘                                      │
└─────────────────────────────────────────────────────┘
```

## Key Sections

### 1. **Dev Tools** 🛠️

Located in sidebar → **Dev Tools** → **Console**

Best for:
- Writing queries directly
- Testing REST API calls
- Seeing raw JSON responses

Example query:
```
GET /_cat/indices
```

### 2. **Discover** 🔍

View and explore your data interactively.

```
1. Create index pattern (if data exists)
2. Select date field
3. Browse documents
4. Filter and search
5. View field values
```

### 3. **Visualize** 📊

Create visual representations:
- Bar charts
- Line graphs
- Pie charts
- Heat maps
- Geographic maps

### 4. **Dashboards** 🎯

Combine multiple visualizations:
- Real-time monitoring
- KPI dashboards
- Custom reports

### 5. **Stack Management** ⚙️

Cluster administration:
- Index management
- Index templates
- Data sources
- Users & permissions

## Using Dev Console (Best for Learning)

### Open Console

1. Click sidebar → **Dev Tools**
2. Select **Console**
3. Ready to type!

```
REQUEST area          RESPONSE area
GET /_cluster/health  →  {
                          "status": "green",
                          "number_of_nodes": 1,
                          ...
                        }
```

### Run a Query

1. Type your query
2. Click ▶️ (Run button) or press `Ctrl+Enter`
3. See response on right

## Basic Queries in Console

### Check Cluster Health
```
GET /_cluster/health
```

### List All Indexes
```
GET /_cat/indices?v
```

### Get Cluster Info
```
GET /
```

### View Node Statistics
```
GET /_nodes/stats
```

## Creating Your First Index

### Via Console

```
PUT /products
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  },
  "mappings": {
    "properties": {
      "name": {
        "type": "text"
      },
      "price": {
        "type": "float"
      },
      "category": {
        "type": "keyword"
      }
    }
  }
}
```

### Verification

```
GET /products
```

Should return index configuration.

## Dashboard Tips

### 🎯 Favorites
- Pin frequently used queries
- Save custom searches
- Create reusable dashboards

### ⚡ Keyboard Shortcuts
- `Ctrl+Enter` - Run query
- `Ctrl+/` - Show shortcuts
- `Ctrl+A` - Select all

### 🔍 Search Tips
- Use wildcards: `name:*production*`
- Exact phrase: `"exact phrase"`
- Boolean: `status:active AND type:order`

## Common Tasks

### Task 1: View All Indexes
1. Go to Dev Console
2. Run: `GET /_cat/indices?v`
3. See all indexes and their status

### Task 2: Check Cluster Status
1. Dev Console
2. Run: `GET /_cluster/health?pretty`
3. Check `status` field (should be "green")

### Task 3: View Index Statistics
1. Dev Console
2. Run: `GET /products/_stats`
3. See document count, size, etc.

## Dashboard Health Indicators

- 🟢 **Green** - All shards allocated
- 🟡 **Yellow** - Primary shards OK, replicas missing
- 🔴 **Red** - Some primary shards missing

For a single-node cluster, yellow is normal.

## Next Steps

✅ You can access the dashboard  
✅ You know where to write queries  
✅ You can see cluster status  

Continue to [CRUD Operations](./crud-operations) to add and modify data!
