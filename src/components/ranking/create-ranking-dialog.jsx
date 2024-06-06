import { zodResolver } from '@hookform/resolvers/zod';
import {
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  Stack,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { postData } from 'src/api/axios';
import { setLoading, setRefresh } from 'src/slices/common';
import { useSelector } from 'src/store';
import { z } from 'zod';
import { InlineBadge } from '../base/styles/inline-badge';
import UploadIconChatbot from '../chatbot/upload-icon-chatbot';
import { DialogCustom } from '../common/dialog-custom';

const formSchema = z.object({
  rankName: z.string().min(1, 'Tên thứ hạng là bắt buộc').max(200, 'Tên thứ hạng tối đa 200 ký tự'),
  icon: z.string().min(1, 'Biểu tượng là bắt buộc'),
  startingPoint: z.number().int().positive({ message: 'Nhập điểm bắt đầu thứ hạng là bắt buộc' }),
  status: z.enum(['active', 'inactive']).default('active'),
});

const CreateRankingDialog = ({ open, onClose, onUpdate }) => {
  const { t } = useTranslation();
  const [tagValue, setTagValue] = useState();
  const [tagList, setTagList] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  const theme = useTheme();
  const { control, setValue, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rankName: '',
      startingPoint: 0,
      icon: '',
      status: 'active',
    },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));

      // onUpdate?.(data);
      // reset();
      // onClose();
      // dispatch(setRefresh(!isRefresh));
    } catch (error) {
      console.error('Error creating bot:', error);
    } finally {
      dispatch(setLoading(false));
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
    }
  }, [open]);

  return (
    <DialogCustom
      open={open}
      onClose={onClose}
      title={t('Tạo mới thứ hạng')}
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
              {t('Tạo mới')}
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
      <Stack
        spacing={0}
        direction="row"
        height="100%"
        overflow="hidden"
      >
        <DialogContent sx={{ overflowX: 'hidden', p: 3 }}>
          <Stack spacing={{ xs: 2, sm: 3 }}>
            <Box>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
              >
                <Grid
                  item
                  xs={12}
                >
                  <Controller
                    name="icon"
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <UploadIconChatbot onUpload={(files) => field.onChange(files)} />
                        {fieldState.error && (
                          <Typography color="error">{fieldState.error.message}</Typography>
                        )}
                      </>
                    )}
                  />
                </Grid>
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
                      Tên thứ hạng
                    </Typography>
                    <Controller
                      name="rankName"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            id="rank-name-input"
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
                      htmlFor="field-code-input"
                      fontWeight={500}
                    >
                      Điểm bắt đầu thứ hạng
                    </Typography>
                    <Controller
                      name="startingPoint"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            type="number"
                            id="rank-startingPoint-input"
                            fullWidth
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                          {fieldState.error && (
                            <Typography color="error">{fieldState.error.message}</Typography>
                          )}
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                >
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Box overflow="hidden">
                      <Typography
                        variant="h6"
                        gutterBottom
                        htmlFor="switch-spatial-audio"
                        component="label"
                        fontWeight={500}
                      >
                        Trạng thái
                      </Typography>
                    </Box>
                    <>
                      <Switch
                        defaultChecked
                        onChange={(e) => {
                          setValue('status', e.target.checked ? 'active' : 'inactive');
                        }}
                        id="switch-spatial-audio"
                      />
                    </>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </DialogContent>
      </Stack>
    </DialogCustom>
  );
};

CreateRankingDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default CreateRankingDialog;
