import { FormControl, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function AutocompleteCustom(props) {
  const { value, onChange, options = [], label, placeholder, error = false } = props;

  return (
    <FormControl
      fullWidth
      variant="outlined"
    >
      <Typography
        variant="h6"
        gutterBottom
        component="label"
        fontWeight={500}
      >
        {label}
      </Typography>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        onChange={(event, newValue) => onChange(newValue)}
        // value={[...options].find((item) => item.value === value)?.label}
        options={options}
        sx={{ width: '100%' }}
        renderInput={(params) => (
          <TextField
          placeholder={placeholder}
          sx={{
              '& .css-bda1wc-MuiOutlinedInput-notchedOutline': {
                border: `1px solid ${error ? 'red' : 'inherit'} !important`,
              },
            }}
            {...params}
          />
        )}
      />
    </FormControl>
  );
}
