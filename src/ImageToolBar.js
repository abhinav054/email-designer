
import ToolbarHeaders from "./ToolbarHeaders";
import Switch from "./Switch";
import "./ImageToolBar.css";
import FontSizer from "./FontResizer";
import FormatAlignRight from "./images/format_align_right.png";
import FormatAlignLeft from "./images/format_align_left.png";
import FormatAlignCenter from "./images/format_align_center.png";
import GeneralSettings from "./ComponentGeneralSettings";

const ImageToolBar = ({closeComponent, deleteComponent})=>{

    // const [showUpload, setShowUpload] = useState(false);


    const setAlignment = ()=>{

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
                        URL <input></input>
                    </div>
                    
                </div>
                <div className="image-settings-row">
                    <div>
                        Width
                    </div>
                    <div>
                        <FontSizer></FontSizer>        
                    </div>
                </div>
                <div className="image-settings-row">
                    <div>
                        Alignment
                    </div>
                    <div className="image-settings-alignment-options">
                        <div className="image-settings-alignment-option" onClick={()=>{setAlignment("left")}}>
                            <img style={{width: 24, height: 24}} src={FormatAlignLeft}></img>
                        </div>
                        <div className="image-settings-alignment-option" onClick={()=>{setAlignment("center")}}>
                            <img style={{width: 24, height: 24}} src={FormatAlignCenter}></img>
                        </div>
                        <div className="image-settings-alignment-option" onClick={()=>{setAlignment("right")}}>
                            <img style={{width: 24, height: 24}} src={FormatAlignRight}></img>
                        </div>
                    </div>
                </div>
                <div className="image-settings-row">
                    <div>
                        Alternative Text
                    </div>
                    <div>
                        <input></input>
                    </div>
                </div>
            </div>
            <GeneralSettings></GeneralSettings>
        </div>
    )

}


export default ImageToolBar;