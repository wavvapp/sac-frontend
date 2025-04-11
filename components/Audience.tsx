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
    AudienceOptions.FRIENDS,
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
      bounciness: 0,
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
            <View
              style={[
                styles.AudienceOptionText,
                selectedAudience === option.value
                  ? styles.activeTab
                  : [
                      styles.nonActiveTab,
                      selectedAudience === AudienceOptions.FRIENDS
                        ? {
                            borderLeftWidth: 1,
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 20,
                          }
                        : {
                            borderRightWidth: 1,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                          },
                    ],
                selectedAudience === option.value
                  ? selectedAudience === AudienceOptions.FRIENDS
                    ? { marginLeft: -24 }
                    : { marginRight: -24 }
                  : null,
              ]}>
              <CustomTitle
                text={option.label}
                style={[
                  selectedAudience === option.value
                    ? styles.activeTabText
                    : styles.nonActiveTabText,
                ]}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}

        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
              zIndex: 5, // Ensure thumb is below text
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
    marginBottom: 24,
  },
  thumb: {
    width: "50%",
    height: "100%",
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
  activeTabText: {
    color: theme.colors.white,
  },
  nonActiveTabText: {
    color: theme.colors.black,
  },
  activeTab: {
    justifyContent: "center",
    alignItems: "center",
  },
  nonActiveTab: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: theme.colors.black_200,
  },
})
