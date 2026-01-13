import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #000000;
    --navy: #050505;
    --light-navy: #111111;
    --lightest-navy: #222222;
    --navy-shadow: rgba(0, 0, 0, 0.9);
    --dark-slate: #cfd8ea;
    --slate: #e6f1ff;
    --light-slate: #f0f5ff;
    --lightest-slate: #ffffff;
    --white: #ffffff;
    --green: #E07A5F;
    --green-tint: rgba(224, 122, 95, 0.1);
    --pink: #f57dff;
    --blue: #57cbff;

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 70px;
    --nav-scroll-height: 60px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }

  body.light-mode {
    --dark-navy: #e6f1ff;
    --navy: #ffffff;
    --light-navy: #f8f9fa;
    --lightest-navy: #dee2e6;
    --navy-shadow: rgba(0, 0, 0, 0.1);
    --dark-slate: #333333;
    --slate: #111111;
    --light-slate: #222222;
    --lightest-slate: #000000;
    --white: #000000;
    --green: #E07A5F;
    --green-tint: rgba(224, 122, 95, 0.1);
  }
`;

export default variables;
