import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { embedBot } from 'src/api/embed';
import { uploadFile } from 'src/api/files';
import { ButtonLight } from 'src/components/base/styles/button';
import { CardActionsLight } from 'src/components/base/styles/card';
import { setLoading, setRefresh } from 'src/slices/common';
import PaymentEmbedChatbot from '../chatbot/payment-embed-chatbot';
import DocumentsUploadList from './documents-upload-list';
import toast from 'react-hot-toast';

const EmbeddingSection = ({ onEmbed }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const currentAdmin = useSelector((state) => state.auth.admin);
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  const handleUploadFile = async (file) => {
    try {
      const uploadResponse = await uploadFile({
        file: file,
        botId: id,
        userId: currentAdmin.id,
        isPublic: false,
      });

      delete uploadResponse.fileLink;
      delete uploadResponse.tags;
      return uploadResponse;
    } catch (error) {
      console.error('Error upload file:', error);
    }
  };

  const handleEmbedBot = async () => {
    dispatch(setLoading(true));
    let uploadFiles = [];
    try {
      uploadFiles = await Promise.all(
        files.map(async (file) => {
          return await handleUploadFile(file?.file);
        })
      );
      console.log('asdad', uploadFiles);
      try {
        const data = {
          botId: id,
          sitemapUrls: [],
          sourceUrls: [],
          fileIds: uploadFiles,
        };

        const response = await embedBot(data);
        setFiles([]);
        setUploadFiles([]);
        onEmbed();
        toast.success(t('Đang tải dữ liệu vui lòng đợi'));
        dispatch(setRefresh(!isRefresh));
      } catch (error) {
        console.error('Error embedding bot:', error);
      }
    } catch (error) {
      console.error('Error upload file:', error);
    } finally {
      dispatch(setLoading(false));
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
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
              }}
              onClick={() => handleEmbedBot()}
            >
              Embed
              {isLoading && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                  }}
                  color="common.white"
                >
                  {' '}
                  <CircularProgress
                    style={{ height: '20px', width: '20px' }}
                    color={'inherit'}
                  />
                </Box>
              )}
            </Button>
          )}
        </CardActionsLight>
      </Card>
    </>
  );
};
export default EmbeddingSection;
