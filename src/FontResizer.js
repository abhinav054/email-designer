import Remove from "./images/remove.png";
import AddIcon from "./images/add_icon.png";

const FontSizer = ({val, setval, max , min, increment})=>{

    return(
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
                onClick={()=>
                            {
                                let v = parseFloat(val);
                                v = v-parseFloat(increment);
                                setval(v);
                            }
                        }
            >
                <img style={{width: "15px",height: "15px"}} src={Remove}></img>
            </div>
                <input  style={{ height: "24px",border: "2px", "text-align": "center"}} 
                        min={min} 
                        max={max} 
                        type="number" 
                        value={val} 
                        onChange={(e)=>{setval(e.target.value)}}></input>
            <div 
                style={{
                        "width": "24px",
                        "height": "24px",
                        "background": "rgb(238, 238, 238)",
                        "display": "flex",
                        "align-items": "center",
                        "justify-content": "center"
                    }}
                onClick={()=>
                            {
                                let v = parseFloat(val);
                                v = v+parseFloat(increment);
                                setval(v);
                            }
                        }
            >
                <img style={{width: "15px",height: "15px"}} src={AddIcon}></img>
            </div>
        </div>
    )
}

export default FontSizer;