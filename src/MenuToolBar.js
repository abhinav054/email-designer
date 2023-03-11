import ToolbarHeaders from "./ToolbarHeaders";

const MenuToolBar = ({closeComponent, deleteComponent})=>{

    
    return(
        <div className="blocks-content">
            <ToolbarHeaders closeComponent={closeComponent} deleteComponent={deleteComponent}></ToolbarHeaders>
            <div>
                <div className="menu-settings">
                    <div className="content-settings-header-row">
                        MENU ITEMS
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MenuToolBar;