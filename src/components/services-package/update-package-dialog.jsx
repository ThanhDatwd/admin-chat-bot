import { zodResolver } from '@hookform/resolvers/zod';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { forwardRef, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { modelsApi } from 'src/api/model';
import { packageBasesApi } from 'src/api/package-base';
import { periodsApi } from 'src/api/period';
import { setLoading } from 'src/slices/common';
import { z } from 'zod';

const Transition = forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="down"
      ref={ref}
      {...props}
    />
  );
});

const formSchema = z.object({
  pkgId: z.string(),
  pkgName: z.string().min(1, 'Tên gói là bắt buộc').max(500, 'Tên gói tối đa 500 ký tự'),
  pkgDescription: z.string(),
  amount: z.coerce
    .number()
    .positive('Phí dịch vụ phải là số nguyên dương')
    .max(1e12, 'Phí dịch vụ tối đa 1 triệu tỷ'),
  request: z.coerce
    .number()
    .positive('Số lượng request phải là số nguyên dương')
    .max(1e12, 'Số lượng request tối đa 1 triệu tỷ'),
  modelChatId: z.coerce.number().min(1, 'Chat model là bắt buộc'),
  maxToken: z.coerce.number().positive('Số lượng token tối đa phải là số nguyên dương'),
  periodId: z.coerce.number().min(1, 'Chu kì là bắt buộc'),
  fromDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
});

