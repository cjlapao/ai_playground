from huggingface_hub import hf_hub_download
from huggingface_hub import login
from llama_cpp import Llama

login()
## Download the GGUF model
# model_name = "microsoft/Phi-3-mini-4k-instruct-gguf"
# model_file = "Phi-3-mini-4k-instruct-q4.gguf"

# model_name = "matteocavestri/Mixtral-8x7B-Instruct-v0.1-Q4_K_M-GGUF"
# model_file = "mixtral-8x7b-instruct-v0.1-q4_k_m.gguf"

# model_name = "TheBloke/Llama-2-7b-Chat-GGUF"
# model_file = "llama-2-7b-chat.Q8_0.gguf"

model_name = "TheBloke/OpenHermes-2.5-Mistral-7B-GGUF"
model_file = "openhermes-2.5-mistral-7b.Q4_K_M.gguf"

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

while True:
    user_input = input("> ")
    output = llm.create_chat_completion(
        messages=[
            { "role": "system", "content": "Your are a robot from the future"},
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
