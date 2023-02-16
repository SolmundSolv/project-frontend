import React, { useRef, useState } from "react";
import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  Modifier,
  RichUtils,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { ContentState } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const SimpleEditor = ({
  editorState,
  setEditorState,
}: {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}) => {
  //   const domEditorRef = useRef<Editor | null>(null);
  const onChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handlePastedText = (
    text: string,
    html: string | undefined,
    editorState: EditorState,
    onChange: (editorState: EditorState) => void
  ) => {
    const blockMap = ContentState.createFromText(text);
    const newContentState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      blockMap
    );
    onChange(EditorState.push(editorState, newContentState, "insert-fragment"));
    return true;
  };

  const handleChange = (state: EditorState) => {
    let newState = state;
    const content = newState.getCurrentContent();
    const raw = convertToRaw(content);
    const blockArray = raw.blocks;

    blockArray.forEach((block, i) => {
      const text = block.text;
      const charArray = Array.from(text);

      charArray.forEach((char, j) => {
        if (char === "{" && charArray[j + 1] === "{") {
          const start = j;
          let end = start + 1;
          while (charArray[end] !== "}" || charArray[end + 1] !== "}") {
            end++;
            if (end === charArray.length) {
              break;
            }
          }

          const textStart = block.text.slice(0, start);
          const textEnd = block.text.slice(end + 2);
          const boldText = block.text.slice(start, end + 2);

          block.text = textStart + boldText + textEnd;

          if (!block.inlineStyleRanges) {
            block.inlineStyleRanges = [];
          }

          block.inlineStyleRanges.push({
            offset: start,
            length: boldText.length,
            style: "BOLD",
          });
        }
      });

      raw.blocks[i] = block;
    });

    const newContent = convertFromRaw(raw);
    const selection = newState.getSelection();
    newState = EditorState.push(newState, newContent, "insert-characters");
    newState = EditorState.acceptSelection(newState, selection);
    newState = EditorState.forceSelection(newState, selection);
    setEditorState(newState);
  };

  return (
    <div>
      <div className="min-h-[300px] border">
        {typeof window !== undefined && (
          <Editor
            editorState={editorState}
            onEditorStateChange={handleChange}
            handleKeyCommand={handleKeyCommand}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class border min-h-[300px]"
            toolbarClassName="toolbar-class"
          />
        )}
      </div>
    </div>
  );
};

export default SimpleEditor;
