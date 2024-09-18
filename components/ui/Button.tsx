interface ButtonProps {
    variants?: 'secondary' | 'primary' | null
}
export const Button = ({ variants = 'primary' }: ButtonProps): JSX.Element => {
    return (
        <div>Button</div>
    )
}

