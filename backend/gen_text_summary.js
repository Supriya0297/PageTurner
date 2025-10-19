// import the js lib
import { pipeline } from "@xenova/transformers";

// create model
const summarizer = await pipeline("summarization", "Xenova/distilbart-cnn-6-6");

// invoke model by passing input text -> o/p : summary
const input_text = `Pranveer Singh Institute of Technology (PSIT), Kanpur, founded in 2004, stands today as a beacon of academic excellence, celebrating 20 transformative years of empowering minds and shaping futures. Guided by a bold vision for the 21st century, PSIT has evolved into a hub of innovation, research, and holistic education, committed to preparing tomorrow’s ethical leaders, entrepreneurs, and changemakers. At PSIT, academic rigor meets visionary learning. Our pedagogy is rooted in deep research and hands-on learning, enabling students to translate theory into impact. From Engineering and Business Management to Computer Applications, our accredited programs (NAAC A+, NBA) are designed to equip students with cross-disciplinary knowledge, critical thinking, and the agility needed in a rapidly evolving world.
Nestled on a sprawling 140-acre green campus, PSIT offers more than just infrastructure—it provides a sustainable and future-ready ecosystem. Our campus houses a 30,000 L/hr RO water system, a 1,530 kW Solar Power Plant saving over 1.5 million electricity units annually, and an organic waste management system, reflecting our commitment to ecological responsibility.`

const output_summary = await summarizer(input_text, { max_new_tokens: 300, min_length: 50 });

console.log('input_text',input_text);
console.log('output_summary',output_summary,typeof(output_summary),output_summary[0].summary_text)



