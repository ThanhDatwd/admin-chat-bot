import { alpha, Avatar, styled } from '@mui/material';

const getStateStyles = (theme, state, useShadow, isSoft) => {
  let backgroundColor;
  let boxShadow;
  let color;
  const getColorAndShadow = (colorName, shadowStrength) => {
    const paletteColor = theme.palette[colorName];
    backgroundColor = isSoft ? alpha(paletteColor.main, 0.08) : paletteColor.main;
    color = isSoft ? paletteColor.main : paletteColor.contrastText;
    boxShadow = useShadow && !isSoft ? theme.shadows[shadowStrength] : undefined;
  };
  const shadowStrengths = {
    success: 2,
    error: 3,
    warning: 4,
    info: 5,
    primary: 1,
    secondary: 16,
  };
  switch (state) {
    case 'success':
    case 'error':
    case 'warning':
    case 'info':
    case 'primary':
    case 'secondary':
      getColorAndShadow(state, shadowStrengths[state]);
      break;
    case 'light':
      backgroundColor = alpha(theme.palette.common.white, 0.1);
      color = theme.palette.common.white;
      boxShadow = undefined;
      break;
    default:
      backgroundColor = theme.palette.background.paper;
      color = theme.palette.text.secondary;
      boxShadow = undefined;
      break;
  }
  return {
    backgroundColor,
    boxShadow,
    color,
  };
};
export const AvatarState = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'state' && prop !== 'useShadow' && prop !== 'isSoft',
})(({ theme, state, useShadow, isSoft }) => {
  const { backgroundColor, boxShadow, color } = getStateStyles(theme, state, useShadow, isSoft);
  return {
    backgroundColor,
    boxShadow,
    color,
  };
});
export const AvatarGradient = styled(Avatar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
  color: theme.palette.common.white,
}));
