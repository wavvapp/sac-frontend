import React, { useState } from "react";
import { View, Text, Button } from "react-native";

interface StatusProps {
  timeSlots: string[];
}

function Status({ timeSlots }: StatusProps) {
  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  const handlePress = (slot: string) => {
    setActiveSlot(slot);
  };

  return (
    <View>
      <Text style={{ margin: 10, fontSize: 18, fontWeight: "bold" }}>
        When
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {timeSlots.map((slot) => (
          <View key={slot} style={{ margin: 5 }}>
            <Button
              title={slot}
              onPress={() => handlePress(slot)}
              color={activeSlot === slot ? "black" : "gray"}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export default Status;
