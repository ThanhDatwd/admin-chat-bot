import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import {
  Box,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router';
import { ButtonIcon } from 'src/components/base/styles/button-icon';
import * as XLSX from 'xlsx';
import fileIcon from '../base/fileIcon';

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const UserUploadList = ({ files, setFiles, setData, data }) => {
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
        setData((preData) => [
          ...preData,
          ...json.map((item) => {
            return { ...item, fileName: file.name };
          }),
        ]);
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
    setData((data) => data.filter((item) => item.fileName !== fileName));
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
                  />
                </ListItem>
              </Card>
            ))}
          </Stack>
        </List>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserUploadList;
