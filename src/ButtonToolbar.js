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

const ButtonToolbar = ({closeComponent, deleteComponent, style, setStyle})=>{

    const actionsType = [
        {"label": "Open Website", "value": "open_website"},
        {"label": "Call Phone", "value": "call_phone"},
        {"label": "Send Email", "value": "send_email"}
    ]

    const [actionSelected, setActionSelected] = useState("open_website");

    const [actionUrl, setActionUrl] = useState("");

    const [actionUrlTarget, setActionUrlTarget] = useState("");

    const [textColor, setTextColor] = useState("#FFFFFF");

    const [backgroundColor, setBackgroundColor] = useState("#0000FF");

    const [fontWeight, setFontWeight] = useState("normal");

    const [fontFamily, setFontFamily] = useState("FONT_FAMILY_ARIAL");

    const [fontSize, setFontSize] = useState(14);

    const [lineHeight, setLineHeight] = useState(1.4);

    


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
                                value={actionSelected}
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
                        {actionSelected=="open_website"&&
                            <>
                                <div className="button-action-input-url">
                                    <div className="button-input-url-tag">
                                        URL
                                    </div>
                                    <input className="button-input-url"></input>
                                </div>
                                <div className="button-action-input-url">
                                    <div className="button-input-url-tag">
                                        Target
                                    </div>
                                    <select value={actionUrlTarget} onChange={(e)=>{setActionUrlTarget(e.target.value)}} className="button-input-url">
                                        <option value="new_tab">New Tab</option>
                                        <option value="same_tab">Same Tab</option>
                                    </select>
                                </div>
                            </>
                        }
                        {actionSelected=="call_phone"&&
                            <>
                                <div className="button-action-input-url">
                                    <div className="button-input-url-tag">
                                        Phone Number
                                    </div>
                                    <input className="button-input-url"></input>
                                </div> 
                            </>
                        }
                        {actionSelected=="send_email"&&
                            <>
                                <div className="button-action-input-url">
                                    <div className="button-input-url-tag">
                                        Mail To
                                    </div>
                                    <input className="button-input-url"></input>
                                </div>
                                <div className="button-action-input-url">
                                    <div className="button-input-url-tag">
                                        Subject
                                    </div>
                                    <input className="button-input-url"></input>
                                </div>
                                <div className="button-action-input-url">
                                    <div className="button-input-url-tag">
                                        Body
                                    </div>
                                    <textarea className="button-input-url"></textarea>
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
                                <PopoverPicker></PopoverPicker>
                            </div>
                            <div>
                                Background Color
                                <PopoverPicker></PopoverPicker>
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
                                <select value={fontFamily} onChange={()=>{}}>
                                    {availableFontFamily.map((ff)=>{
                                        return(
                                            <option value={ff.value}>{ff.label}</option>
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
                                <select value={fontWeight} onChange={()=>{}}>
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
                                <FontSizer val={fontSize} setval={setFontSize}></FontSizer>
                            </div>
                        </div>
                        <div className="button-option-alignment">
                            <div>
                                Alignment
                            </div>
                            <div className="button-option-alignment-actions">
                                <div className="button-option-alignment-action">
                                    <img style={{width: 24, height: 24}} src={FormatAlignLeft}></img>
                                </div>
                                <div className="button-option-alignment-action">
                                    <img style={{width: 24, height: 24}} src={FormatAlignCenter}></img>
                                </div>
                                <div className="button-option-alignment-action">
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
                                <FontSizer val={lineHeight} setval={setLineHeight}></FontSizer>
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
                    </div>
                </div>
                <GeneralSettings></GeneralSettings>
            </div>
        </div>
    )

}

export default ButtonToolbar;