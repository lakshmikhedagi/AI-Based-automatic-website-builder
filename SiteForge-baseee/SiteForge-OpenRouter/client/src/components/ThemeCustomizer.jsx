import React from 'react';

export default function ThemeCustomizer({ theme, setTheme }) {
  const colors = ['#6f42c1', '#0d6efd', '#198754', '#e83e8c', '#fd7e14'];

  return (
    <div className="theme-customizer">
      <div className="btn-group" role="group">
        <button className={`btn btn-sm ${theme.mode==='dark' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={()=> setTheme(t=>({ ...t, mode:'dark' }))}>Dark</button>
        <button className={`btn btn-sm ${theme.mode==='light' ? 'btn-light' : 'btn-outline-light'}`} onClick={()=> setTheme(t=>({ ...t, mode:'light' }))}>Light</button>
      </div>
      <div className="mt-2">
        {colors.map(c=>(
          <button key={c} className="color-swatch" style={{background:c}} onClick={()=> setTheme(t=>({...t, color:c}))} />
        ))}
      </div>
    </div>
  );
}