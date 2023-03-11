import ToolbarHeaders from "./ToolbarHeaders"
import GeneralSettings from "./ComponentGeneralSettings";
import "./HeaderToolBar.css";
import {availableFontFamily, availableFontWeights} from "./AvailableFonts";
import { PopoverPicker } from "./ColorPicker";
import FontSizer from "./FontResizer";
import FormatAlignRight from "./images/format_align_right.png";
import FormatAlignLeft from "./images/format_align_left.png";
import FormatAlignCenter from "./images/format_align_center.png";

const HeadersToolBar = ({closeComponent, deleteComponent})=>{
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
                            <div className="header-setting-type-option">
                                H1
                            </div>
                            <div className="header-setting-type-option">
                                H2
                            </div>
                            <div className="header-setting-type-option">
                                H3
                            </div>
                            <div className="header-setting-type-option">
                                H4
                            </div>
                        </div>
                    </div>
                    <div className="header-setting-row">
                        <div>Font Family</div>
                        <div>
                            <select>
                                {availableFontFamily.map((ff)=>{
                                    return(
                                        <option>{ff.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="header-setting-row">
                        <div>Font Weight</div>
                        <div>
                            <select>
                                {availableFontWeights.map((fw)=>{
                                    return(
                                        <option>{fw.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="header-setting-row">
                        <div>Font Size</div>
                        <FontSizer>

                        </FontSizer>
                    </div>
                    <div className="header-setting-row">
                        <div>Color</div>
                        <PopoverPicker></PopoverPicker>
                    </div>
                    <div className="header-setting-row">
                        <div>Text Align</div>
                        <div className="header-setting-text-align-options">
                                <div className="header-setting-text-align-option">
                                    <img style={{width: 24, height: 24}} src={FormatAlignLeft}></img>
                                </div>
                                <div className="header-setting-text-align-option">
                                    <img style={{width: 24, height: 24}} src={FormatAlignCenter}></img>
                                </div>
                                <div className="header-setting-text-align-option">
                                    <img style={{width: 24, height: 24}} src={FormatAlignRight}></img>
                                </div>
                        </div>
                    </div>
                    <div className="header-setting-row">
                        <div>Line Height</div>
                        <FontSizer></FontSizer>
                    </div>
                </div>
            </div>
            <GeneralSettings></GeneralSettings>
        </div>
    )
}

export default HeadersToolBar;