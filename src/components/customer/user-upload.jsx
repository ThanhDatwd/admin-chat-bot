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


const UserUpload = ({ files, setFiles, setData, data }) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const { id } = useParams();

  const onDrop = useCallback((acceptedFiles) => {

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
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 10,
  });


  return (
    <>
      {files && files.length > 0 ?"":
       <>
        <Button
            startIcon={<UploadFileRounded />}
            variant="outlined"
            color="secondary"
            size="small"
            {...getRootProps()}
          >
            Thêm tệp
          </Button>
       </>
      }
    </>
  );
};

export default UserUpload;
