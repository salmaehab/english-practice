export const getWords= async()=>{
 const res=  await fetch('/api/words');
 const data= await res.json();
 return data
}