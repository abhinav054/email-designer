import ToolbarHeaders from "./ToolbarHeaders";
import GeneralSettings from "./ComponentGeneralSettings";
import "./TextEditorAppToolbar.css";

const TextEditorAppToolbar = ({closeComponent, deleteComponent})=>{

    const detailColumnPadding = false;

    return (
        <div className="blocks-content">
            <ToolbarHeaders closeComponent={closeComponent} deleteComponent={deleteComponent}></ToolbarHeaders>
            <div>
                <GeneralSettings></GeneralSettings>
            </div>
        </div>
    )
}

export default TextEditorAppToolbar;