
import AddIcon from "./images/add_icon.png";
import DeleteForever from "./images/delete_forever.png";
import Close from "./images/close.png";
import Content from "./images/content.png";
import Body from "./images/body.png";
import Remove from "./images/remove.png";
import ButtonToolbar from './ButtonToolbar';
import PaddingResizer from './PaddingResizer';
import TextBoxComponent from "./TextBoxComponent";
import HeaderComponent from './HeaderComponent';
import DividerComponent from './DividerComponent';
import MenuComponent from './MenuComponent';
import ImageComponent from './ImageComponent';
import ButtonComponent from './ButtonComponent';
import { rowStyle, columnStyle , ButtonStyle, HeaderStyle, DividerStyle, MenuItemStyle, MenuBarStyle, ImageStyle} from './StyleConsts';
import * as _ from "lodash";

const BuilderRow = ({
                      row,
                      setRow, 
                      addrowinternal,
                      deleterowinternal,
                      handleDrop, 
                      makeComponentActive,
                      makerowactive
                    })=>{



    const setRowInternal = (index, cindex)=>{
      return (row)=>{
        let rowCopy = {...row};
        rowCopy.columns[index].components[cindex] = row;
        setRow(rowCopy);
      }
    }

    const setRowActive = ()=>{
      let rowCopy = {...row};
      rowCopy.active = true;
      rowCopy.showButtons = true;
      // setComponentActive("columns")
      // setRow(rowCopy);
    }
    
    const setRowEditable = ()=>{

    } 

    const handleChildDrop = (cindex, componentindex)=>{
        return (childcomponentoverdragged)=>{
          let childcomponentoverdraggedover = [{
            columnindex: cindex,
            componentindex: componentindex
          }].concat(childcomponentoverdragged);
          console.log(childcomponentoverdraggedover);
          handleDrop(childcomponentoverdraggedover);
        }
    }

    const makeParentComponentActive = (columnindex, componentindex)=>{
        let activeToolBarCopy = [
          {
            columnindex: columnindex,
            componentindex: componentindex
          }
        ]
        makeComponentActive(activeToolBarCopy);

    }

    const childrowadd = (columnindex, componentindex)=>{
      return (childrowindex,position)=>{
        if(position=="upper"){
          let childrowindexcopy = [{
            columnindex: columnindex,
            componentindex: componentindex-1
          }].concat(childrowindex);
          addrowinternal(childrowindexcopy,null)
        }else if(position=="lower"){
          let childrowindexcopy = [{
            columnindex: columnindex,
            componentindex: componentindex+1
          }].concat(childrowindex);
          addrowinternal(childrowindexcopy,null)
        }else{
          let childrowindexcopy = [{
            columnindex: columnindex,
            componentindex: componentindex
          }].concat(childrowindex);
          addrowinternal(childrowindexcopy,null)
        }
        
      }
    }

    const makechildrowactive = (columnindex, componentindex)=>{
      return (childrowindex)=>{
        let childrowindexcopy = [{
          columnindex: columnindex,
          componentindex: componentindex
        }].concat(childrowindex);
        makerowactive(childrowindexcopy);
      }
    }

    const childrowdelete = (columnindex, componentindex)=>{
      return (childrowindex)=>{
        let childrowindexcopy = [{
            columnindex: columnindex,
            componentindex: componentindex
        }].concat(childrowindex);
        deleterowinternal(childrowindexcopy)
      }
    }


    const makeChildComponentActive = (columnindex, componentindex)=>{
      return (childcomponentactive)=>{
        let childcomponentactivecopy = [{columnindex: columnindex, componentindex: componentindex}].concat(childcomponentactive);
        makeComponentActive(childcomponentactivecopy); 
      }
    }

    const handleRowDrop = (cindex)=>{
      
      let columncopy = {...row.columns[cindex]};
      
      let childrowexists = _.findIndex(columncopy.components,(c)=>{return c.type=="columns"});

      if(childrowexists==-1){
        let childcomponentoverdragged = [];
        childcomponentoverdragged.push({
          columnindex: cindex
        })
        handleDrop(childcomponentoverdragged);
      }

    }

    const handleDragOver = (event)=>{
      event.preventDefault();
    }

    const handleDragEnter = ()=>{

    }

    const handleDragExit = ()=>{

    }


    return (
      <>
        <div className={row.active?"builder-row active":"builder-row"}  
              onMouseEnter={()=>{setRowActive()}}

              onMouseLeave={()=>{}}

              onClick={()=>{makerowactive([])}}
          >

            {row.showButtons&&
              <>
                <div className="upper-add-button" onClick={()=>{addrowinternal([],"upper")}}>
                  <img src={AddIcon} style={{width: 20}}></img>
                </div>
                <div className="lower-add-button" onClick={()=>{addrowinternal([],"lower")}}>
                  <img src={AddIcon} style={{width: 20}}></img>
                </div>
                <div className='delete-button' onClick={()=>{}}>
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
                        onDrop={()=>{handleRowDrop(cindex)}}
                        onDragOver = {handleDragOver}
                        onDragEnter={
                          handleDragEnter
                        }
                        onDragExit={handleDragExit}
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
                                   }}
                                  onMouseLeave={()=>{
                                  }}

                                  onClick={()=>{
                                    
                                  }}
                                >
                                  {c.type=="textbox"&&c.active==true&&
                                    <TextBoxComponent>
                                    </TextBoxComponent>
                                  }
                                  {c.type=="textbox"&&c.active==false&&
                                    <div dangerouslySetInnerHTML={{__html: c.settings.html}}>
                                    </div>
                                  }
                                </div>
                              }   
                              {c.type=="button"&&
                                <div
                                className={(c.hoveractive&&c.active==false)&&"component-active"}
                                onMouseEnter={()=>{
                                  
                                }}
                                onMouseLeave={()=>{
                                  
                                }}

                                onClick={()=>{
                                  makeParentComponentActive(cindex, componentindex)
                                }}
                              >
                                <ButtonComponent active={c.active} style={c.style}></ButtonComponent>
                              </div>
                              }
                              {c.type=="header"&&
                                <div
                                  className={(c.hoveractive&&c.active==false)&&"component-active"}
                                  onMouseEnter={()=>{
                                    }}
                                  onMouseLeave={()=>{
                                  }}

                                  onClick={()=>{
                                    makeParentComponentActive(cindex, componentindex)
                                  }}
                                >
                                  <HeaderComponent active={c.active} style={c.style} settings={c.settings}></HeaderComponent>
                                </div>
                              }
                              {c.type=="divider"&&
                                <div
                                  className={(c.hoveractive&&c.active==false)&&"component-active"}
                                  onMouseEnter={()=>{
                                  }}
                                  onMouseLeave={()=>{
                                  }}

                                  onClick={()=>{
                                    makeParentComponentActive(cindex, componentindex)
                                  }}
                                >
                                  <DividerComponent style={c.style}></DividerComponent>
                                </div>
                              }

                              {c.type=="menu"&&
                                <div
                                  className={(c.hoveractive&&c.active==false)&&"component-active"}
                                  onMouseEnter={()=>{

                                  }}
                                  onMouseLeave={()=>{
                                  }}

                                  onClick={()=>{
                                    makeParentComponentActive(cindex, componentindex)
                                  }}
                                >
                                  <MenuComponent style={c.style} settings={c.settings} menuBarStyle={c.menuBarStyle}></MenuComponent>
                                </div>
                              }
                              {c.type=="image"&&
                                <div
                                  className={(c.hoveractive&&c.active==false)&&"component-active"}
                                  onMouseEnter={()=>{
                                  }}
                                  onMouseLeave={()=>{
                                  }}

                                  onClick={()=>{
                                    makeParentComponentActive(cindex, componentindex)
                                  }}
                                >
                                  <ImageComponent style={c.style} settings={c.settings}></ImageComponent>
                                </div>
                              }
                              {c.type=="html"&&

                                <div
                                  className={(c.hoveractive&&c.active==false)&&"component-active"}
                                  onMouseEnter={()=>{
                                  }}
                                  onMouseLeave={()=>{
                                  }}

                                  onClick={()=>{
                                    makeParentComponentActive(cindex, componentindex)
                                  }}
                                >
                                  <div dangerouslySetInnerHTML={{__html: c.settings.html}}></div>
                                </div>
                              }
                              {c.type=="columns"&&
                                <BuilderRow
                                  row={c} 
                                  setRow = {setRowInternal(cindex, componentindex)}
                                  deleterowinternal = {childrowdelete(cindex, componentindex)}
                                  addrowinternal = {childrowadd(cindex,componentindex)}
                                  handleDrop={handleChildDrop(cindex, componentindex)} 
                                  makeComponentActive={makeChildComponentActive(cindex, componentindex)}
                                  makerowactive = {makechildrowactive(cindex, componentindex)}
                                  
                                  ></BuilderRow>
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
      </>
    )
}

export default BuilderRow;