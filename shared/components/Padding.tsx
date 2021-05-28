import {Children, cloneElement, ReactElement, ReactText} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

type Padding = {
  top?: ReactText;
  end?: ReactText;
  start?: ReactText;
  bottom?: ReactText;
  padding?: ReactText;
  vertical?: ReactText;
  horizontal?: ReactText;
  children: ReactElement;
  style?: StyleProp<ViewStyle>;
};

function Padding({
  top,
  end,
  start,
  bottom,
  vertical,
  horizontal,
  padding = 10,
  style,
  children,
  ...props
}: Padding) {
  const child = Children.only(children);

  return cloneElement(child, {
    ...props,
    style: {
      padding,
      paddingTop: top,
      paddingEnd: end,
      paddingStart: start,
      paddingBottom: bottom,
      paddingVertical: vertical,
      paddingHorizontal: horizontal,
      ...(style as any),
      ...child.props.style,
    },
  });
}

export default Padding;
