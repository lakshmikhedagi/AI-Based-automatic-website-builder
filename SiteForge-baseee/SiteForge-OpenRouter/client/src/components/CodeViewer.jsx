import React from 'react';

export default function CodeViewer({ generated }) {
  return (
    <div className="code-viewer mt-3">
      <h6>Generated HTML</h6>
      <pre className="code-block">{generated.html || 'No HTML'}</pre>
      <h6>Generated CSS</h6>
      <pre className="code-block">{generated.css || 'No CSS'}</pre>
      <h6>Generated JS</h6>
      <pre className="code-block">{generated.js || 'No JS'}</pre>
    </div>
  );
}