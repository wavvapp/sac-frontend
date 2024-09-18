import { StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "@/components/ui/CustomText";
import { SizeVariants } from "@/types";

type Variant = 'secondary' | 'primary' | null;
interface ButtonProps {
    onPress: (args: any) => void;
    variant?: Variant;
    textSize: SizeVariants;
    title: string;
    active?: boolean
}
export function CustomButton({ variant = 'primary', onPress, textSize, active, title, ...rest }: ButtonProps): JSX.Element {
    let containerClasses = {}
    let textClasses = {}
    switch (variant) {
        case 'primary':
            containerClasses = styles.primary
            textClasses = styles.primaryVariantText
            break;

        case 'secondary':
            containerClasses = [styles.secondary, active && styles.secondaryActive]
            textClasses = [styles.secondaryVariantText, active && styles.secondaryActiveVariantText]
            break;

        default:
            containerClasses = styles.primary
            textClasses = styles.primaryVariantText
            break;
    }
    return (
        <TouchableOpacity onPress={onPress} style={containerClasses}  {...rest} >
            <CustomText size={textSize} style={textClasses}>{title}</CustomText>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    primary: {
        backgroundColor: "#000",
        color: "#fff",
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 24
    },
    primaryVariantText: {
        color: "#fff",
        fontWeight: 500
    },
    secondary: {
        backgroundColor: "#ffff",
        borderColor: "#000",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 100
    },
    secondaryActive: {
        backgroundColor: "#000"
    },
    secondaryVariantText: {
        color: "#000",
        textTransform: "uppercase"
    },
    secondaryActiveVariantText: {
        color: "#FFF",
    }
})
