import { useEffect, useState } from "react"
import FontSizer from "./FontResizer";
import { PopoverPicker } from "./ColorPicker";
import Switch from "./Switch";

const BorderResizer = ({
    style,
    setStyle

})=>{

    const [detailBorder, setDetailBorder] = useState(true);

    useEffect(()=>{
        if(new Set([style.borderTop,style.borderBottom,style.borderLeft,style.borderRight]).size==1){
            setDetailBorder(false);
        }

    },[style])

    const getAllBorderVal =()=>{
        if(style.borderTop!=undefined){
            let borderval = style.borderTop.split(" ")[0].replace("px","");
            return borderval;
        }

        return 0;
        
    }

    const getAllBorderType = ()=>{
        if(style.borderTop!=undefined){
            let bordertype = style.borderTop.split(" ")[1];
            return bordertype;
        }
        return "solid";
        
    }

    const getAllBorderColor = ()=>{
        if(style.borderTop!=undefined){
            let borderColor = style.borderTop.split(" ")[2];
            return {
                    color: borderColor,
                    active: true
                };
        }
        return {
            color: "#000000",
            active: false
        }
        
    }

    const setAllBorderVal = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderTop.split(" ");
        oldborderarray[0] = val+"px";
        let newborderval = oldborderarray.join(" ");

        stylesCopy = {...stylesCopy,
                      borderTop: newborderval,
                      borderBottom: newborderval,
                      borderLeft: newborderval,
                      borderRight: newborderval
                    }
        setStyle(stylesCopy)
    }

    const setAllBorderType = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderTop.split(" ");
        oldborderarray[1] = val;
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderTop: newborderval,
                      borderBottom: newborderval,
                      borderLeft: newborderval,
                      borderRight: newborderval
                    }
        setStyle(stylesCopy);
    }

    const setAllBorderColor = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderTop.split(" ");
        oldborderarray[2] = val;
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderTop: newborderval,
                      borderBottom: newborderval,
                      borderLeft: newborderval,
                      borderRight: newborderval
                    }
        setStyle(stylesCopy);
    }


    const getTopBorderVal = ()=>{
        let stylesCopy = {...style};
        if(stylesCopy.borderTop!=undefined){
            let bordertopval = stylesCopy.borderTop.split(" ")[0].replace("px","");
            return bordertopval;
        }

        return 0;

    }


    const getTopBorderType = ()=>{
        if(style.borderTop!=undefined){
            let borderType = style.borderTop.split(" ")[1];
            return borderType;
        }

        return "solid";
    }

    const getTopBorderColor = ()=>{
        if(style.borderTop!=undefined){
            let borderTopColor = style.borderTop.split(" ")[2];
            return {
                "color": borderTopColor,
                "active": true
            };
        }

        return {
            "color": "#000000",
            "active": false
        }
    }

    const setTopBorderVal = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderTop.split(" ");
        oldborderarray[0] = val+"px";
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderTop: newborderval
                    }
        setStyle(stylesCopy);
    }

    const setTopBorderType = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderTop.split(" ");
        oldborderarray[1] = val;
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderTop: newborderval
                    }
        setStyle(stylesCopy)
    }

    const setTopBorderColor = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderTop.split(" ");
        oldborderarray[2] = val;
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderTop: newborderval
                    }
        setStyle(stylesCopy)
    }


    const getBottomBorderVal = ()=>{
        let stylesCopy = {...style};
        if(stylesCopy.borderBottom!=undefined){
            let bordertopval = stylesCopy.borderBottom.split(" ")[0].replace("px","");
            return bordertopval;
        }

        return 0;

    }


    const getBottomBorderType = ()=>{
        if(style.borderBottom!=undefined){
            let borderType = style.borderBottom.split(" ")[1];
            return borderType;
        }

        return "solid";
    }

    const getBottomBorderColor = ()=>{
        if(style.borderBottom!=undefined){
            let borderTopColor = style.borderBottom.split(" ")[2];
            return {
                "color": borderTopColor,
                "active": true
            };
        }

        return {
            "color": "#000000",
            "active": false
        }
    }

    const setBottomBorderVal = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderBottom.split(" ");
        oldborderarray[0] = val+"px";
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderBottom: newborderval
                    }
        setStyle(stylesCopy);
    }

    const setBottomBorderType = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderBottom.split(" ");
        oldborderarray[1] = val;
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderBottom: newborderval
                    }
        setStyle(stylesCopy)
    }

    const setBottomBorderColor = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderBottom.split(" ");
        oldborderarray[2] = val;
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderBottom: newborderval
                    }
        setStyle(stylesCopy)
    }


    const getLeftBorderVal = ()=>{
        let stylesCopy = {...style};
        if(stylesCopy.borderLeft!=undefined){
            let bordertopval = stylesCopy.borderLeft.split(" ")[0].replace("px","");
            return bordertopval;
        }

        return 0;

    }


    const getLeftBorderType = ()=>{
        if(style.borderLeft!=undefined){
            let borderType = style.borderLeft.split(" ")[1];
            return borderType;
        }

        return "solid";
    }

    const getLeftBorderColor = ()=>{
        if(style.borderLeft!=undefined){
            let borderTopColor = style.borderLeft.split(" ")[2];
            return {
                "color": borderTopColor,
                "active": true
            };
        }

        return {
            "color": "#000000",
            "active": false
        }
    }

    const setLeftBorderVal = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderLeft.split(" ");
        oldborderarray[0] = val+"px";
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderLeft: newborderval
                    }
        setStyle(stylesCopy);
    }

    const setLeftBorderType = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderLeft.split(" ");
        oldborderarray[1] = val;
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderLeft: newborderval
                    }
        setStyle(stylesCopy)
    }

    const setLeftBorderColor = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderLeft.split(" ");
        oldborderarray[2] = val;
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderLeft: newborderval
                    }
        setStyle(stylesCopy)
    }


    const getRightBorderVal = ()=>{
        let stylesCopy = {...style};
        if(stylesCopy.borderRight!=undefined){
            let bordertopval = stylesCopy.borderRight.split(" ")[0].replace("px","");
            return bordertopval;
        }

        return 0;

    }


    const getRightBorderType = ()=>{
        if(style.borderRight!=undefined){
            let borderType = style.borderRight.split(" ")[1];
            return borderType;
        }

        return "solid";
    }

    const getRightBorderColor = ()=>{
        if(style.borderRight!=undefined){
            let borderTopColor = style.borderRight.split(" ")[2];
            return {
                "color": borderTopColor,
                "active": true
            };
        }

        return {
            "color": "#000000",
            "active": false
        }
    }

    const setRightBorderVal = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderRight.split(" ");
        oldborderarray[0] = val+"px";
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderRight: newborderval
                    }
        setStyle(stylesCopy);
    }

    const setRightBorderType = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderRight.split(" ");
        oldborderarray[1] = val;
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderRight: newborderval
                    }
        setStyle(stylesCopy)
    }

    const setRightBorderColor = (val)=>{
        let stylesCopy = {...style};
        let oldborderarray = stylesCopy.borderRight.split(" ");
        oldborderarray[2] = val;
        let newborderval = oldborderarray.join(" ");
        stylesCopy = {...stylesCopy,
                      borderRight: newborderval
                    }
        setStyle(stylesCopy)
    }



    return(
        <div>
            <div className="column-border-settings-title">
                <div>
                    Border
                </div>
                <div>
                    More Options <Switch value={detailBorder} onChange={setDetailBorder}></Switch>
                </div>
            </div>
            {detailBorder==false&&
                <div className="all-in-one-border">
                    <div className="all-in-one-border-title">
                        All sides
                    </div>
                    <div className='border-details'>
                        <div className='border-details-row'>
                            <select value={getAllBorderType()} onChange={(e)=>{setAllBorderType(e.target.value)}}>
                                <option value="solid">Solid</option>
                                <option value="dotted">Dotted</option>
                                <option value="dashed">Dashed</option>
                            </select>
                        </div>
                    </div>
                    <div className='border-details-row'>
                        <FontSizer val={getAllBorderVal()} setval={setAllBorderVal} min={1} max={100} increment={1}>

                        </FontSizer>
                        <div className="border-color-picker">
                            <PopoverPicker color={getAllBorderColor().color} onChange={setAllBorderColor}>
                            </PopoverPicker>
                        </div>
                    </div>
                </div>
            }
            {detailBorder==true&&
            <>
                <div className="detail-border-row">
                    <div className="detail-border-detail">
                        <div className="all-in-one-border-title">
                            Top Border
                        </div>
                        <div className='border-details'>
                            <div className='border-details-row'>
                                <select value={getTopBorderType()} onChange={(e)=>{setTopBorderType(e.target.value)}}>
                                    <option value="solid">Solid</option>
                                    <option value="dotted">Dotted</option>
                                    <option value="dashed">Dashed</option>
                                </select>
                            </div>
                        </div>
                        <div className="border-details-row">
                            <FontSizer val={getTopBorderVal()} setval={setTopBorderVal} min={1} max={100} increment={1}>

                            </FontSizer>
                            <div className="border-color-picker">
                                <PopoverPicker color={getTopBorderColor().color} onChange={setTopBorderColor}></PopoverPicker>
                            </div>
                        </div>
                    </div>
                    <div className="detail-border-detail">
                        <div className="all-in-one-border-title">
                            Right Border
                        </div>
                        <div className='border-details'>
                            <div className='border-details-row'>
                                <select value={getRightBorderType()} onChange={(e)=>{setRightBorderType(e.target.value)}}>
                                    <option value="solid">Solid</option>
                                    <option value="dotted">Dotted</option>
                                    <option value="dashed">Dashed</option>
                                </select>
                            </div>
                        </div>
                        <div className="border-details-row">
                            <FontSizer val={getRightBorderVal()} setval={setRightBorderVal} min={1} max={100} increment={1}>

                            </FontSizer>
                            <div className="border-color-picker">
                                <PopoverPicker color={getRightBorderColor().color} onChange={setRightBorderColor}></PopoverPicker>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail-border-row">
                    <div className="detail-border-detail">
                        <div className="all-in-one-border-title">
                            Bottom Border
                        </div>
                        <div className='border-details'>
                            <div className='border-details-row'>
                                <select value={getBottomBorderType()} onChange={(e)=>{setBottomBorderType(e.target.value)}}>
                                    <option value="solid">Solid</option>
                                    <option value="dotted">Dotted</option>
                                    <option value="dashed">Dashed</option>
                                </select>
                            </div>
                        </div>
                        <div className="border-details-row">
                            <FontSizer val={getBottomBorderVal()} setval={setBottomBorderVal} min={1} max={100} increment={1}>

                            </FontSizer>
                            <div className="border-color-picker">
                                <PopoverPicker color={getBottomBorderColor().color} onChange={setBottomBorderColor}></PopoverPicker>
                            </div>
                        </div>
                    </div>
                    <div className="detail-border-detail">
                        <div className="all-in-one-border-title">
                            Left Border
                        </div>
                        <div className='border-details'>
                            <div className='border-details-row'>
                                <select value={getLeftBorderType()} onChange={(e)=>{setLeftBorderType(e.target.value)}}>
                                    <option value="solid">Solid</option>
                                    <option value="dotted">Dotted</option>
                                    <option value="dashed">Dashed</option>
                                </select>
                            </div>
                        </div>
                        <div className="border-details-row">
                            <FontSizer val={getLeftBorderVal()} onChange={setLeftBorderVal} min={1} max={100} increment={1}>

                            </FontSizer>
                            <div className="border-color-picker">
                                <PopoverPicker color={getLeftBorderColor().color} onChange={setLeftBorderColor}></PopoverPicker>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
    )
}

export default BorderResizer;