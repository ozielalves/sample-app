import { Platform, type ViewStyle } from "react-native";

import UIConst from "modules/UI/const";

const IOS_CARD_SHADOW: ViewStyle =
  Platform.select({
    ios: {
      shadowColor: UIConst.COLORS.SHADOW,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }) ?? {};

export default {
  IOS_CARD_SHADOW,
};
