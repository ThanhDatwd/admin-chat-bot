import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  FormControl,
  Grid,
  OutlinedInput,
  Stack,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setLoading } from 'src/slices/common';
import { useSelector } from 'src/store';
import { z } from 'zod';
import UploadIconChatbot from '../chatbot/upload-icon-chatbot';
import { DialogCustom } from '../common/dialog-custom';

const formSchema = z.object({
  rankName: z.string().min(1, 'Tên thứ hạng là bắt buộc').max(200, 'Tên thứ hạng tối đa 200 ký tự'),
  icon: z.string().min(1, 'Biểu tượng là bắt buộc'),
  startingPoints: z.number().int().positive({ message: 'Nhập điểm bắt đầu thứ hạng là bắt buộc' }),
  status: z.enum(['active', 'inactive']).default('active'),
});

const CreateRankingDialog = ({ open, onClose, onUpdate, rank }) => {
  const { t } = useTranslation();
  const [rankStatus, setRankStatus] = useState(true);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  const theme = useTheme();
  const { control, setValue, getValues, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rankName: '',
      startingPoints: 0,
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

  useEffect(() => {
    if (!open) {
      reset();
      setRankStatus(true)
    }
  }, [open]);

  useEffect(() => {
    if (rank) {
      setValue('rankName', rank.rankName);
      setValue('startingPoints', rank.startingPoints);
      setValue('status', rank.status);
      setRankStatus(rank.status === 'inactive' ? false : true);
    }
  }, [rank, open]);

  return (
    <DialogCustom
      open={open}
      onClose={onClose}
      title={rank ? t('Cập nhật thứ hạng') : t('Tạo mới thứ hạng')}
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
              {rank ? t('Cập nhật') : t('Tạo mới')}
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
                      name="startingPoints"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            type="number"
                            id="rank-startingPoints-input"
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
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        noWrap
                      >
                        {getValues('status') === 'inactive' ? 'Không hoat động' : 'Hoạt động'}
                      </Typography>
                    </Box>
                    <>
                      <Switch
                        defaultChecked={rankStatus}
                        checked={rankStatus}
                        onChange={(e) => {
                          setRankStatus(e.target.checked);
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
