import Svg, { Path } from "react-native-svg";

export const CategoryIcon = () => {
  return (
    <Svg width={22} height={22} viewBox="0 0 12 12">
      <Path
        fillRule="evenodd"
        fill={"#FFF"}
        d="M1 1h3v3H1V1zM0 0h5v5H0V0zm1 8h3v3H1V8zM0 7h5v5H0V7zm11-6H8v3h3V1zM8 0H7v5h5V0H8zm0 8h3v3H8V8zM7 7h5v5H7V7z"
      />
    </Svg>
  );
};
