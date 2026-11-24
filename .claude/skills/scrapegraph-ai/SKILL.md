---
name: scrapegraph-ai
description: Use when the user wants to scrape or extract structured data from websites or local documents (HTML, XML, JSON, CSV, Markdown) with the ScrapeGraphAI Python library (`scrapegraphai`), including SmartScraperGraph, SearchGraph, multi-page scraping, and generating scraper scripts.
---

# ScrapeGraphAI

ScrapeGraphAI (`scrapegraphai` on PyPI, https://github.com/ScrapeGraphAI/Scrapegraph-ai) is a Python library that uses an LLM plus graph-based pipelines to extract data from web pages and local documents. You describe what you want in a prompt and it returns structured data.

Requires Python >= 3.12.

## Install

Use a virtual environment:

```bash
pip install scrapegraphai
playwright install   # needed to fetch page content
```

## Basic usage

```python
import json
from scrapegraphai.graphs import SmartScraperGraph

graph_config = {
    "llm": {
        "api_key": "YOUR_OPENAI_API_KEY",   # read from env, never hardcode
        "model": "openai/gpt-4o-mini",
    },
    "verbose": True,
    "headless": True,
}

graph = SmartScraperGraph(
    prompt="List all article titles and their URLs",
    source="https://example.com",
    config=graph_config,
)
print(json.dumps(graph.run(), indent=2))
```

Local models via Ollama:

```python
"llm": {"model": "ollama/llama3.2", "model_tokens": 8192, "format": "json"}
```

## Choosing a pipeline

All live in `scrapegraphai.graphs`.

| Need | Graph |
|---|---|
| One page, one prompt | `SmartScraperGraph` |
| Faster/cheaper single page (less LLM work) | `SmartScraperLiteGraph` |
| Several URLs, same prompt | `SmartScraperMultiGraph` (`...ConcatGraph` to merge results) |
| Search the web, scrape top results | `SearchGraph` |
| Collect links from a page | `SearchLinkGraph` |
| Crawl several levels deep | `DepthSearchGraph` |
| Page with images | `OmniScraperGraph` / `OmniSearchGraph` |
| Page to Markdown | `MarkdownifyGraph` |
| Generate a reusable scraper script | `ScriptCreatorGraph` / `ScriptCreatorMultiGraph` |
| Local files | `XMLScraperGraph`, `JSONScraperGraph`, `CSVScraperGraph`, `DocumentScraperGraph` (and `...MultiGraph` variants) |
| Text to speech from scraped content | `SpeechGraph` |

Constructor signatures differ slightly per graph. Check `scrapegraphai/graphs/<name>.py` in the installed package or the repo before using a graph you haven't used.

## Workflow

1. Confirm the target is allowed to be scraped: check robots.txt and terms of service, and avoid personal data without a legitimate purpose.
2. Pick the graph from the table above and write a specific prompt that names the fields you want.
3. Read API keys from environment variables (for example `os.environ["OPENAI_API_KEY"]`). Never commit keys.
4. Start with `verbose: True` and a single URL, then scale to multi-page graphs.
5. Validate the output, because LLM extraction can omit or hallucinate fields. Spot-check against the page.
6. For repeated scraping, use `ScriptCreatorGraph` to generate a plain Python scraper instead of paying for an LLM call on every run.

## Troubleshooting

- Empty or partial content: the page is JS-rendered. Make sure `playwright install` ran; set `"headless": False` to debug.
- Context length errors: set `model_tokens` for the model, or use a smaller page or `SmartScraperLiteGraph`.
- Import or version errors: confirm Python >= 3.12 and a clean virtualenv.

## Related

- Hosted API and SDKs (Python, Node): https://scrapegraphai.com, docs at https://docs.scrapegraphai.com
- MCP server: https://smithery.ai/server/@ScrapeGraphAI/scrapegraph-mcp
