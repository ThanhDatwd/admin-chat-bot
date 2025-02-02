import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import {
  alpha,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { AvatarState } from 'src/components/base/styles/avatar';
import { ButtonIcon } from 'src/components/base/styles/button-icon';
import AlertDialogContent from './alert-dialog-content';

const DialogConfirmDelete = (props) => {
  const { onConfirm, children } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleNotificationClick = () => {
    // setOpen(false);
    toast.custom(
      (t) => (
        <Card
          elevation={21}
          className={`${t.visible ? 'animate-enter' : 'animate-leave'}`}
        >
          <Box
            sx={{
              position: 'relative',
              minWidth: 320,
              maxWidth: 340,
            }}
          >
            <IconButton
              color="primary"
              sx={{
                p: 0.2,
                position: 'absolute',
                right: (theme) => theme.spacing(1),
                top: (theme) => theme.spacing(1),
              }}
              size="small"
              onClick={() => toast.dismiss(t.id)}
            >
              <CloseRoundedIcon fontSize="inherit" />
            </IconButton>
            <Box
              sx={{
                px: 2,
                py: 1.5,
                display: 'flex',
                transition: 'none',
                alignItems: 'flex-start',
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.01),
                },
              }}
            >
              <AvatarState
                state="error"
                variant="rounded"
                useShadow
                sx={{
                  width: 40,
                  height: 40,
                  mt: 0.4,
                }}
              >
                <WarningAmberRoundedIcon fontSize="small" />
              </AvatarState>
              <Box
                ml={1.5}
                flex={1}
                pt={0.5}
                overflow="hidden"
              >
                <Typography
                  sx={{
                    pb: 1,
                  }}
                  variant="h6"
                >
                  Items deleted successfully
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                >
                  The entries you selected have been removed successfully.
                </Typography>
                <Stack
                  mt={1.5}
                  mb={0.5}
                  spacing={1}
                  direction="row"
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{
                      color: 'primary.main',
                    }}
                    startIcon={<ReplayRoundedIcon fontSize="small" />}
                    onClick={() => toast.dismiss(t.id)}
                  >
                    Undo
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Card>
      ),
      {
        position: 'top-right',
      }
    );
  };
  return (
    <>
      <Tooltip
        title={t('Xoá')}
        arrow
      >
        {children ? (
          <Box
            sx={{ width: '100%' }}
            onClick={handleClickOpen}
          >
            {children}
          </Box>
        ) : (
          <IconButton
            color="error"
            onClick={handleClickOpen}
          >
            {children ? children : <DeleteTwoToneIcon fontSize="small" />}
          </IconButton>
        )}
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="basic-dialog-title"
        maxWidth="sm"
        fullWidth
        sx={{
          '.MuiDialog-container': {
            alignItems: {
              xs: 'flex-end',
              sm: 'center',
            },
          },
        }}
      >
        <DialogContent>
          <AlertDialogContent
            title={'Xác nhận xóa '}
            description={
              'Bạn có chắc chắn muốn xóa mục này không? Hành động này không thể hoàn tác.'
            }
          />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? alpha(theme.palette.neutral[25], 0.02) : 'neutral.25',
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
          <Button
            variant="outlined"
            color="secondary"
            autoFocus
            fullWidth={!smUp}
            onClick={handleClose}
          >
            Hủy
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => onConfirm().then(() => setOpen(false))}
            autoFocus
            fullWidth={!smUp}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DialogConfirmDelete;
