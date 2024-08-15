# pip install accelerate
import torch
from huggingface_hub import login
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import os

token= os.getenv("HF_TOKEN")
login(token=token)

# model = "HuggingFaceTB/SmolLM-1.7B"
# model = "microsoft/Phi-3-mini-4k-instruct"
# model = "gokuls/BERT-tiny-emotion-intent"
# model = "TheBloke/Llama-2-7B-Chat-GGUF"
model = "google/gemma-2-2b"
device = "cpu"

quantization_config = BitsAndBytesConfig(load_in_8bit=True)

tokenizer = AutoTokenizer.from_pretrained(model)
# model = AutoModelForCausalLM.from_pretrained(model, device_map="auto", torch_dtype=torch.bfloat16, trust_remote_code=True).to(device)
model = AutoModelForCausalLM.from_pretrained(model)


print(f"Memory footprint: {model.get_memory_footprint() / 1e6:.2f} MB")
model.generation_config.pad_token_id = tokenizer.pad_token_id
def generate_response(prompt, max_length=50):
    input_ids = tokenizer.encode(prompt, return_tensors="pt")

    # Generate response
    with torch.no_grad():
        output = model.generate(input_ids, max_length=max_length, num_return_sequences=1, pad_token_id=50256)

    response = tokenizer.decode(output[0], skip_special_tokens=True)
    return response

print("Chatbot: Hi there! How can I help you?")
while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        print("Chatbot: Goodbye!")
        break

    response = generate_response(user_input)
    print("Chatbot:", response)
