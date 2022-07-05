import { Backdrop } from '@mui/material'
import React from 'react'
import { SpinnerDotted } from 'spinners-react'

function SpinnerWithBackdrop(props: { loading: boolean }) {
  const loading = props.loading
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <SpinnerDotted
        size={100}
        thickness={150}
        speed={100}
        color="#fe4500"
        // secondaryColor="rgba(0, 0, 0, 1)"
      />
    </Backdrop>
  )
}

export default SpinnerWithBackdrop
