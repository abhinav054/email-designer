

const BuilderRowToolBar = ({position, setRows})=>{


    



    return(
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
        
      </div>
    )
}