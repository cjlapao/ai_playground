# pip install accelerate
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig

# model = "HuggingFaceTB/SmolLM-1.7B"
model = "microsoft/Phi-3-mini-4k-instruct"
# model = "gokuls/BERT-tiny-emotion-intent"
# model = "TheBloke/Llama-2-7B-Chat-GGUF"
device = "cpu"

quantization_config = BitsAndBytesConfig(load_in_8bit=True)

tokenizer = AutoTokenizer.from_pretrained(model)
# model = AutoModelForCausalLM.from_pretrained(model, device_map="auto", torch_dtype=torch.bfloat16, trust_remote_code=True).to(device)
model = AutoModelForCausalLM.from_pretrained(model, device_map="auto", torch_dtype=torch.bfloat16, trust_remote_code=True)


print(f"Memory footprint: {model.get_memory_footprint() / 1e6:.2f} MB")
model.generation_config.pad_token_id = tokenizer.pad_token_id
while True:
    user_input = input("> ")
    inputs = tokenizer.encode(user_input, return_tensors="pt")
    outputs = model.generate(inputs, max_new_tokens=200)
    print(tokenizer.decode(outputs[0]))
