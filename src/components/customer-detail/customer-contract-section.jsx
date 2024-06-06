import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DoDisturbAltRoundedIcon from '@mui/icons-material/DoDisturbAltRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { downloadFile } from 'src/api/files';
import PlaceholderBox from 'src/components/base/placeholder-box';
import fileIcon from '../base/fileIcon';
import { ButtonIcon } from '../base/styles/button-icon';
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
  const handleDownload = async ({ fileKey, fileName }) => {
    try {
      await downloadFile({
        fileKey,
        fileName,
      });
    } catch (error) {
      console.error('Error fetching user files:', error);
    }
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
                  Cập nhật
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
              <Typography variant="subtitle2"> {contract?.beforeTax}</Typography>
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
              <Typography variant="subtitle2"> {contract?.afterTax}</Typography>
            </ListItem>
            {contract.fileName && contract.fileId && (
              <>
                <ListItemText
                  primaryTypographyProps={{
                    variant: 'subtitle2',
                    fontWeight: 500,
                    color: 'text.secondary',
                  }}
                  primary={t('File hợp đồng') + ':'}
                  sx={{ mb: 1.5 }}
                />
                <Card
                  variant="outlined"
                  elevation={0}
                  key={contract.fileName}
                  sx={{
                    '&:hover': {
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.500',
                    },
                  }}
                >
                  <ListItem
                    component="div"
                    alignItems="flex-start"
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 38,
                        color: 'neutral.700',
                      }}
                    >
                      {fileIcon(contract?.fileName)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography
                            noWrap
                            variant="subtitle1"
                            fontWeight={500}
                            color="text.primary"
                          >
                            {contract.fileName}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            {/* {formatBytes(file.size)} */}
                          </Typography>
                          <ButtonIcon
                            aria-label="delete"
                            onClick={() => {
                              handleDownload({
                                fileKey: contract.fileId,
                                fileName: contract.fileName,
                              });
                            }}
                            size="small"
                            color="info"
                          >
                            <FileDownloadOutlinedIcon fontSize="small" />
                          </ButtonIcon>
                        </Box>
                      }
                      disableTypography
                    />
                  </ListItem>
                </Card>
              </>
            )}
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
