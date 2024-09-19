import { GestureResponderEvent, StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import CustomText from "@/components/ui/CustomText";
import { SizeVariants } from "@/types";

type Variant = 'secondary' | 'primary';
interface ButtonProps extends TouchableOpacityProps {
    onPress: (event: GestureResponderEvent) => void;
    variant?: Variant;
    textSize: SizeVariants;
    title: string;
    active?: boolean,
    containerStyles?: ViewStyle,
    textStyles?: TextStyle
}
export function CustomButton(
    {
        variant = 'primary',
        onPress,
        textSize,
        textStyles = {},
        containerStyles = {},
        active,
        title,
        ...rest
    }: ButtonProps): JSX.Element {

    const variantStyles = {
        primary: {
            container: styles.primary,
            text: styles.primaryVariantText,
        },
        secondary: {
            container: [styles.secondary, active && styles.secondaryActive],
            text: [styles.secondaryVariantText, active && styles.secondaryActiveVariantText],
        }
    }

    const { container, text } = variantStyles[variant] || variantStyles.primary;

    return (
        <TouchableOpacity onPress={onPress} style={[container, containerStyles]}  {...rest} >
            <CustomText size={textSize} style={[text, textStyles]}>{title}</CustomText>
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
