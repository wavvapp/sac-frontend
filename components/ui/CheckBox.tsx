import { View, StyleSheet, ViewStyle } from "react-native"
import CheckIcon from "@/components/vectors/CheckIcon"
import PlusIcon from "@/components/vectors/PlusIcon"
import { theme } from "@/theme";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { useState } from "react";
interface CheckBoxProps extends ViewProps {
    isChecked?: boolean;
    onCheckedChange?: (isChecked: boolean) => void;
}

export default function CheckBox({ isChecked = false, style = {}, onCheckedChange, ...rest }: CheckBoxProps): JSX.Element {

    const handleCheckedChange = () => {
        onCheckedChange?.(!isChecked);
    };

    return (
        <View
            style={[styles.container, isChecked && styles.checkedContainer, style]}
            onTouchEnd={handleCheckedChange}
            {...rest}
        >
            {isChecked ? <CheckIcon /> : <PlusIcon />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
        display: "flex",
        borderRadius: 24,
        backgroundColor: theme.colors.gray
    },
    checkedContainer: {
        backgroundColor: theme.colors.black
    },
})