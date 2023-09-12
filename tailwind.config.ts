import type { Config } from 'tailwindcss'
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'black-opacity': 'rgba(55,55,55,0.58)',
        'red-opacity': '#DDCBD1',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({

  })],
}
export default config
