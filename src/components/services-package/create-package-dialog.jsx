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
import { forwardRef, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import UploadIconChatbot from '../chatbot/upload-icon-chatbot';

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
  packageName: z.string().min(1, 'Tên gói là bắt buộc').max(500, 'Tên gói tối đa 500 ký tự'),
  packageCode: z.string().min(1, 'Mã gói là bắt buộc').max(200, 'Mã gói tối đa 200 ký tự'),
  avatar: z.string().optional(),
  priority: z
    .number()
    .positive('Độ ưu tiên phải là số nguyên dương')
    .max(1000000, 'Độ ưu tiên tối đa 1 triệu')
    .optional(),
  questionCount: z
    .number()
    .positive('Số lượng câu hỏi phải là số nguyên dương')
    .max(1e12, 'Số lượng câu hỏi tối đa 1 triệu tỷ'),
  description: z.string(),
  fee: z
    .number()
    .positive('Phí dịch vụ phải là số nguyên dương')
    .max(1e12, 'Phí dịch vụ tối đa 1 triệu tỷ'),
  registrationDeadline: z.string().min(1, 'Hạn đăng ký là bắt buộc'),
  status: z.enum(['Hoạt động', 'Không hoạt động']).default('Hoạt động'),
});

const CreatePackageDialog = ({ open, onClose, onUpdate }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageName: '',
      packageCode: '',
      avatar: '',
      priority: '',
      questionCount: '',
      description: '',
      fee: '',
      registrationDeadline: '',
      status: 'Hoạt động',
    },
  });

  const onSubmit = async (data) => {
    try {
      onUpdate?.(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

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
                      htmlFor="package-name-input"
                      fontWeight={500}
                    >
                      Tên gói
                    </Typography>
                    <Controller
                      name="packageName"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            id="package-name-input"
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
                      htmlFor="package-code-input"
                      fontWeight={500}
                    >
                      Mã gói
                    </Typography>
                    <Controller
                      name="packageCode"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            id="package-code-input"
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
                  <Controller
                    name="avatar"
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
                      htmlFor="priority-input"
                      fontWeight={500}
                    >
                      Độ ưu tiên
                    </Typography>
                    <Controller
                      name="priority"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            id="priority-input"
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
                      htmlFor="question-count-input"
                      fontWeight={500}
                    >
                      Số lượng câu hỏi
                    </Typography>
                    <Controller
                      name="questionCount"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            id="question-count-input"
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
                      htmlFor="fee-input"
                      fontWeight={500}
                    >
                      Phí dịch vụ
                    </Typography>
                    <Controller
                      name="fee"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            id="fee-input"
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
                      htmlFor="description-input"
                      fontWeight={500}
                    >
                      Mô tả gói dịch vụ
                    </Typography>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            id="description-input"
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
                      htmlFor="registration-deadline-input"
                      fontWeight={500}
                    >
                      Hạn đăng ký gói
                    </Typography>
                    <Controller
                      name="registrationDeadline"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            id="registration-deadline-input"
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
                      htmlFor="status-select"
                      fontWeight={500}
                    >
                      Trạng thái
                    </Typography>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onChange={field.onChange}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected}
                            </Box>
                          )}
                        >
                          <MenuItem value="Hoạt động">Hoạt động</MenuItem>
                          <MenuItem value="Không hoạt động">Không hoạt động</MenuItem>
                        </Select>
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
