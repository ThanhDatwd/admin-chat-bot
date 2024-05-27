import { Button, Card, CardContent, CardHeader, Container, Divider, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PlaceholderBox from 'src/components/base/placeholder-box';
import { ButtonLight } from 'src/components/base/styles/button';
import { CardActionsLight, CardHeaderLight, DividerLight } from 'src/components/base/styles/card';
import DocumentsUploadList from './documents-upload-list';

const EmbeddingSection = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        width: '100%',
      }}
    >
      <CardHeader
        titleTypographyProps={{
          variant: 'h4',
        }}
        title="Training dữ liệu Bot"
      />
      <Divider />
      <CardContent
        sx={{
          py: 3,
        }}
      >
        <DocumentsUploadList />
      </CardContent>
      <Divider />
      <CardActionsLight
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <ButtonLight>Cancel</ButtonLight>
        <Button
          variant="contained"
          color="success"
        >
          Save
        </Button>
      </CardActionsLight>
    </Card>
  );
};
export default EmbeddingSection;
