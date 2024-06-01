import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import React from 'react';

export const InputOutline = (props) => {
  const { value, name, onChange, id, label, type, error = false, ...rest } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl
      fullWidth
      variant="outlined"
    >
      <Typography
        variant="h6"
        gutterBottom
        component="label"
        htmlFor={id}
        fontWeight={500}
      >
        {label}
      </Typography>
      <OutlinedInput
        error={error}
        type={showPassword ? 'text' : type}
        onChange={onChange}
        value={value}
        {...rest}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {type === 'password' ? showPassword ? <VisibilityOff /> : <Visibility /> : ''}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
