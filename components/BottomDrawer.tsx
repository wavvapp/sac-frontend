import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useImperativeHandle, useMemo, useRef } from "react";

export default function BottomDrawer({ children, ref }: any) {
    const snapPoints = useMemo(() => ["20%", "88%"], []);
    const bottomSheetRef = useRef<BottomSheet>(null);


    useImperativeHandle(ref, () => ({
        openBottomSheet: () => {
            bottomSheetRef.current?.expand();
        },
    }));

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

            {children}
        </BottomSheet>
    )
}
