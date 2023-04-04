  import './App.css';
// import Draggable from 'react-draggable'; // The default
// import {DraggableCore} from 'react-draggable'; // <DraggableCore>
import { useState, useEffect, ReactDOM, useRef } from 'react';
import Text from "./images/text.png";
import AddIcon from "./images/add_icon.png";
import DeleteForever from "./images/delete_forever.png";
import Close from "./images/close.png";
import Content from "./images/content.png";
import Body from "./images/body.png";
import Remove from "./images/remove.png";
import ButtonImage from "./images/button.png";
import Divider from "./images/divider.png";
import HeadingImage from "./images/Heading.png";
import HtmlImage from "./images/html.png";
import ImagePlaceHolder from "./images/image_placeholder.jpg";
import CenterAlign from "./images/format_align_center.png";
import LeftAlign from "./images/format_align_left.png";
import MenuItem from "./images/menu_item.png";
import { renderToString } from 'react-dom/server'
import { EditorState } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

import { PopoverPicker } from './ColorPicker';
import TextEditor from './TextEditor';
import TextEditorAppToolbar from './TextEditorAppToolbar';
import ButtonToolbar from './ButtonToolbar';
import PaddingResizer from './PaddingResizer';
import * as _ from "lodash";
import BorderResizer from './BorderResizer';
import { rowStyle, columnStyle , ButtonStyle, HeaderStyle, DividerStyle, MenuItemStyle, MenuBarStyle, ImageStyle} from './StyleConsts';
import ButtonComponent from './ButtonComponent';
import HeadersToolBar from './HeadersToolBar';
import DividerToolBar from './DividerToolBar';
import MenuToolBar from './MenuToolBar';
import ImageToolBar from './ImageToolBar';
import HtmlToolBar from './HtmlToolBar';
import HeaderComponent from './HeaderComponent';
import DividerComponent from './DividerComponent';
import MenuComponent from './MenuComponent';
import ImageComponent from './ImageComponent';

