import { ReactNode } from "react"
import { Text, View, StyleSheet } from "react-native"
import CheckIcon from "@/components/Vectors/CheckIcon"
import PlusIcon from "@/components/Vectors/PlusIcon"
interface CheckBoxProps {
    isChecked: boolean
}

export const CheckBox: React.FC<CheckBoxProps> = ({ isChecked }): ReactNode => {
    return (
        <Text>
            {isChecked ?
                <View style={[styles.container, styles.activeContainer]}>
                    <CheckIcon />
                </View>
                :
                <View style={styles.container}>
                    <PlusIcon />
                </View>
            }
        </Text>
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
    activeContainer: {
        backgroundColor: "#000"
    },
})