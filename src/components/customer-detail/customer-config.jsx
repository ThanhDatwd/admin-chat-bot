import { Button, Card, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PlaceholderBox from 'src/components/base/placeholder-box';

const CustomerConfig = () => {
  const { t } = useTranslation();

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={t('Thông tin cấu hình')}
        // subheader="Overview of monthly activity"
      />
      <Divider />
      <CardContent>
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
            onClick={() => {}}
          >
            Cấu hình
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default CustomerConfig;
