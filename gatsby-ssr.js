import React from 'react';

export const onRenderBody = ({ setPreBodyComponents }) => {
    setPreBodyComponents([
        <script
            key="theme-check"
            dangerouslySetInnerHTML={{
                __html: `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
    if (!theme && supportDarkMode) theme = 'dark';
    
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  } catch (e) {}
})();
`,
            }}
        />,
    ]);
};