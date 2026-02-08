export async function generateSite(prompt, theme) {
  const resp = await fetch('http://localhost:4000/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, theme })
  });
  if (!resp.ok) {
    const err = await resp.json().catch(()=>({message:'unknown'}));
    throw new Error(err.error || err.message || 'Generation failed');
  }
  return resp.json();
}