
const MenuComponent = ({style,menuBarStyle, settings})=>{

    return(
        <div style={menuBarStyle}>
            {settings.menuItems.map((mi)=>{
                return(
                    <div style={style}>
                        {mi.text}
                    </div>
                )
            })}
        </div>
    )


}

export default MenuComponent;