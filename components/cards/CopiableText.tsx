import { StyleSheet, TouchableOpacity } from "react-native"
import CustomText from "@/components/ui/CustomText"
import * as Clipboard from "expo-clipboard"
import { useState } from "react"

export const CopiableText = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(text)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error("Failed to copy text:", error)
    }
  }
  return (
    <TouchableOpacity onPress={handleCopy}>
      <CustomText size="lg" fontWeight="semibold" style={styles.titleText}>
        {text}
      </CustomText>
      <CustomText size="base" style={styles.body}>
        {copied ? "Copied!" : "Tap to copy"}
      </CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 40,
    lineHeight: 56,
  },
  body: { textAlign: "center" },
})
