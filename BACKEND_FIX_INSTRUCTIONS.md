# Backend Fix for "Agent iteration/time limit" Error

## Problem
Your LangChain agent is hitting its iteration/time limit before completing the response. The backend generates the response in 10 seconds, but the agent chain is timing out at 15 seconds.

## Solution

### Option 1: Increase Agent Timeout (Recommended)

In your FastAPI backend file (likely `main.py` or similar), find where you initialize your LangChain agent and increase the timeout:

```python
from langchain.agents import AgentExecutor

# Find your agent initialization and update it:
agent_executor = AgentExecutor(
    agent=your_agent,
    tools=your_tools,
    max_iterations=10,  # Increase from default (usually 5)
    max_execution_time=60,  # Increase timeout to 60 seconds
    early_stopping_method="generate",  # Return partial results if timeout
    handle_parsing_errors=True,  # Handle errors gracefully
    verbose=True
)
```

### Option 2: Optimize Agent Performance

If increasing timeout isn't enough, optimize your agent:

```python
# 1. Use faster LLM model
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-4o-mini",  # Faster than gpt-4
    temperature=0.7,
    request_timeout=30  # Request timeout for API calls
)

# 2. Reduce tool complexity
# Only include essential tools the agent needs

# 3. Add streaming for better UX
agent_executor = AgentExecutor(
    agent=your_agent,
    tools=your_tools,
    max_iterations=10,
    max_execution_time=60,
    return_intermediate_steps=True,  # For debugging
    handle_parsing_errors=True
)
```

### Option 3: Implement Graceful Timeout Handling

Add a timeout wrapper to your endpoint:

```python
import asyncio
from fastapi import HTTPException

@app.post("/ask")
async def ask_question(request: QuestionRequest):
    try:
        # Wrap agent call with timeout
        result = await asyncio.wait_for(
            run_agent(request.question),
            timeout=45.0  # 45 second timeout
        )
        return {"answer": result}
    
    except asyncio.TimeoutError:
        # Return helpful message instead of error
        return {
            "answer": "I apologize, but your question is taking longer than expected to process. Could you please rephrase it to be more specific? For example, instead of asking broad questions, try asking about specific aspects of my experience or skills."
        }
    except Exception as e:
        logger.error(f"Error processing question: {e}")
        return {
            "answer": "I encountered an error processing your question. Please try asking it differently or contact support."
        }
```

### Option 4: Implement Response Caching

Cache common questions to avoid agent processing:

```python
from functools import lru_cache
import hashlib

# Simple in-memory cache
response_cache = {}

def get_cache_key(question: str) -> str:
    return hashlib.md5(question.lower().strip().encode()).hexdigest()

@app.post("/ask")
async def ask_question(request: QuestionRequest):
    cache_key = get_cache_key(request.question)
    
    # Check cache first
    if cache_key in response_cache:
        logger.info("Returning cached response")
        return {"answer": response_cache[cache_key]}
    
    # Process with agent
    try:
        result = await asyncio.wait_for(
            run_agent(request.question),
            timeout=45.0
        )
        
        # Cache the result
        response_cache[cache_key] = result
        return {"answer": result}
    
    except asyncio.TimeoutError:
        return {
            "answer": "Your question is taking longer than expected. Please try a more specific question."
        }
```

## Recommended Configuration

```python
from langchain.agents import AgentExecutor, create_react_agent
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
import asyncio

# Fast LLM
llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.7,
    request_timeout=30
)

# Create agent with optimized settings
agent_executor = AgentExecutor(
    agent=your_agent,
    tools=your_tools,
    max_iterations=10,  # Allow up to 10 iterations
    max_execution_time=50,  # 50 second timeout
    early_stopping_method="generate",  # Return partial results on timeout
    handle_parsing_errors=True,
    verbose=True,
    return_intermediate_steps=False  # Don't return steps (faster)
)

# FastAPI endpoint with timeout
@app.post("/ask")
async def ask_question(request: QuestionRequest):
    try:
        result = await asyncio.wait_for(
            agent_executor.ainvoke({"input": request.question}),
            timeout=55.0
        )
        
        answer = result.get("output", "I couldn't generate a response.")
        return {"answer": answer}
    
    except asyncio.TimeoutError:
        return {
            "answer": "I apologize, but your question is taking longer than expected. Could you please rephrase it more specifically?"
        }
    except Exception as e:
        logger.error(f"Agent error: {e}")
        return {
            "answer": "I encountered an issue processing your question. Please try rephrasing it."
        }
```

## Testing

After making changes:

1. Deploy to Google Cloud Run
2. Test with the question that caused the timeout
3. Check logs for timing information
4. Verify the frontend shows the response correctly

## Cloud Run Configuration

Also check your Cloud Run timeout settings:

```bash
gcloud run services update your-service-name \
  --timeout=60s \
  --region=asia-southeast1
```

Default Cloud Run timeout is 60 seconds for HTTP requests.
