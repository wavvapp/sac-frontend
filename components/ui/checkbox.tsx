import { View, StyleSheet } from "react-native"
import CheckIcon from "@/components/vectors/CheckIcon"
import PlusIcon from "@/components/vectors/PlusIcon"
interface CheckBoxProps {
    isChecked?: boolean
}

export const CheckBox = ({ isChecked = false }: CheckBoxProps): JSX.Element => {
    return (
        <View style={[styles.container, isChecked && styles.checkedContainer]}>
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
        backgroundColor: "#E3E3E3"
    },
    checkedContainer: {
        backgroundColor: "#000"
    },
})