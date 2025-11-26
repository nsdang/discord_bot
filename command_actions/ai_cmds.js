import { pipeline } from '@huggingface/transformers';

async function initialize_model(model_type, model_name) {
  // The model is downloaded and cached locally on the first run
  return await pipeline(model_type, model_name);
}

const generator = await initialize_model('text2text-generation','Xenova/LaMini-Flan-T5-783M');

async function send_request(msg){
  const result = await generator(msg, {
    max_new_tokens: 200,
    temperature: 0,
  });

  return result;
}

export {send_request};