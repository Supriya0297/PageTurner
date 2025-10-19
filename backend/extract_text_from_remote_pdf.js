import pdf from 'pdf-parse';

const response = await fetch('https://dashing-cascaron-325b44.netlify.app/Principles%20of%20Data%20Science.pdf');
console.log(response);
// const text = response.text(); // const json = response.json();
const arrayBuffer = await response.arrayBuffer();
console.log(arrayBuffer);
const dataBuffer = Buffer.from(arrayBuffer);
console.log(dataBuffer);
const data = await pdf(dataBuffer);
const text = data.text;
console.log("text:\n",text);