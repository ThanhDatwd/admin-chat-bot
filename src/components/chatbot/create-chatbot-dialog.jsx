import { CheckRounded } from '@mui/icons-material';
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
  FormGroup,
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
import React, { forwardRef, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
export const CreateChatbotDialog = (props) => {
  const {
    canReset,
    onClose,
    onUpdate,
    onReset,
    hiddenLayoutsSection,
    open,
    values = {},
    ...other
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const settingsOptions = [
    {
      title: t('Dịch vụ công Bộ công an'),
      description: 'Dịch vụ công Bộ công an',
    },
    {
      title: t('Dịch vụ công Bộ tài nguyên và môi trường'),
      description: 'Dịch vụ công Bộ tài nguyên và môi trường',
    },
  ];

  const [selectedSettings, setSelectedSettings] = useState(settingsOptions[0].title.split(','));
  const [formValues, setFormValues] = useState({
    botName: '',
    botDescription: '',
    icon: '',
    knowId: '',
    createUserId: '',
  });

  const handleSettingsChange = (event) => {
    setSelectedSettings(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(formValues);
    // Add your form submission logic here
  };
  const handleFieldUpdate = useCallback(
    (field, value) => {
      onUpdate?.({
        [field]: value,
      });
    },
    [onUpdate]
  );

  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
        TransitionComponent={Transition}
        fullScreen={!mdUp}
        scroll="paper"
        aria-labelledby="basic-dialog-title"
        maxWidth="lg"
        fullWidth
        {...other}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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
          <DialogContent
            sx={{
              overflowX: 'hidden',
              p: 3,
            }}
          >
            <Stack
              spacing={{
                xs: 2,
                sm: 3,
              }}
            >
              <Box>
                <FormGroup>
                  <Grid
                    container
                    spacing={{
                      xs: 2,
                      md: 3,
                    }}
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
                        <OutlinedInput
                          id="bot-name-input"
                          name="botName"
                          value={formValues.botName}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <UploadIconChatbot
                        onUpload={(file) =>
                          setFormValues((prevValues) => ({ ...prevValues, icon: file.name }))
                        }
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
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Viết mô tả ngắn cho bot
                          </Typography>
                        </Typography>
                        <OutlinedInput
                          id="bot-description-input"
                          name="botDescription"
                          value={formValues.botDescription}
                          onChange={handleInputChange}
                          multiline
                          maxRows={6}
                          minRows={2}
                          fullWidth
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
                          htmlFor="knowledge-settings-select"
                          fontWeight={500}
                        >
                          Lĩnh vực
                        </Typography>
                        <Select
                          multiple
                          value={selectedSettings}
                          onChange={handleSettingsChange}
                          MenuProps={{
                            // PaperProps: {
                            //   onScroll: loadMoreItems,
                            // },
                            style: {
                              maxHeight: 300,
                            },
                          }}
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip
                                  key={value}
                                  variant="outlined"
                                  size="small"
                                  label={
                                    <>
                                      <InlineBadge>
                                        <Badge
                                          variant="dot"
                                          color="primary"
                                          sx={{
                                            mr: 1,
                                            display: {
                                              xs: 'none',
                                              sm: 'inline-flex',
                                            },
                                          }}
                                        />
                                        {value}
                                      </InlineBadge>
                                    </>
                                  }
                                />
                              ))}
                            </Box>
                          )}
                          inputProps={{
                            name: 'activity-settings',
                            id: 'activity-settings-select',
                          }}
                        >
                          {settingsOptions.map((option) => (
                            <MenuItem
                              key={option.title}
                              value={option.title}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                pr: 1,
                              }}
                            >
                              {option.title}
                              {selectedSettings.includes(option.title) && (
                                <Box display="flex">
                                  <CheckRounded fontSize="small" />
                                </Box>
                              )}
                            </MenuItem>
                          ))}
                        </Select>
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
                        <Divider />
                        <Stack
                          mt={2}
                          spacing={2}
                          divider={<Divider variant="middle" />}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
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
                        </Stack>
                      </FormControl>
                    </Grid>
                  </Grid>
                </FormGroup>
              </Box>
            </Stack>
          </DialogContent>
        </Stack>
        <Divider />
        <DialogActions
          sx={{
            flexDirection: {
              xs: 'column-reverse',
              sm: 'row',
            },
            '& > :not(:first-of-type)': {
              marginLeft: {
                xs: 0,
                sm: theme.spacing(1),
              },
              marginBottom: {
                xs: theme.spacing(1),
                sm: 0,
              },
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1}
          >
            <Button color="secondary">Cancel</Button>
            <Button variant="contained">Save</Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};
CreateChatbotDialog.propTypes = {
  canReset: PropTypes.bool,
  hiddenLayoutsSection: PropTypes.bool,
  onClose: PropTypes.func,
  onReset: PropTypes.func,
  onUpdate: PropTypes.func,
  open: PropTypes.bool,
  values: PropTypes.object,
};
