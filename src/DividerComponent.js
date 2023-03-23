

const DividerComponent = ({style})=>{
    return(
        <div style={{
            display: "flex",
            justifyContent: style.justifyContent
          }}>
            <div style={{
                width: style.width,
                border: style.border
            }}>
            </div>
        </div>
        
    )
}


export default DividerComponent;