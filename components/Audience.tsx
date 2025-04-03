import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native"
import { CustomTitle } from "@/components/ui/CustomTitle"
import FriendsList from "@/components/lists/Friends"
import { useEffect, useRef, useState } from "react"
import { AudienceOptions } from "@/types"
import { theme } from "@/theme"
import { width } from "@/utils/dimensions"
import GroupsList from "@/components/lists/Groups"

const audienceOptions = [
  { label: "GROUPS", value: AudienceOptions.GROUPS },
  { label: "FRIENDS", value: AudienceOptions.FRIENDS },
]

export default function Audience() {
  const [selectedAudience, setSelectedAudience] = useState(
    AudienceOptions.GROUPS,
  )

  const translateX = useRef(
    new Animated.Value(
      selectedAudience === AudienceOptions.FRIENDS ? width / 2.22 : 0,
    ),
  ).current

  const toggleAudienceOptions = (tab: AudienceOptions) =>
    setSelectedAudience(tab)

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: selectedAudience === AudienceOptions.FRIENDS ? width / 2.22 : 0,
      useNativeDriver: true,
    }).start()
  }, [selectedAudience, translateX])

  return (
    <View style={styles.container}>
      <CustomTitle text="with whom" />
      <View style={styles.audienceSwitch}>
        {audienceOptions.map((option) => (
          <TouchableWithoutFeedback
            key={option.value}
            onPress={() => toggleAudienceOptions(option.value)}>
            <CustomTitle
              text={option.label}
              style={[
                styles.AudienceOptionText,
                selectedAudience === option.value
                  ? styles.primaryAudienceOption
                  : styles.secondaryAudienceOption,
              ]}
            />
          </TouchableWithoutFeedback>
        ))}

        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
      {selectedAudience === AudienceOptions.GROUPS ? (
        <GroupsList />
      ) : (
        <FriendsList />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 12,
    paddingHorizontal: 20,
  },
  audienceSwitch: {
    flexDirection: "row",
    position: "relative",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: theme.colors.black_200,
    marginBottom: 24,
  },

  thumb: {
    width: "50%",
    height: "100%",
    borderColor: theme.colors.black,
    borderWidth: 1,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: theme.colors.black,
  },
  AudienceOptionText: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 7.5,
    position: "relative",
    zIndex: 10,
  },
  primaryAudienceOption: {
    color: theme.colors.white,
    borderColor: theme.colors.black_200,
  },
  secondaryAudienceOption: {
    color: theme.colors.black,
  },
})
