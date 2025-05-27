/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'light', // 기본 테마도 포함
      {
        lunchapp: {
          primary: '#10b981',      // emerald-500
          secondary: '#3b82f6',    // blue-500
          accent: '#f472b6',       // pink-400
          neutral: '#f3f4f6',      // gray-100
          'base-100': '#ffffff',   // white
          'base-200': '#f9fafb',   // gray-50
          'base-300': '#e5e7eb',   // gray-200
        },
      },
    ],
  }
}

