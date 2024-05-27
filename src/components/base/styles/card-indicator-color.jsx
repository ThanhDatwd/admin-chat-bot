import { Card, styled } from '@mui/material';

export const CardIndicatorColor = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'indicatorColor' && prop !== 'borderPosition',
})(({ theme, indicatorColor }) => {
  const computedColor = indicatorColor
    ? theme.palette[indicatorColor].main
    : theme.palette.primary.main;
  const styles = {
    position: 'relative',
    overflow: 'visible',
    '&::before': {
      borderRadius: 'inherit',
      position: 'absolute',
      content: '""',
      height: '60%',
      top: '20%',
      left: -4,
      width: 7,
      backgroundColor: computedColor,
    },
  };
  return styles;
});
