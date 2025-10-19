import pdf from 'pdf-parse';
import fs from 'fs';

const buffer = await fs.readFileSync('Java.pdf');
const data = await pdf(buffer);
const text = data.text;
console.log("text:\n",text);