const UpdatePackageDialog = ({ selectedItem, onUpdate }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [periodOptions, setPeriodOptions] = useState([]);
  const [modelChatOptions, setModelChatOptions] = useState([]);
  const [selectedFromDate, setSelectedFromDate] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pkgId: '',
      pkgName: '',
      pkgDescription: '',
      amount: '',
      request: '',
      modelChatId: '',
      maxToken: '',
      periodId: '',
      fromDate: '',
    },
  });

  const fetchPeriods = async () => {
    try {
      const data = await periodsApi.getPeriods({ pageNumber: 0, pageSize: 50 });
      setPeriodOptions(
        data.content.map((period) => ({
          value: period.id,
          label: period.name,
        }))
      );
    } catch (error) {
      console.error('Error fetching periods:', error);
    }
  };

  const fetchModels = async () => {
    try {
      const data = await modelsApi.getModels();
      setModelChatOptions(
        data.map((model) => ({
          value: model.id,
          label: model.name,
        }))
      );
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchPeriods();
      fetchModels();
      if (selectedItem) {
        reset({
          pkgId: selectedItem.pkgId,
          pkgName: selectedItem.pkgName,
          pkgDescription: selectedItem.pkgDescription,
          amount: selectedItem.amount,
          request: selectedItem.request,
          modelChatId: selectedItem.modelChatId,
          maxToken: selectedItem.maxToken,
          periodId: selectedItem.periodId,
          fromDate: selectedItem.fromDate
            ? format(new Date(selectedItem.fromDate), 'dd/MM/yyyy')
            : '',
        });
        setSelectedFromDate(selectedItem.fromDate ? new Date(selectedItem.fromDate) : null);
      } else {
        setSelectedFromDate(null);
        reset();
      }
    }
  }, [open, selectedItem, reset]);

  const onSubmit = async (data) => {
    console.log('Submitted Data:', data);
    try {
      dispatch(setLoading(true));
      const response = await packageBasesApi.updatePackageBase(data);
      await onUpdate?.(data);
      reset();
      setSelectedFromDate(null);
      setOpen(false);
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const handleModelChange = (event) => {
    console.log('Selected model:', event.target.value);
    setValue('modelChatId', event.target.value);
  };

  const handlePeriodChange = (event) => {
    console.log('Selected period:', event.target.value);
    setValue('periodId', event.target.value);
  };

  return (
    <>
      <Tooltip
        title={t('Sửa')}
        arrow
      >
        <IconButton
          color="primary"
          onClick={() => setOpen(true)}
        >
          <EditTwoToneIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        onClose={() => {
          reset();
          setOpen(false);
        }}
        open={open}
        TransitionComponent={Transition}
        fullScreen={!mdUp}
        scroll="paper"
        aria-labelledby="update-dialog-title"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={600}
            >
              Cập nhật gói dịch vụ
            </Typography>
          </Box>
        </DialogTitle>
        <Divider />
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
                        htmlFor="pkgName-input"
                        fontWeight={500}
                      >
                        Tên gói
                      </Typography>
                      <Controller
                        name="pkgName"
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <OutlinedInput
                              {...field}
                              id="pkgName-input"
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
                        htmlFor="pkgDescription-input"
                        fontWeight={500}
                      >
                        Mô tả gói dịch vụ
                      </Typography>
                      <Controller
                        name="pkgDescription"
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <OutlinedInput
                              {...field}
                              id="pkgDescription-input"
                              multiline
                              maxRows={6}
                              minRows={2}
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
                    md={6}
                  >
                    <FormControl
                      fullWidth
                      variant="outlined"
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        component="label"
                        htmlFor="amount-input"
                        fontWeight={500}
                      >
                        Phí dịch vụ
                      </Typography>
                      <Controller
                        name="amount"
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <OutlinedInput
                              {...field}
                              id="amount-input"
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
                    md={6}
                  >
                    <FormControl
                      fullWidth
                      variant="outlined"
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        component="label"
                        htmlFor="request-input"
                        fontWeight={500}
                      >
                        Số lượng request
                      </Typography>
                      <Controller
                        name="request"
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <OutlinedInput
                              {...field}
                              id="request-input"
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
                    md={6}
                  >
                    <FormControl
                      fullWidth
                      variant="outlined"
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        component="label"
                        htmlFor="modelChatId-select"
                        fontWeight={500}
                      >
                        Chat model
                      </Typography>
                      <Controller
                        name="modelChatId"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            id="modelChatId-select"
                            fullWidth
                            onChange={(event) => {
                              field.onChange(event);
                              handleModelChange(event);
                            }}
                          >
                            {modelChatOptions.map((option) => (
                              <MenuItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <FormControl
                      fullWidth
                      variant="outlined"
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        component="label"
                        htmlFor="maxToken-input"
                        fontWeight={500}
                      >
                        Số lượng token tối đa
                      </Typography>
                      <Controller
                        name="maxToken"
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <OutlinedInput
                              {...field}
                              id="maxToken-input"
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
                    md={6}
                  >
                    <FormControl
                      fullWidth
                      variant="outlined"
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        component="label"
                        htmlFor="periodId-select"
                        fontWeight={500}
                      >
                        Chu kì
                      </Typography>
                      <Controller
                        name="periodId"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            id="periodId-select"
                            fullWidth
                            onChange={(event) => {
                              field.onChange(event);
                              handlePeriodChange(event);
                            }}
                          >
                            {periodOptions.map((option) => (
                              <MenuItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <FormControl
                      fullWidth
                      variant="outlined"
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        component="label"
                        htmlFor="fromDate-input"
                        fontWeight={500}
                      >
                        Ngày bắt đầu
                      </Typography>
                      <Controller
                        name="fromDate"
                        control={control}
                        render={({ field }) => (
                          <>
                            <DatePicker
                              {...field}
                              format="dd-MM-yyyy"
                              value={selectedFromDate}
                              onChange={(date) => {
                                setSelectedFromDate(date);
                                setValue('fromDate', date ? format(date, 'dd/MM/yyyy') : '');
                              }}
                              renderInput={(params) => (
                                <OutlinedInput
                                  {...params}
                                  id="fromDate-input"
                                  fullWidth
                                  error={!!errors.fromDate}
                                />
                              )}
                            />
                            {errors.fromDate && (
                              <Typography color="error">{errors.fromDate.message}</Typography>
                            )}
                          </>
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </DialogContent>
        </Stack>
        <Divider />
        <DialogActions
          sx={{
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            '& > :not(:first-of-type)': {
              marginLeft: { xs: 0, sm: theme.spacing(1) },
              marginBottom: { xs: theme.spacing(1), sm: 0 },
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1}
          >
            <Button
              color="secondary"
              onClick={() => {
                reset();
                setOpen(false);
              }}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Lưu
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdatePackageDialog;
