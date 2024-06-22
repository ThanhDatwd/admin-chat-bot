import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Chip,
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
import { DialogCustom } from '../common/dialog-custom';

const formSchema = z.object({
  fieldName: z
    .string()
    .min(1, 'Tên lĩnh vực là bắt buộc')
    .max(200, 'Tên lĩnh vực tối đa 200 ký tự'),
  fieldCode: z.string().min(1, 'Mã lĩnh vực là bắt buộc').max(200, 'Mã lĩnh vực tối đa 200 ký tự'),
  tags: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

const CreateFieldDialog = ({ open, onClose, onUpdate, field }) => {
  const { t } = useTranslation();
  const [tagValue, setTagValue] = useState();
  const [tagList, setTagList] = useState([]);
  const dispatch = useDispatch();
  const [fieldStatus, setFieldStatus] = useState(true);
  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  const theme = useTheme();
  const { control, setValue, getValues, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fieldName: '',
      fieldCode: '',
      tags: [],
      status: 'active',
    },
  });

  const onSubmit = async (data) => {
    try {
      // dispatch(setLoading(true));
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
      setTagList([]);
      setFieldStatus(true);
    }
  }, [open]);

  useEffect(() => {
    if (field) {
      setValue('fieldName', field.fieldName);
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
                      name="fieldName"
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
                      Mã lĩnh vực
                    </Typography>
                    <Controller
                      name="fieldCode"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            id="bot-description-input"
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
                    {/* <Controller
                      name="status"
                      control={control}
                      render={({ field, fieldState }) => ( */}
                    <>
                      <Switch
                        defaultChecked={fieldStatus}
                        checked={fieldStatus}
                        onChange={(e) => {
                          setFieldStatus(e.target.checked);
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

CreateFieldDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default CreateFieldDialog;
