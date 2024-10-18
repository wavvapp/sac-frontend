import { Theme } from "./types"

export const theme: Theme = {
  colors: {
    black: "#000000",
    black_200: "#00000033",
    black_250: "#00000040",
    black_500: "#00000080",
    white: "#FFFFFF",
    white_200: "#FFFFFF33",
    white_500: "#FFFFFF80",
    gray: "#E3E3E3",
    "light-gray": "#898989",
    red: "#6B2222",
  },
  size: {
    sm: {
      fontSize: 13,
      lineHeight: 20,
    },
    base: {
      fontSize: 15,
      lineHeight: 24,
    },
    lg: {
      fontSize: 20,
      lineHeight: 28,
    },
  },
  fontWeight: {
    black: 900,
    bold: 700,
    semibold: 600,
    medium: 500,
    normal: 400,
    light: 300,
    extralight: 200,
    thin: 100,
  },

  fontStyle: {
    normal: "normal",
    italic: "italic",
  },
  fontFamily: {
    suisse: {
      black: {
        normal: "Suisse Int'l Black",
        italic: "Suisse Int'l Black Italic",
      },
      bold: {
        normal: "Suisse Int'l Black",
        italic: "Suisse Int'l Black Italic",
      },
      semibold: {
        normal: "Suisse Int'l SemiBold",
        italic: "Suisse Int'l SemiBold Italic",
      },
      medium: {
        normal: "Suisse Int'l Medium",
        italic: "Suisse Int'l Medium Italic",
      },
      normal: {
        normal: "Suisse Int'l Regular",
        italic: "Suisse Int'l Regular Italic",
      },
      light: {
        normal: "Suisse Int'l Light",
        italic: "Suisse Int'l Light Italic",
      },
      extralight: {
        normal: "Suisse Int'l Ultralight",
        italic: "Suisse Int'l Ultralight Italic",
      },
      thin: { normal: "Suisse Int'l Thin", italic: "Suisse Int'l Thin Italic" },
    },
    "writer-mono": {
      bold: {
        normal: "iAWriterMonoS-Bold",
        italic: "iAWriterMonoS-BoldItalic",
      },
      normal: {
        normal: "iAWriterMonoS-Regular",
        italic: "iAWriterMonoS-Italic",
      },
    },
    marfa: {
      normal: {
        normal: "ABCMarfaVariable-MonoRegularItalic",
        italic: "ABCMarfaVariable-MonoRegularItalic",
      },
    },
  },
}
