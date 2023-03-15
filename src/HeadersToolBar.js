import ToolbarHeaders from "./ToolbarHeaders"
import GeneralSettings from "./ComponentGeneralSettings";
import "./HeaderToolBar.css";
import {availableFontFamily, availableFontWeights} from "./AvailableFonts";
import { PopoverPicker } from "./ColorPicker";
import FontSizer from "./FontResizer";
import FormatAlignRight from "./images/format_align_right.png";
import FormatAlignLeft from "./images/format_align_left.png";
import FormatAlignCenter from "./images/format_align_center.png";
import {Header1Style,Header2Style,Header3Style,Header4Style} from "./StyleConsts";

const HeadersToolBar = ({closeComponent, deleteComponent, style, setStyle, settings, setSettings})=>{

    
    const setHeaderType = (val)=>{
        let settingsCopy = {...settings,
                            type: val
                            };
        
        let styleCopy = {...style}
        if(val=="h1"){
            styleCopy = {...styleCopy,
                        ...Header1Style
                        }
        }
        if(val=="h2"){
            styleCopy = {...styleCopy,
                        ...Header2Style
                        }
        }

        if(val=="h3"){
            styleCopy = {...styleCopy,
                        ...Header3Style
                        }
        }

        if(val=="h4"){
            styleCopy = {...styleCopy,
                         ...Header4Style
                        }
        }
        setStyle(styleCopy);
        setSettings(settingsCopy)

    }

    const setFontFamily = (val)=>{
        let styleCopy = {...style,
                         fontFamily: val
                        }
        setStyle(styleCopy);
    }

    const setFontWeight = (val)=>{
        let styleCopy = {...style,
                         fontWeight: val
                        }
        setStyle(styleCopy);
    }

    const setFontSize = (val)=>{
        let styleCopy = {...style,
                         fontSize: val
                        }
        setStyle(styleCopy);
    }

    const setTextColor = (val)=>{
        let styleCopy = {...style,
                         color: val
                        }
        setStyle(styleCopy);
    }

    const setTextAlign = (val)=>{
        let styleCopy = {...style,
                         textAlign: val
                        }
        setStyle(styleCopy);
    }

    const setLineHeight = (val)=>{
        let styleCopy = {...style,
                         lineHeight: val
                        }
        setStyle(styleCopy);
    }


    return(
        <div className="blocks-content">
            <ToolbarHeaders closeComponent={closeComponent} deleteComponent={deleteComponent}></ToolbarHeaders>
            <div>
                <div className="header-settings">
                    <div className="content-settings-row-header">
                        Text
                    </div>
                    <div className="header-setting-row">
                        <div>Heading Type</div>
                        <div className="header-setting-type-options">
                            <div onClick={()=>{setHeaderType("h1")}} className={settings?.type=="h1"?"header-setting-type-option active":"header-setting-type-option"}>
                                H1
                            </div>
                            <div onClick={()=>{setHeaderType("h2")}} className={settings?.type=="h2"?"header-setting-type-option active":"header-setting-type-option"}>
                                H2
                            </div>
                            <div onClick={()=>{setHeaderType("h3")}} className={settings?.type=="h3"?"header-setting-type-option active":"header-setting-type-option"}>
                                H3
                            </div>
                            <div onClick={()=>{setHeaderType("h4")}}className={settings?.type=="h4"?"header-setting-type-option active":"header-setting-type-option"}>
                                H4
                            </div>
                        </div>
                    </div>
                    <div className="header-setting-row">
                        <div>Font Family</div>
                        <div>
                            <select onChange={(e)=>{setFontFamily(e.target.value)}}>
                                {availableFontFamily.map((ff)=>{
                                    return(
                                        <option value={ff.cssVal}>{ff.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="header-setting-row">
                        <div>Font Weight</div>
                        <div>
                            <select onChange={(e)=>{setFontWeight(e.target.value)}}>
                                {availableFontWeights.map((fw)=>{
                                    return(
                                        <option value={fw.value}>{fw.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="header-setting-row">
                        <div>Font Size</div>
                        <FontSizer val={style?.fontSize} setval={setFontSize} min={1} max={100} increment={1}>
                        </FontSizer>
                    </div>
                    <div className="header-setting-row">
                        <div>Color</div>
                        <PopoverPicker color={style?.color} onChange={setTextColor}></PopoverPicker>
                    </div>
                    <div className="header-setting-row">
                        <div>Text Align</div>
                        <div className="header-setting-text-align-options">
                                <div className={style?.textAlign=="left"?"header-setting-text-align-option active":"header-setting-text-align-option"} onClick={()=>{setTextAlign("left")}}>
                                    <img style={{width: 24, height: 24}} src={FormatAlignLeft}></img>
                                </div>
                                <div className={style?.textAlign=="center"?"header-setting-text-align-option active":"header-setting-text-align-option"} onClick={()=>{setTextAlign("center")}}>
                                    <img style={{width: 24, height: 24}} src={FormatAlignCenter}></img>
                                </div>
                                <div className={style?.textAlign=="right"?"header-setting-text-align-option active":"header-setting-text-align-option"} onClick={()=>{setTextAlign("right")}}>
                                    <img style={{width: 24, height: 24}} src={FormatAlignRight}></img>
                                </div>
                        </div>
                    </div>
                    <div className="header-setting-row">
                        <div>Line Height</div>
                        <FontSizer val={style?.lineHeight} setval={setLineHeight} min={0.1} max={10} increment={0.1}></FontSizer>
                    </div>
                </div>
            </div>
            <GeneralSettings></GeneralSettings>
        </div>
    )
}

export default HeadersToolBar;