import React, { useState, useRef } from 'react';
import PromptBox from './components/PromptBox';
import PromptList from './components/PromptList';
import ThemeCustomizer from './components/ThemeCustomizer';
import PreviewPanel from './components/PreviewPanel';
import CodeViewer from './components/CodeViewer';
import { generateSite } from './api';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [theme, setTheme] = useState({ mode: 'dark', color: '#6f42c1' });
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState({ html: '', css: '', js: '' });
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [isTemplate, setIsTemplate] = useState(false);
  const previewRef = useRef();

  // Mapping from display name to file name
  const templateMap = {
    "Disaster Relief Donations": "DRD.HTML",
    "Rural Women Entrepreneurs": "RWE.HTML",
    "Tree Plantation Campaign": "TPC.HTML",
    "Blood Donation Drive": "BDD.HTML",
    "Climate Awareness": "CA.HTML",
    "Animal Rescue Adoption": "ARA.HTML",
    "NGO Educational Programs": "NEP.HTML",
    "Community Health Awareness": "CHA.HTML",
    "Youth Empowerment Workshops": "YEW.HTML",
    "Quiz for Kids": "QK.HTML",
    "Free Skill Training": "FST.HTML",
    "Volunteer Showcase Platform": "VSP.HTML",
    "Legal Aid for Women": "LAW.HTML",
    "Clean Energy Awareness": "CEA.HTML",
    "Mental Health Support Hub": "MH.HTML"
  };

  async function handleGenerate(p, isFromList = false) {
    const ptext = p ?? prompt;
    if (!ptext) return alert('Enter a prompt or choose a sample prompt.');
    setLoading(true);
    setError('');
    setIsTemplate(isFromList);
    try {
      if (isFromList) {
        // Template-based: Load from src/templates/
        const fileName = templateMap[p] || `${p.toLowerCase().replace(/\s+/g, '')}.html`; // Fallback
        const response = await fetch(`/src/templates/${fileName}`);
        if (!response.ok) throw new Error('Template not found');
        const templateHtml = await response.text();
        setGenerated({ html: templateHtml, css: '', js: '' });
        // Inject into iframe
        const doc = previewRef.current.contentDocument || previewRef.current.contentWindow.document;
        doc.open();
        doc.write(templateHtml);
        doc.close();
      } else {
        // Custom prompt: Use API
        const res = await generateSite(ptext, theme);
        setGenerated({ html: res.html || '', css: res.css || '', js: res.js || '' });
        // Inject into iframe
        const doc = previewRef.current.contentDocument || previewRef.current.contentWindow.document;
        const safeCss = res.css ? `<style>${res.css}</style>` : '';
        const safeJs = res.js ? `<script>${res.js}</script>` : '';
        const fullHtml = res.html || '<!doctype html><html><head></head><body><h3>No output</h3></body></html>';
        const injected = fullHtml.replace('</head>', `${safeCss}</head>`).replace('</body>', `${safeJs}</body>`);
        doc.open();
        doc.write(injected);
        doc.close();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Generation failed');
    } finally {
      setLoading(false);
    }
  }

  function handleDownloadZip() {
    const zip = new JSZip();
    const folder = zip.folder('generated-site');
    if (isTemplate) {
      // For templates: Include the single HTML file
      folder.file('index.html', generated.html);
    } else {
      // For custom: Existing logic
      const htmlText = generated.html || `<link rel="stylesheet" href="style.css"><script src="app.js"></script>`;
      folder.file('index.html', htmlText);
      folder.file('style.css', generated.css || '');
      folder.file('app.js', generated.js || '');
    }
    zip.generateAsync({ type: 'blob' }).then(function(content) {
      saveAs(content, 'generated-site.zip');
    });
  }

  return (
    <div className="container-fluid app-root">
      <div className="row header-row">
        <div className="col-8">
          <h1>AI based Automatic Website Builder</h1>
          <p className="muted">Created by <strong>Bhoomika,Lakshmi and Rakesh</strong></p>
        </div>
        <div className="col-4 text-end">
          <ThemeCustomizer theme={theme} setTheme={setTheme} />
        </div>
      </div>

      <div className="row main-row">
        <div className="col-lg-5 left-panel">
          <PromptBox prompt={prompt} setPrompt={setPrompt} onGenerate={() => handleGenerate()} loading={loading} />
          <PromptList onUsePrompt={(p) => { setPrompt(p); handleGenerate(p, true); }} />
          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </div>

        <div className="col-lg-7 right-panel">
          <div className="d-flex justify-content-between">
            <div>
              <button className="btn btn-primary me-2" onClick={() => handleGenerate()} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</button>
              <button className="btn btn-outline-secondary me-2" onClick={() => setShowCode(s => !s)}>{showCode ? 'Hide Code' : 'Show Code'}</button>
              <button className="btn btn-success" onClick={handleDownloadZip} disabled={!generated.html}>Download ZIP</button>
            </div>
            <div>
              <small className="text-muted">Preview Theme: {theme.mode} / {theme.color}</small>
            </div>
          </div>

          <PreviewPanel ref={previewRef} generatedHtml={generated.html} />

          {showCode && <CodeViewer generated={generated} />}
        </div>
      </div>
    </div>
  );
}