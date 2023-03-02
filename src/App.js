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
import Editor from '@draft-js-plugins/editor';
import { EditorState } from 'draft-js';
import {convertFromHTML, convertToHTML} from "draft-convert";
import { PopoverPicker } from './ColorPicker';
import TextEditor from './TextEditor';
import TextEditorAppToolbar from './TextEditorAppToolbar';
import Switch from './Switch';
import * as _ from "lodash";


function App() {




  const [menuItemActive, setMenuItemActive] = useState("body");



  const [elementDragged, setElementDragged] = useState("");


  const [columnsettingsactive, setColumnsettingsactive] = useState(0);

  const [detailColumnPadding, setDetailColumnPadding] = useState(false);

  const [columnBackground, setColumnBackground] = useState("color");

  const [rowBackground, setRowBackground] = useState("color");

  const [detailRowPadding, setDetailRowPadding] = useState(false);

  const setColumnPadding = (val, type, rowindex, colindex)=>{
      let rowsCopy = [...rows];
      if(type=="all"){
        rowsCopy[rowindex].columns[colindex].style = {...rowsCopy[rowActiveIndex].columns[colindex].style,
                                                            padding: val+"px"
                                                          }
      }
      if(type=="top"){
        let padding = rowsCopy[rowindex].columns[colindex].style.padding;
        let paddingarray = padding.split(" ");
        if(paddingarray.length>1){
          paddingarray[0] = val+"px";
          rowsCopy[rowindex].columns[colindex].style = {...rowsCopy[rowActiveIndex].columns[colindex].style,
                                                      padding: paddingarray.join(" ")
                                                    }
        }else{
          rowsCopy[rowindex].columns[colindex].style = {...rowsCopy[rowActiveIndex].columns[colindex].style,
                                                        padding: val+"px"+" "+paddingarray[0]+" "+paddingarray[0]+" "+paddingarray[0]
                                                      }
        }
        
      }

      if(type=="right"){
        let padding = rowsCopy[rowindex].columns[colindex].style.padding;
        let paddingarray = padding.split(" ");
        if(paddingarray.length>1){
          paddingarray[1] = val+"px";
          rowsCopy[rowindex].columns[colindex].style = {...rowsCopy[rowActiveIndex].columns[colindex].style,
                                                      padding: paddingarray.join(" ")
                                                    }
        }else{
          rowsCopy[rowindex].columns[colindex].style = {...rowsCopy[rowActiveIndex].columns[colindex].style,
                                                        padding: paddingarray[0]+" "+val+"px"+" "+paddingarray[0]+" "+paddingarray[0]
                                                      }
        }
      }

      if(type=="bottom"){
        let padding = rowsCopy[rowindex].columns[colindex].style.padding;
        let paddingarray = padding.split(" ");
        if(paddingarray.length>1){
          paddingarray[2] = val+"px";
          rowsCopy[rowindex].columns[colindex].style = {...rowsCopy[rowActiveIndex].columns[colindex].style,
                                                      padding: paddingarray.join(" ")
                                                    }
        }else{
          rowsCopy[rowindex].columns[colindex].style = {...rowsCopy[rowActiveIndex].columns[colindex].style,
                                                        padding: paddingarray[0]+" "+paddingarray[0]+" "+val+"px"+" "+paddingarray[0]
                                                      }
        }
      }

      if(type=="left"){
        let padding = rowsCopy[rowindex].columns[colindex].style.padding;
        let paddingarray = padding.split(" ");
        if(paddingarray.length>1){
          paddingarray[3] = val+"px";
          rowsCopy[rowindex].columns[colindex].style = {...rowsCopy[rowActiveIndex].columns[colindex].style,
                                                      padding: paddingarray.join(" ")
                                                    }
        }else{
          rowsCopy[rowindex].columns[colindex].style = {...rowsCopy[rowActiveIndex].columns[colindex].style,
                                                        padding: paddingarray[0]+" "+paddingarray[0]+" "+paddingarray[0]+" "+val+"px"
                                                      }
        }
      }
      setRows(rowsCopy)

  }



  const getColumnPaddingdetailActive = (rowindex,colindex)=>{
    let rowsCopy = [...rows];
    let paddingarray = rowsCopy[rowindex].columns[colindex].style.padding.split(" ");
    if(paddingarray.length>1){
      return true;
    }else{
      return false;
    }
  }

  // top -> right -> bottom -> left
  const getColumnPadding = (type, rowindex, colindex)=>{
    let rowsCopy = [...rows];
    if(type=="all"){
      let padding = rowsCopy[rowindex].columns[colindex].style.padding.replace("px","");
      return padding;
    }
    if(type=="left"){
      let padding = rowsCopy[rowindex].columns[colindex].style.padding;
      let paddingarray = padding.split(" ");
      if(paddingarray.length>1){
        let paddingtype = paddingarray[3].replace("px", "");
        return paddingtype
      }else{
        let paddingtype = paddingarray[0].replace("px","");
        return paddingtype;
      }
      
    }
    if(type=="right"){
      let padding = rowsCopy[rowindex].columns[colindex].style.padding;
      let paddingarray = padding.split(" ");
      if(paddingarray.length>1){
        let paddingtype = paddingarray[1].replace("px", "");
        return paddingtype
      }else{
        let paddingtype = paddingarray[0].replace("px", "");
        return paddingtype;
      }
      
    }

    if(type=="top"){
      let padding = rowsCopy[rowindex].columns[colindex].style.padding;
      let paddingarray = padding.split(" ");
      let paddingtype = paddingarray[0].replace("px", "");
      return paddingtype
    }

    if(type=="bottom"){
      let padding = rowsCopy[rowindex].columns[colindex].style.padding;
      let paddingarray = padding.split(" ");
      if(paddingarray.length>1){
        let paddingtype = paddingarray[2].replace("px", "");
        return paddingtype;
      }else{
        let paddingtype = paddingarray[0].replace("px","");
        return paddingtype;
      }
      
    }
  }

  useEffect(()=>{
    if(rowActiveIndex==null){
      return
    }
    let detailcolumnpadding = getColumnPaddingdetailActive(rowActiveIndex, columnsettingsactive);
    setDetailColumnPadding(detailcolumnpadding);

  },[columnsettingsactive])



  const [detailColumnBorder, setDetailColumnBorder] = useState(false);

  useEffect(()=>{
    
    if(rowActiveIndex==null){
      return
    }

    let rowsCopy = [...rows];

    
  },[columnsettingsactive])



  const [bodyStyles, setBodyStyles] = useState({
    "width": "1114px",
    "margin": "auto",
    "background": "black",
    "font-size": "20px",
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
    console.log(elementOver);
    console.log(elementDragged);

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

  const handleClick = (event)=>{
    console.log(event);
  }

  useEffect(()=>{
    document.addEventListener("click", handleClick, true);
  },[])


  const [rowActive, setRowActive] = useState(false);

  const [rowActiveIndex, setRowActiveIndex] = useState(null);

  // each column can also have multiple components
  
  const [rows, setRows] = useState([
    {
      "type": "2",
      "columns":[
        {
          "style":{
            "width": "50%",
            "padding": "0px",
            "border": "0px"
          },
          "activestyle":{
            "width": "50%",
            "border": "1px dashed rgb(93,93,223)"
          },
          "components":[

          ],
          "active":false
        },
        {
          "style":{
            "width": "50%",
            "padding": "0px",
            "border": "0px"
          },
          "activestyle":{
            "width": "50%",
            "border": "1px dashed rgb(93,93,223)"
          },
          "components":[

          ],
          "active":false
        }
      ],
      "active": false,
      "showButtons": false,
      "editable": false
    }
  ])


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


  const [desginElement, setDesignElement] = useState("contents");


  // const [rows, setRows] = useState([
  //   {
  //     "type": "2",
  //     "columns":{
  //       "column1":{
  //         "style":{
  //           width: "50%"
  //         },
  //         "activestyle":{
  //             width: "50%",
  //             border: "1px dashed rgb(93, 93, 223)"
  //         },
  //         "components":[

  //           {
  //             "type": "textbox",
  //             "styles":{

  //             },
  //             editorState: EditorState.createEmpty(),
  //             html:"",
  //             active: false
  //           }

  //         ]
  //       },
  //       "column2":{
  //         "style":{
  //           "width": "50%"
  //         },
  //         "activestyle":{
  //           width: "50%",
  //           border: "1px dashed rgb(93,93,223)"
  //         },
  //         "components":[
  //           {
  //             "type": "textbox",
  //             "styles":{

  //             },
  //             editorState: EditorState.createEmpty(),
  //             html:"",
  //             active: false
  //           }
  //         ]
  //       }
  //     },
  //     "active": false,
  //     "showButtons": false
  //   }
  // ]);


  const [componentActive, setComponentActive] = useState("textblock");

  const [activeComponentSettings, setActiveComponentSettings] = useState({
    rowIndex: null,
    columnIndex: null,
    componentIndex: null
  })

  const handleSave = ()=>{
    let node = document.getElementById("test").innerHTML;
    console.log(node);
  }


  const handleDragStart = (e)=>{
    console.log("starting position x", e.nativeEvent.offsetX);
    console.log("starting postion y", e.nativeEvent.offsetY);
  }
  const handleDrag = (e)=>{
    if(e.nativeEvent.offsetX!=0){
      console.log("movement in x ", e.nativeEvent.offsetX);
    }

    if(e.nativeEvent.offsetY!=0){
      console.log("movement in y ", e.nativeEvent.offsetY);
    }
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
          "style":{
            "width": "100%",
            "padding": "0px",
            "border": "0px"
          },
          "activestyle":{
            "width": "100%",
            "border": "1px dashed rgb(93,93,223)"
          },
          "components":[

          ],
          "active":false
        }
      ],
      "active": false,
      "showButtons": false,
      "editable": false
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
          "activestyle":{
            width: width+"%",
            "border": "1px dashed rgb(93,93,223)"
          },
          "style":{
            width: width+"%",
            "padding": "0px",
            "border": "0px"
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
    rowsCopy[rowindex].columns[columnindex].components[componentindex] = componentCopy;
    let activecomponentsettings = {
      rowIndex: rowindex,
      columnIndex: columnindex,
      componentIndex: componentindex
    }

    setActiveComponentSettings(activecomponentsettings);

    setRows(rowsCopy);


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
    if(activeComponentSettings.rowIndex!=null&&activeComponentSettings.columnIndex!=null&&activeComponentSettings.componentIndex!=null){
      let componentCopy = {...rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex]};
      if(rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex].type=="textbox"){
        const html = convertToHTML(componentCopy.editorState.getCurrentContent());
        componentCopy.active = false;
        componentCopy.html = html;
        setComponentActive("");
      }
      rowsCopy[activeComponentSettings.rowIndex].columns[activeComponentSettings.columnIndex].components[activeComponentSettings.componentIndex] = componentCopy;
      
      setRows(rowsCopy);
      let activeComponentSettingsCopy = {...activeComponentSettings,
                                         rowIndex: null,
                                         columnIndex: null,
                                         componentIndex: null
                                        }
      setActiveComponentSettings(activeComponentSettingsCopy);

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




  


  return (
    <div className='App'>
      <div id="test" className="design-container">
        <div id="main-body" style={bodyStyles}>
          {rows.map((row, index)=>{
          return(
            <div className={row.active?"builder-row active":"builder-row"}  
            onMouseEnter={()=>{
              if(rowActiveIndex!=index){
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
            <div className="row-content">
              {row.columns.map((column,cindex)=>{
                return(
                  <div style={column.active?column.activestyle:column.style} 
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
                              <div style={{width:"100%", minHeight: 100}} 
                                   onClick={()=>{}}>
                                {c.type=="textbox"&&c.active==true&&
                                  <TextEditor editorState={c.settings.editorState} setEditorState={handleTextEditorState(index,cindex,componentindex)}></TextEditor>
                                }
                                {c.type=="textbox"&&c.active==false&&
                                  <div>
                                  </div>
                                }
                              </div>
                            )
                          })}
                        </>
                    }
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
                                                    onDragStart={()=>{onElementDragStart("heading")}}
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
                          <div className="column-padding-settings-title">
                            <div>
                              Padding
                            </div>
                            <div>
                              More Options <Switch value={detailColumnPadding} onChange={setDetailColumnPadding}></Switch>
                            </div>
                          </div>
                          {detailColumnPadding==false&&
                            <div className="all-in-one-padding">
                              <div className="all-in-one-padding-title">
                                All sides
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
                                    let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                    v = v-1;
                                    setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);

                                  }}
                                >
                                  <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                </div>
                                <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("all",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "all", rowActiveIndex, columnsettingsactive)}}></input>
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
                                    let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                    v = v+1;
                                    setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);

                                  }}

                                  >
                                  <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                </div>
                              </div>
                            </div>
                          }
                          {detailColumnPadding==true&&
                            <>
                              <div className="detail-padding-row">
                                <div className="detail-padding-detail">
                                  <div className="all-in-one-padding-title">
                                    Top Padding
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
                                    let v = parseInt(getColumnPadding("top",rowActiveIndex,columnsettingsactive));
                                    v = v-1;
                                    setColumnPadding(v, "top", rowActiveIndex, columnsettingsactive);

                                  }}
                                >
                                  <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                </div>
                                <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("top",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "top", rowActiveIndex, columnsettingsactive)}}></input>
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
                                    let v = parseInt(getColumnPadding("top",rowActiveIndex,columnsettingsactive));
                                    v = v+1;
                                    setColumnPadding(v, "top", rowActiveIndex, columnsettingsactive);

                                  }}

                                  >
                                  <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                </div>
                                  </div>
                                </div>
                                <div className="detail-padding-detail">
                                  <div className="all-in-one-padding-title">
                                    Right Padding
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
                                        let v = parseInt(getColumnPadding("right",rowActiveIndex,columnsettingsactive));
                                        v = v-1;
                                        setColumnPadding(v, "right", rowActiveIndex, columnsettingsactive);

                                      }}
                                    >
                                      <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                    </div>
                                      <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("right",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "right", rowActiveIndex, columnsettingsactive)}}></input>
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
                                        let v = parseInt(getColumnPadding("right",rowActiveIndex,columnsettingsactive));
                                        v = v+1;
                                        setColumnPadding(v, "right", rowActiveIndex, columnsettingsactive);

                                      }}

                                    >
                                      <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="detail-padding-row">
                                <div className="detail-padding-detail">
                                  <div className="all-in-one-padding-title">
                                    Bottom Padding
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
                                    let v = parseInt(getColumnPadding("bottom",rowActiveIndex,columnsettingsactive));
                                    v = v-1;
                                    setColumnPadding(v, "bottom", rowActiveIndex, columnsettingsactive);

                                  }}
                                >
                                  <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                    </div>
                                    <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("bottom",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "bottom", rowActiveIndex, columnsettingsactive)}}></input>
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
                                    let v = parseInt(getColumnPadding("bottom",rowActiveIndex,columnsettingsactive));
                                    v = v+1;
                                    setColumnPadding(v, "bottom", rowActiveIndex, columnsettingsactive);

                                  }}

                                  >
                                  <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                    </div>
                                  </div>
                                </div>
                                <div className="detail-padding-detail">
                                  <div className="all-in-one-padding-title">
                                    Left Padding
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
                                        let v = parseInt(getColumnPadding("left",rowActiveIndex,columnsettingsactive));
                                        v = v-1;
                                        setColumnPadding(v, "left", rowActiveIndex, columnsettingsactive);

                                      }}
                                    >
                                      <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                    </div>
                                      <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("left",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "left", rowActiveIndex, columnsettingsactive)}}></input>
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
                                        let v = parseInt(getColumnPadding("left",rowActiveIndex,columnsettingsactive));
                                        v = v+1;
                                        setColumnPadding(v, "left", rowActiveIndex, columnsettingsactive);

                                      }}

                                    >
                                      <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          }
                        </div>
                        <div className="column-border-settings">
                          <div className="column-border-settings-title">
                            <div>
                              Border
                            </div>
                            <div>
                              More Options <Switch value={detailColumnBorder} onChange={setDetailColumnBorder}></Switch>
                            </div>
                          </div>
                          {detailColumnBorder==false&&
                            <div className='all-in-one-border'>
                              <div className='all-in-one-border-title'>
                                All sides
                              </div>
                              <div className='border-details'>
                                <div className='border-details-row'>
                                  <select>
                                    <option>Solid</option>
                                    <option>Dotted</option>
                                    <option>Dashed</option>
                                  </select>
                                </div>
                                
                                <div className='border-details-row'>
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
                                        let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                        v = v-1;
                                        setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);

                                      }}
                                    >
                                      <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                    </div>
                                    <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("all",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "all", rowActiveIndex, columnsettingsactive)}}></input>
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
                                        let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                        v = v+1;
                                        setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);

                                      }}

                                    >
                                      <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                    </div>
                                  </div>
                                  <div className="border-color-picker">
                                    <PopoverPicker 
                                      color={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).color} 
                                      active={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).active}
                                      onChange={changeColumnBackground(rowActiveIndex,columnsettingsactive)}
                                    ></PopoverPicker>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                          {detailColumnBorder==true&&
                            <>
                              <div className="detail-border-row">
                                <div className="detail-border-detail">
                                  <div className="all-in-one-border-title">
                                    Top Border
                                  </div>
                                  <div className='border-details'>
                                    <div className='border-details-row'>
                                      <select>
                                        <option>Solid</option>
                                        <option>Dotted</option>
                                        <option>Dashed</option>
                                      </select>
                                    </div>
                                
                                    <div className='border-details-row'>
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
                                            let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                            v = v-1;
                                            setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);
                                          }}
                                        >
                                          <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                        </div>
                                        <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("all",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "all", rowActiveIndex, columnsettingsactive)}}></input>
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
                                            let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                            v = v+1;
                                            setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);
                                          }}

                                        >
                                        <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                        </div>
                                      </div>
                                      <div className="border-color-picker">
                                        <PopoverPicker 
                                          color={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).color} 
                                          active={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).active}
                                          onChange={changeColumnBackground(rowActiveIndex,columnsettingsactive)}
                                        ></PopoverPicker>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="detail-border-detail">
                                  <div className="all-in-one-border-title">
                                    Right Border
                                  </div>
                                  <div className='border-details'>
                                    <div className='border-details-row'>
                                      <select>
                                        <option>Solid</option>
                                        <option>Dotted</option>
                                        <option>Dashed</option>
                                      </select>
                                    </div>
                                
                                    <div className='border-details-row'>
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
                                            let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                            v = v-1;
                                            setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);
                                          }}
                                        >
                                          <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                        </div>
                                        <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("all",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "all", rowActiveIndex, columnsettingsactive)}}></input>
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
                                            let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                            v = v+1;
                                            setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);
                                          }}

                                        >
                                        <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                        </div>
                                      </div>
                                      <div className="border-color-picker">
                                        <PopoverPicker 
                                          color={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).color} 
                                          active={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).active}
                                          onChange={changeColumnBackground(rowActiveIndex,columnsettingsactive)}
                                        ></PopoverPicker>
                                      </div>
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
                                      <select>
                                        <option>Solid</option>
                                        <option>Dotted</option>
                                        <option>Dashed</option>
                                      </select>
                                    </div>
                                
                                    <div className='border-details-row'>
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
                                            let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                            v = v-1;
                                            setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);
                                          }}
                                        >
                                          <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                        </div>
                                        <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("all",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "all", rowActiveIndex, columnsettingsactive)}}></input>
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
                                            let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                            v = v+1;
                                            setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);
                                          }}

                                        >
                                        <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                        </div>
                                      </div>
                                      <div className="border-color-picker">
                                        <PopoverPicker 
                                          color={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).color} 
                                          active={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).active}
                                          onChange={changeColumnBackground(rowActiveIndex,columnsettingsactive)}
                                        ></PopoverPicker>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="detail-border-detail">
                                  <div className="all-in-one-border-title">
                                    Left Border
                                  </div>
                                  <div className='border-details'>
                                    <div className='border-details-row'>
                                      <select>
                                        <option>Solid</option>
                                        <option>Dotted</option>
                                        <option>Dashed</option>
                                      </select>
                                    </div>
                                
                                    <div className='border-details-row'>
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
                                            let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                            v = v-1;
                                            setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);
                                          }}
                                        >
                                          <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                        </div>
                                        <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("all",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "all", rowActiveIndex, columnsettingsactive)}}></input>
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
                                            let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                            v = v+1;
                                            setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);
                                          }}

                                        >
                                        <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                        </div>
                                      </div>
                                      <div className="border-color-picker">
                                        <PopoverPicker 
                                          color={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).color} 
                                          active={getColumnBackgroundColor(rowActiveIndex,columnsettingsactive).active}
                                          onChange={changeColumnBackground(rowActiveIndex,columnsettingsactive)}
                                        ></PopoverPicker>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          }
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
                    <div className='column-background-settings'>
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
                    <div className="column-padding-settings">
                          <div className="column-padding-settings-title">
                            <div>
                              Padding
                            </div>
                            <div>
                              More Options <Switch value={detailRowPadding} onChange={setDetailRowPadding}></Switch>
                            </div>
                          </div>
                          {detailRowPadding==false&&
                            <div className="all-in-one-padding">
                              <div className="all-in-one-padding-title">
                                All sides
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
                                    let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                    v = v-1;
                                    setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);

                                  }}
                                >
                                  <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                </div>
                                <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("all",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "all", rowActiveIndex, columnsettingsactive)}}></input>
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
                                    let v = parseInt(getColumnPadding("all",rowActiveIndex,columnsettingsactive));
                                    v = v+1;
                                    setColumnPadding(v, "all", rowActiveIndex, columnsettingsactive);

                                  }}

                                  >
                                  <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                </div>
                              </div>
                            </div>
                          }
                          {detailRowPadding==true&&
                            <>
                              <div className="detail-padding-row">
                                <div className="detail-padding-detail">
                                  <div className="all-in-one-padding-title">
                                    Top Padding
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
                                    let v = parseInt(getColumnPadding("top",rowActiveIndex,columnsettingsactive));
                                    v = v-1;
                                    setColumnPadding(v, "top", rowActiveIndex, columnsettingsactive);

                                  }}
                                >
                                  <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                </div>
                                <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("top",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "top", rowActiveIndex, columnsettingsactive)}}></input>
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
                                    let v = parseInt(getColumnPadding("top",rowActiveIndex,columnsettingsactive));
                                    v = v+1;
                                    setColumnPadding(v, "top", rowActiveIndex, columnsettingsactive);

                                  }}

                                  >
                                  <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                </div>
                                  </div>
                                </div>
                                <div className="detail-padding-detail">
                                  <div className="all-in-one-padding-title">
                                    Right Padding
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
                                        let v = parseInt(getColumnPadding("right",rowActiveIndex,columnsettingsactive));
                                        v = v-1;
                                        setColumnPadding(v, "right", rowActiveIndex, columnsettingsactive);

                                      }}
                                    >
                                      <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                    </div>
                                      <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("right",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "right", rowActiveIndex, columnsettingsactive)}}></input>
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
                                        let v = parseInt(getColumnPadding("right",rowActiveIndex,columnsettingsactive));
                                        v = v+1;
                                        setColumnPadding(v, "right", rowActiveIndex, columnsettingsactive);

                                      }}

                                    >
                                      <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="detail-padding-row">
                                <div className="detail-padding-detail">
                                  <div className="all-in-one-padding-title">
                                    Bottom Padding
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
                                    let v = parseInt(getColumnPadding("bottom",rowActiveIndex,columnsettingsactive));
                                    v = v-1;
                                    setColumnPadding(v, "bottom", rowActiveIndex, columnsettingsactive);

                                  }}
                                >
                                  <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                    </div>
                                    <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("bottom",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "bottom", rowActiveIndex, columnsettingsactive)}}></input>
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
                                    let v = parseInt(getColumnPadding("bottom",rowActiveIndex,columnsettingsactive));
                                    v = v+1;
                                    setColumnPadding(v, "bottom", rowActiveIndex, columnsettingsactive);

                                  }}

                                  >
                                  <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                    </div>
                                  </div>
                                </div>
                                <div className="detail-padding-detail">
                                  <div className="all-in-one-padding-title">
                                    Left Padding
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
                                        let v = parseInt(getColumnPadding("left",rowActiveIndex,columnsettingsactive));
                                        v = v-1;
                                        setColumnPadding(v, "left", rowActiveIndex, columnsettingsactive);

                                      }}
                                    >
                                      <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                                    </div>
                                      <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getColumnPadding("left",rowActiveIndex,columnsettingsactive)} onChange={(e)=>{setColumnPadding(e.target.value, "left", rowActiveIndex, columnsettingsactive)}}></input>
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
                                        let v = parseInt(getColumnPadding("left",rowActiveIndex,columnsettingsactive));
                                        v = v+1;
                                        setColumnPadding(v, "left", rowActiveIndex, columnsettingsactive);

                                      }}

                                    >
                                      <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          }
                        </div>
                  </div>
                </div>
                
              </div>
            }
            {(componentActive=="textblock")&&
              <TextEditorAppToolbar closeComponent={makeComponentDeactive} ></TextEditorAppToolbar>
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
                    let v = parseInt(getFontSize(bodyStyles['font-size']));
                    v = v-1;
                    transformBodyStyles(v, "font-size");

                  }}
                >
                  <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                </div>
                <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={getFontSize(bodyStyles['font-size'])} onChange={(e)=>{transformBodyStyles(e.target.value,"font-size")}}></input>
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
                    let v = parseInt(getFontSize(bodyStyles['font-size']));
                    v = v+1;
                    transformBodyStyles(v, "font-size");

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
