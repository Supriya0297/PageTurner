import pdf from 'pdf-parse';

export async function extractTextFromPdf(pdfUrl){
  const response = await fetch(pdfUrl);
  const arrayBuffer = await response.arrayBuffer();
  const dataBuffer = Buffer.from(arrayBuffer);
  //console.log(dataBuffer);
  const data = await pdf(dataBuffer);
  const text = data.text;
  //console.log("text:\n",text);
  return text;
}