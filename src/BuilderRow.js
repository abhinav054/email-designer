


const BuilderRow = ({row, setRows, index, setComponentActive})=>{

    const handleDrop = (cindex)=>{
      if(row.active){
        let rowCopy = {...row};
        setRows((prev)=>{
          let prevCopy = [...prev];
          prevCopy[index] = rowCopy;
          return prevCopy;
        })
      }
    }


    const makeComponentActive = (columnindex, componentindex)=>{
      let rowCopy = {...row};
      let componentCopy = {...rowCopy.columns[columnindex].components[componentindex]};
      if(rowCopy.columns[columnindex].components[componentindex].type=="textbox"){
        componentCopy.active = true;
        setComponentActive("textbox");
      }
      if(rowCopy.columns[columnindex].components[componentindex].type=="button"){
        componentCopy.active = true;
        setComponentActive("button")
      }
      if(rowCopy.columns[columnindex].components[componentindex].type=="header"){
        componentCopy.active = true;
        setComponentActive("header");
      }
  
      if(rowCopy.columns[columnindex].components[componentindex].type=="divider"){
        componentCopy.active = true;
        setComponentActive("divider");
      }
      
      if(rowCopy.columns[columnindex].components[componentindex].type=="menu"){
        componentCopy.active = true;
        setComponentActive("menu");
      }
  
      if(rowCopy.columns[columnindex].components[componentindex].type=="image"){
        componentCopy.active = true;
        setComponentActive("image");
      }
  
      if(rowCopy.columns[columnindex].components[componentindex].type=="html"){
        componentCopy.active = false;
        setComponentActive("html"); 
      }
  
  
  
      if(activeComponentSettings.rowIndex!=rowindex||activeComponentSettings.columnIndex!=columnindex||activeComponentSettings.columnIndex!=componentindex){
        rowCopy = makeComponentDeactiveRows(rowsCopy);
      }
      
      
      row.columns[columnindex].components[componentindex] = componentCopy;
  


    }


    



    return (
      <>
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
                        onDrop={()=>{handleDrop(cindex)}}
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
                                <ButtonComponent active={c.active} style={c.style}></ButtonComponent>
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
                                  <DividerComponent style={c.style}></DividerComponent>
                                </div>

                              }

                              {c.type=="menu"&&
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
                                  <MenuComponent style={c.style} settings={c.settings} menuBarStyle={c.menuBarStyle}></MenuComponent>
                                </div>
                              }
                              {c.type=="image"&&
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
                                  <ImageComponent style={c.style} settings={c.settings}></ImageComponent>
                                </div>
                              }
                              {c.type=="html"&&

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
                                  <div dangerouslySetInnerHTML={{__html: c.settings.html}}></div>
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

      </>
        

    )

}