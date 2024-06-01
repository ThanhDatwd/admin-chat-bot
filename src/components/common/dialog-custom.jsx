import { useTheme } from '@emotion/react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Slide, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { forwardRef } from 'react'

const Transition = forwardRef(function Transition(props, ref) {
    return (
      <Slide
        direction="down"
        ref={ref}
        {...props}
      />
    );
  });
  

export const DialogCustom = (props) => {
    const {
      children,
      title,
      canReset,
      onClose,
      onUpdate,
      onReset,
      hiddenLayoutsSection,
      open,
      values = {},
      actions,
      ...other
    } = props;
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));


    return (
        <>
          <Dialog
            onClose={onClose}
            open={open}
            TransitionComponent={Transition}
            fullScreen={!mdUp}
            scroll="paper"
            aria-labelledby="basic-dialog-title"
            maxWidth="lg"
            fullWidth
            {...other}
          >
            <DialogTitle
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={600}
                >
                  {title}
                </Typography>
              </Box>
            </DialogTitle>
            <Divider />
            <Stack
              spacing={0}
              direction="row"
              height="100%"
              overflow="hidden"
            >
              <DialogContent
                sx={{
                  overflowX: 'hidden',
                  p: 3,
                }}
              >
                {children}
              </DialogContent>
            </Stack>
            <Divider />
            <DialogActions
              sx={{
                flexDirection: {
                  xs: 'column-reverse',
                  sm: 'row',
                },
                '& > :not(:first-of-type)': {
                  marginLeft: {
                    xs: 0,
                    sm: theme.spacing(1),
                  },
                  marginBottom: {
                    xs: theme.spacing(1),
                    sm: 0,
                  },
                },
              }}
            >
              {actions}
            </DialogActions>
          </Dialog>
        </>
      );
    };

