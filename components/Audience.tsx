import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native"
import { CustomTitle } from "@/components/ui/CustomTitle"
import FriendsList from "@/components/lists/Friends"
import { useEffect, useMemo, useState } from "react"
import { AudienceOptions } from "@/types"
import { theme } from "@/theme"
import { width } from "@/utils/dimensions"
import GroupsList from "@/components/lists/Groups"

export default function Audience() {
  const [selectedAudience, setSelectedAudience] = useState(
    AudienceOptions.GROUPS,
  )

  const translateX = useMemo(
    () =>
      new Animated.Value(
        selectedAudience === AudienceOptions.FRIENDS ? width / 2.22 : 0,
      ),
    [selectedAudience],
  )

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: selectedAudience === AudienceOptions.FRIENDS ? width / 2.22 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [selectedAudience, translateX])
  const toggleAudienceOptions = (tab: AudienceOptions) =>
    setSelectedAudience(tab)

  return (
    <View style={styles.container}>
      <CustomTitle text="with whom" />

      <View style={styles.audienceSwitch}>
        <TouchableWithoutFeedback
          onPress={() => toggleAudienceOptions(AudienceOptions.GROUPS)}>
          <CustomTitle
            text="GROUPS"
            style={[
              styles.AudienceOptionText,
              selectedAudience === AudienceOptions.GROUPS
                ? styles.primaryAudienceOption
                : styles.secondaryAudienceOption,
            ]}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => toggleAudienceOptions(AudienceOptions.FRIENDS)}>
          <CustomTitle
            text="FRIENDS"
            style={[
              styles.AudienceOptionText,
              selectedAudience === AudienceOptions.FRIENDS
                ? styles.primaryAudienceOption
                : styles.secondaryAudienceOption,
            ]}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
              backgroundColor: theme.colors.black,
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
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
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
    // borderWidth: 1,
    // borderRadius: 50,
  },
})
