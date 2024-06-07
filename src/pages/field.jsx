import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { Box, Button, Container, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import CreateFieldDialog from 'src/components/field/create-field-dialog';
import FieldTable from 'src/components/field/field-table';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

const invoices = [
  {
    id: '1',
    fieldName: 'Bộ công an',
    fieldCode: 'CA',
    tags: ['C03', 'CO4', 'C08'],
    status: 'active',
  },
  {
    id: '2',
    fieldName: 'Bộ tài nguyên và môi trường',
    fieldCode: 'TNMT',
    tags: ['TNMT03', 'TNMTO4', 'TNMT08'],
    status: 'active',
  },
  { id: '3', fieldName: 'Bộ Ngoại giao', fieldCode: 'NG', tags: ['NG03', 'NG04', 'NG08'] },
  { id: '4', fieldName: 'Bộ Tài chính', fieldCode: 'TC', tags: ['TC04', 'TC05', 'TC09'] },
  {
    id: '5',
    fieldName: 'Bộ Giáo dục và Đào tạo',
    fieldCode: 'GD',
    tags: ['GD05', 'GD06', 'GD10'],
    status: 'active',
  },
  { id: '6', fieldName: 'Bộ Y tế', fieldCode: 'YT', tags: ['YT06', 'YT07', 'YT11'] },
  { id: '7', fieldName: 'Bộ Công thương', fieldCode: 'CT', tags: ['CT07', 'CT08', 'CT12'] },
  {
    id: '8',
    fieldName: 'Bộ Giao thông vận tải',
    fieldCode: 'GTVT',
    tags: ['GTVT08', 'GTVT09', 'GTVT13'],
    status: 'inactive',
  },
  { id: '9', fieldName: 'Bộ Tư pháp', fieldCode: 'TP', tags: ['TP09', 'TP10', 'TP14'] },
  {
    id: '10',
    fieldName: 'Bộ Nông nghiệp và Phát triển nông thôn',
    fieldCode: 'NNPTNT',
    tags: ['NNPTNT10', 'NNPTNT11', 'NNPTNT15'],
    status: 'active',
  },
  {
    id: '11',
    fieldName: 'Bộ Lao động - Thương binh và Xã hội',
    fieldCode: 'LDTBXH',
    tags: ['LDTBXH11', 'LDTBXH12', 'LDTBXH16'],
    status: 'inactive',
  },
  {
    id: '12',
    fieldName: 'Bộ Quốc phòng',
    fieldCode: 'QP',
    tags: ['QP12', 'QP13', 'QP17'],
    status: 'active',
  },
];

const FieldPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const [fields, setFields] = useState([]);
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

  const getFields = useCallback(async () => {
    try {
      // const response = await botsApi.getBots({ pageNumber: 0, pageSize: 20 });
      // if (isMountedRef()) {
      //   setBots(response);
      // }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

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
              title={t('Lĩnh vực')}
              description={t('Quản lý lĩnh vực')}
              actions={
                <div>
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
                    {t('Tạo lĩnh vực')}
                  </Button>
                </div>
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
                  <ReceiptOutlinedIcon />
                </AvatarState>
              }
            />
          </Box>
          <FieldTable
            fields={invoices}
            fetchData={getFields}
          />
        </Container>
      </Box>
      <CreateFieldDialog
        open={open}
        onClose={handleDialogClose}
        onUpdate={getFields}
      />
    </>
  );
};
export default FieldPage;
