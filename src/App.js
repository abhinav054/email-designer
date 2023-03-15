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
import { rowStyle, columnStyle , ButtonStyle, HeaderStyle, DividerStyle} from './StyleConsts';
import ButtonComponent from './ButtonComponent';
import HeadersToolBar from './HeadersToolBar';
import DividerToolBar from './DividerToolBar';
import MenuToolBar from './MenuToolBar';
import ImageToolBar from './ImageToolBar';
import HtmlToolBar from './HtmlToolBar';
import HeaderComponent from './HeaderComponent';
import DividerComponent from './DividerComponent';

function App() {



  const [customStyleState, setCustomStyleState] = useState({
    STRIKETHROUGH: {
      textDecoration: "line-through"
    },
    FONT_FAMILY_ARIAL:{
      fontFamily: "Arial, sans-serif"
    },
    FONT_FAMILY_VERDANA:{
      fontFamily: "Verdana, sans-serif"
    },
    FONT_FAMILY_TAHOMA:{
      fontFamily: "Tahoma, sans-serif"
    },
    FONT_FAMILY_TREBUCHET_MS:{
      fontFamily: "Trebuchet MS', sans-serif"
    },
    FONT_FAMILY_TIMES_NEW_ROMAN:{
      fontFamily:"Times New Roman', serif"
    },
    FONT_FAMILY_GEORGIA:{
      fontFamily: "Georgia, serif"
    },
    FONT_FAMILY_GARAMOND:{
      fontFamily: "Garamond, serif"
    },
    FONT_FAMILY_COURIER_NEW:{
      fontFamily: "Courier New', monospace"
    },
    FONT_FAMILY_BRUSH_SCRIPT_MT:{
      fontFamily: "Brush Script MT, cursive"
    },
    FONT_SIZE_8:{
      fontSize: "8px"
    },
    FONT_SIZE_9:{
      fontSize: "9px"
    },
    FONT_SIZE_10:{
      fontSize: "10px"
    },
    FONT_SIZE_11:{
      fontSize: "11px"
    },
    FONT_SIZE_12:{
      fontSize: "12px"
    },
    FONT_SIZE_14:{
      fontSize: "14px"
    },
    FONT_SIZE_16:{
      fontSize: "16px"
    },
    FONT_SIZE_18:{
      fontSize: "18px"
    },
    FONT_SIZE_20:{
      fontSize: "20px"
    },
    FONT_SIZE_22:{
      fontSize: "22px"
    },
    FONT_SIZE_24:{
      fontSize: "24px"
    },
    FONT_SIZE_26:{
      fontSize: "26px"
    },
    FONT_SIZE_28:{
      fontSize: "28px"
    },
    FONT_SIZE_36: {
      fontSize: "36px"
    },
    FONT_SIZE_48:{
      fontSize: "48px"
    },
    FONT_SIZE_72:{
      fontSize: "72px"
    },

    COLOR_ffffff:{
      color: "#ffffff"
    },
    COLOR_red: {
      color: "rgba(255, 0, 0, 1.0)"
    },
    INIT_STYLE:{
      color: "#000000",
      fontSize: "14px",
      fontFamily: "Arial, sans-serif"
    }
  })

  const [menuItemActive, setMenuItemActive] = useState("body");



  const [elementDragged, setElementDragged] = useState("");


  const [columnsettingsactive, setColumnsettingsactive] = useState(0);

  const [detailColumnPadding, setDetailColumnPadding] = useState(false);

  const [columnBackground, setColumnBackground] = useState("color");

  const [rowBackground, setRowBackground] = useState("color");

  const [detailRowPadding, setDetailRowPadding] = useState(false);


  const [desginElement, setDesignElement] = useState("contents");

  const [componentActive, setComponentActive] = useState("");

  const [componentHover, setComponentHover] = useState(false);

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

  const handleTextBoxStyleInit = ()=>{
      let bodyFont = bodyStyles.fontSize;
      let font_size_key = "FONT_SIZE_"+bodyFont.replace("px","");
      let font_size_index = _.findIndex(Object.keys(customStyleState),(k)=>{return k==font_size_key});
      let customStyleStateCopy = {...customStyleState};
      if(font_size_index==-1){
        customStyleStateCopy[font_size_key] = {
          fontSize: bodyFont
        }

      }

      let bodyTextColor = bodyStyles.color;
      let text_color_key = "COLOR_"+bodyTextColor.replace("#","");
      let text_color_index = _.findIndex(Object.keys(customStyleState),(k)=>{return k==text_color_key});
      if(text_color_index==-1){
        customStyleStateCopy[text_color_key]={
          color: bodyTextColor
        }
      }
      setCustomStyleState(customStyleStateCopy);
  }

  const onElementDragStop = ()=>{
    console.log(elementDragged);
    if(elementDragged=="textbox"){
      let rowsCopy = [...rows];
      let componentlength = rowsCopy[elementOver.index].columns[elementOver.column].components.length;
      handleTextBoxStyleInit();
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


  }

  const handleTextEditorState = (rowindex, columnindex, componentindex)=>{
      const setEditorState = (editorState)=>{
        let rowsCopy = [...rows];
        rowsCopy[rowindex].columns[columnindex].components[componentindex].settings = {
          ...rowsCopy[rowindex].columns[columnindex].components[componentindex].settings,
          editorState: editorState
        };
        setRows(rowsCopy);
      }
      return setEditorState;      
  }

  const [rowActive, setRowActive] = useState(false);

  const [rowActiveIndex, setRowActiveIndex] = useState(null);

  // each column can also have multiple components
  
  const [rows, setRows] = useState([
    {
      "type": "2",
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

  const setActiveRowStyle = (style)=>{
    let rowsCopy = [...rows];
    rowsCopy[rowActiveIndex].style = style;
    setRows(rowsCopy);
  }


  const setActiveColumnStyle = (style)=>{
    let rowsCopy = [...rows];
    rowsCopy[rowActiveIndex].columns[columnsettingsactive].style = style;
    setRows(rowsCopy)
  }

  const getColumnBackgroundColor = (rowindex,columnindex)=>{
      let rowsCopy = [...rows];
      let column = {...rowsCopy[rowindex].columns[columnindex]};
      if(column.style.background==undefined){
        return {
          "color":"#ffffff",
          "active": false
        }
      }else{
        return {
          "color": column.style.background,
          "active": true
        }
      }

  }


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

  const closeRowActive = ()=>{
    let rowsCopy = [...rows];
    let activeRowIndex = _.findIndex(rowsCopy, (row)=>{return row.editable});
    if(activeRowIndex>-1){
      rowsCopy[activeRowIndex].editable = false;
      rowsCopy[activeRowIndex].showButtons = false;
      rowsCopy[activeRowIndex].active = false;
    }
    
    setRowActive(false);
    setRowActiveIndex(null);
    setRows(rowsCopy);
  }

  const toggleColumns = (columns)=>{
    let rowsCopy = [...rows];
    let activeRow = rowsCopy[rowActiveIndex];
    activeRow.columns = []
    let numcolumns = parseInt(columns);
    let width = 100/numcolumns;
    activeRow.type = columns;
    for(let i=0; i < numcolumns; i++){
      activeRow.columns.push(
        {
          "active": false,
          "style":{
            ...columnStyle,
            ...bodyStyles,
            width: width+"%"
          },
          "components":[]
        }
      )
    }
    rowsCopy[rowActiveIndex] = activeRow;
    setRows(rowsCopy);
  }


  const deleteRow = (index)=>{
    let rowsCopy = [...rows];
    rowsCopy.splice(index,1);
    setRows(rowsCopy);
  }


  const makeComponentActive = (rowindex, columnindex, componentindex)=>{
    let rowsCopy = [...rows];
    let componentCopy = {...rowsCopy[rowindex].columns[columnindex].components[componentindex]};
    if(rowsCopy[rowindex].columns[columnindex].components[componentindex].type=="textbox"){
      // let newEditorState = EditorState.createWithContent(convertFromHTML(componentCopy.html));
      // componentCopy.editorState = newEditorState;
      componentCopy.active = true;
      setComponentActive("textbox");
    }
    if(rowsCopy[rowindex].columns[columnindex].components[componentindex].type=="button"){
      componentCopy.active = true;
      setComponentActive("button")
    }
    if(rowsCopy[rowindex].columns[columnindex].components[componentindex].type=="header"){
      componentCopy.active = true;
      setComponentActive("header");
    }

    if(rowsCopy[rowindex].columns[columnindex].components[componentindex].type=="divider"){
      componentCopy.active = true;
      setComponentActive("divider");
    }
    
    if(activeComponentSettings.rowIndex!=rowindex||activeComponentSettings.columnIndex!=columnindex||activeComponentSettings.columnIndex!=componentindex){
      rowsCopy = makeComponentDeactiveRows(rowsCopy);
    }
    
    
    rowsCopy[rowindex].columns[columnindex].components[componentindex] = componentCopy;


    let activecomponentsettings = {
      rowIndex: rowindex,
      columnIndex: columnindex,
      componentIndex: componentindex
    }
    setActiveComponentSettings(activecomponentsettings);

    setRows(rowsCopy);

  }


  const makeComponentDeactiveRows = (rowsCopy)=>{
    if(activeComponentSettings.rowIndex!=null&&activeComponentSettings.columnIndex!=null&activeComponentSettings.componentIndex!=null){
      let componentCopy = {...rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex]};
      rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex] = {...componentCopy,
                                                                                                                                                    active: false
                                                                                                                                                    }
    }
    return rowsCopy;
  }

  const transformTextBoxStyles = ()=>{
      let customStyleStateCopy = {...customStyleState};
      let newCustomStyle = {};
      _.forOwn(customStyleStateCopy, (value, key)=>{
        newCustomStyle[key] = {
          style:value
        }
      })
      return newCustomStyle;
  }

  


  const changeColumnBackground= (rowindex, columnindex)=>{
      const changeColor = (color,c)=>{
        let rowsCopy = [...rows];
        rowsCopy[rowindex].columns[columnindex].style = {...rowsCopy[rowindex].columns[columnindex].style,
                                                         background: color
                                                        };
        setRows(rowsCopy);
      }
      return changeColor;
  }





  const makeComponentDeactive = ()=>{
    let rowsCopy = [...rows];
    console.log("deactive called");
    console.log(activeComponentSettings);
    if(activeComponentSettings.rowIndex!=null&&activeComponentSettings.columnIndex!=null&&activeComponentSettings.componentIndex!=null){
      let componentCopy = {...rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex]};
      // deactivate textbox
      if(rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].type=="textbox"){
        const html = stateToHTML(componentCopy.settings.editorState.getCurrentContent(), {inlineStyles:transformTextBoxStyles()});
        console.log(html);
        componentCopy.active = false;
        componentCopy.settings.html = html;
        setComponentActive("");
      }
      // deactivate button
      if(rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].type=="button"){
        componentCopy.active=false;
        setComponentActive("");
      }

      //deactivate header
      if(rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].type=="header"){
        componentCopy.active = false;
        setComponentActive("");
      }

      if(rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.columnIndex].type=="divider"){
        componentCopy.active = false;
        setComponentActive("");
      }


      rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex] = componentCopy;
      let activeComponentSettingsCopy = {...activeComponentSettings,
                                         rowIndex: null,
                                         columnIndex: null,
                                         componentIndex: null
                                        }
      setActiveComponentSettings(activeComponentSettingsCopy);
      setRows(rowsCopy);

    }
  }


  const setEState = (rowindex, columnname, componentindex, e)=>{
    let rowsCopy = [...rows];
    let componentCopy = {...rowsCopy[rowindex].columns[columnname].components[componentindex]};
    componentCopy.editorState = e;
    rowsCopy[rowindex].columns[columnname].components[componentindex] = componentCopy;
    setRows(rowsCopy)

  }

  const makeColumnActive = (rowindex, columnindex)=>{
      let rowsCopy = [...rows];
      rowsCopy[rowindex].columns[columnindex].active = true;
      setRows(rowsCopy);
  }



  const deleteComponent = ()=>{
    let rowsCopy = [...rows];
    if(activeComponentSettings.rowIndex!=null&&activeComponentSettings.columnIndex!=null&&activeComponentSettings.componentIndex!=null){
      rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components.splice(activeComponentSettings.componentIndex,1); 
      setRows(rowsCopy);
    }
    setComponentActive("");
    let activeComponentSettingsCopy = {...activeComponentSettings,
      rowIndex: null,
      columnIndex: null,
      componentIndex: null
     }
    setActiveComponentSettings(activeComponentSettingsCopy);

  }

  

  // const getActiveComponentStyle = ()=>{
  //   let rowsCopy = [...rows];
  //   let style = {...rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex]};
  //   return style;
  // }

  const setActiveComponentStyle = (style)=>{
    let rowsCopy = [...rows];
    rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].style = style;
    setRows(rowsCopy);
  }

  const setActiveComponentComponentSettings = (settings)=>{
    let rowsCopy = [...rows];
    rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].settings = settings;
    setRows(rowsCopy);
  }


  return (
    <div className='App'>
      <div id="test" className="design-container">
        <div id="main-body" style={bodyStyles}>
          {rows.map((row, index)=>{
          return(
            <div className={row.active?"builder-row active":"builder-row"}  
            onMouseEnter={()=>{
              if(rowActiveIndex!=index&&componentHover==false){
                setRows((prev)=>{
                  let prevCopy = [...prev];
                  prevCopy[index].active = true;
                  prevCopy[index].showButtons = true;
                  return prevCopy;
              })
              }
              
            }}

            onMouseLeave={()=>{
              if(rowActiveIndex!=index){
                setRows((prev)=>{
                  let prevCopy = [...prev];
                  prevCopy[index].active = false;
                  prevCopy[index].showButtons = false;
                  return prevCopy;
                })
              }
              
            }}

            onClick={()=>{
              setRows((prev)=>{
                let prevCopy = [...prev];
                if(prevCopy[index]!==undefined){
                  let lasteditindex = _.findIndex(prevCopy, (row)=>{return row.editable});
                  if(lasteditindex>-1){
                    prevCopy[lasteditindex].editable = false;
                    prevCopy[lasteditindex].active = false;
                    prevCopy[lasteditindex].showButtons = false;
                  }

                  prevCopy[index].editable = true;
                  prevCopy[index].active = true;
                  prevCopy[index].showButtons = true;
                  
                }
                return prevCopy;
              })
              setRowActiveIndex(index);
              setRowActive(true);
            }}
          >

            {row.showButtons&&
              <>
                
                <div className="upper-add-button" onClick={()=>{addRow(index)}}>
                  <img src={AddIcon} style={{width: 20}}></img>
                </div>
                <div className="lower-add-button" onClick={()=>{addRow(index+1)}}>
                  <img src={AddIcon} style={{width: 20}}></img>
                </div>
                <div className='delete-button' onClick={()=>{deleteRow(index)}}>
                  <img src={DeleteForever} style={{
                        width: 30,
                        height: 30,
                        margin: 10
                  }}></img>
                </div>
              </>
            }
            <div style={row.style}>
              {row.columns.map((column,cindex)=>{
                return(
                  <div style={column.active?{width:column.style.width, border: "1px dashed blue"}:{width:column.style.width}}>
                    <div style={{...column.style,width:"100%"}} 
                        onDrop={()=>{handleDrop(index,cindex)}}
                        onDragOver={handleDragOver}
                    >
                    {column.components.length==0&&
                      <div className="column-content-placeholder">
                        Drag Element
                      </div>
                    }
                    {
                      column.components.length>0&&
                        <>
                          {column.components.map((c, componentindex)=>{
                            return(
                            <>
                              {c.type=="textbox"&&
                                <div style={c.style}
                                  className={(c.hoveractive&&c.active==false)&&"component-active"}
                                  onMouseEnter={()=>{
                                    setComponentHover(true);
                                    let rowsCopy = [...rows];
                                    rowsCopy[index].columns[cindex].components[componentindex] = {...rowsCopy[index].columns[cindex].components[componentindex],
                                                                                                hoveractive:true
                                                                                               }
                                    setRows(rowsCopy)
                                   }}
                                  onMouseLeave={()=>{
                                    setComponentHover(false);
                                    let rowsCopy = [...rows];
                                    rowsCopy[index].columns[cindex].components[componentindex] = {...rowsCopy[index].columns[cindex].components[componentindex],
                                                                                                hoveractive:false
                                                                                               }
                                    setRows(rowsCopy)
                                  }}

                                  onClick={()=>{
                                    makeComponentActive(index, cindex, componentindex)
                                  }}
                                >
                                  {c.type=="textbox"&&c.active==true&&
                                    <TextEditor 
                                      editorState={c.settings.editorState} 
                                      setEditorState={handleTextEditorState(index,cindex,componentindex)}
                                      customStyleState={customStyleState}
                                      setCustomStyleState={setCustomStyleState}
                                      textColor={bodyStyles.color}
                                      backColor={bodyStyles.background}
                                      fontsize={"FONT_SIZE_"+bodyStyles.fontSize.replace("px","")}
                                    ></TextEditor>
                                  }
                                  {c.type=="textbox"&&c.active==false&&
                                    <div dangerouslySetInnerHTML={{__html: c.settings.html}}>
                                    </div>
                                  }
                                </div>
                              }
                                
                              {c.type=="button"&&
                                <div
                                style={{
                                  "textAlign": c.style.textAlign,
                                  "width": c.style.width
                                }}
                                className={(c.hoveractive&&c.active==false)&&"component-active"}
                                onMouseEnter={()=>{
                                  setComponentHover(true);
                                  let rowsCopy = [...rows];
                                  rowsCopy[index].columns[cindex].components[componentindex] = {...rowsCopy[index].columns[cindex].components[componentindex],
                                                                                            hoveractive:true
                                                                                           }
                                  setRows(rowsCopy)
                                }}
                                onMouseLeave={()=>{
                                  setComponentHover(false);
                                  let rowsCopy = [...rows];
                                  rowsCopy[index].columns[cindex].components[componentindex] = {...rowsCopy[index].columns[cindex].components[componentindex],
                                                                                            hoveractive:false
                                                                                           }
                                  setRows(rowsCopy)
                                }}

                                onClick={()=>{
                                  makeComponentActive(index, cindex, componentindex)
                                }}
                              >
                                <ButtonComponent active={c.active} style={
                                  {
                                    "paddingLeft": c.style.paddingLeft,
                                    "paddingRight": c.style.paddingRight,
                                    "paddingTop": c.style.paddingTop,
                                    "paddingBottom": c.style.paddingBottom,
                                    "borderBottom": c.style.borderBottom,
                                    "borderTop": c.style.borderTop,
                                    "borderRight": c.style.borderRight,
                                    "borderLeft": c.style.borderLeft,
                                    "borderTopLeftRadius":c.style.borderTopLeftRadius,
                                    "borderTopRightRadius": c.style.borderTopRightRadius,
                                    "borderBottomLeftRadius": c.style.borderBottomLeftRadius,
                                    "borderBottomRightRadius": c.style.borderBottomRightRadius,
                                    "background": c.style.background,
                                    "color": c.style.color,
                                    "lineHeight": c.style.lineHeight,
                                    "fontSize": c.style.fontSize    
                                  }
                                }></ButtonComponent>
                                </div>
                              }

                              {c.type=="header"&&
                                <div
                                  className={(c.hoveractive&&c.active==false)&&"component-active"}
                                  onMouseEnter={()=>{
                                      setComponentHover(true);
                                      let rowsCopy = [...rows];
                                      rowsCopy[index].columns[cindex].components[componentindex] = {...rowsCopy[index].columns[cindex].components[componentindex],
                                                                                            hoveractive:true
                                                                                           }
                                      setRows(rowsCopy)
                                    }}
                                  onMouseLeave={()=>{
                                      setComponentHover(false);
                                      let rowsCopy = [...rows];
                                      rowsCopy[index].columns[cindex].components[componentindex] = {...rowsCopy[index].columns[cindex].components[componentindex],
                                                                                            hoveractive:false
                                                                                           }
                                      setRows(rowsCopy)
                                  }}

                                  onClick={()=>{
                                      makeComponentActive(index, cindex, componentindex)
                                  }}
                                >
                                  <HeaderComponent active={c.active} style={c.style} settings={c.settings}></HeaderComponent>
                                </div>
                              }
                              {c.type=="divider"&&
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: c.style.justifyContent
                                  }}
                                  className={(c.hoveractive&&c.active==false)&&"component-active"}
                                  onMouseEnter={()=>{
                                    setComponentHover(true);
                                    let rowsCopy = [...rows];
                                    rowsCopy[index].columns[cindex].components[componentindex] = {...rowsCopy[index].columns[cindex].components[componentindex],
                                                                                          hoveractive:true
                                                                                         }
                                    setRows(rowsCopy)
                                  }}
                                  onMouseLeave={()=>{
                                    setComponentHover(false);
                                    let rowsCopy = [...rows];
                                    rowsCopy[index].columns[cindex].components[componentindex] = {...rowsCopy[index].columns[cindex].components[componentindex],
                                                                                          hoveractive:false
                                                                                         }
                                    setRows(rowsCopy)
                                  }}

                                  onClick={()=>{
                                    makeComponentActive(index, cindex, componentindex)
                                  }}
                                >
                                  <DividerComponent style={{
                                    width: c.style.width,
                                    border: c.style.border
                                  }}></DividerComponent>
                                </div>

                              }
                            </>
                            )
                          })}
                        </>
                    }
                    </div>
                  </div>
                )
              })}
            </div>
            </div>
          )
          
        })}  
        </div>  
      </div>
      <div className="design-elements">
        {menuItemActive=="content"&&
          <>
            {(componentActive==""&&rowActive==false)&&
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
            {(componentActive==""&&rowActive==true)&&
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
                  setSettings={setActiveComponentComponentSettings}
                  ></ButtonToolbar>
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
              ></MenuToolBar>
            }
            {(componentActive=="image")&&
              <ImageToolBar
                closeComponent={makeComponentDeactive}
                deleteComponent={deleteComponent}
              >

              </ImageToolBar>
            }
            {(componentActive=="html")&&
              <HtmlToolBar
                closeComponent={makeComponentDeactive}
                deleteComponent={deleteComponent}
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

export default App;
