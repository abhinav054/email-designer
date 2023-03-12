
import ToolbarHeaders from "./ToolbarHeaders";

const ImageToolBar = ({closeComponent, deleteComponent})=>{

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
                        <div className="image-upload">
                            <button>Upload</button>
                        </div>
                        <div className="image-url">
                            <input></input>

                        </div>
                    </div>

                </div>
            </div>            
        </div>
    )

}


export default ImageToolBar;