import { Box, useTheme } from '@mui/material';
import { Scrollbar } from 'src/components/base/scrollbar';

export const ScrollableContainer = (props) => {
  const { height, children, useCustomScrollbar, ...other } = props;
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const content = useCustomScrollbar ? (
    <Scrollbar dark={isDarkMode}>{children}</Scrollbar>
  ) : (
    children
  );
  return (
    <Box
      overflow="auto"
      height={height ? height : 256}
      {...other}
    >
      {content}
    </Box>
  );
};
export default ScrollableContainer;
