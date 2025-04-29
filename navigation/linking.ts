import { LinkingOptions } from "@react-navigation/native"

export const linking: LinkingOptions<any> = {
  prefixes: ["wavv://", "https://wavvapp.com"], // match scheme and optional web domain
  config: {
    screens: {
      Home: "Home",
      NotFound: "*",
    },
  },
}
