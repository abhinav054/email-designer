import AddIcon from "./images/add_icon.png";
import Remove from "./images/remove.png";
import Switch from './Switch';


const GeneralSettings  = ()=>{

    const detailColumnPadding = false;

    return (<div className="content-settings-row">
    <div className="content-settings-row-header">
        General
    </div>
    <div className="column-padding-settings">
          <div className="column-padding-settings-title">
            <div>
              Padding
            </div>
            <div>
              More Options <Switch value={false} onChange={()=>{}}></Switch>
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
                    
                  }}
                >
                  <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                </div>
                <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={0} onChange={(e)=>{}}></input>
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
                    
                  }}
                >
                  <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                </div>
                <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={0} onChange={(e)=>{}}></input>
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
                        
                      }}
                    >
                      <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                    </div>
                      <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={0} onChange={(e)=>{}}></input>
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
                    
                  }}
                >
                  <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                    </div>
                    <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={0} onChange={(e)=>{}}></input>
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
                        

                      }}
                    >
                      <img style={{width: "15px",height: "15px"}} src={Remove}></img>
                    </div>
                      <input style={{ height: "24px",border: "2px", "text-align": "center"}}min="0" max="90" type="number" value={0} onChange={(e)=>{}}></input>
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
</div>)
}


export default GeneralSettings;