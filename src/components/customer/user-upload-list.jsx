import { UploadFileRounded } from '@mui/icons-material';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DoDisturbAltRoundedIcon from '@mui/icons-material/DoDisturbAltRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router';
import { uploadFile } from 'src/api/files';
import { AvatarState } from 'src/components/base/styles/avatar';
import { ButtonIcon } from 'src/components/base/styles/button-icon';
import { CardAddActionDashed } from 'src/components/base/styles/card';
import * as XLSX from 'xlsx';
import fileIcon from '../base/fileIcon';
import TableGroupUser from './table-group-customer';
import TableUserUpload from './table-user-upload';

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const UserUploadList = ({ files, setFiles, setUploadFiles, setData, data }) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedGroupUser, setSelectedGroupUser] = useState([]);
  const { id } = useParams();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setUploadProgress((prevProgress) => ({
        ...prevProgress,
        [file.name]: {
          progress: 0,
        },
      }));
    });

    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) => ({
        file,
        progress: 0,
      })),
    ]);

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setData(json);
        handleUploadFile(file, json);
        simulateProgress(file);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const simulateProgress = (file) => {
    const progressInterval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (!prevProgress[file.name]) {
          clearInterval(progressInterval);
          return prevProgress;
        }
        const currentProgress = prevProgress[file.name].progress;
        const nextProgress = Math.min(currentProgress + 10, 100);
        if (nextProgress === 100) {
          clearInterval(progressInterval);
          handleUploadFile(file);
        }
        return {
          ...prevProgress,
          [file.name]: {
            progress: nextProgress,
          },
        };
      });
    }, 200);
  };

  const handleUploadFile = async (file, json = null) => {
    try {
      const uploadResponse = await uploadFile({
        file: file,
        botId: id,
        userId: 'ac140002-8f4e-1c14-818f-58c164f6000a',
        isPublic: false,
        jsonData: json,
      });

      delete uploadResponse.fileLink;

      setUploadFiles((prevUploadFiles) => [...prevUploadFiles, uploadResponse]);
    } catch (error) {
      console.error('Error upload file:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 10,
  });

  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter(({ file }) => file.name !== fileName));
    setUploadProgress((prevProgress) => {
      const newProgress = { ...prevProgress };
      delete newProgress[fileName];
      return newProgress;
    });
    setData([]);
  };

  const handleRemoveUser = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    if (newData.length === 0) {
      setFiles([]);
    }
  };

  return (
    <>
      {files && files.length > 0 ? (
        <List
          component="div"
          disablePadding
        >
          <Stack
            spacing={2}
            mt={2}
          >
            {files.map(({ file }) => (
              <Card
                variant="outlined"
                elevation={0}
                key={file.name}
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
                    {fileIcon(file.name)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="space-between"
                      >
                        <Box overflow="hidden">
                          <Typography
                            noWrap
                            variant="subtitle1"
                            fontWeight={500}
                            color="text.primary"
                          >
                            {file.name}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            {formatBytes(file.size)}
                          </Typography>
                        </Box>
                        <ButtonIcon
                          aria-label="delete"
                          onClick={() => removeFile(file.name)}
                          size="small"
                          color="error"
                        >
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </ButtonIcon>
                      </Box>
                    }
                    disableTypography
                    secondary={
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Box flex={1}>
                          <LinearProgress
                            variant="determinate"
                            value={uploadProgress[file.name]?.progress || 0}
                          />
                        </Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            pl: 0.5,
                          }}
                        >
                          {uploadProgress[file.name]?.progress || 0}%
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              </Card>
            ))}
          </Stack>
        </List>
      ) : (
        <CardAddActionDashed
          variant="outlined"
          elevation={0}
          sx={{
            height: '200px',
            borderWidth: 1,
          }}
        >
          <CardActionArea {...getRootProps()}>
            <input {...getInputProps()} />
            <CardContent>
              <Stack
                spacing={1}
                justifyContent="center"
                direction="column"
                alignItems="center"
              >
                <AvatarState
                  state="secondary"
                  isSoft
                  variant="rounded"
                  sx={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.400',
                    backgroundColor: 'background.paper',
                  }}
                >
                  {isDragReject && (
                    <DoDisturbAltRoundedIcon
                      fontSize="small"
                      sx={{
                        color: 'error.main',
                      }}
                    />
                  )}
                  {isDragAccept && (
                    <DoneRoundedIcon
                      fontSize="small"
                      sx={{
                        color: 'success.main',
                      }}
                    />
                  )}
                  {!isDragActive && (
                    <CloudUploadRoundedIcon
                      fontSize="small"
                      sx={{
                        color: 'text.primary',
                      }}
                    />
                  )}
                </AvatarState>
                <Box>
                  <Typography
                    textAlign="center"
                    variant="h6"
                    fontWeight={400}
                    color={
                      isDragAccept ? 'success.main' : isDragReject ? 'error.main' : 'text.secondary'
                    }
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      component="span"
                      color={
                        isDragAccept ? 'success.main' : isDragReject ? 'error.main' : 'primary.main'
                      }
                    >
                      Click to upload
                    </Typography>{' '}
                    or drag and drop excel here
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </CardActionArea>
        </CardAddActionDashed>
      )}
      {uploadProgress[files[0]?.file?.name]?.progress === 100 && (
        <TableUserUpload
          selectedItems={selectedGroupUser}
          setSelectedItems={setSelectedGroupUser}
          users={data}
          onRemove={handleRemoveUser}
        />
      )}
    </>
  );
};

export default UserUploadList;
