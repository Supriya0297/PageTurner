import bcryptjs from 'bcryptjs';

export async function encryptPassword(plain_text_pass){
  const salt = await bcryptjs.genSalt();
  console.log("salt",salt);
  const encrypted_pass = await bcryptjs.hash(plain_text_pass,salt);
  console.log("encrypted_pass",encrypted_pass);
  return encrypted_pass
}

export async function verifyPasswords(plain_text_pass,encrypted_pass){
  console.log("comparing",plain_text_pass,encrypted_pass);
  const isValidPassword = await bcryptjs.compare(plain_text_pass,encrypted_pass);
  console.log("isValidPassword",isValidPassword);
  return isValidPassword
}