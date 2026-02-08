import React, { forwardRef } from 'react';

const PreviewPanel = forwardRef(({ generatedHtml }, ref) => {
  const handleOpenInNewTab = () => {
    if (!generatedHtml) return;
    // Create a blob URL from the HTML content
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    // Open in a new tab
    window.open(url, '_blank');
  };

  return (
    <div className="preview-panel mt-3" style={{ position: 'relative' }}>
      <iframe 
        title="preview" 
        ref={ref} 
        sandbox="allow-scripts allow-forms allow-same-origin" 
        style={{ width: '100%', height: '500px', border: '1px solid #ddd', borderRadius: 6 }}
      />
      {generatedHtml && (
        <div 
          className="open-new-tab-icon" 
          onClick={handleOpenInNewTab} 
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            padding: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 1)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.8)'}
          title="Open in new tab"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
});

export default PreviewPanel;
