---
sidebar_position: 9
---

# Spin Up Docker OpenSearch Instance

## Quick Start: 60 Seconds

Let's get a working OpenSearch instance running with Docker.

## Prerequisites

- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose (included with Docker Desktop)
- 4GB+ free RAM
- Command line terminal

## Step 1: Create Docker Compose File

Create a file called `docker-compose.yml`:

```yaml
version: '3.8'

services:
  opensearch:
    image: opensearchproject/opensearch:latest
    container_name: opensearch-node
    environment:
      - cluster.name=opensearch-cluster
      - node.name=opensearch-node
      - bootstrap.memory_lock=true
      - "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m"
      - OPENSEARCH_INITIAL_ADMIN_PASSWORD=YourStrongPassword123!
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - opensearch-data:/usr/share/opensearch/data
    ports:
      - "9200:9200"
      - "9600:9600"
    networks:
      - opensearch-net
    healthcheck:
      test: ["CMD-SHELL", "curl -k https://localhost:9200/_cluster/health?pretty | grep -q 'status'"]
      interval: 10s
      timeout: 5s
      retries: 5

  opensearch-dashboards:
    image: opensearchproject/opensearch-dashboards:latest
    container_name: opensearch-dashboards
    ports:
      - "5601:5601"
    environment:
      - OPENSEARCH_HOSTS='["https://opensearch:9200"]'
      - OPENSEARCH_USERNAME=admin
      - OPENSEARCH_PASSWORD=YourStrongPassword123!
    networks:
      - opensearch-net
    depends_on:
      - opensearch

volumes:
  opensearch-data:

networks:
  opensearch-net:
    driver: bridge
```

## Step 2: Start OpenSearch

```bash
docker-compose up -d
```

**Output:**
```
[+] Running 3/3
 ✓ Network opensearch_opensearch-net Created
 ✓ Container opensearch-node Started
 ✓ Container opensearch-dashboards Started
```

## Step 3: Wait for Startup

```bash
docker-compose logs opensearch
```

Wait until you see:
```
opensearch-node  | ... OpenSearch started ...
```

Takes about 30-60 seconds.

## Step 4: Verify It's Running

```bash
curl -k -u admin:YourStrongPassword123! https://localhost:9200
```

**Successful response:**
```json
{
  "name" : "opensearch-node",
  "cluster_name" : "opensearch-cluster",
  "version" : {
    "number" : "2.11.1"
  },
  "tagline" : "The OpenSearch Project"
}
```

## What You Got

- **OpenSearch API** running on `https://localhost:9200`
- **OpenSearch Dashboards** (UI) on `http://localhost:5601`
- **Username**: `admin`
- **Password**: `YourStrongPassword123!`

## Troubleshooting

### "Connection refused"

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs opensearch
```

### Out of memory

Increase Docker memory:
- Docker Desktop → Preferences → Resources → Memory (set to 4GB+)

### Port already in use

Change ports in `docker-compose.yml`:
```yaml
ports:
  - "9201:9200"  # Changed from 9200
  - "5602:5601"  # Changed from 5601
```

## Useful Commands

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f opensearch

# Reset (delete all data)
docker-compose down -v

# Access shell
docker exec -it opensearch-node bash
```

## Next Steps

✅ OpenSearch running on `https://localhost:9200`  
✅ Dashboards UI on `http://localhost:5601`  
✅ Ready to create indexes and add data

Continue to [Access the Panel](./access-panel) to explore the UI!
