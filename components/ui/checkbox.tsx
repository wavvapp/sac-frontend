import { View, StyleSheet } from "react-native"
import CheckIcon from "@/components/Vectors/CheckIcon"
import PlusIcon from "@/components/Vectors/PlusIcon"
interface CheckBoxProps {
    isChecked: boolean
}

export const CheckBox: React.FC<CheckBoxProps> = ({ isChecked = false }): JSX.Element => {
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