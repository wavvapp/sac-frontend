import { Theme } from "@/types"
import { Platform } from "react-native"
export const theme: Theme = {
  colors: {
    black: "#000000",
    black_30: "#000000BF",
    black_50: "#1A1A1D",
    black_100: "#0000000D",
    black_200: "#00000033",
    black_250: "#00000040",
    black_500: "#00000080",
    white: "#FFFFFF",
    white_200: "#FFFFFF33",
    white_500: "#FFFFFF80",
    gray: "#E3E3E3",
    gray_100: "#cccccc",
    light_gray: "#898989",
    red: "#EA4335",
  },
  fontSize: {
    sm: 13,
    base: 15,
    lg: 20,
  },
  lineHeight: {
    sm: 20,
    base: 24,
    lg: 28,
  },
  fontWeight: {
    black: "900",
    bold: "700",
    semibold: Platform.OS === "ios" ? "semibold" : "700",
    medium: "500",
    normal: "400",
    light: "300",
    extralight: "200",
    thin: "100",
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
    "writer-monos": {
      bold: {
        normal: "iAWriterMonoS-Bold",
        italic: "iAWriterMonoS-BoldItalic",
      },
      normal: {
        normal: "iAWriterMonoS-Regular",
        italic: "iAWriterMonoS-Italic",
      },
    },
    "writer-monov": {
      normal: {
        normal: "iAWriterMonoV",
        italic: "iAWriterMonoV-Italic",
      },
    },
  },
}
