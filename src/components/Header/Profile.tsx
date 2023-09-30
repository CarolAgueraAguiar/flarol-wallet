import React, { FunctionComponent } from "react";

import {
  ImageSourcePropType,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface ProfileProps {
  img: ImageSourcePropType;
  imgStyle?: StyleProp<ImageStyle>;
  imgContainerStyle?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Profile: FunctionComponent<ProfileProps> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={props.imgStyle ? props.imgStyle : styles.touch}
    >
      <Image style={styles.image} source={props.img} resizeMode="cover" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    flexDirection: "column",
    height: 45,
    width: 45,
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});

export default Profile;
