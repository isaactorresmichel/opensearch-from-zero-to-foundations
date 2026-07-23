---
sidebar_position: 5
---

# Tokenization and Inverted Index

## The Magic Behind Search: Inverted Index

The **inverted index** is the core data structure that makes OpenSearch fast. Let's understand it step by step.

### How a Traditional Index Works (like a database)

In a normal database, you'd search like this:

```
Search for documents containing "coffee"

Documents:
1. "I love coffee"
2. "Tea is better than coffee"
3. "Coffee shops are closing"

Result: Check each document → Found in 1, 2, 3
```

**Problem**: Have to read every single document! ⚠️ Slow!

### How an Inverted Index Works

An inverted index reverses the relationship:

```
Term → Documents where it appears

coffee → [Document 1, Document 2, Document 3]
tea → [Document 2]
shop → [Document 3]
love → [Document 1]
```

**Advantage**: Direct lookup! Lightning fast! ⚡

## Tokenization Process

Before building an inverted index, text goes through **tokenization**:

### Step 1: Raw Text
```
"The quick brown fox jumps over the lazy dog"
```

### Step 2: Tokenization (breaking into words)
```
Tokens: ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"]
```

### Step 3: Normalization
```
Lowercase: ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"]
Remove duplicates: ["the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog"]
```

### Step 4: Optional Filtering (removing stopwords)
```
Remove common words: ["quick", "brown", "fox", "jumps", "lazy", "dog"]
(Removed: "the", "over")
```

### Step 5: Stemming (optional, reduce to root)
```
Jump → jump
Lazy → lazi
Jumps → jump
```

## Complete Inverted Index Example

Given these documents:

```
Document 1: "I love coffee"
Document 2: "Coffee is great"
Document 3: "I love tea"
```

After tokenization and indexing:

```
Token        → Document IDs
coffee       → [1, 2]
great        → [2]
is           → [2]
love         → [1, 3]
tea          → [3]
i            → [1, 3]
(stopwords removed)
```

## Why This Matters

### ✅ Benefits
- **O(1) lookup** - Find any term instantly (hash table)
- **Fast queries** - Even with millions of documents
- **Boolean operations** - Combine multiple terms efficiently
- **Relevance scoring** - Count term frequency, position, etc.

### 🔍 Query Example

**Search**: "coffee is great"

```
1. Tokenize: ["coffee", "is", "great"]
2. Look up in inverted index:
   - coffee → [1, 2]
   - great → [2]
3. Combine results:
   - Documents: [1, 2]
4. Rank by relevance:
   - Document 2 has all terms (highest score)
   - Document 1 has only "coffee" (lower score)
5. Return: [Document 2, Document 1]
```

## Relevance Scoring

OpenSearch uses **TF-IDF** (Term Frequency - Inverse Document Frequency):

```
Score = How often term appears × How rare is the term

Example:
- "coffee" appears 2x in Document 2
- "coffee" appears in only 2 out of 3 documents (rare)
- Result: HIGH score for Document 2
```

## Real-World Impact

```
Time to search 1 million documents:

Traditional search: 1000ms (scan all)
Inverted index:     1ms (direct lookup)
```

**1000x faster!** 🚀

## The Complete Picture

```
Raw Text
   ↓
Tokenization (break into words)
   ↓
Normalization (lowercase, remove punctuation)
   ↓
Filtering (remove stopwords)
   ↓
Stemming (reduce to root form - optional)
   ↓
Inverted Index Creation
   ↓
Lightning-fast search queries
```
