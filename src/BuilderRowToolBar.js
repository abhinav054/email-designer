import { useState } from "react"
import { PopoverPicker } from './ColorPicker';
import PaddingResizer from './PaddingResizer';
import BorderResizer from './BorderResizer';
import Close from "./images/close.png";
import {columnStyle} from "./StyleConsts";
import AddIcon from "./images/add_icon.png";
import "./BuilderRowToolBar.css";
import AlignVerticalBottom from "./images/align_vertical_bottom.png";
import AlignVerticalCenter from "./images/align_vertical_center.png";
import AlignVerticalTop from "./images/align_vertical_top.png";
import AlignItemsStretch from "./images/align_items_stretch.png";
import AlignJustifyFlexEnd from "./images/align_justify_flex_end.png";
import AlignJustifyFlexStart from "./images/align_justify_flex_start.png";
import AlignHorizontalCenter from "./images/align_horizontal_center.png";
import AlignHorizontalLeft from "./images/align_horizontal_left.png";
import AlignHorizontalRight from "./images/align_horizontal_right.png";
import AlignJustifySpaceAround from "./images/align_justify_space_around.png";
import AlignJustifySpaceBetweeen from "./images/align_justify_space_between.png";


const BuilderRowToolBar = ({row, setRow, makeComponentDeactive})=>{

    const [columnsettingsactive,setColumnsettingsactive] = useState(0);
    const [columnBackground, setColumnBackground] = useState("color");
    const [rowBackground,setRowBackground] = useState("color");
  
    // check the pop implementation -> to remove first element or the last element
    const toggleColumns = (number)=>{
      let rowCopy = {...row};
      let columnwidth = parseInt(100)/parseInt(number);
      let oldcolumnnumbers = rowCopy.columns.length;
      if(oldcolumnnumbers>number){
        for(let i=0; i < (oldcolumnnumbers-number);i++){
          rowCopy.columns.pop();
        }
        for(let i =0; i < rowCopy.columns.length; i++){
          rowCopy.columns[i].style.width = columnwidth.toString()+"%"
        }

      }else{
        for(let i =0; i < rowCopy.columns.length; i++){
          rowCopy.columns[i].style.width = columnwidth.toString()+"%"
        }
        for(let i=0; i < (number-oldcolumnnumbers); i++){
          rowCopy.columns.push({
            "components":[],
            "style":{
              "width": columnwidth.toString()+"%",
              ...columnStyle
            }
          })
        }
      }
      setRow(rowCopy);
    }

    const setActiveColumnStyle = (style)=>{
        let rowCopy = {...row};
        rowCopy[columnsettingsactive].style = style;
        setRow(rowCopy);
    }

    const setActiveRowStyle = (style)=>{
      let rowCopy = {...row};
      rowCopy.style = style;
      setRow(rowCopy);
    }

    const getColumnBackgroundColor = ()=>{
      let color = row.columns[columnsettingsactive].style.backgroundColor;
      if(color==undefined){
        return {
          color: "",
          active: false
        }
      }else{
        return {
          color: color,
          active: true
        }
      }
    }

    const setColumnBackgroundColor = (color)=>{
      let rowCopy = {...row};
      rowCopy.columns[columnsettingsactive].style.backgroundColor = color;
      setRow(rowCopy);
    }

    const getColumnBackgroundImage = ()=>{
      let url = row.columns[columnsettingsactive].style.backgroundImage;
      if(url==undefined){
        return "";
      }else{
        return url;
      }
    }

    const setColumnBackgroundImage = (image)=>{
      let rowCopy = {...row};
      rowCopy.columns[columnsettingsactive].style.backgroundImage = image;
      setRow(rowCopy);
    }

    const getColumnWidth = ()=>{
      let columnwidth = row.columns[columnsettingsactive].style.width;
      return parseInt(columnwidth.replace("%"))
    }

    const setColumnWidth = (width)=>{
        let oldactivecolumnwidth = parseInt(row.columns[columnsettingsactive].style.width.replace("%",""));
        let incrementwidth = width-oldactivecolumnwidth;
        let rowCopy = {...row};
        let horizontalalignment = rowCopy.style.justifyContent;
        if(horizontalalignment=="space-around"||horizontalalignment=="space-between"||horizontalalignment=="center"){
          let columnlength = row.columns.length;
          let incrementwidtheach = parseFloat(incrementwidth)/parseFloat(columnlength-1);
          for(let i=0; i< rowCopy.columns.length; i++){
            if(i!=columnsettingsactive){
              let columnwidth = parseFloat(rowCopy.columns[i].style.width.replace("%",""));
              rowCopy.columns[i].style.width = (columnwidth - incrementwidtheach).toString()+"%"
            }
          }
          rowCopy.columns[columnsettingsactive].style.width = width.toString()+"%";
        }

        if(horizontalalignment=="flex-start"){
          let availablecolright = (row.columns.length - columnsettingsactive)-1;
          let incrementwidtheach = parseFloat(incrementwidth)/parseFloat(availablecolright);
          for(let i=columnsettingsactive+1; i < row.columns.length; i++){
            let columnwidth = parseFloat(rowCopy.columns[i].style.width.replace("%",""));
            rowCopy.columns[i].style.width = (columnwidth - incrementwidtheach).toString()+"%"
          }
          rowCopy.columns[columnsettingsactive].style.width = width.toString()+"%";
        }

        if(horizontalalignment=="flex-end"){
          let availablecolrightleft = row.columns.length -(row.columns.length - columnsettingsactive);
          let incrementwidtheach = parseFloat(incrementwidth)/parseFloat(availablecolrightleft);
          for(let i=0; i< columnsettingsactive; i++){
            let columnwidth = parseFloat(rowCopy.columns[i].style.width.replace("%",""));
            rowCopy.columns[i].style.width = (columnwidth - incrementwidtheach).toString()+"%"            
          }
          rowCopy.columns[columnsettingsactive].style.width = width.toString()+"%";
        }
        setRow(rowCopy);
    }

    const getRowBackgroundColor = ()=>{
      let color = row.style.backgroundColor;
      if(color==undefined){
        return {
          color: "",
          active: false
        }
      }else{
        return {
          color: color,
          active: true
        }
      }
    }


    const setRowBackgroundColor = (color)=>{
      let rowCopy = {...row};
      rowCopy.style.backgroundColor = color;
      setRow(rowCopy);
    }

    const getRowBackgroundImage = ()=>{
      let url = row.style.backgroundImage;
      if(url==undefined){
        return ""
      }else{
        return url
      }
    }

    const setRowBackgroundImage = (url)=>{
      let rowCopy = {...row};
      rowCopy.style.backgroundImage = url;
      setRow(rowCopy)
    }

    const setAlignItems = (alignment)=>{
      let rowCopy = {...row};
      rowCopy.style = {...rowCopy.style,
                       alignItems: alignment
                      };
      setRow(rowCopy);
    }

    const setHorizontalItems = (alignment)=>{
      let rowCopy = {...row};
      rowCopy.style = {...rowCopy.style,
                       justifyContent: alignment
                      };
      setRow(rowCopy);
    }

    const getcolumnlengtharray = ()=>{
      let columnlength = row.columns.length;
      if(columnlength<3){
        return [1,2,3]
      }else{
        let lengtharray = [];
        for(let i=0; i< columnlength; i++){
          lengtharray.push(i+1)
        }
        return lengtharray;
      }
    }

    const getcolumnlengthrowarray = (len)=>{
      let columnrowlength = [];
      for(let i=0; i < len; i++){
        columnrowlength.push(
          i
        )
      }
      return columnrowlength;
    }

    return(
            <div className='blocks-content'>
                <div className='blocks-content-header'>
                  <div className='title'>
                    Row
                  </div>
                  <div className='close' onClick={makeComponentDeactive}>
                    <img src={Close} style={{width: 30, height: 30}}></img>
                  </div>
                </div>
                <div className='columns'>
                  <div className='block-properties-title'>
                    <p style={{margin: 10}}>
                      Columns
                    </p>
                  </div>
                  {getcolumnlengtharray().map((len)=>{
                    return(
                      <div className='single-row' onClick={()=>{toggleColumns(len)}}>
                        {(row.columns.length==len)?
                          <>
                            {getcolumnlengthrowarray(len).map(
                                ()=>{
                                  return(
                                    <div className="block-show-active">
                                    </div>
                                  ) 
                                  
                                }
                              )
                             }
                          </>
                          :
                          <>
                            {
                              getcolumnlengthrowarray(len).map(
                                ()=>{
                                  return(
                                    <div className="block-show">
                                    </div>
                                  ) 
                                  
                                }
                              )
                            }
                          </>
                        }
                      </div>    
                    )
                  })}
                </div>
                <div className='column-properties'>
                  <div className='block-properties-title'>
                    <p style={{margin: 10}}>
                      Column Properties
                    </p>
                  </div>
                  <div className="column-headers">
                    {row.columns.map((c,index)=>{
                      return (
                        <div className={(columnsettingsactive==index)?"column-settings-heading active":"column-settings-heading"} onClick={()=>{setColumnsettingsactive(index)}}>
                          {"Column "+(index+1)}
                        </div>
                      )
                    })}
                    <div className="column-settings-heading" onClick={()=>{toggleColumns(row.columns.length+1)}}>
                      <img src={AddIcon} style={{width: 20}}></img>
                    </div>
                  </div>
                  <div className="column-settings">
                        <div className="column-width-settings">
                          <div>
                            Width
                          </div>
                          <div>
                            <input value={getColumnWidth()} onChange={(e)=>{setColumnWidth(e.target.value)}} max={100} min={0} style={{width: 30}} type="number"></input> %
                          </div>
                        </div>
                        <div className='column-background-settings'>
                          <div>
                            <div className="column-background-buttons">
                              <button className={columnBackground=="color"?"background-color-toggle active":"background-color-toggle"} onClick={()=>{setColumnBackground("color")}}>Color</button>
                              <button className={columnBackground=="image"?"background-color-toggle active":"background-color-toggle"} onClick={()=>{setColumnBackground("image")}}>Image</button>
                            </div>
                          </div>
                          {columnBackground=="color"&&
                            <div className="column-background-color">
                              <div>
                                Background
                              </div>
                              <PopoverPicker 
                                color={getColumnBackgroundColor(columnsettingsactive).color} 
                                active={getColumnBackgroundColor(columnsettingsactive).active}
                                onChange={setColumnBackgroundColor}
                                ></PopoverPicker>
                            </div>
                          }
                          {columnBackground=="image"&&
                            <div className='column-background-image'>
                              <div>
                                Background
                              </div>
                              <div>
                                <input className="column-background-image-input" placeholder='Enter image url' value={getColumnBackgroundImage()} onChange={(e)=>{setColumnBackgroundImage(e.target.value)}}></input>
                              </div>
                            </div>
                          }
                        </div>
                        <div className="column-padding-settings">
                          <PaddingResizer
                            style={row.columns[columnsettingsactive].style}
                            setStyle={setActiveColumnStyle}
                          >
                          </PaddingResizer>
                        </div>
                        <div className="column-border-settings">
                          <BorderResizer
                            style={row.columns[columnsettingsactive].style}
                            setStyle={setActiveColumnStyle}
                          >

                          </BorderResizer>
                        </div>
                  </div>
                </div>
                <div className='row-properties'>
                  <div className='block-properties-title'>
                    <p style={{margin: 10}}>
                      Row Properties
                    </p>
                  </div>
                  <div className="row-settings">
                    <div className='row-background-settings'>
                          <div>
                            <div className="column-background-buttons">
                              <button className={rowBackground=="color"?"background-color-toggle active":"background-color-toggle"} onClick={()=>{setRowBackground("color")}}>Color</button>
                              <button className={rowBackground=="image"?"background-color-toggle active":"background-color-toggle"} onClick={()=>{setRowBackground("image")}}>Image</button>
                            </div>
                          </div>
                          {rowBackground=="color"&&
                            <div className="column-background-color">
                              <div>
                                Background
                              </div>
                              <PopoverPicker 
                                color={getRowBackgroundColor().color} 
                                active={getRowBackgroundColor().active}
                                onChange={setRowBackgroundColor}
                                ></PopoverPicker>
                            </div>
                          }
                          {rowBackground=="image"&&
                            <div className='column-background-image'>
                              <div>
                                Background
                              </div>
                              <div>
                                <input className="column-background-image-input" placeholder='Enter image url' value={getRowBackgroundImage()} onChange={(e)=>{setRowBackgroundImage(e.target.value)}}></input>
                              </div>
                            </div>
                          }
                    </div>
                    <div className="row-horizontal-aligment-settings">
                      <div>
                        Horizontal alignment
                      </div>
                      <div className="row-horizontal-alignment-options">
                        <div className={row.style?.justifyContent=="flex-start"?"row-horizontal-alignment-option active":"row-horizontal-alignment-option"} onClick={()=>{setHorizontalItems("flex-start")}}>
                          <img style={{width: 24, height: 24}} src={AlignHorizontalLeft}></img>
                        </div>
                        <div className={row.style?.justifyContent=="flex-end"?"row-horizontal-alignment-option active":"row-horizontal-alignment-option"} onClick={()=>{setHorizontalItems("flex-end")}}>
                          <img style={{width: 24, height: 24}} src={AlignHorizontalRight}></img>
                        </div>
                        <div className={row.style?.justifyContent=="center"?"row-horizontal-alignment-option active":"row-horizontal-alignment-option"} onClick={()=>{setHorizontalItems("center")}}>
                          <img style={{width: 24, height: 24}} src={AlignHorizontalCenter}></img>
                        </div>
                        <div className={row.style?.justifyContent=="space-around"?"row-horizontal-alignment-option active":"row-horizontal-alignment-option"} onClick={()=>{setHorizontalItems("space-around")}}>
                          <img style={{width: 24, height: 24}} src={AlignJustifySpaceAround}></img>
                        </div>
                        <div className={row.style?.justifyContent=="space-between"?"row-horizontal-alignment-option active":"row-horizontal-alignment-option"} onClick={()=>{setHorizontalItems("space-between")}}>
                          <img style={{width: 24, height: 24}} src={AlignJustifySpaceBetweeen}></img>
                        </div>
                      </div>
                    </div>
                    <div className="row-alignment-settings">
                      <div>
                        Vertical alignment
                      </div>
                      <div className="row-vertical-alignment-settings-options">
                                <div className={row.style?.alignItems=="normal"?"row-vertical-alignment-settings-option active":"row-vertical-alignment-settings-option"} onClick={()=>{setAlignItems("normal")}}>
                                    <img style={{width: 24, height: 24}} src={AlignItemsStretch}></img>
                                </div>
                                <div className={row.style?.alignItems=="center"?"row-vertical-alignment-settings-option active":"row-vertical-alignment-settings-option"} onClick={()=>{setAlignItems("center")}}>
                                    <img style={{width: 24, height: 24}} src={AlignVerticalCenter}></img>
                                </div>
                                <div className={row.style?.alignItems=="flex-start"?"row-vertical-alignment-settings-option active":"row-vertical-alignment-settings-option"} onClick={()=>{setAlignItems("flex-start")}}>
                                    <img style={{width: 24, height: 24}} src={AlignJustifyFlexStart}></img>
                                </div>
                                <div className={row.style?.alignItems=="flex-end"?"row-vertical-alignment-settings-option active":"row-vertical-alignment-settings-option"} onClick={()=>{setAlignItems("flex-end")}}>
                                    <img style={{width: 24, height: 24}} src={AlignJustifyFlexEnd}></img>
                                </div>
                      </div>

                    </div>
                    <div className="row-padding-settings">

                        <PaddingResizer
                          style={row.style}
                          setStyle={setActiveRowStyle}
                        >
                        </PaddingResizer>
                          
                    </div>
                    <div className="row-border-settings">
                      <BorderResizer
                        style={row.style}
                        setStyle={setActiveRowStyle}
                      >
                      </BorderResizer>
                    </div>
                  </div>
                </div>
                
              </div>
    )
}

export default BuilderRowToolBar;