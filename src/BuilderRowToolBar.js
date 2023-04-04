import { useState } from "react"
import { PopoverPicker } from './ColorPicker';
import PaddingResizer from './PaddingResizer';
import BorderResizer from './BorderResizer';
import Close from "./images/close.png";

const BuilderRowToolBar = ({row, setRow, makeComponentDeactive})=>{

    const [columnsettingsactive,setColumnsettingsactive] = useState(0);
    const [columnBackground, setColumnBackground] = useState("color");
    const [rowBackground,setRowBackground] = useState("color");
  
    const toggleColumns = ()=>{

    }

    const setActiveColumnStyle = ()=>{

    }

    const setActiveRowStyle = ()=>{

    }

    const getColumnBackgroundColor = ()=>{
      return {
        color: "",
        active: false
      }
    }

    const changeColumnBackground = ()=>{

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
                  <div className='single-row' onClick={()=>{toggleColumns("1")}}>
                    {(row.columns.length==1)?
                      <div className="block-show-active">
                      </div>:
                      <div className="block-show">
                      </div>
                    }
                    
                  </div>
                  <div className='double-row' onClick={()=>{toggleColumns("2")}}>
                    {(row.columns.length==2)?
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
                  {(row.columns.length==3)?
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
                    {row.columns.map((c,index)=>{
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
                                color={getColumnBackgroundColor(columnsettingsactive).color} 
                                active={getColumnBackgroundColor(columnsettingsactive).active}
                                onChange={changeColumnBackground(columnsettingsactive)}
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
                                color={"#ffffff"} 
                                active={true}
                                onChange={()=>{}}
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