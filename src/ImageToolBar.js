
import ToolbarHeaders from "./ToolbarHeaders";
import Switch from "./Switch";
import "./ImageToolBar.css";
import FontSizer from "./FontResizer";
import FormatAlignRight from "./images/format_align_right.png";
import FormatAlignLeft from "./images/format_align_left.png";
import FormatAlignCenter from "./images/format_align_center.png";
import GeneralSettings from "./ComponentGeneralSettings";

const ImageToolBar = ({closeComponent, deleteComponent, style, setStyle, settings, setSettings})=>{

    // const [showUpload, setShowUpload] = useState(false);

    const getWidth = ()=>{
        let width = style.width.replace("%","");
        return width
    }

    const setWidth = (val)=>{
        let styleCopy = {...style,
                         width: val+"%"
                        }
        setStyle(styleCopy);
    }

    const setAlignment = (val)=>{
        let styleCopy = {...style,
                         justifyContent: val
                        }
        setStyle(styleCopy);
    }

    const setUrl = (val)=>{
        let settingsCopy = {...settings,
                            url: val
                            };
        setSettings(settingsCopy);
    }

    const setAlternativetext = (val)=>{
        let settingsCopy = {...settings,
                            alttext: val
                            };
        setSettings(settingsCopy);
    }

    return (
        <div className="blocks-content">
            <ToolbarHeaders closeComponent={closeComponent} deleteComponent={deleteComponent}></ToolbarHeaders>
            <div>
                <div className="content-settings-row-header">
                    IMAGE
                </div>
                <div className="image-settings-row">
                    <div>
                        Image
                    </div>
                    <div>
                        URL <input value={settings.url} onChange={(e)=>{setUrl(e.target.value)}}></input>
                    </div>
                    
                </div>
                <div className="image-settings-row">
                    <div>
                        Width
                    </div>
                    <div>
                        <FontSizer min={1} max={100} val={getWidth()} setval={setWidth} increment={1}></FontSizer>        
                    </div>
                </div>
                <div className="image-settings-row">
                    <div>
                        Alignment
                    </div>
                    <div className="image-settings-alignment-options">
                        <div className={style.justifyContent=="left"?"image-settings-alignment-option active":"image-settings-alignment-option"} onClick={()=>{setAlignment("left")}}>
                            <img style={{width: 24, height: 24}} src={FormatAlignLeft}></img>
                        </div>
                        <div className={style.justifyContent=="center"?"image-settings-alignment-option active":"image-settings-alignment-option"} onClick={()=>{setAlignment("center")}}>
                            <img style={{width: 24, height: 24}} src={FormatAlignCenter}></img>
                        </div>
                        <div className={style.justifyContent=="right"?"image-settings-alignment-option active":"image-settings-alignment-option"} onClick={()=>{setAlignment("right")}}>
                            <img style={{width: 24, height: 24}} src={FormatAlignRight}></img>
                        </div>
                    </div>
                </div>
                <div className="image-settings-row">
                    <div>
                        Alternative Text
                    </div>
                    <div>
                        <input value={settings.alttext} onChange={(e)=>{setAlternativetext(e.target.value)}}></input>
                    </div>
                </div>
            </div>
            <GeneralSettings></GeneralSettings>
        </div>
    )

}


export default ImageToolBar;