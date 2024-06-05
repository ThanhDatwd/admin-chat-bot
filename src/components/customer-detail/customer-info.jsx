import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import {
  alpha,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreateCustomerByAdminDialog from '../customer/create-customer-dialog-by-admin';

const CardActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1.5),
  top: theme.spacing(1.5),
  zIndex: 7,
}));
function CustomerInfo(props) {
  const { customer } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  // HANDLE OPEN CREATE USER DIALOG
  const handleDialogOpen = () => {
    setOpen(true);
  };

  // HANDLE CLOSE CREATE USER DIALOG
  const handleDialogClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card
        sx={{
          position: 'relative',
          width: '100%',
          p: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={handleDialogOpen}
          >
            Cập nhật
          </Button>
        </CardActions>
        <Box
          mb={2}
          display="flex"
          alignItems="center"
        >
          <Avatar
            variant="rounded"
            sx={{
              fontSize: theme.typography.pxToRem(16),
              background: theme.palette.common.black,
              color: theme.palette.common.white,
              borderRadius: theme.shape.borderRadius,
              width: 95,
              height: 95,
            }}
          ></Avatar>
          <Box
            sx={{
              width: '100%',
            }}
            ml={1.5}
          >
            <Link
              href=""
              onClick={(e) => e.preventDefault()}
              color="text.primary"
              underline="none"
              sx={{
                transition: theme.transitions.create(['color']),
                fontSize: theme.typography.pxToRem(17),
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
              variant="h5"
            >
              {customer?.customerName}
            </Link>

            <Box
              display="flex"
              alignItems="center"
              flex={1}
              mt={1}
              sx={{
                width: '100%',
              }}
            >
              <Chip
                style={{ maxWidth: '80%' }}
                color={'info'}
                label={`Người Đại diện:  ${customer?.representative} `}
              />
            </Box>
          </Box>
        </Box>
        <Divider
          sx={{
            mt: 3,
          }}
        />
        <List
          disablePadding
          sx={{
            my: 1.5,
          }}
        >
          <ListItem disableGutters>
            <ListItemText
              primaryTypographyProps={{
                variant: 'subtitle2',
                fontWeight: 500,
                color: 'text.secondary',
              }}
              primary={t('Người đại diện') + ':'}
            />
            <Typography variant="subtitle2">{customer.representative}</Typography>
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primaryTypographyProps={{
                variant: 'subtitle2',
                fontWeight: 500,
                color: 'text.secondary',
              }}
              primary={t('Số diện thoại') + ':'}
            />
            <Typography variant="subtitle2">{customer?.phoneNumber}</Typography>
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primaryTypographyProps={{
                variant: 'subtitle2',
                fontWeight: 500,
                color: 'text.secondary',
              }}
              primary={t('Mã số thuế') + ':'}
            />
            <Typography variant="subtitle2">{customer.taxCode}</Typography>
          </ListItem>

          <ListItem disableGutters>
            <ListItemText
              primaryTypographyProps={{
                variant: 'subtitle2',
                fontWeight: 500,
                color: 'text.secondary',
              }}
              primary={t('Email') + ':'}
            />
            <Typography variant="subtitle2">{customer?.email}</Typography>
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primaryTypographyProps={{
                variant: 'subtitle2',
                fontWeight: 500,
                color: 'text.secondary',
              }}
              primary={t('Website') + ':'}
            />
            <Typography variant="subtitle2">{customer?.website}</Typography>
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primaryTypographyProps={{
                variant: 'subtitle2',
                fontWeight: 500,
                color: 'text.secondary',
              }}
              primary={t('Địa chỉ') + ':'}
            />
            <Typography variant="subtitle2">
              {customer.custHouseNumber} {customer?.address}
            </Typography>
          </ListItem>
        </List>
      </Card>
      <CreateCustomerByAdminDialog
      customer={customer}
        open={open}
        onClose={handleDialogClose}
      />
    </>
  );
}
export default CustomerInfo;
