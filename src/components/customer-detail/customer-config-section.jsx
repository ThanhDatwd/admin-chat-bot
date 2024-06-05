import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PlaceholderBox from 'src/components/base/placeholder-box';
import CreateCustomerConfigDialog from './create-config-dialog';

const CustomerConfigSection = ({ customer, config }) => {
  const { t } = useTranslation();
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
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={
          <>
            <Stack
              spacing={{
                xs: 1,
              }}
              direction={{
                xs: 'row',
              }}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography component={'h3'}>{t('Thông tin cấu hình')}</Typography>
              {config && (
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleDialogOpen}
                >
                  Cập nhật
                </Button>
              )}
            </Stack>
          </>
        }
      />
      <Divider />
      <CardContent>
        {!config ? (
          <Box>
            <Stack
              spacing={{
                xs: 1,
              }}
              direction={{
                xs: 'column',
              }}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography>{t('Chưa có thông tin cấu hình')}</Typography>
              <Button
                variant="contained"
                onClick={handleDialogOpen}
              >
                Cấu hình
              </Button>
            </Stack>
          </Box>
        ) : (
          <List
            disablePadding
            sx={{
              mb: 1.5,
            }}
          >
            <ListItem disableGutters>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
                primary={t('Hạn mức ngày') + ':'}
              />
              <Typography variant="subtitle2">{config?.quota}</Typography>
            </ListItem>

            <ListItem disableGutters>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
                primary={t('Số lượng request miến phí') + ':'}
              />
              <Typography variant="subtitle2">{config?.freeRequest}</Typography>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
                primary={t('Số lượng training miễn phí') + ':'}
              />
              <Typography variant="subtitle2"> {config?.freeTraining}</Typography>
            </ListItem>
          </List>
        )}
        <CreateCustomerConfigDialog
          config={config}
          customer={customer}
          open={open}
          onClose={handleDialogClose}
        />
      </CardContent>
    </Card>
  );
};
export default CustomerConfigSection;
