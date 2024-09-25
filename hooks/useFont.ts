import { useFonts } from "expo-font";

export const useFont = () => {
  const [loaded, error] = useFonts({
    "ABCMarfaVariableVF-Trial": require("../assets/fonts/ABC Marfa Variable/ABCMarfaVariableVF-Trial.ttf"),
    "Suisse Int'l Black Italic": require("../assets/fonts/Suisse Int'l/Suisse Int'l Black Italic.otf"),
    "Suisse Int'l Black": require("../assets/fonts/Suisse Int'l/Suisse Int'l Black.otf"),
    "Suisse Int'l Bold": require("../assets/fonts/Suisse Int'l/Suisse Int'l Bold.otf"),
    "Suisse Int'l Bold Italic": require("../assets/fonts/Suisse Int'l/Suisse Int'l Bold Italic.otf"),
    "Suisse Int'l Book": require("../assets/fonts/Suisse Int'l/Suisse Int'l Book.otf"),
    "Suisse Int'l Book Italic": require("../assets/fonts/Suisse Int'l/Suisse Int'l Book Italic.otf"),
    "Suisse Int'l Light": require("../assets/fonts/Suisse Int'l/Suisse Int'l Light.otf"),
    "Suisse Int'l Light Italic": require("../assets/fonts/Suisse Int'l/Suisse Int'l Light Italic.otf"),
    "Suisse Int'l Medium": require("../assets/fonts/Suisse Int'l/Suisse Int'l Medium.otf"),
    "Suisse Int'l Medium Italic": require("../assets/fonts/Suisse Int'l/Suisse Int'l Medium Italic.otf"),
    "Suisse Int'l Regular": require("../assets/fonts/Suisse Int'l/Suisse Int'l Regular.otf"),
    "Suisse Int'l Regular Italic": require("../assets/fonts/Suisse Int'l/Suisse Int'l Regular Italic.otf"),
    "Suisse Int'l SemiBold": require("../assets/fonts/Suisse Int'l/Suisse Int'l SemiBold.otf"),
    "Suisse Int'l SemiBold Italic": require("../assets/fonts/Suisse Int'l/Suisse Int'l SemiBold Italic.otf"),
    "Suisse Int'l Thin": require("../assets/fonts/Suisse Int'l/Suisse Int'l Thin.otf"),
    "Suisse Int'l Thin Italic": require("../assets/fonts/Suisse Int'l/Suisse Int'l Thin Italic.otf"),
    "Suisse Int'l Ultralight": require("../assets/fonts/Suisse Int'l/Suisse Int'l Ultralight.otf"),
    "Suisse Int'l Ultralight Italic": require("../assets/fonts/Suisse Int'l/Suisse Int'l Ultralight Italic.otf"),
    // Add more fonts here if needed
  });

  return { loaded, error };
};
