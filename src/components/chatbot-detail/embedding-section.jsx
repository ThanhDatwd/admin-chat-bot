import { Button, Card, CardContent, CardHeader, Container, Divider, useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { embedBot } from 'src/api/embed';
import { uploadFile } from 'src/api/files';
import { ButtonLight } from 'src/components/base/styles/button';
import { CardActionsLight } from 'src/components/base/styles/card';
import PaymentEmbedChatbot from '../chatbot/payment-embed-chatbot';
import DocumentsUploadList from './documents-upload-list';

const EmbeddingSection = ({ onEmbed }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const currentAdmin = useSelector((state) => state.auth.admin);
  const { id } = useParams();

  const handleUploadFile = async (file) => {
    try {
      const uploadResponse = await uploadFile({
        file: file,
        botId: id,
        userId: currentAdmin.id,
        isPublic: false,
      });

      delete uploadResponse.fileLink;
      return uploadResponse;
    } catch (error) {
      console.error('Error upload file:', error);
    }
  };

  const handleEmbedBot = async () => {
    try {
      files.forEach((file) => {
        const uploadResponse = handleUploadFile(file?.file);
        setUploadFiles((prevUploadFiles) => [...prevUploadFiles, uploadResponse]);
      });

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
    } catch (error) {
      console.error('Error upload file:', error);
    }
  };

  const handleOpenPayment = () => {
    setOpenPaymentDialog(true);
  };

  return (
    <>
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
            justifyContent: 'end',
            alignItems: 'center',
          }}
        >
          <PaymentEmbedChatbot />
          {files.length > 0 && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleEmbedBot()}
            >
              Embed
            </Button>
          )}
        </CardActionsLight>
      </Card>
    </>
  );
};
export default EmbeddingSection;
