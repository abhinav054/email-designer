

const HeaderComponent = ({active, style, settings})=>{
    return(
        <>
            {settings.type=="h1"&&<h1 style={style} contentEditable={active}>Header1</h1>}
            {settings.type=="h2"&&<h2 style={style} contentEditable={active}>Header2</h2>}
            {settings.type=="h3"&&<h3 style={style} contentEditable={active}>Header3</h3>}
            {settings.type=="h4"&&<h4 style={style} contentEditable={active}>Header4</h4>}
        </>
    )
}

export default HeaderComponent;