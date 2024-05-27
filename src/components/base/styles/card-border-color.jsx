import { Card, styled } from '@mui/material';

export const CardBorderColor = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'borderColor' && prop !== 'borderPosition',
})(({ theme, borderColor, borderPosition }) => {
  const computedColor = borderColor ? theme.palette[borderColor].main : theme.palette.primary.main;
  const defaultBorderPosition = borderPosition || 'bottom';
  const styles = {
    position: 'relative',
    overflow: 'visible',
    '&::before': {
      position: 'absolute',
      content: '""',
      height: '6px',
      left: '-1px',
      width: 'calc(100% + 2px)',
      backgroundColor: computedColor,
      ...(defaultBorderPosition === 'top'
        ? {
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit',
            top: '-1px',
          }
        : {
            bottom: '-2px',
            borderBottomLeftRadius: 'inherit',
            borderBottomRightRadius: 'inherit',
          }),
    },
  };
  return styles;
});
