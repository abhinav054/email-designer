import ToolbarHeaders from "./ToolbarHeaders"
import FontSizer from "./FontResizer";
import "./DividerToolBar.css";
import { PopoverPicker } from "./ColorPicker";
import FormatAlignRight from "./images/format_align_right.png";
import FormatAlignLeft from "./images/format_align_left.png";
import FormatAlignCenter from "./images/format_align_center.png";
import GeneralSettings from "./ComponentGeneralSettings";


const DividerToolBar = ({closeComponent, deleteComponent, style, setStyle})=>{


    const getWidth = ()=>{
        let width = style.width;
        return parseFloat(width.replace("%"))
    }

    const setWidth = (val)=>{
        let width = val+"%";
        let styleCopy = {...style,
                         width: width
                        }
        setStyle(styleCopy);
    }


    const getBorderType = ()=>{
        let borderarray = style.border.split(" ");
        return borderarray[1];
    }

    const setBorderType = (val)=>{
        let borderarray = style.border.split(" ");
        borderarray[1] = val;
        let newborder = borderarray.join(" ");
        let styleCopy = {...style,
                         border: newborder
                        }
        setStyle(styleCopy)
    }

    const getBorderSize = ()=>{
        let borderarray = style.border.split(" ");
        return borderarray[0].replace("px","");
    }

    const setBorderSize = (val)=>{
        let borderarray = style.border.split(" ");
        borderarray[0] = val+"px";
        let newborder = borderarray.join(" ");
        let styleCopy = {...style,
                         border: newborder
                        }
        setStyle(styleCopy);
    }

    const getBorderColor = ()=>{
        let borderarray = style.border.split(" ");
        return borderarray[2];
    }

    const setBorderColor = (val)=>{
        let borderarray = style.border.split(" ");
        borderarray[2] = val;
        let newborder = borderarray.join(" ");
        let styleCopy = {...style,
                         border: newborder
                        };
        setStyle(styleCopy);
    }

    const setTextAlign = (val)=>{
        let styleCopy = {...style,
                         justifyContent: val
                        }
        setStyle(styleCopy);
    }



    return(
        <div className="blocks-content">
            <ToolbarHeaders closeComponent={closeComponent} deleteComponent={deleteComponent}></ToolbarHeaders>
            <div>
                <div className="divider-settings">
                    <div className="content-settings-row-header">
                        Line
                    </div>
                    <div className="divider-settings-row">
                        <div>Width</div>
                        <div>
                            <input min="1" max="100" type="number" value={getWidth()} onChange={(e)=>{setWidth(e.target.value)}}></input>%
                        </div>
                    </div>
                    <div className="divider-settings-row">
                        <div>Line</div>
                        <div className="border-details">
                            <div className="border-details-row">
                                <select value={getBorderType()} onChange={(e)=>{setBorderType(e.target.value)}}>
                                    <option value="solid">Solid</option>
                                    <option value="dotted">Dotted</option>
                                    <option value="dashed">Dashed</option>
                                </select>
                            </div>
                            <div className="border-details-row">
                                <FontSizer val={getBorderSize()} setval={setBorderSize} min={1} max={100} increment={1}></FontSizer>
                                <div className="border-color-picker">
                                    <PopoverPicker color={getBorderColor()} onChange={setBorderColor}>
                                    </PopoverPicker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider-settings-row">
                        <div>Align</div>
                        <div className="divider-setting-align-options">
                            <div className={style.justifyContent=="left"?"divider-setting-align-option active":"divider-setting-align-option"} onClick={()=>{setTextAlign("left")}}>
                                <img style={{width: 24, height: 24}} src={FormatAlignLeft}></img>
                            </div>
                            <div className={style.justifyContent=="center"?"divider-setting-align-option active":"divider-setting-align-option"} onClick={()=>{setTextAlign("center")}}>
                                <img style={{width: 24, height: 24}} src={FormatAlignCenter}></img>
                            </div>
                            <div className={style.justifyContent=="right"?"divider-setting-align-option active":"divider-setting-align-option"} onClick={()=>{setTextAlign("right")}}>
                                <img style={{width: 24, height: 24}} src={FormatAlignRight}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <GeneralSettings></GeneralSettings>
        </div>
    )
}

export default DividerToolBar;