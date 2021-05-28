import React, {
  ReactElement,
  DetailedReactHTMLElement,
  isValidElement,
} from 'react';

type Spacer = {
  horizontal?: boolean;
  gap?: string | number;
  children: any;
};

function Spacer({gap = 10, children, horizontal = false}: Spacer) {
  return (
    <>
      {React.Children.map(children, (child, i) => {
        const margin = i > 0 ? gap : 0;

        const style = {
          marginTop: horizontal ? 0 : margin,
          marginLeft: horizontal ? margin : 0,
        };

        const childStyle = (child as any)?.props.style;

        const newStyle = ([] as any[]).concat(childStyle, style);

        return isValidElement(child)
          ? React.cloneElement(child, {style: newStyle} as any)
          : child;
      })}
    </>
  );
}

export default Spacer;
