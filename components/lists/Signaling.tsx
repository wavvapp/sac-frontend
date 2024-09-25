import React, { forwardRef, useRef, useImperativeHandle, useMemo } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import CustomText from "@/components/ui/CustomText";
import UserAvatar from "@/components/ui/UserAvatar";
import UserInfo from "@/components/UserInfo";
import Badge from "@/components/ui/Badge";
import { defaultUsers } from "@/datas/users";
import { User } from "@/types";
export interface SignalingRef {
  openBottomSheet: () => void;
}

interface SignalingProps {
  users?: User[];
}

const Signaling = forwardRef<SignalingRef, SignalingProps>((props, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useImperativeHandle(ref, () => ({
    openBottomSheet: () => {
      bottomSheetRef.current?.expand();
    },
  }));

  const displayUsers = props.users?.length ? props.users : defaultUsers;

  const snapPoints = useMemo(() => ["20%", "90%"], []);

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={0}
      appearsOnIndex={0}
      pressBehavior="close"
    />
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Badge name={displayUsers.length.toString()} />
          <CustomText size="sm" fontWeight="bold">
            Friends are signaling
          </CustomText>
        </View>
        <FlatList
          contentContainerStyle={styles.listContent}
          style={styles.flalist}
          data={displayUsers as User[]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <UserAvatar imageUrl={0} />
              <View>
                <UserInfo
                  firstName={item.firstName}
                  lastName={item.lastName}
                  time={item.time}
                  activity={item.activity}
                />
              </View>
            </View>
          )}
        />
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 18,
  },
  flalist: {
    width: "100%",
  },
  listContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom:70
  },
});

export default Signaling;