import { FormControl, MenuItem, Select, Typography } from '@mui/material';

export const SelectCustom = (props) => {
  const { value, onChange, options = [], label = false, error=false, errorMessage } = props;
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
      <Select
        value={value}
        onChange={onChange}
        error={error}
        
        MenuProps={{
          // PaperProps: {
          //   onScroll: loadMoreItems,
          // },
          style: {
            maxHeight: 300,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.title}
            value={option.value}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pr: 1,
            }}
          >
            {option.title}
            {/* {value === option.value && (
              <Box display="flex">
                <CheckRounded fontSize="small" />
              </Box>
            )} */}
          </MenuItem>
        ))}
      </Select>
      {errorMessage && (
        <Typography color="error">{errorMessage}</Typography>
      )}
    </FormControl>
  );
};
