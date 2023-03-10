

const ButtonComponent = ({style, active})=>{
    return (
            <button contentEditable={active} style={style}>Button</button>
    )
}

export default ButtonComponent;