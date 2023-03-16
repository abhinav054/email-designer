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


const MenuToolBar = ({closeComponent, deleteComponent, style, setStyle,menuBarStyle , setMenuBarStyle, settings, setSettings})=>{


    // const [style, setStyle] = useState({...MenuItemStyle});
    

    // const [menuItems, setMenuItems] = useState([
    //     {
    //         "text": "Page",
    //         "settings":{
    //             "actionSelected": "open_website",
    //             "actionUrl": "",
    //             "actionUrlTarget": "new_tab",
    //             "phoneNumber": "",
    //             "mailTo": "",
    //             "subject": "",
    //             "body": ""
    //         }
    //     }
    // ]);

    const addMenuItem = ()=>{
        let menuItemsCopy = [...settings.menuItems];
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
        let settingsCopy = {...settings,
                            menuItems: menuItemsCopy
                           }
        setSettings(settingsCopy);
    }

    const setMenuItemText = (val, index)=>{
        let menuItemsCopy = [...settings.menuItems];
        menuItemsCopy[index].text = val;
        let settingsCopy = {...settings,
                            menuItems: menuItemsCopy
                            }
        setSettings(settingsCopy);
    }


    const setMenuItemActionSelected = (val, index)=>{
        let menuItemsCopy = [...settings.menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         actionSelected: val
                                        }
        let settingsCopy = {...settings,
                            menuItems: menuItemsCopy
                            }
        setSettings(settingsCopy);
    }

    const setMenuItemUrl = (val, index)=>{
        let menuItemsCopy = [...settings.menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         actionUrl: val 
                                        }
        let settingsCopy = {...settings,
                            menuItems: menuItemsCopy
                            }
        setSettings(settingsCopy);
    }

    const setMenuItemActionUrlTarget = (val, index)=>{
        let menuItemsCopy = [...settings.menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         actionUrlTarget: val
                                        }
        let settingsCopy = {...settings,
                            menuItems: menuItemsCopy  
                           }
        setSettings(settingsCopy)
    }

    const setMenuItemPhoneNumber = (val, index)=>{
        let menuItemsCopy = [...settings.menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         phoneNumber: val
                                        }
        let settingsCopy = {...settings,
                            menuItems: menuItemsCopy
                           }
        setSettings(settingsCopy);
    }

    const setMenuItemMailTo = (val, index)=>{
        let menuItemsCopy = [...settings.menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         mailTo: val
                                        }
        let settingsCopy = {...settings,
                            menuItems: menuItemsCopy
                            }
        setSettings(settingsCopy);
    }

    const setMenuItemSubject = (val, index)=>{
        let menuItemsCopy = [...settings.menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         subject: val
                                        }
        let settingsCopy = {...settings,
                            menuItems: menuItemsCopy
                            }
        setSettings(settingsCopy)
    }

    const setMenuItemBody = (val, index)=>{
        let menuItemsCopy = [...settings.menuItems];
        menuItemsCopy[index].settings = {...menuItemsCopy[index].settings,
                                         body: val
                                        }
        let settingsCopy = {...settings,
                            menuItems: menuItemsCopy
                            }
        setSettings(settingsCopy);
    }

    const deleteMenuItem = (index)=>{
        let menuItemsCopy = [...settings.menuItems];
        menuItemsCopy.splice(index,1);
        let settingsCopy = {...settings,
                            menuItems: menuItemsCopy
                            }
        setSettings(settingsCopy);
    }

    const setTextColor = (val)=>{
        let styleCopy = {...style,
                         color: val
                        }
        setStyle(styleCopy)
    }

    const setBackgroundColor = (val)=>{
        let styleCopy = {...style,
                         backgroundColor: val
                        }
        setStyle(styleCopy);
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
        setStyle(styleCopy)
    }

    const setMenuBarAlignment = (val)=>{
        let styleCopy = {...menuBarStyle,
                         justifyContent: val
                        }
        setMenuBarStyle(styleCopy);
    }

    const setMenuBarBackgroundColor = (val)=>{
        let styleCopy = {...menuBarStyle,
                         backgroundColor: val
                        };
        setMenuBarStyle(styleCopy);
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
                        {settings.menuItems.length>0&&
                            <>
                                {settings.menuItems.map((mi, index)=>{
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
                                                            <input className="button-input-url" value={mi.settings.mailTo} onChange={(e)=>{setMenuItemMailTo(e.target.value, index)}}></input>
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
                        <PopoverPicker color={style.color} onChange={setTextColor}></PopoverPicker>
                    </div>
                    <div className="menu-item-setting-row">
                        <div>Background Color</div>
                        <PopoverPicker color={style.backgroundColor} onChange={setBackgroundColor}></PopoverPicker>
                    </div>
                    <div className="menu-item-setting-row">
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
                    <div className="menu-item-setting-row">
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
                    <div className="menu-item-setting-row">
                        <div>
                            Font Size
                        </div>
                        <FontSizer val={style.fontSize} setval={setFontSize} min={1} max={100} increment={1}></FontSizer>
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
                    /**
                      Menu bar styles , are seperately maintained then the styles object of the component
                     */
                    <div className="content-settings-row-header">
                        Menu Bar Styles
                    </div>
                    <div className="menu-bar-settings-row">
                        <div>Item Alignment</div>
                        <div className="menu-bar-item-alignment-options">
                            <div className={menuBarStyle.justifyContent=="left"?"menu-bar-item-alignment-option active":"menu-bar-item-alignment-option"} onClick={()=>{setMenuBarAlignment("left")}}>
                                <img style={{width: 24, height: 24}} src={FormatAlignLeft}></img>
                            </div>
                            <div className={menuBarStyle.justifyContent=="center"?"menu-bar-item-alignment-option active":"menu-bar-item-alignment-option"} onClick={()=>{setMenuBarAlignment("center")}}>
                                <img style={{width: 24, height: 24}} src={FormatAlignCenter}></img>
                            </div>
                            <div className={menuBarStyle.justifyContent=="right"?"menu-bar-item-alignment-option active":"menu-bar-item-alignment-option"} onClick={()=>{setMenuBarAlignment("right")}}>
                                <img style={{width: 24, height: 24}} src={FormatAlignRight}></img>
                            </div>
                        </div>
                    </div>
                    <div className="menu-bar-settings-row">
                        <div>
                            Background Color
                        </div>
                        <PopoverPicker color={menuBarStyle.backgroundColor} onChange={setMenuBarBackgroundColor}></PopoverPicker>
                    </div>
                </div>

            </div>
            <GeneralSettings></GeneralSettings>
        </div>
    )

}

export default MenuToolBar;