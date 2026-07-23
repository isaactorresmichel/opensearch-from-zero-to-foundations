---
sidebar_position: 13
---

# Resources

## Learning & Documentation

### Official OpenSearch

- **[OpenSearch Documentation](https://opensearch.org/docs/)** - Official docs
- **[OpenSearch GitHub](https://github.com/opensearch-project)** - Source code
- **[Community Forum](https://discuss.opensearchproject.org/)** - Get help
- **[OpenSearch Blog](https://opensearch.org/blog/)** - Latest updates

### API Reference

- **[REST API Reference](https://opensearch.org/docs/latest/api-reference/)** - All endpoints
- **[Query DSL Guide](https://opensearch.org/docs/latest/query-dsl/)** - Query syntax
- **[Aggregations Guide](https://opensearch.org/docs/latest/aggregations/)** - Analytics

## Tools & Resources

### Docker & Deployment

- **[Docker Hub - OpenSearch](https://hub.docker.com/r/opensearchproject/opensearch)** - Container images
- **[OpenSearch Docker Compose](https://github.com/opensearch-project/sample-docker-compose)** - Quick setup
- **[Kubernetes Operator](https://github.com/opensearch-project/opensearch-k8s-operator)** - K8s deployment

### Development Tools

- **[OpenSearch Postman Collection](https://www.postman.com/opensearch-project)** - API testing
- **[Dev Tools in Dashboards](https://opensearch.org/docs/latest/dashboards/dev-tools/index/)** - Built-in console
- **[VSCode OpenSearch Extension](https://marketplace.visualstudio.com/items?itemName=opensearch-project.opensearch-vscode)** - IDE integration

### Plugins & Extensions

- **[Anomaly Detection](https://opensearch.org/docs/latest/observability-plugin/ad/index/)** - Auto-detect anomalies
- **[ML Commons](https://opensearch.org/docs/latest/ml-commons-plugin/index/)** - Machine learning
- **[Alerting](https://opensearch.org/docs/latest/observability-plugin/alerting/index/)** - Alert rules
- **[Security Analytics](https://opensearch.org/docs/latest/security-analytics/index/)** - SIEM features

## Educational Content

### Tutorials

- **[Getting Started Guide](https://opensearch.org/docs/latest/getting-started/index/)** - Step-by-step intro
- **[Indexing Data](https://opensearch.org/docs/latest/getting-started/index-data/)** - How to add data
- **[Searching Data](https://opensearch.org/docs/latest/getting-started/search/)** - Query techniques
- **[Dashboards Overview](https://opensearch.org/docs/latest/dashboards/index/)** - UI guide

### Videos

- **[OpenSearch YouTube Channel](https://www.youtube.com/@opensearchproject)** - Video tutorials
- **[Community Demos](https://opensearch.org/docs/latest/videos/)** - Real-world examples
- **[OpenSearch Summit](https://opensearch.org/events/)** - Conference talks

## Community

### Get Help

- **[GitHub Discussions](https://github.com/opensearch-project/OpenSearch/discussions)** - Q&A forum
- **[Stack Overflow](https://stackoverflow.com/questions/tagged/opensearch)** - Tagged questions
- **[OpenSearch Slack](https://opensearch.org/community/)** - Live chat

### Contributing

- **[Contributing Guide](https://github.com/opensearch-project/OpenSearch/blob/main/CONTRIBUTING.md)** - How to contribute
- **[Developer Certificate of Origin](https://github.com/opensearch-project/OpenSearch/blob/main/DEVELOPER_CERTIFICATE_OF_ORIGIN.rst)** - Contribution requirements

## Comparison & Integration

### vs Other Tools

- **[vs Elasticsearch](https://opensearch.org/blog/opensearch-vs-elasticsearch/)** - Why OpenSearch?
- **[vs Solr](https://opensearch.org/docs/latest/comparison/)** - Detailed comparison
- **[vs Traditional DB](https://opensearch.org/blog/introducing-opensearch/)** - Use case comparison

### Integrations

- **[Beats](https://opensearch.org/docs/latest/tools/integrations/beats/)** - Log collection
- **[Logstash](https://opensearch.org/docs/latest/tools/integrations/logstash/)** - Data processing
- **[Kafka](https://opensearch.org/docs/latest/tools/integrations/kafka/)** - Streaming
- **[Fluentd](https://opensearch.org/docs/latest/tools/integrations/fluentd/)** - Log forwarding

## Quick Reference

### Important URLs

| Purpose | URL |
|---------|-----|
| API | `https://localhost:9200` |
| Dashboards | `http://localhost:5601` |
| Cluster health | `https://localhost:9200/_cluster/health` |
| All indexes | `https://localhost:9200/_cat/indices` |

### Useful CLI Commands

```bash
# Check cluster health
curl -k -u admin:password https://localhost:9200/_cluster/health?pretty

# List all indexes
curl -k -u admin:password https://localhost:9200/_cat/indices?v

# Create index
curl -k -u admin:password -X PUT https://localhost:9200/myindex

# Search
curl -k -u admin:password https://localhost:9200/myindex/_search?q=query

# Index document
curl -k -u admin:password -X POST https://localhost:9200/myindex/_doc -d '{"field":"value"}'
```

## Recommended Learning Path

1. ✅ **Foundations** - What is OpenSearch? (you are here)
2. 📚 **Concepts** - Indexes, documents, shards
3. 🔍 **Hands-on** - Set up Docker instance
4. 📝 **Indexing** - Add your own data
5. 🔎 **Searching** - Write complex queries
6. 📊 **Analytics** - Create visualizations
7. 🚀 **Production** - Deploy to cloud

## Staying Updated

- **[Release Notes](https://github.com/opensearch-project/OpenSearch/releases)** - Version updates
- **[Newsletter](https://opensearch.org/community/)** - Monthly updates
- **[Twitter/X](https://twitter.com/opensearchproj)** - Latest news

---

## Got Questions?

- Check the [documentation](https://opensearch.org/docs/)
- Ask on [GitHub Discussions](https://github.com/opensearch-project/OpenSearch/discussions)
- Join the [Community Slack](https://opensearch.org/community/)

**Happy searching!** 🔍
