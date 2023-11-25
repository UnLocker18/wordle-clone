import React, { FunctionComponent, MutableRefObject, useState } from "react";
import Keyboard from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";

const layout = {
  default: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L",
    "{enter} Z X C V B N M {bksp}",
  ],
};

interface IProps {
  onChange?: (input: string, e?: MouseEvent | undefined) => any;
  onKeyPress?: (button: string, e?: MouseEvent | undefined) => any;
  keyboardRef: MutableRefObject<any>;
}

const ScreenKeyboard: FunctionComponent<IProps> = ({
  onChange,
  onKeyPress,
  keyboardRef,
}) => {
  return (
    <Keyboard
      keyboardRef={(r) => (keyboardRef.current = r)}
      layout={layout}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onRender={() => console.log("Rendered")}
      /* physicalKeyboardHighlight
      physicalKeyboardHighlightPress */
    />
  );
};

export default ScreenKeyboard;
