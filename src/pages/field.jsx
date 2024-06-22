import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TopicIcon from '@mui/icons-material/Topic';
import { Box, Button, Container, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import CreateFieldDialog from 'src/components/field/create-field-dialog';
import FieldTable from 'src/components/field/field-table';
import { useRefMounted } from 'src/hooks/use-ref-mounted';
import { setLoading } from 'src/slices/common';
import { getKnowledge } from 'src/slices/knowledge';

const FieldPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const [fields, setFields] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

  const getFields = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await dispatch(getKnowledge({ pageNumber: 0, pageSize: 20 }));
      if (isMountedRef()) {
        setFields(response);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setLoading(false));
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
                  <TopicIcon />
                </AvatarState>
              }
            />
          </Box>
          <FieldTable
            fields={fields}
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
