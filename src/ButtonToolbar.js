import ToolbarHeaders from "./ToolbarHeaders";
import GeneralSettings from "./ComponentGeneralSettings";
import {useState} from "react";
import "./ButtonToolbar.css";
import { PopoverPicker } from "./ColorPicker";
import FormatAlignRight from "./images/format_align_right.png";
import FormatAlignLeft from "./images/format_align_left.png";
import FormatAlignCenter from "./images/format_align_center.png";
import FontSizer from "./FontResizer";
import BorderResizer from "./BorderResizer";
import PaddingResizer from "./PaddingResizer";
import { availableFontWeights,availableFontFamily } from "./AvailableFonts";
import BorderRadiusResizer from "./BorderRadiusResizer";

const ButtonToolbar = ({closeComponent, deleteComponent, style, setStyle, settings, setSettings})=>{

    const actionsType = [
        {"label": "Open Website", "value": "open_website"},
        {"label": "Call Phone", "value": "call_phone"},
        {"label": "Send Email", "value": "send_email"}
    ]


    const setActionSelected = (val)=>{
        let settingsCopy = {...settings};
        settingsCopy.actionSelected = val;
        setSettings(settingsCopy)
    }

    const setActionUrl = (val)=>{
        let settingsCopy = {...settings};
        settingsCopy.actionUrl = val;
        setSettings(settingsCopy);

    }

    // const [actionUrl, setActionUrl] = useState("");

    const setActionUrlTarget = (val)=>{
        let settingsCopy = {...settings};
        settingsCopy.actionUrlTarget = val;
        setSettings(settingsCopy);
    }

    // const [actionUrlTarget, setActionUrlTarget] = useState("");

    const setPhoneNumber = (val)=>{
        let settingsCopy = {...settings};
        settingsCopy.phoneNumber = val;
        setSettings(settingsCopy);
    }

    const setMailto = (val)=>{
        let settingsCopy = {...settings};
        settingsCopy.mailTo = val;
        setSettings(settingsCopy);
    }

    const setSubject = (val)=>{
        let settingsCopy = {...settings};
        settingsCopy.subject = val;
        setSettings(settingsCopy);
    }

    const setBody = (val)=>{
        let settingsCopy = {...settings};
        settingsCopy.body = val;
        setSettings(settingsCopy);
    }

    const setTextColor = (val)=>{
        let styleCopy = {...style};
        styleCopy.color = val;
        setStyle(styleCopy);
    }

    const setBackgroundColor = (val)=>{
        let styleCopy = {...style};
        styleCopy.background = val;
        setStyle(styleCopy);
    }

    const setFontFamily = (val)=>{
        let styleCopy = {...style};
        styleCopy.fontFamily = val;
        setStyle(styleCopy);
    }


    const setFontSize = (val)=>{
        let styleCopy = {...style};
        styleCopy.fontSize = val;
        setStyle(styleCopy);
    }

    const setFontWeight = (val)=>{
        let styleCopy = {...style};
        styleCopy.fontWeight = val;
        setStyle(val);
    }

    const setAlignment = (val)=>{
        let styleCopy = {...style};
        styleCopy.textAlign = val;
        setStyle(styleCopy);
    }

    const setLineHeight = (val)=>{
        let styleCopy = {...style};
        styleCopy.lineHeight = val;
        setStyle(styleCopy);
    }


    


    return(
        <div className="blocks-content">
            <ToolbarHeaders closeComponent={closeComponent} deleteComponent={deleteComponent}></ToolbarHeaders>
            <div>
                <div className="button-actions">
                    <div className="content-settings-row-header">
                        Action
                    </div>
                    <div className="button-action-title-row">
                        <div>
                            Action
                        </div>
                        <div>
                            <select 
                                value={settings.actionSelected}
                                onChange={(e)=>{setActionSelected(e.target.value)}}
                            >
                                {actionsType.map((at)=>{
                                    return (
                                        <option value={at.value}>{at.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="button-action-content-row">
                        {settings.actionSelected=="open_website"&&
                            <>
                                <div className="button-action-input-url">
                                    <div className="button-input-url-tag">
                                        URL
                                    </div>
                                    <input className="button-input-url" value={settings.actionUrl} onChange={(e)=>{setActionUrl(e.target.val)}}></input>
                                </div>
                                <div className="button-action-input-url">
                                    <div className="button-input-url-tag">
                                        Target
                                    </div>
                                    <select value={settings.actionUrlTarget} onChange={(e)=>{setActionUrlTarget(e.target.value)}} className="button-input-url">
                                        <option value="new_tab">New Tab</option>
                                        <option value="same_tab">Same Tab</option>
                                    </select>
                                </div>
                            </>
                        }
                        {settings.actionSelected=="call_phone"&&
                            <>
                                <div className="button-action-input-url">
                                    <div className="button-input-url-tag">
                                        Phone Number
                                    </div>
                                    <input className="button-input-url" value={settings.phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}}></input>
                                </div> 
                            </>
                        }
                        {settings.actionSelected=="send_email"&&
                            <>
                                <div className="button-action-input-url">
                                    <div className="button-input-url-tag">
                                        Mail To
                                    </div>
                                    <input className="button-input-url" value={settings.mailTo} onChange={(e)=>{setMailto(e.target.value)}}></input>
                                </div>
                                <div className="button-action-input-url">
                                    <div className="button-input-url-tag">
                                        Subject
                                    </div>
                                    <input className="button-input-url" value={settings.subject} onChange={(e)=>{setSubject(e.target.value)}}></input>
                                </div>
                                <div className="button-action-input-url">
                                    <div className="button-input-url-tag">
                                        Body
                                    </div>
                                    <textarea className="button-input-url" value={settings.body} onChange={(e)=>{setBody(e.target.value)}}></textarea>
                                </div>
                            </>

                        }
                    </div>
                    <div className="button-display-options">
                        <div className="content-settings-row-header">
                            Button Display Options
                        </div>
                        <div className="button-color-options-row">
                            <div>
                                Text Color
                                <PopoverPicker color={style.color} onChange={setTextColor}></PopoverPicker>
                            </div>
                            <div>
                                Background Color
                                <PopoverPicker color={style.background} onChange={setBackgroundColor}></PopoverPicker>
                            </div>   
                        </div>
                        {/* <div className="button-option-width">
                            <div>Width</div>
                            <div>
                                <input min="1" max="100" type="number"></input>%
                            </div>
                        </div> */}
                        <div className="button-option-font-family">
                            <div>
                                Font Family
                            </div>
                            <div>
                                <select value={style.fontFamily} onChange={(e)=>{setFontFamily(e.target.value)}}>
                                    {availableFontFamily.map((ff)=>{
                                        return(
                                            <option value={ff.cssVal}>{ff.label}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="button-option-font-weight">
                            <div>
                                Font Weight
                            </div>
                            <div>
                                <select value={style.fontWeight} onChange={(e)=>{setFontWeight(e.target.value)}}>
                                    {availableFontWeights.map((fw)=>{
                                        return (
                                            <option value={fw.value}>{fw.label}</option>
                                        )
                                    })}

                                </select>
                            </div>
                        </div>
                        <div className="button-option-font-size">
                            <div>
                                Font Size
                            </div>
                            <div>
                                <FontSizer val={style.fontSize} setval={setFontSize}></FontSizer>
                            </div>
                        </div>
                        <div className="button-option-alignment">
                            <div>
                                Alignment
                            </div>
                            <div className="button-option-alignment-actions">
                                <div className="button-option-alignment-action" onClick={()=>{setAlignment("left")}}>
                                    <img style={{width: 24, height: 24}} src={FormatAlignLeft}></img>
                                </div>
                                <div className="button-option-alignment-action" onClick={()=>{setAlignment("center")}}>
                                    <img style={{width: 24, height: 24}} src={FormatAlignCenter}></img>
                                </div>
                                <div className="button-option-alignment-action" onClick={()=>{setAlignment("right")}}>
                                    <img style={{width: 24, height: 24}} src={FormatAlignRight}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-box-options">
                        <div className="content-settings-row-header">
                            Button Box Options
                        </div>
                        <div className="button-line-height">
                            <div>
                                Line Height
                            </div>
                            <div>
                                <FontSizer val={style.lineHeight} setval={setLineHeight}></FontSizer>
                            </div>
                        </div>
                        <div className="button-padding-options">
                            <PaddingResizer
                                style={style}
                                setStyle ={setStyle}

                            ></PaddingResizer>
                        </div>
                        <div className="button-border-options">
                            <BorderResizer
                                style={style}
                                setStyle={setStyle}
                            >
                            </BorderResizer>
                        </div>
                        <div className="button-border-radius-options">
                            <BorderRadiusResizer
                                style={style}
                                setStyle={setStyle}
                            >
                            </BorderRadiusResizer>
                        </div>
                    </div>
                </div>
                <GeneralSettings></GeneralSettings>
            </div>
        </div>
    )

}

export default ButtonToolbar;