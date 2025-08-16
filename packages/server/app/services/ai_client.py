"""Minimal AI client abstraction supporting OpenAI, Ollama, and LMStudio (local)
This is a lightweight, mockable implementation intended to be extended.
"""
import os
import httpx

PROVIDER = os.getenv('AI_PROVIDER', 'openai')  # openai | ollama | lmstudio


def query_ai(prompt: str, **kwargs):
    """Dispatch to provider-specific implementation."""
    if PROVIDER == 'ollama':
        return query_ollama(prompt, **kwargs)
    if PROVIDER == 'lmstudio':
        return query_lmstudio(prompt, **kwargs)
    # default openai (mock)
    return query_openai(prompt, **kwargs)


def query_openai(prompt: str, **kwargs):
    # Minimal placeholder: real implementation would call OpenAI SDK or HTTP API
    return {
        'provider': 'openai',
        'response': f'Mock OpenAI response for: {prompt[:120]}',
        'sources': []
    }


def query_ollama(prompt: str, **kwargs):
    # Ollama local server default: http://localhost:11434
    url = os.getenv('OLLAMA_URL', 'http://localhost:11434')
    model = os.getenv('OLLAMA_MODEL', 'llama2')
    try:
        with httpx.Client(timeout=10) as client:
            payload = {
                "model": model,
                "prompt": prompt,
            return {'provider': 'ollama', 'response': data.get('response', str(data)), 'sources': []}
            }
            resp = client.post(f"{url}/api/generate", json=payload)
            resp.raise_for_status()
            data = resp.json()
            # Ollama returns 'response' field for the generated text
            return {'provider': 'ollama', 'response': data.get('response', str(data)), 'sources': []}
    except Exception as e:
        return {'provider': 'ollama', 'response': f'Error contacting Ollama: {e}', 'sources': []}


def query_lmstudio(prompt: str, **kwargs):
    # LM Studio local: example HTTP endpoint
    url = os.getenv('LMSTUDIO_URL', 'http://localhost:8080/api/generate')
    model = os.getenv('LMSTUDIO_MODEL', 'local-model')
    try:
        with httpx.Client(timeout=10) as client:
            resp = client.post(url, json={"model": model, "prompt": prompt})
            resp.raise_for_status()
            data = resp.json()
            return {'provider': 'lmstudio', 'response': data.get('text', str(data)), 'sources': []}
    except Exception as e:
        return {'provider': 'lmstudio', 'response': f'Error contacting LMStudio: {e}', 'sources': []}
