import ToolbarHeaders from "./ToolbarHeaders";
import { useState } from "react";
import AddIcon from "./images/add_icon.png";
import DeleteForever from "./images/delete_forever.png";
import MenuItem from "./images/menu_item.png";
import { PopoverPicker } from "./ColorPicker";
import FontSizer from "./FontResizer";
import PaddingResizer from "./PaddingResizer";
import BorderRadiusResizer from "./BorderRadiusResizer";
import BorderResizer from "./BorderResizer";
import MarginResizer from "./MarginResizer";
import "./MenuToolBar.css";
import { availableFontWeights,availableFontFamily } from "./AvailableFonts";
import { MenuItemStyle } from "./StyleConsts";
import FormatAlignRight from "./images/format_align_right.png";
import FormatAlignLeft from "./images/format_align_left.png";
import FormatAlignCenter from "./images/format_align_center.png";
import GeneralSettings from "./ComponentGeneralSettings";


const MenuToolBar = ({closeComponent, deleteComponent})=>{


    const [style, setStyle] = useState({...MenuItemStyle});
    

    const [menuItems, setMenuItems] = useState([
        {
            "text": "Page",
            "settings":{
                "actionSelected": "open_website",
                "actionUrl": "",
                "actionUrlTarget": "new_tab",
                "phoneNumber": "",
                "mailTo": "",
                "subject": "",
                "body": ""
            }
        }
    ]);

    const addMenuItem = ()=>{
        let menuItemsCopy = [...menuItems];
        menuItemsCopy.push({
            "text": "Page",
            "settings":{
                "actionSelected": "open_website",
                "actionUrl": "",
                "actionUrlTarget": "new_tab",
                "phoneNumber": "",
                "mailTo": "",
                "subject": "",
                "body": ""
            }
        })
        setMenuItems(menuItemsCopy);
    }

    const setMenuItemText = (val, index)=>{
        let menuItemsCopy = [...menuItems];
        menuItemsCopy[index].text = val;
        setMenuItems(menuItemsCopy);
    }


    const setMenuItemActionSelected = (val, index)=>{
        let menuItemsCopy = [...menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         actionSelected: val
                                        }
        setMenuItems(menuItemsCopy)
    }

    const setMenuItemUrl = (val, index)=>{
        let menuItemsCopy = [...menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         actionUrl: val 
                                        }
        setMenuItems(menuItemsCopy);
    }

    const setMenuItemActionUrlTarget = (val, index)=>{
        let menuItemsCopy = [...menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         actionUrlTarget: val
                                        }
        setMenuItems(menuItemsCopy)
    }

    const setMenuItemPhoneNumber = (val, index)=>{
        let menuItemsCopy = [...menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         phoneNumber: val
                                        }
        setMenuItems(menuItemsCopy);
    }

    const setMenuItemMailTo = (val, index)=>{
        let menuItemsCopy = [...menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         mailTo: val
                                        }
        setMenuItems(menuItemsCopy);
    }

    const setMenuItemSubject = (val, index)=>{
        let menuItemsCopy = [...menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         subject: val
                                        }
        setMenuItems(menuItemsCopy);
    }

    const setMenuItemBody = (val, index)=>{
        let menuItemsCopy = [...menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         body: val
                                        }
        setMenuItems(menuItemsCopy);
    }

    const deleteMenuItem = (index)=>{
        let menuItemsCopy = [...menuItems];
        menuItemsCopy.splice(index,1);
        setMenuItems(menuItemsCopy);
    }

    const setAlignment = ()=>{

    }

    const actionsType = [
        {"label": "Open Website", "value": "open_website"},
        {"label": "Call Phone", "value": "call_phone"},
        {"label": "Send Email", "value": "send_email"}
    ]
    
    return(
        <div className="blocks-content">
            <ToolbarHeaders closeComponent={closeComponent} deleteComponent={deleteComponent}></ToolbarHeaders>
            <div>
                <div className="menu-settings">
                    <div className="content-settings-row-header">
                        MENU ITEMS
                    </div>
                    <div className="menu-settings-add-row">
                        {menuItems.length>0&&
                            <>
                                {menuItems.map((mi, index)=>{
                                    return(
                                        <div className="menu-item-container">
                                            <div className="menu-item-delete-row">
                                                <div>
                                                    <img src={MenuItem} style={{width: 25, height: 25}}></img>
                                                </div>
                                                <div onClick={()=>{deleteMenuItem(index)}}>
                                                    <img src={DeleteForever} style={{width: 25 , height: 25}}></img>
                                                </div>
                                            </div>
                                            <div className="menu-item-text-row">
                                                <div className="menu-item-text-row-tag">
                                                    Text
                                                </div>
                                                <input className="menu-item-text-row-val" value={mi.text} onChange={(e)=>{setMenuItemText(e.target.value, index)}}></input>
                                            </div>
                                            <div className="menu-item-action-type-row">
                                                <div>
                                                    Action Type
                                                 </div>
                                                <div>
                                                    <select value={mi.settings.actionSelected} onChange={(e)=>{setMenuItemActionSelected(e.target.value, index)}}>
                                                        {actionsType.map((at)=>{
                                                            return(
                                                                <option value={at.value}>{at.label}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="menu-item-action-setting-row">
                                                {mi.settings.actionSelected=="open_website"&&
                                                    <>
                                                        <div className="button-action-input-url">
                                                            <div className="button-input-url-tag">
                                                                URL
                                                            </div>
                                                            <input className="button-input-url" value={mi.settings.actionUrl} onChange={(e)=>{setMenuItemUrl(e.target.value, index)}}></input>
                                                        </div>
                                                        <div className="button-action-input-url">
                                                            <div className="button-input-url-tag">
                                                                Target
                                                            </div>
                                                            <select value={mi.settings.actionUrlTarget} onChange={(e)=>{setMenuItemActionUrlTarget(e.target.value, index)}} className="button-input-url">
                                                                <option value="new_tab">New Tab</option>
                                                                <option value="same_tab">Same Tab</option>
                                                            </select>
                                                        </div>
                                                    </>
                                                }
                                                {mi.settings.actionSelected=="call_phone"&&
                                                    <>
                                                        <div className="button-action-input-url">
                                                            <div className="button-input-url-tag">
                                                                Phone Number
                                                            </div>
                                                            <input className="button-input-url" value={mi.settings.phoneNumber} onChange={(e)=>{setMenuItemPhoneNumber(e.target.value, index)}}></input>
                                                        </div> 
                                                    </>
                                                }
                                                {mi.settings.actionSelected=="send_email"&&
                                                    <>
                                                        <div className="button-action-input-url">
                                                            <div className="button-input-url-tag">
                                                                Mail To
                                                            </div>
                                                            <input className="button-input-url" value={mi.settings.mailTo} onChange={(e)=>{setMenuItemPhoneNumber(e.target.value, index)}}></input>
                                                        </div>
                                                        <div className="button-action-input-url">
                                                            <div className="button-input-url-tag">
                                                                Subject
                                                            </div>
                                                            <input className="button-input-url" value={mi.settings.subject} onChange={(e)=>{setMenuItemSubject(e.target.value, index)}}></input>
                                                        </div>
                                                        <div className="button-action-input-url">
                                                            <div className="button-input-url-tag">
                                                                Body
                                                            </div>
                                                            <textarea className="button-input-url" value={mi.settings.body} onChange={(e)=>{setMenuItemBody(e.target.value, index)}}></textarea>
                                                        </div>
                                                    </>

                        }
                                            </div>
                                            
                                            
                                        </div>
                                    )
                                })}
                            </>
                        }
                        <div className="add-menu-item">
                            <div className="add-button" onClick={()=>{addMenuItem()}}>
                                <div>
                                    Add menu item
                                </div>
                                <div>
                                    <img src={AddIcon} style={{width: 25, height: 25}}></img>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="content-settings-row-header">
                        Menu Item Styles
                    </div>
                    <div className="menu-item-setting-row">
                        <div>Text Color</div>
                        <PopoverPicker></PopoverPicker>
                    </div>
                    <div className="menu-item-setting-row">
                        <div>Background Color</div>
                        <PopoverPicker></PopoverPicker>
                    </div>
                    <div className="menu-item-setting-row">
                        <div>
                            Font Family
                        </div>
                        <div>
                            <select value={""} onChange={(e)=>{""}}>
                                {availableFontFamily.map((ff)=>{
                                    return(
                                        <option value={ff.cssVal}>{ff.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="menu-item-setting-row">
                        <div>
                            Font Weight
                        </div>
                        <div>
                            <select value={""} onChange={(e)=>{}}>
                                {availableFontWeights.map((fw)=>{
                                    return (
                                        <option value={fw.value}>{fw.label}</option>
                                    )
                                })}

                            </select>
                        </div>
                    </div>
                    <div className="menu-item-setting-row">
                        <div>
                            Font Size
                        </div>
                        <FontSizer></FontSizer>
                    </div>
                    <div className="menu-item-setting-options">
                        <PaddingResizer style={style} setStyle={setStyle}></PaddingResizer>
                    </div>
                    <div className="menu-item-setting-options">
                        <BorderResizer style={style} setStyle={setStyle}></BorderResizer>
                    </div>
                    <div className="menu-item-setting-options">
                        <BorderRadiusResizer style={style} setStyle={setStyle}></BorderRadiusResizer>
                    </div>
                    <div className="menu-item-setting-options">
                        <MarginResizer style={style} setStyle={setStyle}></MarginResizer>
                    </div>
                    <div className="content-settings-row-header">
                        Menu Bar Styles
                    </div>
                    <div className="menu-bar-settings-row">
                        <div>Item Alignment</div>
                        <div className="menu-bar-item-alignment-options">
                            <div className="menu-bar-item-alignment-option" onClick={()=>{setAlignment("left")}}>
                                <img style={{width: 24, height: 24}} src={FormatAlignLeft}></img>
                            </div>
                            <div className="menu-bar-item-alignment-option" onClick={()=>{setAlignment("center")}}>
                                <img style={{width: 24, height: 24}} src={FormatAlignCenter}></img>
                            </div>
                            <div className="menu-bar-item-alignment-option" onClick={()=>{setAlignment("right")}}>
                                <img style={{width: 24, height: 24}} src={FormatAlignRight}></img>
                            </div>
                        </div>
                    </div>
                    <div className="menu-bar-settings-row">
                        <div>
                            Background Color
                        </div>
                        <PopoverPicker></PopoverPicker>
                    </div>
                </div>

            </div>
            <GeneralSettings></GeneralSettings>
        </div>
    )

}

export default MenuToolBar;