import { useState , useEffect} from "react"
import {stateToHTML} from 'draft-js-export-html';


const TextBoxComponent = ({active,style, settings, setSettings})=>{

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

    
    const [mounted, setMounted] = useState(false);

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



    







    // useEffect(()=>{
        
    //     if(mounted==true){
    //         handleTextBoxStyleInit();
    //     }
        
    //     return ()=>{
    //         setMounted(false)
    //     }
    // },[mounted])



    const handleTextEditorState = (editorState)=>{
        
        const html = stateToHTML(editorState.getCurrentContent(), {inlineStyles:transformTextBoxStyles()});
        
        let settingsCopy = {...settings,
                            editorState: editorState,
                            html: html                       
                            }
        
        setSettings(settingsCopy);
    }

    return(
        <>
            {active==true&&
                <TextEditor 
                    editorState={settings.editorState} 
                    setEditorState={handleTextEditorState}
                    customStyleState={customStyleState}
                    setCustomStyleState={setCustomStyleState}
                    textColor={style.textColor}
                    backColor={style.backColor}
                    fontsize={"FONT_SIZE_"+style.fontSize.replace("px","")}
                ></TextEditor>
            }
            {active==false&&
                <div dangerouslySetInnerHTML={{__html: settings.html}}>
                </div>
            }
        </>
    )

}

export default TextBoxComponent;