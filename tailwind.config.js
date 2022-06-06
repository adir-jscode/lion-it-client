module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#7AB259",

          secondary: "#FBD062",

          accent: "#5138EE",

          neutral: "#222B40",

          "base-100": "#FFFFFF",

          info: "#8BD6EE",

          success: "#20D568",

          warning: "#F6AE28",

          error: "#E7366E",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
