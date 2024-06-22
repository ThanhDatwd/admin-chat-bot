import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { uploadFile } from 'src/api/files';
import { knowledgesApi } from 'src/api/knowledges';
import { setLoading, setRefresh } from 'src/slices/common';
import { useSelector } from 'src/store';
import { z } from 'zod';
import UploadImage from '../base/upload-image';
import { DialogCustom } from '../common/dialog-custom';

const formSchema = z.object({
  knowName: z
    .string()
    .min(1, 'Tên lĩnh vực là bắt buộc')
    .max(200, 'Tên lĩnh vực tối đa 200 ký tự'),
  icon: z.string().optional(),
});

const CreateFieldDialog = ({ open, onClose, onUpdate, field }) => {
  const { t } = useTranslation();
  const [tagValue, setTagValue] = useState();
  const [file, setFile] = useState();
  const [tagList, setTagList] = useState([]);
  const dispatch = useDispatch();
  const [fieldStatus, setFieldStatus] = useState(true);
  const currentAdmin = useSelector((state) => state.auth.admin);
  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  const theme = useTheme();
  const { control, setValue, getValues, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      knowName: '',
      fieldCode: '',
      tags: [],
      status: 'active',
    },
  });

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    try {
      let uploadResponse = null;
      if (file) {
        uploadResponse = await handleUploadFile(file);
      }
      const dataRequest = {
        ...data,
        icon: uploadResponse?.fileLink ?? null,
      };
      const response = await knowledgesApi.createKnowledges(dataRequest);
      onUpdate?.(data);
      reset();
      onClose();
      dispatch(setRefresh(!isRefresh));
    } catch (error) {
      console.error('Error creating bot:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleUploadFile = async (file, json = null) => {
    try {
      const uploadResponse = await uploadFile({
        file: file,
        userId: currentAdmin.id,
        isPublic: true,
        jsonData: json,
      });

      return uploadResponse;
    } catch (error) {
      console.error('Error upload file:', error);
    }
  };

  const handleAddTag = () => {
    if (tagValue && tagValue !== '' && !tagList.includes(tagValue)) {
      let newTagList = [...tagList, tagValue];
      setTagList(newTagList);
      setValue('tags', newTagList);
      setTagValue('');
    }
  };
  const handleRemoveTag = (index) => {
    const newTagList = [...tagList];
    newTagList.splice(index, 1);
    setTagList(newTagList);
    setValue('tags', newTagList);
    setTagValue('');
  };
  useEffect(() => {
    if (!open) {
      reset();
      setTagList([]);
      setFieldStatus(true);
    }
  }, [open]);

  useEffect(() => {
    if (field) {
      setValue('knowName', field.knowName);
      setValue('fieldCode', field.fieldCode);
      setValue('tags', field.tags);
      setValue('status', field.status);
      setTagList(field.tags);
      setFieldStatus(field.status === 'inactive' ? false : true);
    }
  }, [field, open]);

  return (
    <DialogCustom
      open={open}
      onClose={onClose}
      title={field ? t('Cập nhật lĩnh vực') : t('Tạo mới lĩnh vực')}
      actions={
        <>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1}
          >
            <Button
              color="secondary"
              onClick={() => onClose()}
            >
              Huỷ
            </Button>
            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
              }}
              onClick={handleSubmit(onSubmit)}
            >
              {field ? t('Cập nhật') : t('Tạo mới')}
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
          </Stack>
        </>
      }
    >
              <Grid
                container
                gap={{ xs: 2 }}
              >
                <Grid
                  item
                  xs={12}
                >
                  <FormControl
                    fullWidth
                    variant="outlined"
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="label"
                      htmlFor="bot-name-input"
                      fontWeight={500}
                    >
                      Tên lĩnh vực
                    </Typography>
                    <Controller
                      name="knowName"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            id="field-name-input"
                            fullWidth
                          />
                          {fieldState.error && (
                            <Typography color="error">{fieldState.error.message}</Typography>
                          )}
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12}>
                  <UploadImage
                    label={'Avatar'}
                    setFile={setFile}
                  />
                </Grid>
                {/* <Grid
                  item
                  xs={12}
                >
                  <FormControl
                    fullWidth
                    variant="outlined"
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="label"
                      htmlFor="field-select"
                      fontWeight={500}
                    >
                      Tags
                    </Typography>
                    <Stack
                      direction={'row'}
                      gap={1}
                      mb={1}
                    >
                      <OutlinedInput
                        value={tagValue}
                        onChange={(e) => setTagValue(e.target.value)}
                        size="small"
                        id="bot-description-input"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleAddTag}
                      >
                        Thêm tag
                      </Button>
                    </Stack>
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field, fieldState }) =>
                        tagList.length > 0 && (
                          <>
                            <Stack
                              direction={'row'}
                              flexWrap={'wrap'}
                              gap={'5px'}
                              p={1}
                              sx={{ border: '1px solid #c8cacb', borderRadius: '6px' }}
                            >
                              {tagList.map((tag, index) => (
                                <Chip
                                  key={index}
                                  style={{ width: 'auto' }}
                                  label={tag}
                                  variant="outlined"
                                  onDelete={() => handleRemoveTag(index)}
                                />
                              ))}
                            </Stack>
                            {fieldState.error && (
                              <Typography color="error">{fieldState.error.message}</Typography>
                            )}
                          </>
                        )
                      }
                    />
                  </FormControl>
                </Grid> */}

                
              </Grid>
    </DialogCustom>
  );
};

CreateFieldDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default CreateFieldDialog;
