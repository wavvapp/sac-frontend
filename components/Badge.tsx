import { theme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";


export default function Badge({name, variant = "default" }:{name:string, variant?:string}) {

  return (
   <View style={[styles.container, variant === "outline" ? styles.outline : styles.default ]}>
    <Text style={textVariant[variant]}>{name}</Text>
   </View>
  )
}
const textVariant  = StyleSheet.create({
  default: {
    color: theme.colors.white,
  },
  outline: {
    color: theme.colors.black,
  },
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
  },
  default: {
    backgroundColor: theme.colors.black,
    paddingVertical: 1,
    paddingHorizontal: 6,
  },
  outline: {
    paddingVertical: 4, 
    paddingHorizontal: 8,
    borderColor: theme.colors.black,
    borderWidth: 1,
  },
});
