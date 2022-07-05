import { Backdrop } from '@mui/material'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { SpinnerDotted } from 'spinners-react'
import SpinnerWithBackdrop from './SpinnerWithBackdrop'
// import RichTextEditorReusable from './RichTextEditorReusable'
// import { EditorValue } from 'react-rte'

interface Props {
  comment: string | null
  handleCommentChange: (comment: string) => void
  commentDisabled: boolean
  onSubmit: () => void
  loading: boolean
}

const RichTextEditorReusable = dynamic(
  () => import('./RichTextEditorReusable'),
  {
    ssr: false,
  }
) as any

// ... use <ReactRTE /> as your component.
function CommentBox(props: Props) {
  const { comment, commentDisabled, handleCommentChange, onSubmit, loading } =
    props

  const controls = [
    ['bold', 'italic', 'underline', 'link', 'image'],
    ['unorderedList'],
    ['sup', 'sub'],
    ['alignLeft', 'alignCenter', 'alignRight'],
  ]
  const placeholder = 'What are your thoughts?'

  // console.log('here is comment', comment, commentDisabled)
  return (
    <div className="mr-[5%] flex-1">
      <RichTextEditorReusable
        inValue={comment}
        onValueChange={handleCommentChange}
        controls={controls}
        placeholder={placeholder}
      />
      <div className="flex justify-end">
        <button
          className="m-1 rounded-3xl bg-basicTheme px-4 py-[1px] font-sans text-[14px] font-semibold tracking-wide text-white disabled:cursor-not-allowed disabled:bg-disabled disabled:text-gray-200"
          disabled={commentDisabled}
          onClick={onSubmit}
        >
          {!loading && `Comment`}
          {loading && <div>Loading</div>}
        </button>
      </div>
      <SpinnerWithBackdrop loading={loading} />
    </div>
  )
}

export default CommentBox
