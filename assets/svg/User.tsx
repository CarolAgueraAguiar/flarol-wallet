import Svg, { Path } from "react-native-svg";

export const UserIcon = () => {
  return (
    <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
      <Path
        d="M17 19v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 9a4 4 0 100-8 4 4 0 000 8z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
