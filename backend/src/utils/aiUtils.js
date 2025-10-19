import { pipeline } from "@xenova/transformers";

export async function generateSummary(input_text){
// create model
const summarizer = await pipeline("summarization", "Xenova/distilbart-cnn-6-6");
//console.log('input_text',input_text);
const output_summary_array = await summarizer(input_text, { max_new_tokens: 200, min_length: 150 });
const summary = output_summary_array[0].summary_text;
//console.log('output_summary',summary);
return summary;
}

