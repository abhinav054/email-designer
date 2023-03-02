import React, { useCallback, useRef, useState , useEffect} from "react";
import { HexColorPicker } from "react-colorful";

import useClickOutside from "./useClickOutside";

export const PopoverPicker = ({ color, onChange , component, active}) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const [coloractive, setcoloractive] = useState(false);

  useEffect(()=>{
    if(active==true||active==undefined){
        setcoloractive(true)
    }
  },[])
  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="picker">
      {(coloractive==true)?
        <div
        className="swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
        />:
        <div
        className="swatch-inactive"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
        />
      }
      

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={color} onChange={(c)=>{
                setcoloractive(true)
                onChange(c, component)
            }} />
        </div>
      )}
    </div>
  );
};
