import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const WalletIcon = () => {
  return (
    <Svg width={30} height={30} viewBox="0 0 20 20" fill="none">
      <Path d="M11.667 7.5h6.666v5h-6.666v-5z" fill="#fff" />
      <Path
        d="M16.667 2.5h-12.5a2.503 2.503 0 00-2.5 2.5v10c0 1.378 1.121 2.5 2.5 2.5h12.5c.919 0 1.666-.747 1.666-1.667v-1.666h-6.666c-.92 0-1.667-.748-1.667-1.667v-5c0-.92.748-1.667 1.667-1.667h6.666V4.167c0-.92-.747-1.667-1.666-1.667z"
        fill="#fff"
      />
    </Svg>
  );
};
