import {Children, cloneElement, ReactElement, ReactText} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

type Margin = {
  top?: ReactText;
  end?: ReactText;
  start?: ReactText;
  bottom?: ReactText;
  margin?: ReactText;
  vertical?: ReactText;
  horizontal?: ReactText;
  children: ReactElement;
  style?: StyleProp<ViewStyle>;
};

function Margin({
  top,
  end,
  start,
  margin,
  bottom,
  vertical,
  horizontal,
  style,
  children,
  ...props
}: Margin) {
  const child = Children.only(children);

  return cloneElement(children, {
    ...props,
    style: {
      margin,
      marginTop: top,
      marginEnd: end,
      marginStart: start,
      marginBottom: bottom,
      marginVertical: vertical,
      marginHorizontal: horizontal,
      ...(style as any),
      ...child.props.style,
    },
  });
}

export default Margin;
