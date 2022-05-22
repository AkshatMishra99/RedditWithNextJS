import React, { useState } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import AutoComplete from '@mui/material/Autocomplete'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import useMediaQuery from '@mui/material/useMediaQuery'
import { alpha, styled } from '@mui/material/styles'
import { Input } from '@mui/material'

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F6F7F8',
    padding: '0px 20px',
    '& fieldset': {
      borderColor: 'rgba(0,0,0,0.1)',
    },
    '&:hover fieldset': {
      border: '1px solid #0079D3',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #0079D3',
    },
  },
})

function SearchBar() {
  const [options, setOptions] = useState([])
  const handleSearch = (value: string) => {}
  const onSelect = (value: string) => {}

  return (
    <AutoComplete
      options={options}
      sx={{ flex: '1' }}
      renderInput={(params) => (
        <CssTextField
          placeholder="Search Reddit"
          {...params}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon></SearchIcon>
              </InputAdornment>
            ),
          }}
        />
      )}
    ></AutoComplete>
  )
}

export default SearchBar
