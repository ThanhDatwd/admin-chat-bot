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
import { packageBasesApi } from 'src/api/package-base';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import CreatePackageDialog from 'src/components/services-package/create-package-dialog';
import ServicesPackageTable from 'src/components/services-package/services-package-table';
import { useCustomization } from 'src/hooks/use-customization';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

const ServicesPackage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const customization = useCustomization();
  const [open, setOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const data = await packageBasesApi.getPackageBases({
        pageNumber: page,
        pageSize: limit,
      });
      setPackages(data.content);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [page, limit]);

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

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
          <ServicesPackageTable
            packages={packages}
            loading={loading}
            error={error}
            page={page}
            limit={limit}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            onUpdate={fetchPackages}
          />
        </Container>
      </Box>
      <CreatePackageDialog
        open={open}
        onClose={handleDialogClose}
        onUpdate={fetchPackages}
      />
    </>
  );
};
export default ServicesPackage;
