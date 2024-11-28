import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      black: "#000000",
      gray: {
        500: "#777777",
        400: "#DDDDDD",
        300: "#F0F0F0",
        200: "#F9F9F9",
      },
      white: "#FFFFFF",
      blue: {
        500: "#353A5D",
        400: "#4A4E6E",
        300: "#4D1FE5",
        200: "#353a5d1a",
        100: "#4d1fe51a",
      },
      red: { 500: "#BF1E2E", 400: "#BF1E2E0d" },
      orange: "#FF9B19",
      green: {
        500: "#007737",
        100: "#0077371a",
      },
    },
    fontFamily: {
      montserrat: "Montserrat, sans-serif",
      oswald: "Oswald, sans-serif",
    },
    fontSize: {
      "h1-lg": "3.125rem",
      "h1-sm": "1.25rem",
      "h2-lg": "2.375rem",
      "h2-sm": "1.875rem",
      "h3-lg": "1.625rem",
      "h3-sm": "1.25rem",
      button: "1rem",
      "body-lg": "1rem",
      "body-md": "0.875rem",
      "body-sm": "0.75rem",
    },
    borderRadius: {
      base: "10px",
      ProfileBadge: "4px",
      PostBadge: "15px",
      input: "10px",
    },
    boxShadow: {
      base: "0px 2px 4px rgba(0, 0, 0, 0.16)",
      input: "0px 2px 4px rgba(0, 0, 0, 0.16)",
    },
    lineHeight: {
      1.08: "1.08",
      1.11: "1.11",
      1.13: "1.13",
      1.19: "1.19",
      1.25: "1.25",
      1.29: "1.29",
      1.5: "1.5",
      1.625: "1.625",
    },
  },
  shortcuts: {
    // TYPOGRAPHY
    // HEADINGS
    // desktop
    "text--h1-lg": "text-h1-lg font-oswald text-red-500 leading-1.08 my-0",
    "text--h2-lg": "text-h2-lg font-oswald text-blue-500 leading-1.11 my-0",
    "text--h3-lg": "text-h3-lg font-oswald text-blue-500 leading-1.5 my-0",
    // mobile
    "text--h1-sm": "text-h1-sm font-oswald text-red-500 leading-1.5 my-0",
    "text--h2-sm": "text-h2-sm font-oswald text-blue-500 leading-1.13 my-0",
    "text--h3-sm": "text-h3-sm font-oswald text-blue-500 leading-1.5 my-0",
    // BODY
    "text--body-lg": "text-body-lg font-montserrat text-gray-500 leading-1.625 m-0",
    "text--body-md": "text-body-md font-montserrat text-gray-500 leading-1.29 m-0",
    "text--body-sm": "text-body-sm font-montserrat text-gray-500 leading-1.25 font-bold m-0",
    // link
    link: "text-blue-500 font-montserrat text-body-md leading-1.19 font-bold no-underline",
    //button
    "btn-sm": "flex gap-2 items-center justify-center rounded-base p-1.5 text-center cursor-pointer font-bold font-montserrat text-3.5 text-blue-500 shadow-base leading-1.29 w-100%",
    "btn-lg": "flex gap-2 items-center justify-center rounded-base p-4 text-center cursor-pointer font-bold font-montserrat text-button shadow-base leading-1.19 w-100%",
    "btn-primary": "bg-blue-500 text-white border-none hover:bg-blue-400",
    "btn-secondary": "bg-white text-blue-500 border-solid border-1px border-gray-400 hover:bg-gray-200 border-1px border-solid border-gray-400",
    "btn-tertiary": "bg-red-500 text-white hover:bg-red-400",
    "btn-borderless": "bg-transparent border-none shadow-none",
    "btn-disabled": "opacity-50 cursor-not-allowed",
    "icon-btn-leading": "flex items-center gap-2",
    "icon-btn-trailing": "flex items-center gap-2",
    "icon-btn-top": "flex flex-col items-center gap-2",
    "icon-btn-bottom": "flex flex-col items-center gap-2",
    //checkbox
    checkbox: "w-4 h-4 border-1px border-gray-400 bg-gray-400 rounded-1px font-montserrat",
    "checkbox-label": "text-blue-500 font-montserrat text-body-md leading-1.29",
    //filter tag
    "filter-tag": "w-fit h-fit text-blue-500 bg-gray-400 px-4.5 py-2.5 rounded-4.5 text-body-sm font-bold cursor-pointer transition-colors border-none focus:outline-none ",
    "filter-tag-selected": "bg-blue-500 text-white border-none",
    //post badge
    "post-badge--lg": "font-montserrat font-bold text-body-md leading-1.5 p-2 rounded-PostBadge w-fit",
    "post-badge--sm": "font-montserrat font-bold text-body-sm leading-1.5 p-2 rounded-PostBadge w-fit",
    "post-badge--offer": "bg-green-100 text-green-500",
    "post-badge--wanted": "bg-blue-100 text-blue-300",
    //profile badge
    "profile-badge--lg": "bg-blue-200 text-blue-500 font-montserrat font-bold text-body-lg leading-1.625 p-2 rounded-ProfileBadge w-fit",
    "profile-badge--sm": "bg-blue-200 text-blue-500 font-montserrat font-bold text-body-md font-montserrat font-bold leading-1.29 p-2 rounded-ProfileBadge w-fit",
    // progress bar
    "progress-bar": "bg-gray-400 h-2 rounded-1px",
    "progress-bar__fill": "bg-blue-500 h-2 rounded-1px",
    // radio button
    "radio-btn": "flex items-center",
    "radio-btn--checked": "bg-blue-500",
    // range input
    //tag
    tag: "rounded-base bg-blue-500 text-white font-montserrat font-bold text-body-md leading-1.29 py-1.75 px-3 w-fit",
    //textarea
    textarea: "border-1px border-solid border-gray-400 rounded-input p-4 text--body-md font-montserrat shadow-input hover:border-gray-500 focus:border-gray-500 focus-visible:border-gray-500",
    //text input
    "input-container": "flex items-center rounded-md p4 gap-2 border-1px border-solid transition-colors  border-gray-400 hover:border-gray-500 focus-within:border-gray-500",
    "input-text": "w-full outline-none border-none bg-transparent text-gray-800 font-montserrat",
    // dropdown item
    "dropdown-item": "px-4 py-4 hover:bg-gray-200 hover:rounded-md cursor-pointer font-montserrat text--body-md",
    // dropdown input
    "dropdown-input":
      "flex items-center justify-between px-4 py-4 border-1px border-solid border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer font-montserrat text--body-md bg-white",
    //option tag
    "option-tag": "inline-flex items-center justify-between gap-3 p-2 rounded-sm border cursor-pointer bg-blue-500 text-white font-montserrat hover:bg-blue-400 text-body-sm font-bold w-fit",
  },
  safelist: [
    "text--h1-lg",
    "text--h2-lg",
    "text--h3-lg",
    "text--h1-sm",
    "text--h2-sm",
    "text--h3-sm",
    "text--body-lg",
    "text--body-md",
    "text--body-sm",
    "link",
    "btn-lg",
    "btn-sm",
    "btn-primary",
    "btn-secondary",
    "btn-tertiary",
    "btn-borderless",
    "icon-btn-leading",
    "icon-btn-trailing",
    "icon-btn-top",
    "icon-btn-bottom",
    "btn-disabled",
    "checkbox",
    "checkbox-label",
    "filter-tag",
    "filter-tag-selected",
    "post-badge--lg",
    "post-badge--sm",
    "post-badge--offer",
    "post-badge--wanted",
    "profile-badge--lg",
    "profile-badge--sm",
    "progress-bar",
    "progress-bar__fill",
    "radio-btn",
    "radio-btn--checked",
    "tag",
    "textarea",
    "input-container",
    "input-text",
    "dropdown-item",
    "dropdown-input",
    "option-tag",
  ],
});
