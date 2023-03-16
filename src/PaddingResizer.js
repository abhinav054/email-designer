import Switch from "./Switch"
import FontSizer from "./FontResizer"
import { useState, useEffect } from "react"

const PaddingResizer = ({
    style,
    setStyle
})=>{


    const [detailedPadding, setDetailedPadding] = useState(true);

    useEffect(()=>{
        if(new Set([style.paddingLeft,style.paddingRight,style.paddingTop,style.paddingBottom]).size==1){

            setDetailedPadding(false)
        }
    },[style])

    const setAllPadding = (val)=>{
        let styleCopy = {...style};
        styleCopy = {...styleCopy,
                    paddingTop: val,
                    paddingBottom: val,
                    paddingLeft: val,
                    paddingRight: val
                    }
        setStyle(styleCopy);
    }


    const setLeftPadding = (val)=>{
        let styleCopy = {...style};
        styleCopy = {...styleCopy,
                     paddingLeft: val
                    }
        setStyle(styleCopy);
    }

    const setRightPadding = (val)=>{
        let styleCopy = {...style};
        styleCopy = {...styleCopy,
                    paddingRight: val
                    }
        setStyle(styleCopy);
    }

    const setTopPadding = (val)=>{
        let styleCopy = {...style};
        styleCopy = {...styleCopy,
                    paddingTop: val
                    }
        setStyle(styleCopy);
    }

    const setBottomPadding = (val)=>{
        let styleCopy = {...style};
        styleCopy = {...styleCopy,
                    paddingBottom: val
                    }
        setStyle(styleCopy)
    }



    return(
        <div>
            <div className="column-padding-settings-title">
                <div>
                    Padding
                </div>
                <div>
                    More Options <Switch value={detailedPadding} onChange={setDetailedPadding}></Switch>
                </div>
            </div>
            {detailedPadding==false&&
                <div className="all-in-one-padding">
                    <div className="all-in-one-padding-title">
                        All sides
                    </div>
                    <FontSizer
                        val={style.paddingTop}
                        setval={setAllPadding}
                        min={1}
                        max={100}
                        increment={1}
                    >
                    </FontSizer>
                </div>
            }
            {detailedPadding==true&&
                <>
                    <div className="detail-padding-row">
                        <div className="detail-padding-detail">
                            <div className="all-in-one-padding-title">
                                Top Padding
                            </div>
                            <FontSizer
                                val={style.paddingTop}
                                setval={setTopPadding}
                                min={1}
                                max={100}
                                increment={1}
                            >
                            </FontSizer>
                        </div>
                        <div className="detail-padding-detail">
                            <div className="all-in-one-padding-title">
                                Right Padding
                            </div>
                            <FontSizer
                                val={style.paddingRight}
                                setval={setRightPadding}
                                min={1}
                                max={100}
                                increment={1}
                            >
                            </FontSizer>
                        </div>
                    </div>
                    <div className="detail-padding-row">
                        <div className="detail-padding-detail">
                            <div className="all-in-one-padding-title">
                                Bottom Padding
                            </div>
                            <FontSizer
                                val={style.paddingBottom}
                                setval={setBottomPadding}
                                min={1}
                                max={100}
                                increment={1}
                            >
                            </FontSizer>
                        </div>
                        <div className="detail-padding-detail">
                            <div className="all-in-one-padding-title">
                                Left Padding
                            </div>
                            <FontSizer
                                val={style.paddingLeft}
                                setval={setLeftPadding}
                                min={1}
                                max={100}
                                increment={1}
                            >
                            </FontSizer>
                        </div>
                    </div>
                </>

            }

        </div>
    )
}

export default PaddingResizer; 