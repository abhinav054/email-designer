import DeleteForever from "./images/delete_forever.png";
import Close from "./images/close.png";
import "./ToolbarHeader.css";

const ToolbarHeaders = ({closeComponent, deleteComponent})=>{

    return(
        <div className="block-content-header-row">
            <div className="block-content-headers">
                Content
            </div>
            <div className="block-content-header-action">
                <div className="block-content-header-action-buttons" onClick={deleteComponent}>
                    <img className="block-content-header-action-images" src={DeleteForever}></img>
                </div>
                <div className="block-content-header-action-buttons" onClick={closeComponent}>
                    <img className="block-content-header-action-images" src={Close}></img>
                </div>
            </div>
        </div>
    )
}


export default ToolbarHeaders;