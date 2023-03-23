

const ButtonComponent = ({style, active})=>{
    return (
        <div style={{
            "textAlign": style.textAlign,
            "width": style.width
        }}>
            <button contentEditable={active} style={{
                "paddingLeft": style.paddingLeft,
                "paddingRight": style.paddingRight,
                "paddingTop": style.paddingTop,
                "paddingBottom": style.paddingBottom,
                "borderBottom": style.borderBottom,
                "borderTop": style.borderTop,
                "borderRight": style.borderRight,
                "borderLeft": style.borderLeft,
                "borderTopLeftRadius": style.borderTopLeftRadius,
                "borderTopRightRadius": style.borderTopRightRadius,
                "borderBottomLeftRadius": style.borderBottomLeftRadius,
                "borderBottomRightRadius": style.borderBottomRightRadius,
                "background": style.background,
                "color": style.color,
                "lineHeight": style.lineHeight,
                "fontSize": style.fontSize    
            }}>Button</button>
        </div>
            
    )
}

export default ButtonComponent;