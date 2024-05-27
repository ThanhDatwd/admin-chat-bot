import { useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

export const useSidebarDrawer = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [open, setOpen] = useState(lgUp);
  const screenResize = useCallback(() => {
    if (!lgUp) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [lgUp]);
  useEffect(() => {
    screenResize();
  }, [lgUp]);
  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  return {
    handleToggle,
    handleClose,
    handleOpen,
    open,
  };
};
