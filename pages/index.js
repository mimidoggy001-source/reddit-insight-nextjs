import {useState} from 'react';

export default function Home(){
  const [sub, setSub]=useState('');
  const [keyw, setKeyw]=useState('');
  const [resp, setResp]=useState(null);

  const analyze=async()=>{
    const r=await fetch(`/api/reddit?subreddit=${sub}`);
    const j=await r.json();
    setResp(j);
  };

  return(
    <div style={{padding:40}}>
      <h1>Reddit Insight Analyzer</h1>
      <div>
        <input placeholder="Subreddit" onChange={e=>setSub(e.target.value)}/>
        <input placeholder="Keyword (optional)" onChange={e=>setKeyw(e.target.value)}/>
        <button onClick={analyze}>Analyze</button>
      </div>
      <pre>{resp?JSON.stringify(resp,null,2):""}</pre>
    </div>
  );
}
