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
    n_ctx=8192,
    n_threads=5,
    n_gpu_layers=0
)

generation_kwargs = {
    "max_tokens":20000,
    "stop":["/quit"],
    "echo":False,
    "top_k":1
}


output = llm.create_chat_completion(
    messages=[
        { "role": "system", "content": "as a senior developer explain me, using easy language but in details."},
        { "role": "user", "content": "how does loops work in python, providing a lot of code examples?"}
    ],
    stream=True
)
for chunk in output:
    delta = chunk["choices"][0]["delta"]
    if 'role' in delta:
        print(delta['role'], end=': ')
    elif 'content' in delta:
        print(delta["content"], end='')

print("Exited")