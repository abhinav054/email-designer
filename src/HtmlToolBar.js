
import ToolbarHeaders from "./ToolbarHeaders";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-haml';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { useState } from "react";

import "./HtmlToolBar.css";
import GeneralSettings from "./ComponentGeneralSettings";

const HtmlToolBar = ({closeComponent, deleteComponent, settings, setSettings})=>{


    const hightlightWithLineNumbers = (input, language) =>
        highlight(input, language)
        .split("\n")
        .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
        .join("\n");

    return(
        <div className="blocks-content">
            <ToolbarHeaders closeComponent={closeComponent} deleteComponent={deleteComponent}></ToolbarHeaders>
            <div>
                <div className="content-settings-row-header">
                    HTML
                </div>
                <div style={{minHeight: 300}}>
                <Editor
                    value={settings.html}
                    onValueChange={html => setSettings({...settings,
                                                        html:html
                                                        })}
                    highlight={code =>
                        hightlightWithLineNumbers(code, languages.js)
                      }
                    padding={10}
                    textareaId="codeArea"
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        minHeight: 300
                    }}
                    className="editor"
                />
                </div>
            </div>
            <GeneralSettings></GeneralSettings>
        </div>
    )
}

export default HtmlToolBar;