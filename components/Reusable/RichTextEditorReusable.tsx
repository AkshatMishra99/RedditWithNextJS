import React, { useEffect, useState } from 'react'
import { ContentState, convertToRaw, EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Editor } from 'react-draft-wysiwyg'

interface EditorProps {
  inValue: string | null
  onValueChange: (val: string) => void
  placeholder: string
  controls: any
}

export const ReusableEditor: React.FC<EditorProps> = ({
  inValue,
  onValueChange,
  placeholder,
  controls,
}) => {
  const [value, setValue] = useState(
    inValue
      ? EditorState.createWithContent(ContentState.createFromText(inValue))
      : EditorState.createEmpty()
  )
  useEffect(() => {
    if (inValue === null) {
      setValue(EditorState.createEmpty())
    }
  }, [inValue])
  console.log('this is the incoming value', inValue)
  const onChange = (newValue: EditorState) => {
    setValue(newValue)
    onValueChange(newValue.getCurrentContent().getPlainText('\u0001'))
  }
  return (
    Editor && (
      <Editor
        editorState={value}
        onEditorStateChange={onChange}
        placeholder={placeholder}
        wrapperClassName=""
        editorClassName="border-[1px] p-300 !h-[170px]"
        toolbarClassName=""
      />
    )
  )
}

export default ReusableEditor
