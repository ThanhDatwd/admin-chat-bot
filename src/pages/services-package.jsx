import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone';
import SnippetFolderOutlinedIcon from '@mui/icons-material/SnippetFolderOutlined';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { botsApi } from 'src/api/bots';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import CreateChatbotDialog from 'src/components/chatbot/create-chatbot-dialog';
import ServicesPackageTable from 'src/components/services-package/services-package-table';
import { useCustomization } from 'src/hooks/use-customization';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

const packages = [
  {
    id: '1',
    packageName: 'Gói Cơ Bản',
    packageCode: 'PKG001',
    serviceFee: 100000,
    usageCount: 150,
    registrationDeadline: '2024-07-01',
    status: 'active',
    creationDate: '2023-01-15',
  },
  {
    id: '2',
    packageName: 'Gói Nâng Cao',
    packageCode: 'PKG002',
    serviceFee: 200000,
    usageCount: 120,
    registrationDeadline: '2024-07-15',
    status: 'inactive',
    creationDate: '2023-02-20',
  },
  {
    id: '3',
    packageName: 'Gói VIP',
    packageCode: 'PKG003',
    serviceFee: 500000,
    usageCount: 80,
    registrationDeadline: '2024-08-01',
    status: 'active',
    creationDate: '2023-03-05',
  },
  {
    id: '4',
    packageName: 'Gói Tiết Kiệm',
    packageCode: 'PKG004',
    serviceFee: 50000,
    usageCount: 300,
    registrationDeadline: '2024-06-20',
    status: 'deleted',
    creationDate: '2023-04-10',
  },
  {
    id: '5',
    packageName: 'Gói Khuyến Mãi',
    packageCode: 'PKG005',
    serviceFee: 75000,
    usageCount: 200,
    registrationDeadline: '2024-09-01',
    status: 'inactive',
    creationDate: '2023-05-25',
  },
  {
    id: '6',
    packageName: 'Gói Gia Đình',
    packageCode: 'PKG006',
    serviceFee: 150000,
    usageCount: 180,
    registrationDeadline: '2024-07-30',
    status: 'active',
    creationDate: '2023-06-15',
  },
];

const ServicesPackage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const customization = useCustomization();
  const [bots, setBots] = useState([]);
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

  const getBots = useCallback(async () => {
    try {
      const response = await botsApi.getBots({ pageNumber: 0, pageSize: 20 });
      if (isMountedRef()) {
        setBots(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getBots();
  }, [getBots]);

  return (
    <>
      <Box
        px={{
          xs: 2,
          sm: 3,
        }}
        pt={{
          xs: 2,
          sm: 3,
        }}
        component="main"
        flex={1}
        display="flex"
        flexDirection="column"
      >
        <Container
          disableGutters
          maxWidth="xl"
        >
          <Box
            pb={{
              xs: 2,
              sm: 3,
            }}
          >
            <PageHeading
              sx={{
                px: 0,
              }}
              title={t('Gói dịch vụ')}
              description={t('Quản lý gói dịch vụ')}
              actions={
                <>
                  <Button
                    sx={{
                      mt: {
                        xs: 2,
                        md: 0,
                      },
                    }}
                    variant="contained"
                    onClick={handleDialogOpen}
                    startIcon={<AddOutlinedIcon fontSize="small" />}
                  >
                    {t('Tạo gói dịch vụ')}
                  </Button>
                </>
              }
              iconBox={
                <AvatarState
                  isSoft
                  variant="rounded"
                  state="primary"
                  sx={{
                    height: theme.spacing(7),
                    width: theme.spacing(7),
                    svg: {
                      height: theme.spacing(4),
                      width: theme.spacing(4),
                      minWidth: theme.spacing(4),
                    },
                  }}
                >
                  <FolderTwoToneIcon />
                </AvatarState>
              }
            />
          </Box>
          <ServicesPackageTable packages={packages} />
        </Container>
      </Box>
      <CreateChatbotDialog
        open={open}
        onClose={handleDialogClose}
        onUpdate={getBots}
      />
    </>
  );
};
export default ServicesPackage;
