# Use a pipeline as a high-level helper
from transformers import pipeline

messages = [
    {"role": "user", "content": "Why is the sky blue"},
]
pipe = pipeline("text-generation", model="microsoft/Phi-3-mini-128k-instruct", trust_remote_code=True)
pipe(messages)