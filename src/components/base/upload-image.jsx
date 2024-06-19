import { CloseRounded } from '@mui/icons-material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  alpha,
  Badge,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { uploadFile } from 'src/api/files';
import { AvatarState } from 'src/components/base/styles/avatar';
import { ButtonIcon } from 'src/components/base/styles/button-icon';

const UploadImage = ({ currentUrl, setFile, label }) => {
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImagePreview(currentUrl);
  }, [currentUrl]);

  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true);
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      setTimeout(() => {
        setImagePreview(URL.createObjectURL(file));
        setLoading(false);
      }, 2000);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
  });
  const removeImage = () => {
    setImagePreview('');
    if (imagePreview) URL.revokeObjectURL(imagePreview);
  };
  return (
    <FormControl
      fullWidth
      variant="outlined"
    >
      <Typography
        variant="h6"
        gutterBottom
        component="label"
        fontWeight={500}
      >
        {label}
      </Typography>
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
      >
        <Badge
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            '& .MuiBadge-badge': {
              top: 10,
              right: 10,
            },
          }}
          badgeContent={
            imagePreview && (
              <ButtonIcon
                variant="contained"
                color="warning"
                size="small"
                startIcon={<CloseRounded fontSize="inherit" />}
                sx={{
                  borderRadius: '50%',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark' ? theme.shadows[13] : theme.shadows[18],
                }}
                onClick={removeImage}
              />
            )
          }
        >
          <AvatarState
            {...getRootProps()}
            src={imagePreview}
            variant="rounded"
            isSoft
            sx={{
              width: 124,
              height: 124,
              boxShadow: (theme) =>
                theme.palette.mode === 'dark' ? theme.shadows[13] : theme.shadows[18],
              border: '2px solid transparent',
              borderColor: 'background.paper',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.900' : 'neutral.50',
              '&:hover': {
                borderColor: 'currentColor',
                cursor: 'pointer',
              },
            }}
            alt="Avatar Preview"
          >
            {!imagePreview &&
              (loading ? (
                <CircularProgress size={34} />
              ) : (
                <AccountCircleRoundedIcon
                  sx={{
                    fontSize: 44,
                    color: 'neutral.500',
                  }}
                />
              ))}
          </AvatarState>
          {imagePreview && (
            <Box
              {...getRootProps()}
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: (theme) => theme.shape.borderRadius + 'px',
                left: 0,
                top: 0,
                backgroundColor: (theme) => alpha(theme.palette.neutral[900], 0.7),
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: loading ? 1 : 0,
                '&:hover': {
                  cursor: 'pointer',
                  opacity: 1,
                },
              }}
            >
              {loading ? (
                <CircularProgress
                  sx={{
                    color: 'common.white',
                  }}
                  size={34}
                />
              ) : (
                <AutoFixHighRoundedIcon
                  fontSize="large"
                  sx={{
                    color: 'common.white',
                  }}
                />
              )}
            </Box>
          )}
        </Badge>
      </Stack>
    </FormControl>
  );
};
export default UploadImage;
