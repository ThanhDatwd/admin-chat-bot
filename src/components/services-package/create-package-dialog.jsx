import { zodResolver } from '@hookform/resolvers/zod';
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
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { forwardRef, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { modelsApi } from 'src/api/model';
import { periodsApi } from 'src/api/period';
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
  modelChatId: z.string().min(1, 'Chat model là bắt buộc'),
  maxToken: z.coerce.number().positive('Số lượng token tối đa phải là số nguyên dương'),
  periodId: z.string().min(1, 'Chu kì là bắt buộc'),
  fromDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
});

const CreatePackageDialog = ({ open, onClose, onUpdate }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [periodOptions, setPeriodOptions] = useState([]);
  const [modelChatOptions, setModelChatOptions] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      const data = await periodsApi.getPeriods({ pageNumber: 0, pageSize: 10 });
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
      reset();
    }
  }, [open]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      onUpdate?.(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };

  return (
    <Dialog
      onClose={() => {
        reset();
        onClose();
      }}
      open={open}
      TransitionComponent={Transition}
      fullScreen={!mdUp}
      scroll="paper"
      aria-labelledby="basic-dialog-title"
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography
            variant="h4"
            fontWeight={600}
          >
            Tạo gói dịch vụ mới
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
                              setValue('fromDate', date ? format(date, 'yyyy-MM-dd') : '');
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
              onClose();
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
  );
};

export default CreatePackageDialog;
