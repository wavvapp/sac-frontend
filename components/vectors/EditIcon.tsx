import Svg, { Path, SvgProps } from "react-native-svg";

interface EditIconProps extends SvgProps {
  width?: string;
  height?: string;
}
export default function EditIcon({
  width = "24",
  height = "24",
}: EditIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.174 6.81201C21.7027 6.28344 21.9998 5.56648 21.9999 4.81887C22 4.07125 21.7031 3.35422 21.1745 2.82551C20.6459 2.29681 19.929 1.99973 19.1813 1.99963C18.4337 1.99954 17.7167 2.29644 17.188 2.82501L3.842 16.174C3.60981 16.4055 3.43811 16.6905 3.342 17.004L2.021 21.356C1.99515 21.4425 1.9932 21.5344 2.01535 21.6219C2.03749 21.7094 2.08292 21.7892 2.14679 21.853C2.21067 21.9168 2.29062 21.9621 2.37815 21.9841C2.46569 22.0061 2.55755 22.004 2.644 21.978L6.997 20.658C7.31017 20.5628 7.59517 20.3921 7.827 20.161L21.174 6.81201Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
