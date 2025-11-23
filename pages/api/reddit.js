export default async function handler(req,res){
  const {subreddit}=req.query;
  if(!subreddit) return res.status(400).json({error:"missing subreddit"});
  let all=[]; let after=null;

  try{
    for(let i=0;i<20;i++){
      let url=`https://www.reddit.com/r/${subreddit}/new.json?limit=100`;
      if(after) url+=`&after=${after}`;
      const r=await fetch(url,{headers:{"User-Agent":"RedditInsightBot/1.0"}});
      const j=await r.json();
      const posts=j?.data?.children||[];
      if(!posts.length) break;
      all=[...all,...posts];
      after=j?.data?.after;
      if(!after||all.length>=1500) break;
    }
    res.status(200).json({count:all.length,posts:all.slice(0,1500)});
  }catch(e){res.status(500).json({error:e.toString()});}
}