function EmailDesigner({}) {

  const [menuItemActive, setMenuItemActive] = useState("body");

  const [elementDragged, setElementDragged] = useState("");

  const [columnsettingsactive, setColumnsettingsactive] = useState(0);

  const [columnBackground, setColumnBackground] = useState("color");

  const [rowBackground, setRowBackground] = useState("color");

  const [desginElement, setDesignElement] = useState("contents");

  const [componentActive, setComponentActive] = useState("");

  const [componentDraggedOver, setComponentDraggedOver] = useState([]);

  const [activeComponentCoordinates, setActiveComponentCoordinates] = useState([]);
  

  const setComponentStyle = ()=>{

  }

  
  const [activeComponentSettings, setActiveComponentSettings] = useState({
    rowIndex: null,
    columnIndex: null,
    componentIndex: null
  })

  const [bodyStyles, setBodyStyles] = useState({
    "width": "1114px",
    "margin": "auto",
    "background": "black",
    "fontSize": "20px",
    "color": "red"
  })

  const transformBodyStyles = (e, component)=>{
    let bodyStylesCopy = {...bodyStyles};
    if(component=="font-size"||component=="width"){
      bodyStylesCopy[component] = e+"px";
    }else{
      bodyStylesCopy[component] = e;
    }
    setBodyStyles(bodyStylesCopy);
  }

  const getFontSize = (val)=>{
      let fval = val.replace("px","");
      return fval;
  }

  const [elementOver, setElementOver] = useState({
    index: null,
    column: null
  });

  const handleDragOver = (event)=>{
    event.preventDefault();
  }


  const handleDrop = (index, column)=>{
    let elementOver = {
      index: index,
      column: column
    }

    setElementOver(elementOver);

  }

  const onElementDragStart = (elementName)=>{
    setElementDragged(elementName);
  }

  

  const onElementDragStop = ()=>{
    let rowsCopy = [...rows];
    
    for(let i=0; i < componentDraggedOver.length; i++){
      rowsCopy = [];  
    }
    if(elementOver.index==null&&elementOver.column==null){
      
      return
    }

    if(elementDragged=="textbox"){
      let rowsCopy = [...rows];
      let componentlength = rowsCopy[elementOver.index].columns[elementOver.column].components.length;
      // handleTextBoxStyleInit();

      rowsCopy[elementOver.index].columns[elementOver.column].components.push(
        {
          "type": "textbox",
          "settings":{
            editorState: EditorState.createEmpty(),
            html: ""
          },
          "active": true,
          "style":{
            width: "100%"
          },
          "hoveractive": false
        }
      )
      makeComponentDeactive()
      setActiveComponentSettings({
        rowIndex: elementOver.index,
        columnIndex: elementOver.column,
        componentIndex: componentlength
      })
      setComponentActive("textbox");
      setRows(rowsCopy);
    }

    if(elementDragged=="button"){
      let rowsCopy = [...rows];
      let componentlength = rowsCopy[elementOver.index].columns[elementOver.column].components.length;
      rowsCopy[elementOver.index].columns[elementOver.column].components.push(
        {
          "type": "button",
          "active": true,
          "style":{
            ...ButtonStyle,
            width: "100%"
          },
          "settings":{
            "actionSelected": "open_website",
            "actionUrl": "",
            "actionUrlTarget": "new_tab",
            "phoneNumber": "",
            "mailTo": "",
            "subject": "",
            "body": ""
          }
        }
      )
      makeComponentDeactive();
      setActiveComponentSettings({
        rowIndex: elementOver.index,
        columnIndex: elementOver.column,
        componentIndex: componentlength
      });
      setComponentActive("button");
      setRows(rowsCopy);
    }

    if(elementDragged=="header"){
      let rowsCopy = [...rows];
      let componentlength = rowsCopy[elementOver.index].columns[elementOver.column].components.length;
      rowsCopy[elementOver.index].columns[elementOver.column].components.push(
        {
          "type": "header",
          "active": true,
          "style":{
            ...HeaderStyle
          },
          "settings":{
            "type": "h1"
          }
        }
      )
      makeComponentDeactive();
      setActiveComponentSettings({
        rowIndex: elementOver.index,
        columnIndex: elementOver.column,
        componentIndex: componentlength
      })
      setRows(rowsCopy);
      setComponentActive("header");
    }

    if(elementDragged=="divider"){
      let rowsCopy = [...rows];
      let componentlength = rowsCopy[elementOver.index].columns[elementOver.column].components.length;
      rowsCopy[elementOver.index].columns[elementOver.column].components.push(
        {
          "type": "divider",
          "active": true,
          "style":{
            ...DividerStyle
          },
          "settings":{

          }
        }
      )
      makeComponentDeactive();
      setActiveComponentSettings({
        rowIndex: elementOver.index,
        columnIndex: elementOver.column,
        componentIndex: componentlength
      })
      setRows(rowsCopy);
      setComponentActive("divider")
    }

    if(elementDragged=="menu"){
      let rowsCopy = [...rows];
      let componentlength = rowsCopy[elementOver.index].columns[elementOver.column].components.length;
      rowsCopy[elementOver.index].columns[elementOver.column].components.push(
        {
          "type": "menu",
          "active": true,
          "style":{
            ...MenuItemStyle
          },
          "menuBarStyle":{
            ...MenuBarStyle
          },
          "settings":{
            "menuItems":[]
          }
        }
      )

      makeComponentDeactive();
      setActiveComponentSettings({
        rowIndex: elementOver.index,
        columnIndex: elementOver.column,
        componentIndex: componentlength
      });
      setRows(rowsCopy);
      setComponentActive("menu");
    }

    if(elementDragged=="image"){
      let rowsCopy = [...rows];
      let componentlength = rowsCopy[elementOver.index].columns[elementOver.column].components.length;
      rowsCopy[elementOver.index].columns[elementOver.column].components.push(
        {
          "type": "image",
          "active": true,
          "style":{
            ...ImageStyle
          },
          "settings":{
            "url": "",
            "alttext": ""
          }
        }
      )
      makeComponentDeactive();
      setActiveComponentSettings({
        rowIndex: elementOver.index,
        columnIndex: elementOver.column,
        componentIndex: componentlength
      })
      setRows(rowsCopy);
      setComponentActive("image");
    }
    
    if(elementDragged=="html"){
      let rowsCopy = [...rows];
      let componentlength = rowsCopy[elementOver.index].columns[elementOver.column].components.length;
      rowsCopy[elementOver.index].columns[elementOver.column].components.push({
        "type": "html",
        "active": true,
        "settings":{
          "html": ""
        }
      })
      makeComponentDeactive()
      setActiveComponentSettings({
        rowIndex: elementOver.index,
        columnIndex: elementOver.column,
        componentIndex: componentlength
      })
      setRows(rowsCopy);
      setComponentActive("html");
    }

    if(elementDragged=="column"){
      let rowsCopy = [...rows];
      let componentlength = rowsCopy[elementOver.index].columns[elementOver.column].components.length;
      rowsCopy[elementOver.index].columns[elementOver.column].components.push({
        "type": "columns",
        "active": true,
        "settings":{
          "rows":[]      
        }
      })
    }


  }


  // each column can also have multiple components
  
  const [rows, setRows] = useState([
    {
      "columns":[
        {
          "style":{
                   ...columnStyle,
                   "width": "50%"
                  },
          "components":[

          ],
          "active":false
        },
        {
          "style":{
            ...columnStyle,
            "width": "50%",
          },
          "components":[

          ],
          "active":false
        }
      ],
      "active": false,
      "showButtons": false,
      "editable": false,
      "style":{
        ...rowStyle,
        "display": "flex",
      }
    }
  ])

  // const setActiveRowStyle = (style)=>{
  //   let rowsCopy = [...rows];
  //   rowsCopy[rowActiveIndex].style = style;
  //   setRows(rowsCopy);
  // }


  // const setActiveColumnStyle = (style)=>{
  //   let rowsCopy = [...rows];
  //   rowsCopy[rowActiveIndex].columns[columnsettingsactive].style = style;
  //   setRows(rowsCopy)
  // }

  // const getColumnBackgroundColor = (rowindex,columnindex)=>{
  //     let rowsCopy = [...rows];
  //     let column = {...rowsCopy[rowindex].columns[columnindex]};
  //     if(column.style.background==undefined){
  //       return {
  //         "color":"#ffffff",
  //         "active": false
  //       }
  //     }else{
  //       return {
  //         "color": column.style.background,
  //         "active": true
  //       }
  //     }

  // }


  const toggleDesignElement = (element)=>{
    setDesignElement(element)
  }


  const handleSave = ()=>{
    let node = document.getElementById("test").innerHTML;
    console.log(node);
  }

  const addRow = (index)=>{
    let rowsCopy = [...rows];
    for (let i = rowsCopy.length; i > index; i--) {
      rowsCopy[i] = rowsCopy[i - 1];
    }
    rowsCopy[index] = {
      "type": "1",
      "columns":[
        {
          "style":{...columnStyle,
            "width": "100%"
          },
          "components":[

          ],
          "active":false
        }
      ],
      "active": false,
      "showButtons": false,
      "editable": false,
      "style":{...rowStyle,
              "display": "flex",
              "width": "100%"
      }
    }

    setRows(rowsCopy);

  }

  // const closeRowActive = ()=>{
  //   let rowsCopy = [...rows];
  //   let activeRowIndex = _.findIndex(rowsCopy, (row)=>{return row.editable});
  //   if(activeRowIndex>-1){
  //     rowsCopy[activeRowIndex].editable = false;
  //     rowsCopy[activeRowIndex].showButtons = false;
  //     rowsCopy[activeRowIndex].active = false;
  //   }
    
  //   setRowActive(false);
  //   setRowActiveIndex(null);
  //   setRows(rowsCopy);
  // }

  // const toggleColumns = (columns)=>{
  //   let rowsCopy = [...rows];
  //   let activeRow = rowsCopy[rowActiveIndex];
  //   activeRow.columns = []
  //   let numcolumns = parseInt(columns);
  //   let width = 100/numcolumns;
  //   activeRow.type = columns;
  //   for(let i=0; i < numcolumns; i++){
  //     activeRow.columns.push(
  //       {
  //         "active": false,
  //         "style":{
  //           ...columnStyle,
  //           ...bodyStyles,
  //           width: width+"%"
  //         },
  //         "components":[]
  //       }
  //     )
  //   }
  //   rowsCopy[rowActiveIndex] = activeRow;
  //   setRows(rowsCopy);
  // }
  
  // const changeColumnBackground= (rowindex, columnindex)=>{
  //     const changeColor = (color,c)=>{
  //       let rowsCopy = [...rows];
  //       rowsCopy[rowindex].columns[columnindex].style = {...rowsCopy[rowindex].columns[columnindex].style,
  //                                                        background: color
  //                                                       };
  //       setRows(rowsCopy);
  //     }
  //     return changeColor;
  // }

  const makeComponentDeactive = ()=>{

  }

  const makeComponentActive = ()=>{

  }

  const deleteComponent = ()=>{

  }
  
  // const makeComponentDeactive = ()=>{
  //   let rowsCopy = [...rows];
  //   console.log("deactive called");
  //   console.log(activeComponentSettings);
  //   if(activeComponentSettings.rowIndex!=null&&activeComponentSettings.columnIndex!=null&&activeComponentSettings.componentIndex!=null){
  //     let componentCopy = {...rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex]};
  //     // deactivate textbox
  //     if(rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].type=="textbox"){
  //       componentCopy.active = false;
  //       setComponentActive("");
  //     }
  //     // deactivate button
  //     if(rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].type=="button"){
  //       componentCopy.active=false;
  //       setComponentActive("");
  //     }

  //     //deactivate header
  //     if(rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].type=="header"){
  //       componentCopy.active = false;
  //       setComponentActive("");
  //     }

  //     if(rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].type=="divider"){
  //       componentCopy.active = false;
  //       setComponentActive("");
  //     }

  //     if(rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].type=="menu"){
  //       componentCopy.active = false;
  //       setComponentActive("");
  //     }

  //     if(rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].type=="image"){
  //       componentCopy.active = false;
  //       setComponentActive("");
  //     }

  //     if(rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].type=="html"){
  //       componentCopy.active = false;
  //       setComponentActive("");
  //     }

  //     rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex] = componentCopy;
  //     let activeComponentSettingsCopy = {...activeComponentSettings,
  //                                        rowIndex: null,
  //                                        columnIndex: null,
  //                                        componentIndex: null
  //                                       }
  //     setActiveComponentSettings(activeComponentSettingsCopy);
  //     setRows(rowsCopy);
  //   }
  // }

  // const deleteComponent = ()=>{
  //   let rowsCopy = [...rows];
  //   if(activeComponentSettings.rowIndex!=null&&activeComponentSettings.columnIndex!=null&&activeComponentSettings.componentIndex!=null){
  //     rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components.splice(activeComponentSettings.componentIndex,1); 
  //     setRows(rowsCopy);
  //   }
  //   setComponentActive("");
  //   let activeComponentSettingsCopy = {...activeComponentSettings,
  //     rowIndex: null,
  //     columnIndex: null,
  //     componentIndex: null
  //    }
  //   setActiveComponentSettings(activeComponentSettingsCopy);

  // }
  
  // const setMenuBarStyle = (style)=>{
  //   let rowsCopy = [...rows];
  //   rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].menuBarStyle = style;
  //   setRows(rowsCopy);
  // }

  // const setActiveComponentStyle = (style)=>{
  //   let rowsCopy = [...rows];
  //   rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].style = style;
  //   setRows(rowsCopy);
  // }

  // const setActiveComponentComponentSettings = (settings)=>{
  //   let rowsCopy = [...rows];
  //   rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].settings = settings;
  //   setRows(rowsCopy);
  // }

  // const setRowActive = ()=>{

  // }

  return (
    <div className='App'>
      <div id="test" className="design-container">
        
          {rows.map((row, index)=>{
            return(
              <div id="main-body" style={bodyStyles}>      

              </div>  
          )
          
        })}  
      
      </div>
      <div className="design-elements">
        {menuItemActive=="content"&&
          <>
            {(componentActive=="")&&
              <>
                <div className='design-element-menu'>
                  <div className='design-element-menu-item' onClick={()=>{toggleDesignElement("contents")}}>
                    Content
                  </div>
                  <div className='design-element-menu-item' onClick={()=>{toggleDesignElement("blocks")}}>
                    Blocks
                  </div>
                </div>
                {desginElement=="contents"&&
                  <>
                  <div className='design-element-row'>
                    <div className='design-element' draggable 
                                                    onDragStart={()=>{onElementDragStart("textbox")}}
                                                    onDragEnd = {()=>{onElementDragStop()}}
                                                    >
                      <img className='design-element-img' src={Text}></img>
                    </div>
                    <div className='design-element' draggable
                                                    onDragStart={()=>{onElementDragStart("header")}}
                                                    onDragEnd = {()=>{onElementDragStop()}}

                    >
                      <img className='design-element-img' src={HeadingImage}></img>
                    </div>
                  </div>
                  <div className='design-element-row'>
                    <div className='design-element' draggable
                                                    onDragStart={()=>{onElementDragStart("button")}}
                                                    onDragEnd = {()=>{onElementDragStop()}}

                    >
                      <img className='design-element-img' src={ButtonImage}></img>
                    </div>
                    <div className='design-element' draggable
                                                    onDragStart={()=>{onElementDragStart("divider")}}
                                                    onDragEnd = {()=>{onElementDragStop()}}

                    >
                      <img className='design-element-img' src={Divider}></img>
                    </div>
                  </div>
                  <div className='design-element-row'>
                    <div className='design-element' draggable
                                                    onDragStart={()=>{onElementDragStart("image")}}
                                                    onDragEnd = {()=>{onElementDragStop()}}

                    >
                      <img className='design-element-img' src={ImagePlaceHolder}></img>
                    </div>
                    <div className='design-element' draggable
                                                    onDragStart={()=>{onElementDragStart("html")}}
                                                    onDragEnd = {()=>{onElementDragStop()}}

                    >
                      <img className='design-element-img' src={HtmlImage}></img>
                    </div>
                  </div>
                  <div className="design-element-row">
                    <div className="design-element" draggable
                                                    onDragStart={()=>{onElementDragStart("menu")}}
                                                    onDragEnd= {()=>{onElementDragStop()}}
                                                    >
                      <img className="design-element-img" src={MenuItem}></img>
                    </div>
                  </div>

                  </>
                }
                {
                  desginElement=="blocks"&&
                  <>
                    <div className='single-row'>
                      <div className="block-show">
                      </div>
                    </div>
                    <div className='double-row'>
                      <div className="block-show">
                      </div>
                      <div className="block-show">
                      </div>
                    </div>
                    <div className='triple-row'>
                      <div className="block-show">
                      </div>
                      <div className="block-show">
                      </div>
                      <div className="block-show">
                      </div>
                    </div>
                  </>
                }
              </>
            }
            {(componentActive=="row")&&
              <div className='blocks-content'>
                <div className='blocks-content-header'>
                  <div className='title'>
                    Row
                  </div>
                  <div className='close' onClick={()=>{closeRowActive()}}>
                    <img src={Close} style={{width: 30, height: 30}}></img>
                  </div>
                </div>
                <div className='columns'>
                  <div className='block-properties-title'>
                    <p style={{margin: 10}}>
                      Columns
                    </p>
                  </div>
                  <div className='single-row' onClick={()=>{toggleColumns("1")}}>
                    {(rowActiveIndex!=null&&rows[rowActiveIndex].type=="1")?
                      <div className="block-show-active">
                      </div>:
                      <div className="block-show">
                      </div>
                    }
                    
                  </div>
                  <div className='double-row' onClick={()=>{toggleColumns("2")}}>
                    {(rowActiveIndex!=null&&rows[rowActiveIndex].type=="2")?
                        <>
                          <div className="block-show-active">
                          </div>
                          <div className="block-show-active">
                          </div>
                        </>
                        :
                        <>
                          <div className="block-show">
                          </div>
                          <div className="block-show">
                          </div>
                        </>
                        
                    }
                  </div>
                  <div className='triple-row' onClick={()=>{toggleColumns("3")}}>
                  {(rowActiveIndex!=null&&rows[rowActiveIndex].type=="3")?
                        <>
                          <div className="block-show-active">
                          </div>
                          <div className="block-show-active">
                          </div>
                          <div className="block-show-active">
                          </div>
                        </>
                        :
                        <>
                          <div className="block-show">
                          </div>
                          <div className="block-show">
                          </div>
                          <div className="block-show">
                          </div>
                        </>
                        
                    }
                  </div>
                </div>
                <div className='column-properties'>
                  <div className='block-properties-title'>
                    <p style={{margin: 10}}>
                      Column Properties
                    </p>
                  </div>
                  <div className="column-headers">
                    {rows[rowActiveIndex].columns.map((c,index)=>{
                      return (
                        <div className={(columnsettingsactive==index)?"column-settings-heading active":"column-settings-heading"} onClick={()=>{setColumnsettingsactive(index)}}>
                          {"Column "+(index+1)}
                        </div>
                      )
                    })}
                  </div>
                  <div className="column-settings">
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
                                color={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).color} 
                                active={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).active}
                                onChange={changeColumnBackground(rowActiveIndex,columnsettingsactive)}
                                ></PopoverPicker>
                            </div>
                          }
                          {columnBackground=="image"&&
                            <div className='column-background-image'>
                              <div>
                                Background
                              </div>
                              <div>
                                <input className="column-background-image-input" placeholder='Enter image url'></input>
                              </div>
                            </div>
                          }
                        </div>
                        <div className="column-padding-settings">
                          <PaddingResizer
                            style={rows[rowActiveIndex].columns[columnsettingsactive].style}
                            setStyle={setActiveColumnStyle}
                          >
                          </PaddingResizer>
                        </div>
                        <div className="column-border-settings">
                          <BorderResizer
                            style={rows[rowActiveIndex].columns[columnsettingsactive].style}
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
                                color={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).color} 
                                active={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).active}
                                onChange={changeColumnBackground(rowActiveIndex,columnsettingsactive)}
                                ></PopoverPicker>
                            </div>
                          }
                          {rowBackground=="image"&&
                            <div className='column-background-image'>
                              <div>
                                Background
                              </div>
                              <div>
                                <input className="column-background-image-input" placeholder='Enter image url'></input>
                              </div>
                            </div>
                          }
                    </div>
                    <div className="row-padding-settings">

                        <PaddingResizer
                          style={rows[rowActiveIndex].style}
                          setStyle={setActiveRowStyle}
                        >
                        </PaddingResizer>
                          
                    </div>
                    <div className="row-border-settings">
                      <BorderResizer
                        style={rows[rowActiveIndex].style}
                        setStyle={setActiveRowStyle}
                      >

                      </BorderResizer>
                    </div>
                  </div>
                </div>          
              </div>
            }
            {(componentActive=="textbox")&&
              <TextEditorAppToolbar closeComponent={makeComponentDeactive} deleteComponent={deleteComponent}></TextEditorAppToolbar>
            }
            {(componentActive=="button")&&
              <ButtonToolbar 
                  closeComponent={makeComponentDeactive} 
                  deleteComponent={deleteComponent}
                  style={rows[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].style}
                  setStyle={setActiveComponentStyle}
                  settings={rows[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].settings}
                  setSettings={setActiveComponentComponentSettings}>

              </ButtonToolbar>
            }
            {(componentActive=="header")&&
              <HeadersToolBar
                closeComponent={makeComponentDeactive}
                deleteComponent={deleteComponent}
                style={rows[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].style} 
                setStyle={setActiveComponentStyle} 
                settings={rows[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].settings} 
                setSettings={setActiveComponentComponentSettings}
              >
              </HeadersToolBar>
            }
            {(componentActive=="divider")&&
              <DividerToolBar
                closeComponent={makeComponentDeactive}
                deleteComponent={deleteComponent}
                style={rows[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].style} 
                setStyle={setActiveComponentStyle}
              >
              </DividerToolBar>
            }
            {(componentActive=="menu")&&
              <MenuToolBar
                closeComponent={makeComponentDeactive}
                deleteComponent={deleteComponent}
                style = {rows[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].style}
                setStyle = {setActiveComponentStyle}
                menuBarStyle = {rows[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].menuBarStyle}
                setMenuBarStyle = {setMenuBarStyle}
                settings={rows[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].settings} 
                setSettings={setActiveComponentComponentSettings}
              ></MenuToolBar>
            }
            {(componentActive=="image")&&
              <ImageToolBar
                closeComponent={makeComponentDeactive}
                deleteComponent={deleteComponent}
                style={rows[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].style}
                setStyle = {setActiveComponentStyle}
                settings={rows[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].settings} 
                setSettings={setActiveComponentComponentSettings}
              >

              </ImageToolBar>
            }
            {(componentActive=="html")&&
              <HtmlToolBar
                closeComponent={makeComponentDeactive}
                deleteComponent={deleteComponent}
                settings={rows[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].settings} 
                setSettings={setActiveComponentComponentSettings}
              >
              </HtmlToolBar>
            }
          </>

        }
        {menuItemActive=="body"&&
          <div className='body-styles'>
            <div className='background-color-settings'>
              <div>
                Width
              </div>
              <div className='font-sizer'>
                <div 
                  style={{

                      "width": "24px",
                      "height": "24px",
                      "background": "rgb(238, 238, 238)",
                      "display": "flex",
                      "align-items": "center",
                      "justify-content": "center"
                  }}
                  onClick={()=>{
                    let v = parseInt(getFontSize(bodyStyles['width']));
                    v = v-1;
                    transformBodyStyles(v, "width");

                  }}
                >
                  <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                </div>
                <input style={{ height: "24px",border: "2px", "text-align": "center"}} min="0" max="1024" type="number" value={getFontSize(bodyStyles['width'])} onChange={(e)=>{transformBodyStyles(e.target.value,"width")}}></input>
                <div 
                  style={{
                    "width": "24px",
                    "height": "24px",
                    "background": "rgb(238, 238, 238)",
                    "display": "flex",
                    "align-items": "center",
                    "justify-content": "center"
                  }}
                  onClick={()=>{
                    let v = parseInt(getFontSize(bodyStyles['width']));
                    v = v+1;
                    transformBodyStyles(v, "width");

                  }}

                  >
                  <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                </div>
              </div>
            </div>
            <div className='background-color-settings'>
              <div>
                Background Color
              </div>
              <div>
                <PopoverPicker color={bodyStyles.background} onChange={transformBodyStyles} component="background"></PopoverPicker>
              </div>
            </div>
            <div className='background-color-settings'>
              <div>
                Text Color
              </div>
              <div>
                <PopoverPicker color={bodyStyles.color} onChange={transformBodyStyles} component="color"></PopoverPicker>
              </div>
            </div>
            <div className='background-color-settings'>
              <div>
                Font size
              </div>
              <div className='font-sizer'>
                <div 
                  style={{

                      "width": "24px",
                      "height": "24px",
                      "background": "rgb(238, 238, 238)",
                      "display": "flex",
                      "align-items": "center",
                      "justify-content": "center"
                  }}
                  onClick={()=>{
                    let v = parseInt(getFontSize(bodyStyles['fontSize']));
                    v = v-1;
                    transformBodyStyles(v, "fontSize");

                  }}
                >
                  <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                </div>
                <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getFontSize(bodyStyles['fontSize'])} onChange={(e)=>{transformBodyStyles(e.target.value,"fontSize")}}></input>
                <div 
                  style={{
                    "width": "24px",
                    "height": "24px",
                    "background": "rgb(238, 238, 238)",
                    "display": "flex",
                    "align-items": "center",
                    "justify-content": "center"
                  }}
                  onClick={()=>{
                    let v = parseInt(getFontSize(bodyStyles['fontSize']));
                    v = v+1;
                    transformBodyStyles(v, "fontSize");

                  }}

                  >
                  <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                </div>
              </div>
            </div>
            <div className='background-color-settings'>
              <div>
                Alignment
              </div>
              <div className='alignment-icons'>
                <div className={bodyStyles.margin=="auto"?"alignment-active":"aligment-icon"}>
                  <img src={CenterAlign} style={{width: "30px", height: "30px"}}></img>
                </div>
                <div className={bodyStyles.margin==null?"alignment-active":"aligment-icon"}>
                  <img src={LeftAlign} style={{width: "30px", height: "30px"}}></img>
                </div>
              </div>
            </div>
          </div>
        }
        
      </div>
      <div className='menu-items'>
        <div className={menuItemActive=="content"?"menu-item active":"menu-item"} onClick={()=>{setMenuItemActive("content")}}>
          <img src={Content}></img>
          <h5>Content</h5>
        </div>
        <div className={menuItemActive=="body"?"menu-item active":"menu-item"} onClick={()=>{setMenuItemActive("body")}}>
          <img src={Body}></img>
          <h5>Body</h5>
        </div>

      </div>
    </div>
    
  );

}

export default EmailDesigner;
