export default async function handler(req,res){
  const key=process.env.GEMINI_API_KEY;
  if(!key) return res.status(500).json({error:"Missing GEMINI_API_KEY"});

  res.status(200).json({ok:true, msg:"Gemini endpoint placeholder. Add logic."});
}
