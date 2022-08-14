import { Skeleton } from '@mui/material'
import React from 'react'

function CommentLoader() {
  return (
    <div>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="rectangular" width={210} height={60} />
    </div>
  )
}

export default CommentLoader
