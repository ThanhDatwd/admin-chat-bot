import { zodResolver } from '@hookform/resolvers/zod';
import {
  Badge,
  Box,
  Button,
  Chip,
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
import React, { forwardRef, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { postData } from 'src/api/axios';
import { useSelector } from 'src/store';
import { z } from 'zod';
import { InlineBadge } from '../base/styles/inline-badge';
import UploadIconChatbot from './upload-icon-chatbot';

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
  botName: z.string().min(1, 'Tên bot là bắt buộc').max(500, 'Tên bot tối đa 500 ký tự'),
  botDescription: z.string().max(500, 'Mô tả bot tối đa 500 ký tự').optional(),
  icon: z.string().min(1, 'Icon là bắt buộc'),
  field: z.array(z.string()).nonempty('Lĩnh vực là bắt buộc'),
  status: z.enum(['Hoạt động', 'Không hoạt động']).default('Hoạt động'),
});

const CreateChatbotDialog = ({ open, onClose, onUpdate }) => {
  const theme = useTheme();
  const currentAdmin = useSelector((state) => state.auth.admin);

  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const { knowledges } = useSelector((state) => state.knowledge);
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      botName: '',
      botDescription: '',
      icon: '',
      field: [],
      status: 'Hoạt động',
    },
  });

  const onSubmit = async (data) => {
    try {
      await postData(import.meta.env.VITE_API_URL_8085 + 'bot', {
        botName: data.botName,
        botDescription: data.botDescription,
        icon: data.icon,
        knowId: data.field[0],
        createUserId: currentAdmin.id,
        customerId: currentAdmin?.customerId,
      });
      onUpdate?.(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating bot:', error);
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
            Tạo bot mới
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
                      htmlFor="bot-name-input"
                      fontWeight={500}
                    >
                      Tên bot
                    </Typography>
                    <Controller
                      name="botName"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            id="bot-name-input"
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
                      htmlFor="bot-description-input"
                      fontWeight={500}
                    >
                      Mô tả bot
                    </Typography>
                    <Controller
                      name="botDescription"
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <OutlinedInput
                            {...field}
                            id="bot-description-input"
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
                      Lĩnh vực
                    </Typography>
                    <Controller
                      name="field"
                      control={control}
                      render={({ field }) => (
                        <Select
                          multiple
                          value={field.value}
                          onChange={field.onChange}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected?.map((value) => (
                                <Chip
                                  key={value}
                                  variant="outlined"
                                  size="small"
                                  label={
                                    <InlineBadge>
                                      <Badge
                                        variant="dot"
                                        color="primary"
                                        sx={{ mr: 1, display: { xs: 'none', sm: 'inline-flex' } }}
                                      />
                                      {knowledges.find((item) => item.knowId === value)?.knowName}
                                    </InlineBadge>
                                  }
                                />
                              ))}
                            </Box>
                          )}
                        >
                          {knowledges.map((option) => (
                            <MenuItem
                              key={option.knowId}
                              value={option.knowId}
                            >
                              {option.knowName}
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
                        Đang hoạt động
                      </Typography>
                    </Box>
                    <Switch
                      defaultChecked
                      id="switch-spatial-audio"
                    />
                  </Box>
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
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

CreateChatbotDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default CreateChatbotDialog;
