export const getRank= async(score)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'score':score })
    };
    const res=  await fetch('/api/rank',requestOptions);
    console.log("Res",res)
    const data= await res.json();
    console.log("Data",data)
    return data
   }