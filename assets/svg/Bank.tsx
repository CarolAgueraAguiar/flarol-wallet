import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const BankIcon = () => {
  return (
    <Svg width={30} height={30} viewBox="0 0 20 20" fill="none">
      <Path
        d="M1.667 6.667V10H2.5V15h-.833v2.5h16.666V15H17.5v-5h.833V6.668l-8.333-5-8.333 5zM5 15v-5h1.667v5H5zm4.167 0v-5h1.666v5H9.167zM15 15h-1.667v-5H15v5zm-3.333-8.333A1.669 1.669 0 018.82 7.845a1.667 1.667 0 112.847-1.178z"
        fill="#fff"
      />
    </Svg>
  );
};
