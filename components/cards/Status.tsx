import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { CustomButton } from "@/components/ui/Button";

interface StatusProps {
  timeSlots: string[];
}

function Status({ timeSlots }: StatusProps) {
  const [activeSlot, setActiveSlot] = useState<string>(timeSlots[0]);
  const handlePress = (slot: string) => {
    setActiveSlot(slot);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>When</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.buttonContainer}>
          {timeSlots.map((slot) => (
            <View key={slot} style={styles.buttonWrapper}>
              <CustomButton
                title={slot}
                onPress={() => handlePress(slot)}
                textSize="lg"
                variant="secondary"
                active={activeSlot === slot}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Status;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonWrapper: {
    margin: 5,
  },
});
