import { useEffect, useState } from "react";
import Switch from "./Switch";
import FontSizer from "./FontResizer";

const BorderRadiusResizer = ({style, setStyle})=>{
    

    const [detailedBorderRadius, setDetailedBorderRadius] = useState(true);

    useEffect(()=>{
        if(new Set([style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomLeftRadius, style.borderBottomRightRadius]).size==1){
            setDetailedBorderRadius(false);
        }
    },[style])

    const setAllBorderRadius = (val)=>{
        let styleCopy = {...style};
        styleCopy = {...styleCopy,
                    borderTopLeftRadius: val,
                    borderTopRightRadius: val,
                    borderBottomLeftRadius: val,
                    borderBottomRightRadius: val
                    }
        setStyle(styleCopy);
    }

    const setBorderTopLeftRadius = (val)=>{
        let styleCopy = {...style};
        styleCopy = {...styleCopy,
                     borderTopLeftRadius: val
                    }
        setStyle(styleCopy)
    }

    const setBorderTopRightRadius = (val)=>{
        let styleCopy = {...style};
        styleCopy = {...styleCopy,
                    borderTopRightRadius: val
                    }
        setStyle(styleCopy)
    }

    const setBorderBottomLeftRadius = (val)=>{
        let styleCopy = {...style};
        styleCopy = {...styleCopy,
                     borderBottomLeftRadius: val
                    }
        setStyle(styleCopy)
    }

    const setBorderBottomRightRadius = (val)=>{
        let styleCopy = {...style};
        styleCopy = {...styleCopy,
                    borderBottomRightRadius: val
        }
        setStyle(styleCopy);
    }

    return (
    <div>
        <div className="column-padding-settings-title">
            <div>
                Border Radius
            </div>
            <div>
                More Options <Switch value={detailedBorderRadius} onChange={setDetailedBorderRadius}></Switch>
            </div>
        </div>
        {detailedBorderRadius==false&&
            <div className="all-in-one-padding">
                <div className="all-in-one-padding-title">
                    All sides
                </div>
                <FontSizer
                    val={style.borderTopLeftRadius}
                    setval={setAllBorderRadius}
                >
                </FontSizer>
            </div>
        }
        {detailedBorderRadius==true&&
            <>
                <div className="detail-padding-row">
                    <div className="detail-padding-detail">
                        <div className="all-in-one-padding-title">
                            Top Left
                        </div>
                        <FontSizer
                            val={style.borderTopLeftRadius}
                            setval={setBorderTopLeftRadius}
                        >
                        </FontSizer>
                    </div>
                    <div className="detail-padding-detail">
                        <div className="all-in-one-padding-title">
                            Top Right
                        </div>
                        <FontSizer
                            val={style.borderTopRightRadius}
                            setval={setBorderTopRightRadius}
                        >
                        </FontSizer>
                    </div>
                </div>
                <div className="detail-padding-row">
                    <div className="detail-padding-detail">
                        <div className="all-in-one-padding-title">
                            Bottom Left
                        </div>
                        <FontSizer
                            val={style.borderBottomLeftRadius}
                            setval={setBorderBottomLeftRadius}
                        >
                        </FontSizer>
                    </div>
                    <div className="detail-padding-detail">
                        <div className="all-in-one-padding-title">
                            Bottom Right
                        </div>
                        <FontSizer
                            val={style.borderBottomLeftRadius}
                            setval={setBorderBottomLeftRadius}
                        >
                        </FontSizer>
                    </div>
                </div>
            </>

        }

    </div>)

}

export default BorderRadiusResizer;