import Toolbar from './TextEditorToolbar';
import {TextColorPicker} from "./TextColorPicker";
import { useState, useRef, useEffect } from 'react';
import { Editor,EditorState, RichUtils, Modifier, convertToRaw , CompositeDecorator} from "draft-js";




function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}


const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{color: "blue"}}>
      {props.children}
    </a>
  );
};

function TextEditor({
    editorState, 
    setEditorState, 
    customStyleState, 
    setCustomStyleState,
    textcolor,
    backgroundColor,
    fontsize
  }) {

  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

  const [urlValue, setUrlValue] = useState("");

  const [linkPopup, setLinkPopup] = useState(false);

  const editor = useRef(null);

  

  // const styles = {
  //   editor: {
  //     border: "1px solid gray",
  //     minHeight: "6em"
  //   }
  // };

  const [editorStyle, setEditorStyle] = useState({
    "border": "1px solid gray",
    "minHeight": "1em",
    "textAlign": "left",
    "background": "#fff",
    "margin": "5px",
    "padding": "5px"
  })
  


  function focusEditor() {
    editor.current.focus();
  }

  useEffect(() => {
    focusEditor();
  }, []);

  useEffect(()=>{
    
  },[editorState])

  const promptForLink = (e) =>{
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      setUrlValue(url);
      setLinkPopup(true);

      // this.setState({
      //   showURLInput: true,
      //   urlValue: url,
      // }, () => {
      //   setTimeout(() => this.refs.url.focus(), 0);
      // });
    }
  }


  const confirmLink = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: urlValue}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    
    // Apply entity
    let nextEditorState = EditorState.set(editorState, 
      { currentContent: contentStateWithEntity }
    );

    // Apply selection
    nextEditorState = RichUtils.toggleLink( nextEditorState, 
      nextEditorState.getSelection(), entityKey 
    );
    
    setEditorState(nextEditorState);
    setLinkPopup(false);
    setUrlValue("");
    // this.setState({
    //   editorState: nextEditorState,
    //   showURLInput: false,
    //   urlValue: '',
    // }, () => {
    //   setTimeout(() => this.refs.editor.focus(), 0);
    // });
  }

  const removeLink = (e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null))
    }
  }


  const toggleInlineStyle = inlineStyle => {
    editor.current.focus();
    let selectionState = editorState.getSelection();
    if(selectionState.isCollapsed()){
      const newState = EditorState.moveFocusToEnd(editorState);
      const newStateCopy = RichUtils.toggleInlineStyle(newState, inlineStyle);
      setEditorState(newStateCopy);  
    }else{
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
    }
  };


  const toggleBlockType = blockStyle =>{
    const newState = RichUtils.toggleBlockType(editorState, blockStyle);
    setEditorState(newState);
  }

  const removeInlineStyle = inlineStyle => {

    const newState = Modifier.removeInlineStyle(editorState.getCurrentContent(),  editorState.getSelection(), inlineStyle);
    console.log(convertToRaw(newState));
    setEditorState(EditorState.createWithContent(newState));

  }

  return (
    <div className="text-editor">
        <Toolbar 
            toggleInlineStyle={toggleInlineStyle} 
            removeInlineStyle={removeInlineStyle} 
            toggleBlockType={toggleBlockType} 
            customStyleState={customStyleState} 
            setCustomStyleState={setCustomStyleState}
            editorStyle={editorStyle}
            setEditorStyle={setEditorStyle}
            promptForLink={promptForLink}
            confirmLink={confirmLink}
            removeLink={removeLink}
            linkPopup={linkPopup}
            setLinkPopup={setLinkPopup}
            urlValue={urlValue}
            setUrlValue={setUrlValue}
            editorState={editorState}
            textColor={textcolor}
            backColor={backgroundColor}
            fontsize={fontsize}
          ></Toolbar>
        <div style={editorStyle}>
          <Editor
            ref={editor}
            customStyleMap={customStyleState}
            editorState={editorState}
            onChange={editorState => setEditorState(editorState)}
          />
        </div>
    </div>
  );
}

export default TextEditor;
