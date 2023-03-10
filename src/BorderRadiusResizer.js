


const BorderRadiusResizer = ({style, setStyle})=>{
    

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
                    val={style.borderTopRadius}
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
                            Top Border Radius
                        </div>
                        <FontSizer
                            val={style.borderTopRadius}
                            setval={setBorderTopRadius}
                        >
                        </FontSizer>
                    </div>
                    <div className="detail-padding-detail">
                        <div className="all-in-one-padding-title">
                            Right Border Radius
                        </div>
                        <FontSizer
                            val={style.borderRightRadius}
                            setval={setBorderRightRadius}
                        >
                        </FontSizer>
                    </div>
                </div>
                <div className="detail-padding-row">
                    <div className="detail-padding-detail">
                        <div className="all-in-one-padding-title">
                            Bottom Border Radius
                        </div>
                        <FontSizer
                            val={style.borderBottomRadius}
                            setval={setBorderBottomRadius}
                        >
                        </FontSizer>
                    </div>
                    <div className="detail-padding-detail">
                        <div className="all-in-one-padding-title">
                            Left Border Radius
                        </div>
                        <FontSizer
                            val={style.borderLeftRadius}
                            setval={setBorderLeftRadius}
                        >
                        </FontSizer>
                    </div>
                </div>
            </>

        }

    </div>)

}