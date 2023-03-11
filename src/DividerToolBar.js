import ToolbarHeaders from "./ToolbarHeaders"
import FontSizer from "./FontResizer";
import "./DividerToolBar.css";
import { PopoverPicker } from "./ColorPicker";
import FormatAlignRight from "./images/format_align_right.png";
import FormatAlignLeft from "./images/format_align_left.png";
import FormatAlignCenter from "./images/format_align_center.png";
import GeneralSettings from "./ComponentGeneralSettings";


const DividerToolBar = ({closeComponent, deleteComponent})=>{
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
                            <input min="1" max="100" type="number"></input>%
                        </div>
                    </div>
                    <div className="divider-settings-row">
                        <div>Line</div>
                        <div className="border-details">
                            <div className="border-details-row">
                                <select>
                                    <option value="solid">Solid</option>
                                    <option value="dotted">Dotted</option>
                                    <option value="dashed">Dashed</option>
                                </select>
                            </div>
                            <div className="border-details-row">
                                <FontSizer></FontSizer>
                                <div className="border-color-picker">
                                    <PopoverPicker>
                                    </PopoverPicker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider-settings-row">
                        <div>Align</div>
                        <div className="divider-setting-align-options">
                            <div className="divider-setting-align-option">
                                <img style={{width: 24, height: 24}} src={FormatAlignLeft}></img>
                            </div>
                            <div className="divider-setting-align-option">
                                <img style={{width: 24, height: 24}} src={FormatAlignCenter}></img>
                            </div>
                            <div className="divider-setting-align-option">
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