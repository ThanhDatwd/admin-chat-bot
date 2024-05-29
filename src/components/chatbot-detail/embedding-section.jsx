import { Button, Card, CardContent, CardHeader, Container, Divider, useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { embedBot } from 'src/api/embed';
import { ButtonLight } from 'src/components/base/styles/button';
import { CardActionsLight, CardHeaderLight, DividerLight } from 'src/components/base/styles/card';
import DocumentsUploadList from './documents-upload-list';

const EmbeddingSection = ({ onEmbed }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const { id } = useParams();
  const handleEmbedBot = async () => {
    try {
      const data = {
        botId: id,
        sitemapUrls: [],
        sourceUrls: [],
        fileIds: uploadFiles,
      };

      console.log(data);

      const response = await embedBot(data);
      console.log('Embed bot response:', response);
      setFiles([]);
      setUploadFiles([]);
      onEmbed();
    } catch (error) {
      console.error('Error embedding bot:', error);
    }
  };

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
        <DocumentsUploadList
          files={files}
          setFiles={setFiles}
          setUploadFiles={setUploadFiles}
        />
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
          onClick={() => handleEmbedBot()}
        >
          Embed
        </Button>
      </CardActionsLight>
    </Card>
  );
};
export default EmbeddingSection;
