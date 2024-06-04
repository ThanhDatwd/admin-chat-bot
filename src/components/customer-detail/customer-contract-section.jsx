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
import CreateCustomerContractDialog from './create-contract-dialog';

const CustomerContractSection = ({ customer, contract }) => {
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
    <Card sx={{ width: '100%' }}>
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
              <Typography component={'h3'}>{t('Thông tin hợp đồng')}</Typography>
              {contract && (
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleDialogOpen}
                >
                  Chỉnh sửa
                </Button>
              )}
            </Stack>
          </>
        }
      />
      <Divider />
      <CardContent>
        {/* <PlaceholderBox height={128} /> */}
        {!contract ? (
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
              <Typography>{t('Chưa có thông tin hợp đồng')}</Typography>
              <Button
                variant="contained"
                onClick={handleDialogOpen}
              >
                Tạo hợp đồng
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
                primary={t('Tên hợp đồng') + ':'}
              />
              <Typography variant="subtitle2">{contract.name}</Typography>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
                primary={t('Ngày ký') + ':'}
              />
              <Typography variant="subtitle2">
                {format(new Date(contract?.signedDate), 'dd-MM-yyyy')}
              </Typography>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
                primary={t('Ngày hiệu lực') + ':'}
              />
              <Typography variant="subtitle2">
                {format(new Date(contract?.effectiveDate), 'dd-MM-yyyy')}
              </Typography>
            </ListItem>

            <ListItem disableGutters>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
                primary={t('Ngày hết hạn') + ':'}
              />
              <Typography variant="subtitle2">
                {format(new Date(contract?.endDate), 'dd-MM-yyyy')}
              </Typography>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
                primary={t('Thuế (%)') + ':'}
              />
              <Typography variant="subtitle2">{Number(contract?.taxRate) * 100}%</Typography>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
                primary={t('Số tiền trước thuế') + ':'}
              />
              <Typography variant="subtitle2">
                {contract.custHouseNumber} {contract?.beforeTax}
              </Typography>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
                primary={t('Số tiền sau thuế') + ':'}
              />
              <Typography variant="subtitle2">
                {contract.custHouseNumber} {contract?.afterTax}
              </Typography>
            </ListItem>
          </List>
        )}
        <CreateCustomerContractDialog
        contract={contract}
          customer={customer}
          open={open}
          onClose={handleDialogClose}
        />
      </CardContent>
    </Card>
  );
};
export default CustomerContractSection;
