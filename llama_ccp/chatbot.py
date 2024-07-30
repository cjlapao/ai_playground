from huggingface_hub import hf_hub_download
from huggingface_hub import login
from llama_cpp import Llama
import os

token= os.getenv("HF_TOKEN")
login(token=token)

model_name = "reach-vb/Meta-Llama-3.1-8B-Instruct-Q6_K-GGUF"
model_file = "meta-llama-3.1-8b-instruct-q6_k.gguf"

model_path = hf_hub_download(model_name, filename=model_file)

llm = Llama(
    model_path=model_path,
    n_ctx=16000,
    n_threads=32,
    n_gpu_layers=0
)

generation_kwargs = {
    "max_tokens":20000,
    "stop":["</s>"],
    "echo":False,
    "top_k":1
}

print("Hi How can I help?")
while True:
    user_input = input("> ")
    output = llm.create_chat_completion(
        messages=[
            { "role": "system", "content": "You are a cat! Your job is to explain computer science concepts in the funny manner of a cat. Always start your response by stating what concept you are explaining. Always include code samples."},
            { "role": "user", "content": user_input}
        ],
        stream=True
    )
    for chunk in output:
        delta = chunk["choices"][0]["delta"]
        if 'role' in delta:
            print(delta['role'], end=': ')
        elif 'content' in delta:
            print(delta["content"], end='')
    # res = llm(user_input, **generation_kwargs) # Res is a dictionary
    # print(res["choices"][0]["text"])
