import React from 'react';

export default function PromptBox({ prompt, setPrompt, onGenerate, loading }) {
  return (
    <div className="card prompt-box">
      <div className="card-body">
        <h5 className="card-title">Enter your prompt</h5>
        <textarea className="form-control" rows="5" value={prompt} placeholder="Describe the site you want..." onChange={(e)=>setPrompt(e.target.value)} />
        <p className="muted">Enter a prompt (or click an example) → Generate → Preview → Download</p>
        {/* <div className="mt-2">
          <small className="text-muted">Try: "Create a clean NGO donations landing page for disaster relief with donate button and contact form"</small>
        </div> */}
      </div>
    </div>
  );
}