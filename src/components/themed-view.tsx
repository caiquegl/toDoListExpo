import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks/use-theme-color';

type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  safeArea?: boolean;
  safeAreaEdges?: Array<'top' | 'bottom' | 'left' | 'right'>;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  safeArea,
  safeAreaEdges = ['top', 'bottom', 'left', 'right'],
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const insets = useSafeAreaInsets();
  const paddingStyle = safeArea
    ? {
        paddingTop: safeAreaEdges.includes('top') ? insets.top : 0,
        paddingBottom: safeAreaEdges.includes('bottom') ? insets.bottom : 0,
        paddingLeft: safeAreaEdges.includes('left') ? insets.left : 0,
        paddingRight: safeAreaEdges.includes('right') ? insets.right : 0,
      }
    : undefined;

  return <View style={[{ backgroundColor }, paddingStyle, style]} {...otherProps} />;
}
