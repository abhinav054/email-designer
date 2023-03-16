import PlaceHolderImage from "./images/Placeholder_view_vector.svg";
const ImageComponent = ({style,settings})=>{
    return(
        <div style={{
            justifyContent: style.justifyContent,
            display: "flex",
            alignItems: "center"
        }}>
            {settings.url!=""&&
                <img style={{width: style.width}}src={settings.url}></img>
            }
            {settings.url==""&&
                <img style={{width: "100%"}}src={PlaceHolderImage}></img>
            }
        </div>
    )
}

export default ImageComponent;