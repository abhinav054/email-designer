import Switch from "./Switch"
import { useState, useEffect } from "react"
import FontSizer from "./FontResizer";

const MarginResizer = ({style, setStyle})=>{

    const [detailedMargin, setDetailedMargin] = useState(true);

    useEffect(()=>{
        if(new Set([style.marginTop,style.marginBottom,style.marginLeft, style.marginRight]).size==1){
            setDetailedMargin(false);
        }
    },[style])

    const setAllMargin = (val)=>{
        let stylesCopy = {...style}
        stylesCopy = {...stylesCopy,
                      marginTop: val,
                      marginBottom: val,
                      marginLeft: val,
                      marginRight: val 
                     }
        setStyle(stylesCopy)
    }

    const setBottomMargin = (val)=>{
        let stylesCopy = {...style};
        stylesCopy = {...stylesCopy,
                      marginBottom: val
                    }
        setStyle(stylesCopy)
    }

    const setTopMargin = (val)=>{
        let stylesCopy = {...style};
        stylesCopy = {...stylesCopy,
                      marginTop: val
                     }
        setStyle(stylesCopy)
    }

    const setRightMargin = (val)=>{
        let styleCopy = {...style};
        styleCopy = {...styleCopy,
                     marginRight: val
                    }
        setStyle(styleCopy)
    }

    const setLeftMargin = (val)=>{
        let styleCopy = {...style};
        styleCopy = {...styleCopy,
                     marginLeft: val
                    }
        setStyle(styleCopy)
    }



    return(
        <div>
            <div className="column-padding-settings-title">
                <div>
                    Margin
                </div>
                <div>
                    More Options <Switch value={detailedMargin} onChange={setDetailedMargin}></Switch>
                </div>
            </div>
            {detailedMargin==false&&
                <div className="all-in-one-padding">
                    <div className="all-in-one-padding-title">
                        All sides
                    </div>
                    <FontSizer
                        val={style.marginTop}
                        setval={setAllMargin}
                    >
                    </FontSizer>
                </div>
            }
            {detailedMargin==true&&
                <>
                    <div className="detail-padding-row">
                        <div className="detail-padding-detail">
                            <div className="all-in-one-padding-title">
                                Top Margin
                            </div>
                            <FontSizer
                                val={style.marginTop}
                                setval={setTopMargin}
                            >
                            </FontSizer>
                        </div>
                        <div className="detail-padding-detail">
                            <div className="all-in-one-padding-title">
                                Right Margin
                            </div>
                            <FontSizer
                                val={style.marginRight}
                                setval={setRightMargin}
                            >
                            </FontSizer>
                        </div>
                    </div>
                    <div className="detail-padding-row">
                        <div className="detail-padding-detail">
                            <div className="all-in-one-padding-title">
                                Bottom Margin
                            </div>
                            <FontSizer
                                val={style.marginBottom}
                                setval={setBottomMargin}
                            >
                            </FontSizer>
                        </div>
                        <div className="detail-padding-detail">
                            <div className="all-in-one-padding-title">
                                Left Margin
                            </div>
                            <FontSizer
                                val={style.marginLeft}
                                setval={setLeftMargin}
                            >
                            </FontSizer>
                        </div>
                    </div>
                </>

            }

        </div>
    )
}

export default MarginResizer;