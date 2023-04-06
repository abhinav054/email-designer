import { useState } from "react"
import './App.css';
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
import Columns from "./images/width_normal.png";
import { rowStyle, columnStyle , ButtonStyle, HeaderStyle, DividerStyle, MenuItemStyle, MenuBarStyle, ImageStyle} from './StyleConsts';
import BuilderRow from "./BuilderRow";
import BuilderRowToolBar from "./BuilderRowToolBar";
import HeadersToolBar from './HeadersToolBar';
import DividerToolBar from './DividerToolBar';
import MenuToolBar from './MenuToolBar';
import ImageToolBar from './ImageToolBar';
import HtmlToolBar from './HtmlToolBar';
import TextEditorAppToolbar from './TextEditorAppToolbar';
import ButtonToolbar from './ButtonToolbar';
import { EditorState } from 'draft-js';
import * as _ from "lodash";


const InterFaceContainer = ()=>{

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
            "active": true,
            "showButtons": true,
            "editable": true,
            "style":{
              ...rowStyle
            }
          }
    ]);

    const [elementDragged, setElementDragged] = useState("");

    const [componentActive, setComponentActive] = useState("");

    const [componentDraggedOver, setComponentDraggedOver] = useState([]);

    const [activeComponentIndex, setActiveComponentIndex] = useState([]);

    const [activeRowIndex, setActiveRowIndex] = useState([]);

    const [clickActive,setClickActive] = useState("");



    const deactivatepreviousrow = (columns)=>{
      for(let i=0; i < columns.length; i++){
        for(let j=0; j< columns[i].components.length; j++){
          if(columns[i].components[j].active&&columns[i].components[j].type=="columns"){
                columns[i].components[j].active=false;
                columns[i].components[j].showButtons=false;
                columns[i].components[j].editable=false;
                deactivatepreviousrow(columns[i].components[j].columns);
          }
        }
      }
      return;
    }

    

    const makerowactive = (index)=>{
      let clicklock = false;
      return (childrowindex)=>{
        if(clickActive==""&&clicklock==false){
          clicklock = true
          setTimeout(() => {
            clicklock = false
          },30);
          let rowsCopy = [...rows];
          let activeRowIndexCopy = [...activeRowIndex];
          let proceed = true;
          let childrowindexcopy = [];
          if(childrowindex.length==0){
            childrowindexcopy = [{rowindex: index}]
          }else{
            childrowindex[0] = {...childrowindex[0],
                                rowindex: index
                                }
            childrowindexcopy = [{rowindex: index}, ...childrowindex]
          }
          if(activeRowIndex.length>0){
            if(activeRowIndex[0].rowindex==index&&childrowindexcopy.length<activeRowIndexCopy.length){
              proceed=false;
            }
          }
          setActiveRowIndex(childrowindexcopy);
          if(proceed){
            let activeRowindex = _.findIndex(rowsCopy,(row)=>{return row.active});
            if(activeRowindex>-1){
              rowsCopy[activeRowindex].active = false;
              rowsCopy[activeRowindex].showButtons = false;
              rowsCopy[activeRowindex].editable = false;
              deactivatepreviousrow(rowsCopy[activeRowindex].columns);
            }
            
            if(childrowindex.length==0){
              rowsCopy[index].active = true;
              rowsCopy[index].showButtons = true;
              rowsCopy[index].editable = true;
            }else if(childrowindex.length==1){
              rowsCopy[index].active = true;
              rowsCopy[index].showButtons = true;
              rowsCopy[index].editable = true;
              rowsCopy[childrowindex[0].rowindex].columns[childrowindex[0].columnindex].components[childrowindex[0].componentindex].active = true;
              rowsCopy[childrowindex[0].rowindex].columns[childrowindex[0].columnindex].components[childrowindex[0].componentindex].showButtons = true;
              rowsCopy[childrowindex[0].rowindex].columns[childrowindex[0].columnindex].components[childrowindex[0].componentindex].editable = true;
            }else{
              rowsCopy[index].active = true;
              rowsCopy[index].showButtons = true;
              rowsCopy[index].editable = true;
              let components = rowsCopy[index].columns[childrowindex[0].columnindex].components;
              components = components[childrowindex[0].componentindex];
              components.active = true;
              components.showButtons = true;
              for(let i=1; i< components.length; i++){
                if(i==(childrowindex.length-1)){
                    components = components.columns[childrowindex[i].columnindex].components;
                    components[childrowindex[i].componentindex].active = true;
                    components[childrowindex[i].componentindex].showButtons = true;
                }else{
                    components = components.columns[childrowindex[i].columnindex].components;
                    components[childrowindex[i].componentindex].active = true;
                    components[childrowindex[i].componentindex].showButtons = true;
                }
              }
            }
            setRows(rowsCopy);
          }
        }
      }
    }

    const addrowinternal = (index)=>{
      return (childrowadd, position)=>{
        let rowsCopy = [...rows];
        if(position=="upper"){
            rowsCopy[index].active = false;
            rowsCopy[index].showButtons = false;
            rowsCopy[index].editable = false;
            deactivepreviouscomponents(rowsCopy[index].columns);
            index = index -1
            for (let i = rowsCopy.length; i > index; i--) {
              rowsCopy[i] = rowsCopy[i - 1];
            }
            rowsCopy[index] = {
              "columns":[
                  {
                      "style":{...columnStyle,
                               "width": "50%"
                              },
                      "components":[
    
                      ],
                      "active":false
                  },
                  {
                    "style":{...columnStyle,
                             "width": "50%"
                            },
                    "components":[
  
                    ],
                    "active":false
                  }
              ],
              "active": true,
              "showButtons": true,
              "editable": true,
              "style":{
                ...rowStyle
                }
            }

        }else if(position=="lower"){
            rowsCopy[index].active = false;
            rowsCopy[index].showButtons = false;
            rowsCopy[index].editable = false;
            deactivepreviouscomponents(rowsCopy[index].columns);
            index = index +1
            for (let i = rowsCopy.length; i > index; i--) {
              rowsCopy[i] = rowsCopy[i - 1];
            }

            rowsCopy[index] = {
              "columns":[
                  {
                      "style":{...columnStyle,
                              "width": "100%"
                              },
                      "components":[
    
                      ],
                      "active":false
                  },
                  {
                    "style":{...columnStyle,
                            "width": "100%"
                            },
                    "components":[
  
                    ],
                    "active":false
                  }
                ],
              "active": true,
              "showButtons": true,
              "editable": true,
              "style":{
                        ...rowStyle
                      }
            }
        }else{
            childrowadd[0] = {...childrowadd[0],
              rowindex: index
            }
          if(childrowadd.length==1){

            let components = rowsCopy[index].columns[childrowadd[0].columnindex].components;
            let activeRowIndex = _.findIndex(components,(c)=>{return c.type=="columns"&&c.active});
            if(activeRowIndex!=-1){
              components[activeRowIndex].active = false;
              components[activeRowIndex].showButtons = false;
              components[activeRowIndex].editable = false;
              // deactivepreviouscomponents(components[activeRowIndex].columns);
            }
            for (let i = components.length; i > childrowadd[0].componentindex; i--){
              components[i] = components[i-1];
            }
            components[childrowadd[0].componentindex] = {
                            "type": "columns",
                            "active": true,
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
                            "showButtons": true,
                            "editable": true,
                            "style":{
                              ...rowStyle
                            }
                          };
          }else{
            let components = rowsCopy[index].columns[childrowadd[0].columnindex].components[childrowadd[0].componentindex];
            for(let i=1; i < childrowadd.length; i++){
              if(i==(childrowadd.length-1)){
                let componentsinternal = components.columns[childrowadd[i].columnindex].components;
                for (let i = componentsinternal.length; i > childrowadd[0].componentindex; i--){
                  componentsinternal[i] = componentsinternal[i-1];
                }
                componentsinternal[childrowadd[i].componentindex] = {
                                "type": "columns",
                                "active": true,
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
                                "showButtons": true,
                                "editable": true,
                                "style":{
                                  ...rowStyle                                }
                              };

              }else{
                components = components.columns[childrowadd[i].columnindex].components[childrowadd[i].componentindex]
              }
            }
          }
        }
        setClickActive("");
        setRows(rowsCopy);
      }
    }

    const deleterowinternal = (index)=>{
      return (childrowadd)=>{
        let rowsCopy = [...rows];
        if(childrowadd.length==0){
          rowsCopy.splice(index,1);
          setComponentActive("");
          setActiveComponentIndex([]);
        }else if(childrowadd.length==1){
          rowsCopy[index].columns[childrowadd[0].columnindex].components.splice(childrowadd[0].componentindex,1);
          setActiveComponentIndex([{
            "rowindex": index
          }])
        }else{
          let activeComponentIndexCopy = [];
          let components = rowsCopy[index].columns[childrowadd[0].columnindex].components[childrowadd[0].componentindex];
          activeComponentIndexCopy.push(
            {
              rowindex: index,
              columnindex: childrowadd[0].columnindex,
              componentindex: childrowadd[0].componentindex
            }
          )
          for(let i=1; i < childrowadd.length; i++){
            if(i==(childrowadd.length-1)){
              components.columns[childrowadd[i].columnindex].components.splice(childrowadd[i].componentindex,1);
            }else{
              components = components.columns[childrowadd[i].columnindex].components[childrowadd[i].componentindex]
              activeComponentIndexCopy.push({
                columnindex: childrowadd[i].columnindex,
                componentindex: childrowadd[i].componentindex
              })
            }
          }
          setActiveComponentIndex(activeComponentIndexCopy);
        }
        setClickActive("");
        setRows(rowsCopy);
        
      }

    }

    const getElement = ()=>{
        if(elementDragged=="textbox"){
            return {
                "type": "textbox",
                "settings":{
                  editorState: EditorState.createEmpty(),
                  html: ""
                },
                "active": false,
                "style":{
                  width: "100%"
                },
                "hoveractive": false
              }
        }
        if(elementDragged=="button"){
            return {
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
        }

        if(elementDragged=="header"){
            return {
                "type": "header",
                "active": true,
                "style":{
                  ...HeaderStyle
                },
                "settings":{
                  "type": "h1"
                }
              }
        }

        if(elementDragged=="divider"){
            return {
                "type": "divider",
                "active": true,
                "style":{
                  ...DividerStyle
                },
                "settings":{
      
                }
              }
        }

        if(elementDragged=="menu"){
            return {
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
        }

        if(elementDragged=="image"){
            return {
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
        }

        if(elementDragged=="html"){
            return {
                "type": "html",
                "active": true,
                "settings":{
                  "html": ""
                }
              }
        }

        if(elementDragged=="columns"){
            let componentDraggedOverLength = componentDraggedOver.length;
            let zindex = 100+componentDraggedOverLength+1
            return {
                "type": "columns",
                "active": true,
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
                  "showButtons": true,
                  "editable": true,
                  "style":{
                    ...rowStyle,
                    zIndex: zindex
                  }
                }
        }
    }

    const onElementDragStop = ()=>{
        let activeComponentIndexCopy = [];
        if(componentDraggedOver.length==1){
            let rowsCopy = [...rows];
            let element = getElement();
            let previousactiverowindex = _.findIndex(rowsCopy,(row)=>{return row.active});
            rowsCopy[previousactiverowindex].active = false;
            rowsCopy[previousactiverowindex].showButtons = false;
            let columns = rowsCopy[previousactiverowindex].columns;
            deactivepreviouscomponents(columns);
            rowsCopy[componentDraggedOver[0].rowindex].active = true;
            let componentlength = rowsCopy[componentDraggedOver[0].rowindex].columns[componentDraggedOver[0].columnindex].components.length;
            rowsCopy[componentDraggedOver[0].rowindex].columns[componentDraggedOver[0].columnindex].components.push(
                getElement()
            );
            activeComponentIndexCopy.push({
                rowindex: componentDraggedOver[0].rowindex,
                columnindex: componentDraggedOver[0].columnindex,
                componentindex: componentlength
            });
            if(elementDragged=="columns"){
              let activeRowindex = [
                            {rowindex: componentDraggedOver[0].rowindex},
                            {
                              rowindex: componentDraggedOver[0].rowindex,
                              columnindex: componentDraggedOver[0].columnindex,
                              componentindex: componentlength
                            }
                          ];
              setActiveRowIndex(activeRowindex);
            }else{
                let activeRowindex = [{rowindex: componentDraggedOver[0].rowindex}];
                setActiveRowIndex(activeRowindex);
            }
            setComponentDraggedOver([]);
            setActiveComponentIndex(activeComponentIndexCopy);
            setComponentActive(element.type);
            setRows(rowsCopy);

        }else{
            let rowsCopy = [...rows];
            let element = getElement();
            let previousactiverowindex = _.findIndex(rowsCopy,(row)=>{return row.active});
            rowsCopy[previousactiverowindex].active = false;
            rowsCopy[previousactiverowindex].showButtons = false;
            let columns = rowsCopy[previousactiverowindex].columns;
            deactivepreviouscomponents(columns);
            rowsCopy[componentDraggedOver[0].rowindex].active = true;
            let component = rowsCopy[componentDraggedOver[0].rowindex].columns[componentDraggedOver[0].columnindex].components[componentDraggedOver[0].componentindex];
            component.active = true;
            component.showButtons = true;
            for(let i=1; i < componentDraggedOver.length; i++){
                if(i==(componentDraggedOver.length-1)){
                    component = component.columns[componentDraggedOver[i].columnindex].components;
                }else{
                    component = component.columns[componentDraggedOver[i].columnindex].components[componentDraggedOver[i].componentindex]
                    component.active = true;
                    component.showButtons = true;
                }
            }
            let componentindex = component.length;
            component.push(element);
            let componentDraggedOverCopy = [...componentDraggedOver];
            componentDraggedOverCopy[componentDraggedOverCopy.length-1] = {...componentDraggedOverCopy[componentDraggedOverCopy.length-1],
                                                                           componentindex: componentindex
                                                                            }
            if(elementDragged=="columns"){
              let activerowindex = [{rowindex: componentDraggedOver[0].rowindex},
                                      ...componentDraggedOverCopy
                                    ]
              setActiveRowIndex(activerowindex);
            }else{
              let activerowindex = [{rowindex: componentDraggedOver[0].rowindex}];
              let componentDraggedOverCopyCopy = [...componentDraggedOverCopy];
              componentDraggedOverCopyCopy.pop();
              activerowindex = [...activerowindex,...componentDraggedOverCopyCopy]
              setActiveRowIndex(activerowindex);
            }
            setComponentDraggedOver([]);
            setActiveComponentIndex(componentDraggedOverCopy);
            setComponentActive(element.type);
            setRows(rowsCopy);
        }
    }

    const deactivepreviouscomponents=(columns)=>{
        for(let i=0; i < columns.length; i++){
            for(let j=0; j< columns[i].components.length; j++){
                if(columns[i].components[j].active&&columns[i].components[j].type!="columns"){
                    columns[i].components[j].active = false;
                    return;
                }else if (columns[i].components[j].active&&columns[i].components[j].type=="columns"){
                    columns[i].components[j].active=false;
                    columns[i].components[j].showButtons=false;
                    columns[i].components[j].editable=false;
                    deactivepreviouscomponents(columns[i].components[j].columns);
                }
            }
        }
    }

    const makeComponentActive = (index)=>{
        return (childcomponentactive)=>{
          console.log(childcomponentactive);
          if(clickActive==""){
              let rowsCopy = [...rows];
              let activerowindex = _.findIndex(rowsCopy, (row)=>{return row.active})
              if(activerowindex>-1){
                rowsCopy[activerowindex].active = false;
                rowsCopy[activerowindex].showButtons = false;
                rowsCopy[activerowindex].editable = false;
                deactivepreviouscomponents(rowsCopy[activerowindex].columns);
              }
            
              rowsCopy[index].active = true;
              let componentactive = "";
              if(childcomponentactive.length>0){
                childcomponentactive[0] = {...childcomponentactive[0],
                  rowindex: index
              };
              let columns = rowsCopy[index].columns;
              for(let i=0; i < childcomponentactive.length; i++){
                if(i==(childcomponentactive.length-1)){
                    columns[childcomponentactive[i].columnindex].components[childcomponentactive[i].componentindex].active = true;
                    componentactive = columns[childcomponentactive[i].columnindex].components[childcomponentactive[i].componentindex].type;
                    if(componentactive=="columns"){
                        columns[childcomponentactive[i].columnindex].components[childcomponentactive[i].componentindex].active = true;
                        columns[childcomponentactive[i].columnindex].components[childcomponentactive[i].componentindex].showButtons = true;
                        columns[childcomponentactive[i].columnindex].components[childcomponentactive[i].componentindex].editable = true

                    }
                }else{
                    columns[childcomponentactive[i].columnindex].components[childcomponentactive[i].componentindex].active = true;
                    columns = columns[childcomponentactive[i].columnindex].components[childcomponentactive[i].componentindex].columns
                }
              }
            }else{
              rowsCopy[index].showButtons = true;
              rowsCopy[index].editable = true;
              childcomponentactive[0] = {...childcomponentactive[0],
                rowindex: index
              }
              componentactive = "columns"

            }
            setComponentActive(componentactive);
            setActiveComponentIndex(childcomponentactive);
            setRows(rowsCopy);
          }
        }    
    }

    const makeComponentDeactive = ()=>{
            let rowsCopy = [...rows];
            let activeComponentIndexCopy = [...activeComponentIndex];
            
            if(activeComponentIndexCopy[0].columnindex==undefined){
              rowsCopy[activeComponentIndexCopy[0].rowindex].active = false;
              rowsCopy[activeComponentIndexCopy[0].rowindex].showButtons = false;
              rowsCopy[activeComponentIndexCopy[0].rowindex].editable = false;
              setComponentActive("");
              setActiveComponentIndex([]);
            }else{
              let columns = rowsCopy[activeComponentIndexCopy[0].rowindex].columns;
              let componentactive = "";

              if(activeComponentIndexCopy.length==1){
                  if(columns[activeComponentIndexCopy[0].columnindex].components[activeComponentIndexCopy[0].componentindex].type == "columns"){
                    columns[activeComponentIndexCopy[0].columnindex].components[activeComponentIndexCopy[0].componentindex].showButtons = false;
                    columns[activeComponentIndexCopy[0].columnindex].components[activeComponentIndexCopy[0].componentindex].editable = false;
                    columns[activeComponentIndexCopy[0].columnindex].components[activeComponentIndexCopy[0].componentindex].active = false;
                  }else{
                    columns[activeComponentIndexCopy[0].columnindex].components[activeComponentIndexCopy[0].componentindex].active = false;
                  }
                  activeComponentIndexCopy[0] = {
                    rowindex: activeComponentIndexCopy[0].rowindex
                  }
                  setComponentActive("columns");
                  setActiveComponentIndex(activeComponentIndexCopy);
              }else{
                for(let i=0; i < activeComponentIndexCopy.length; i++){
                    if(i==(activeComponentIndexCopy.length-1)){
                        columns[activeComponentIndexCopy[i].columnindex].components[activeComponentIndexCopy[i].componentindex].active = false
                        if(columns[activeComponentIndexCopy[i].columnindex].components[activeComponentIndexCopy[i].componentindex].type=="columns"){
                          columns[activeComponentIndexCopy[i].columnindex].components[activeComponentIndexCopy[i].componentindex].showButtons = false;
                          columns[activeComponentIndexCopy[i].columnindex].components[activeComponentIndexCopy[i].componentindex].editable = false;
        
                        }
                    }else if(((activeComponentIndexCopy.length-2)>=0)&&(i==(activeComponentIndexCopy.length-2))){
                        componentactive = columns[activeComponentIndexCopy[i].columnindex].components[activeComponentIndexCopy[i].componentindex].type;
                    }
                }
                activeComponentIndexCopy.pop();
                setComponentActive(componentactive);
                setActiveComponentIndex(activeComponentIndexCopy);
              }
            }
            setRows(rowsCopy);
    }

    const setRow = (index)=>{
        return (row)=>{
            let rowsCopy = [...rows];
            rowsCopy[index] = row;
            setRows(rowsCopy)
        }
    }

    const handleDrop = (index)=>{
        return ( childcomponentover)=>{

            childcomponentover[0] = {...childcomponentover[0],
                                     rowindex: index
                                    }
            console.log(childcomponentover);
            setComponentDraggedOver(childcomponentover);
        }
    }

    const getActiveRow = ()=>{
      if(activeComponentIndex.length==1){
        return rows[activeComponentIndex[0].rowindex]
      }else{
        let components = rows[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components[activeComponentIndex[0].componentindex];
        for(let i=1; i< components.length; i++ ){
          components = components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex];
        }
        return components
      }

    }

    const setActiveRow = (row)=>{
      let rowsCopy = [...rows];
      if(activeComponentIndex.length==1){
        rowsCopy[activeComponentIndex[0].rowindex] = row;
      }else{
        let components = rows[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components[activeComponentIndex[0].componentindex];
        for(let i=1; i < activeComponentIndex.length; i++){
          if(i==(activeComponentIndex.length-1)){
            components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex] = row;
          }else{
            components = components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex];
          }
        }
      }
      setRows(rowsCopy);
    }

    const deleteComponent = ()=>{
      let rowsCopy = [...rows];
      
      if(activeComponentIndex.length==1){
        rowsCopy[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components.splice(activeComponentIndex[0].componentindex,1);
        setActiveComponentIndex([{
          rowindex: activeComponentIndex[0].rowindex
        }])
        setComponentActive("columns")
      }else{
        let activeComponentIndexCopy = [];
        let components = rowsCopy[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components[activeComponentIndex[0].componentindex];
        activeComponentIndexCopy.push({
          rowindex: activeComponentIndex[0].rowindex,
          columnindex: activeComponentIndex[0].columnindex,
          componentindex: activeComponentIndex[0].componentindex
        })
        for(let i=1; i < activeComponentIndex.length; i++){
          if(i==(activeComponentIndex.length-1)){
            components.columns[activeComponentIndex[i].columnindex].components.splice(activeComponentIndex[i].componentindex,1);
          }else{
            components = components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex];
            activeComponentIndexCopy.push({
              columnindex: activeComponentIndex[i].columnindex,
              componentindex: activeComponentIndex[i].componentindex
            })
          }
        }
        setActiveComponentIndex(activeComponentIndexCopy);
        setComponentActive("columns")
      }
      setRows(rowsCopy);
    }

    const setActiveComponentStyle = (style)=>{
      let rowsCopy = [...rows];
      if(activeComponentIndex.length==1){
        rowsCopy[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components[activeComponentIndex[0].componentindex]={...rowsCopy[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components[activeComponentIndex[0].componentindex],
                                                                                                                                                    style: style
                                                                                                                                                    }
      }else{
        let components = rowsCopy[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components[activeComponentIndex[0].componentindex];
        for(let i=0; i < activeComponentIndex.length; i++){
          if(i==(activeComponentIndex.length-1)){
              components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex] = {...components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex],
                                                                                                                            style: style
                                                                                                                            }
          }else{
            components =  components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex];
          }
        }
      }
      setRows(rowsCopy)
    }

    const getActiveComponentStyle = ()=>{
      if(activeComponentIndex.length==1){
        return rows[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components[activeComponentIndex[0].componentindex].style;
      }else{
        let components = rows[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components[activeComponentIndex[0].componentindex];
        for(let i=1; i < activeComponentIndex.length; i++){
          if(i==(activeComponentIndex.length-1)){
            return components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex].style;
          }else{
            components = components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex]
          }
        }
        
      }
    }

    const getActiveComponentSettings = ()=>{
      if(activeComponentIndex.length==1){
        return rows[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components[activeComponentIndex[0].componentindex].settings;
      }else{
        let components = rows[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components[activeComponentIndex[0].componentindex];
        for(let i=1; i < activeComponentIndex.length; i++){
          if(i==(activeComponentIndex.length-1)){
            return components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex].settings;
          }else{
            components = components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex]
          }
        }
        
      }
    }

    const setActiveComponentSettings = (settings)=>{
      let rowsCopy = [...rows];
      if(activeComponentIndex.length==1){
        rowsCopy[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components[activeComponentIndex[0].componentindex]={...rowsCopy[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components[activeComponentIndex[0].componentindex],
                                                                                                                                                    settings: settings
                                                                                                                                                    }
      }else{
        let components = rowsCopy[activeComponentIndex[0].rowindex].columns[activeComponentIndex[0].columnindex].components[activeComponentIndex[0].componentindex];
        for(let i=0; i < activeComponentIndex.length; i++){
          if(i==(activeComponentIndex.length-1)){
              components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex] = {...components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex],
                                                                                                                            settings: settings
                                                                                                                            }
          }else{
            components =  components.columns[activeComponentIndex[i].columnindex].components[activeComponentIndex[i].componentindex];
          }
        }
      }
      setRows(rowsCopy)
    }

    return(
        <div className="App">
            <div id="test" className="design-container">
                {rows.map((row, index)=>{
                    return (
                        <BuilderRow
                            row = {row}
                            setRow = {setRow(index)}
                            deleterowinternal = {deleterowinternal(index)}
                            handleDrop = {handleDrop(index)}
                            makeComponentActive = {makeComponentActive(index)}
                            makeComponentDeactive = {makeComponentDeactive}
                            setElementDragged = {setElementDragged}
                            deleteComponent = {deleteComponent}
                            addrowinternal = {addrowinternal(index)}
                            makerowactive = {makerowactive(index)}
                            setClickActive = {setClickActive}
                        >

                        </BuilderRow>
                    )
                })}
            </div>
            <div className="design-elements">
            {(componentActive=="")&&
              <>
                <div className='design-element-row'>
                    <div className='design-element' draggable 
                                                    onDragStart={()=>{setElementDragged("textbox")}}
                                                    onDragEnd = {()=>{onElementDragStop()}}
                                                    >
                      <img className='design-element-img' src={Text}></img>
                    </div>
                    <div className='design-element' draggable
                                                    onDragStart={()=>{setElementDragged("header")}}
                                                    onDragEnd = {()=>{onElementDragStop()}}

                    >
                      <img className='design-element-img' src={HeadingImage}></img>
                    </div>
                  </div>
                  <div className='design-element-row'>
                    <div className='design-element' draggable
                                                    onDragStart={()=>{setElementDragged("button")}}
                                                    onDragEnd = {()=>{onElementDragStop()}}

                    >
                      <img className='design-element-img' src={ButtonImage}></img>
                    </div>
                    <div className='design-element' draggable
                                                    onDragStart={()=>{setElementDragged("divider")}}
                                                    onDragEnd = {()=>{onElementDragStop()}}

                    >
                      <img className='design-element-img' src={Divider}></img>
                    </div>
                  </div>
                  <div className='design-element-row'>
                    <div className='design-element' draggable
                                                    onDragStart={()=>{setElementDragged("image")}}
                                                    onDragEnd = {()=>{onElementDragStop()}}

                    >
                      <img className='design-element-img' src={ImagePlaceHolder}></img>
                    </div>
                    <div className='design-element' draggable
                                                    onDragStart={()=>{setElementDragged("html")}}
                                                    onDragEnd = {()=>{onElementDragStop()}}

                    >
                      <img className='design-element-img' src={HtmlImage}></img>
                    </div>
                  </div>
                  <div className="design-element-row">
                    <div className="design-element" draggable
                                                    onDragStart={()=>{setElementDragged("menu")}}
                                                    onDragEnd= {()=>{onElementDragStop()}}
                                                    >
                      <img className="design-element-img" src={MenuItem}></img>
                    </div>
                    <div className="design-element" draggable
                                                    onDragStart={()=>{setElementDragged("columns")}}
                                                    onDragEnd = {()=>{onElementDragStop()}}
                                                    >
                        <img className="design-element-img" src={Columns}></img>
                    </div>
                  </div>
              </>
            }
            {(componentActive=="columns")&&
                <BuilderRowToolBar
                  row = {getActiveRow()}
                  setRow = {setActiveRow}
                  makeComponentDeactive = {makeComponentDeactive}

                >
                </BuilderRowToolBar>
            }
            {(componentActive=="textbox")&&
              <TextEditorAppToolbar closeComponent={makeComponentDeactive} deleteComponent={deleteComponent}></TextEditorAppToolbar>
            }
            {(componentActive=="button")&&
              <ButtonToolbar 
                  closeComponent={makeComponentDeactive} 
                  deleteComponent={deleteComponent}
                  style={getActiveComponentStyle()}
                  setStyle={setActiveComponentStyle}
                  settings={getActiveComponentSettings}
                  setSettings={setActiveComponentSettings}
                >
              </ButtonToolbar>
            }
            {(componentActive=="header")&&
              <HeadersToolBar
                  closeComponent={makeComponentDeactive} 
                  deleteComponent={deleteComponent}
                  style={getActiveComponentStyle()}
                  setStyle={setActiveComponentStyle}
                  settings={getActiveComponentSettings}
                  setSettings={setActiveComponentSettings}
              >
              </HeadersToolBar>
            }
            {(componentActive=="divider")&&
              <DividerToolBar
                  closeComponent={makeComponentDeactive} 
                  deleteComponent={deleteComponent}
                  style={getActiveComponentStyle()}
                  setStyle={setActiveComponentStyle}
                  settings={getActiveComponentSettings}
                  setSettings={setActiveComponentSettings}
              >
              </DividerToolBar>
            }
            {(componentActive=="menu")&&
              <MenuToolBar
                  closeComponent={makeComponentDeactive} 
                  deleteComponent={deleteComponent}
                  style={getActiveComponentStyle()}
                  setStyle={setActiveComponentStyle}
                  settings={getActiveComponentSettings}
                  setSettings={setActiveComponentSettings}
              ></MenuToolBar>
            }
            {(componentActive=="image")&&
              <ImageToolBar
                  closeComponent={makeComponentDeactive} 
                  deleteComponent={deleteComponent}
                  style={getActiveComponentStyle()}
                  setStyle={setActiveComponentStyle}
                  settings={getActiveComponentSettings}
                  setSettings={setActiveComponentSettings}
              >
              </ImageToolBar>
            }
            {(componentActive=="html")&&
              <HtmlToolBar
                  closeComponent={makeComponentDeactive} 
                  deleteComponent={deleteComponent}
                  style={getActiveComponentStyle()}
                  setStyle={setActiveComponentStyle}
                  settings={getActiveComponentSettings}
                  setSettings={setActiveComponentSettings}
              >
              </HtmlToolBar>
            }
            </div>
        </div>
    )
}


export default InterFaceContainer;