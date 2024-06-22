import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  Unstable_Grid2 as Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Link,
  MenuItem,
  Select,
  Stack,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EmptyDataImage from '/src/assets/images/all-img/empty-data.png';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as qs from 'qs';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { knowledgesApi } from 'src/api/knowledges';
import { ButtonIcon } from 'src/components/base/styles/button-icon';
import { TabsShadow } from 'src/components/base/styles/tabs';
import { BOT_STATUS } from 'src/constants/bot';
import { useRouter } from 'src/hooks/use-router';
import { setLoading } from 'src/slices/common';
import { getKnowledge, setKnowledge } from 'src/slices/knowledge';
import { useDispatch } from 'src/store';
import { debounce } from 'src/utils';
import { isVietnameseTones } from 'src/utils/validateString';
import BulkDelete from '../common/bulk-delete';
import AuthorizeChatbotQuery from './authorize-chatbot-query';
import ChatbotFooterDropdown from './chatbot-footer-dropdown';

export const CardWrapper = styled(Card)(
  ({ theme }) => `

  position: relative;
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: inherit;
    z-index: 1;
  }
      
    &.Mui-selected::after {
      box-shadow: 0 0 0 3px ${theme.palette.primary.main};
    }
  `
);

const ChatbotSection = ({ bots, fetchData, totalCount }) => {
  const [selectedBot, setSelectedBot] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [knowledges, setKnowledges] = useState([]);
  const { t } = useTranslation();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(15);
  const [searchByNameValue, setSearchByNameValue] = useState('');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    botStatus: null,
  });

  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);
  const router = useRouter();
  const dispatch = useDispatch();
  const { knowledges: knowledgeData } = useSelector((state) => state.knowledge);
  const [openAuthorizeChatbotQuery, setOpenAuthorizeChatbotQuery] = useState(false);

  const getBotStatus = (status) => {
    const botStatus = BOT_STATUS[status];
    return (
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignContent: 'start',
            width:'100%'
          }}
        >
          <Chip
            style={{ maxWidth: '80%' }}
            color={botStatus?.color}
            label={botStatus?.label}
          />
          {status === BOT_STATUS.SYNCING.value && (
            <LinearProgress style={{ height: '2px', width: 'auto' }} />
          )}
        </Box>
    );
  };

  const handleTabsChange = (_event, tabsValue) => {
    let value = null;
    if (tabsValue !== 'ALL') {
      value = tabsValue;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      botStatus: value,
    }));
    setSelectedItems([]);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      botStatus: selectedValue === 'ALL' ? null : selectedValue,
    }));
    setSelectedItems([]);
  };

  const handleSelectAllBots = (event) => {
    setSelectedItems(event.target.checked ? bots.map((bot) => bot.botId) : []);
  };

  const handleSelectOneBot = (_event, botId) => {
    if (!selectedItems.includes(botId)) {
      setSelectedItems((prevSelected) => [...prevSelected, botId]);
    } else {
      setSelectedItems((prevSelected) => prevSelected.filter((id) => id !== botId));
    }
  };

  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeBots = selectedItems.length > 0 && selectedItems.length < bots.length;
  const selectedAllBots = selectedItems.length === bots.length;
  const [toggleView, setToggleView] = useState('grid_view');
  const handleViewOrientation = (_event, newValue) => {
    setToggleView(newValue);
  };

  useEffect(() => {
    const fetchKnowledgeData = async () => {
      try {
        const knowledgeCounts = bots.reduce((acc, item) => {
          acc[item.knowId] = (acc[item.knowId] || 0) + 1;
          return acc;
        }, {});

        const convertedKnowledges = [
          {
            value: 'ALL',
            label: t('All bots'),
            count: bots.length,
          },
          // eslint-disable-next-line no-unsafe-optional-chaining
          ...knowledgeData?.map((item) => ({
            value: item.knowId,
            label: t(item.knowName),
            count: knowledgeCounts[item.knowId],
          })),
        ];

        setKnowledges(convertedKnowledges);
      } catch (error) {
        console.error('Error fetching knowledge data:', error);
      }
    };

    if (bots.length && knowledgeData) fetchKnowledgeData();
  }, [bots, knowledgeData]);

  // HANDLE FILTER
  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
    const queryParams = qs.stringify({ ...filters, accent: isVietnameseTones(filters?.search) });
    fetchData({ pageNumber: newPage, pageSize: limit }, queryParams);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setPage(0);
    const queryParams = qs.stringify({ ...filters, accent: isVietnameseTones(filters?.search) });
    fetchData({ pageNumber: 0, pageSize: parseInt(event.target.value) }, queryParams);
  };

  const handleSearchByName = async (value) => {
    handleChangeFilter({ search: value });
  };

  const handleChangeFilter = (data) => {
    let newFilter = { ...filters, ...data };

    for (const key in newFilter) {
      if (newFilter[key] === '' || newFilter[key] === undefined) {
        delete newFilter[key];
      }
    }

    setFilters({ ...newFilter, accent: isVietnameseTones(newFilter.search) });
    if (fetchData && filters) {
      dispatch(setLoading(true));
      const queryParams = qs.stringify({
        ...newFilter,
        accent: isVietnameseTones(newFilter?.search),
      });
      fetchData(
        {
          pageNumber: page,
          pageSize: limit,
        },

        queryParams
      ).finally(() => dispatch(setLoading(false)));
    }
    return newFilter;
  };
  const handleFilter = async () => {
    if (fetchData && filters) {
      dispatch(setLoading(true));
      const queryParams = qs.stringify({ ...filters, accent: isVietnameseTones(filters?.search) });
      fetchData(
        {
          pageNumber: page,
          pageSize: limit,
        },

        queryParams
      ).finally(() => dispatch(setLoading(false)));
    }
  };
  const handleEnter = (event) => {
    let enterKey = 13;
    if (event.which == enterKey) {
      event.preventDefault();
      handleFilter();
    }
  };
  const botStatus = [
    {
      value: 'ALL',
      label: 'Tất cả',
    },
    ...Object.entries(BOT_STATUS).map(([key, value]) => ({
      value: key,
      ...value,
    })),
  ];

  useEffect(() => {
    fetchData({ pageNumber: page, pageSize: limit });
  }, [isRefresh]);
  return (
    <>
      {mdUp ? (
        <TabsShadow
          sx={{
            '& .MuiTab-root': {
              flexDirection: 'row',
              pr: 1,
              '& .MuiChip-root': {
                ml: 1,
                transition: theme.transitions.create(['background', 'color'], {
                  duration: theme.transitions.duration.complex,
                }),
              },
              '&.Mui-selected': {
                '& .MuiChip-root': {
                  backgroundColor: alpha(theme.palette.primary.contrastText, 0.12),
                  color: 'primary.contrastText',
                },
              },
              '&:first-child': {
                ml: 0,
              },
            },
          }}
          onChange={handleTabsChange}
          scrollButtons="auto"
          textColor="secondary"
          value={filters.botStatus || 'ALL'}
          variant="scrollable"
        >
          {botStatus.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={
                <>
                  {tab.label}
                  <Chip
                    label={10}
                    size="small"
                  />
                </>
              }
            />
          ))}
        </TabsShadow>
      ) : (
        <Select
          value={filters.botStatus || 'ALL'}
          //@ts-ignore
          onChange={handleSelectChange}
          fullWidth
        >
          {botStatus.map((tab) => (
            <MenuItem
              key={tab.value}
              value={tab.value}
            >
              {tab.label}
            </MenuItem>
          ))}
        </Select>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        <Box
          display="flex"
          alignItems="center"
          width={'100%'}
        >
          {toggleView === 'grid_view' && (
            <Tooltip
              arrow
              placement="top"
              title={t('Select all bots')}
            >
              <Checkbox
                edge="start"
                sx={{
                  mr: 1,
                }}
                disabled={bots.length === 0}
                checked={selectedAllBots}
                indeterminate={selectedSomeBots}
                onChange={handleSelectAllBots}
              />
            </Tooltip>
          )}
          {selectedBulkActions ? (
            <Stack
              direction="row"
              spacing={1}
            >
              <BulkDelete />
              <Tooltip
                arrow
                placement="top"
                title={t('Export bot list')}
              >
                <ButtonIcon
                  variant="outlined"
                  color="secondary"
                  sx={{
                    color: 'primary.main',
                  }}
                  size="small"
                  startIcon={<IosShareRoundedIcon fontSize="small" />}
                />
              </Tooltip>
            </Stack>
          ) : (
            <Stack
              direction="row"
              // flexWrap={'wrap'}
              gap={'10px'}
              width={'100%'}
            >
              <Box
                width={{
                  xs: '100%',
                  md: '50%',
                }}
              >
                <TextField
                  margin="none"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchTwoToneIcon />
                      </InputAdornment>
                    ),
                    endAdornment: query && (
                      <InputAdornment position="end">
                        <IconButton
                          color="error"
                          aria-label="clear input"
                          onClick={() => setQuery('')}
                          edge="end"
                          size="small"
                          sx={{
                            color: 'error.main',
                          }}
                        >
                          <ClearRoundedIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) => {
                    handleSearchByName(event.target.value);
                    setSearchByNameValue(event.target.value);
                  }}
                  onKeyPress={handleEnter}
                  placeholder={t('Tên bot')}
                  value={searchByNameValue}
                  size="small"
                  variant="outlined"
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ whiteSpace: 'nowrap', minWidth: 'unset' }}
                onClick={handleFilter}
              >
                {t('Tìm kiếm')}
              </Button>
            </Stack>
          )}
        </Box>
        <ToggleButtonGroup
          sx={{
            ml: 1,
          }}
          size="large"
          color="primary"
          value={toggleView}
          exclusive
          onChange={handleViewOrientation}
        >
          <ToggleButton value="table_view">
            <TableRowsTwoToneIcon />
          </ToggleButton>
          <ToggleButton value="grid_view">
            <GridViewTwoToneIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {bots.length === 0 ? (
        <>
          <Box
            sx={{ minHeight: '50vh' }}
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            {' '}
            <img
              style={{ width: '200px' }}
              src={EmptyDataImage}
            />
            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              fontWeight={500}
            >
              {t('Không có dữ liệu bot')}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          {toggleView === 'table_view' && (
            <>
              <Card>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedAllBots}
                            indeterminate={selectedSomeBots}
                            onChange={handleSelectAllBots}
                          />
                        </TableCell>
                        <TableCell>{t('Tên bot')}</TableCell>
                        <TableCell>{t('Số lượng người dùng')}</TableCell>
                        <TableCell>{t('Lĩnh vực')}</TableCell>
                        <TableCell align="center">{t('Mô tả')}</TableCell>
                        <TableCell align="center">{t('Hành động')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bots.map((bot) => {
                        const isBotSelected = selectedItems.includes(bot.botId);
                        return (
                          <TableRow
                            hover
                            key={bot.id}
                            selected={isBotSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isBotSelected}
                                onChange={(event) => handleSelectOneBot(event, bot.botId)}
                                value={isBotSelected}
                              />
                            </TableCell>
                            <TableCell>
                              <Box
                                display="flex"
                                alignItems="center"
                              >
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    mr: 1,
                                  }}
                                  src={bot.avatar}
                                />
                                <Box>
                                  <Link
                                    variant="subtitle1"
                                    fontWeight={500}
                                    href=""
                                    onClick={() => router.push(`/chatbot/${bot.botId}`)}
                                    underline="hover"
                                  >
                                    {bot.botName}
                                  </Link>
                                  {/* <Typography
                                    noWrap
                                    variant="subtitle2"
                                    color="text.secondary"
                                  >
                                    {bot.knowId}
                                  </Typography> */}
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>{getBotStatus(bot.botStatus)}</TableCell>
                            <TableCell>
                              <Typography fontWeight={600}>{bot.botDescription}</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography noWrap>
                                <Tooltip
                                  title={t('Gán người dùng cho bot')}
                                  arrow
                                >
                                  <IconButton
                                    onClick={() => {
                                      setSelectedBot(bot);
                                      setOpenAuthorizeChatbotQuery(true);
                                    }}
                                    color="secondary"
                                  >
                                    <AddModeratorOutlinedIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip
                                  title={t('View')}
                                  arrow
                                >
                                  <IconButton color="secondary">
                                    <LaunchTwoToneIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip
                                  title={t('Delete')}
                                  arrow
                                >
                                  <IconButton color="secondary">
                                    <DeleteTwoToneIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </>
          )}
          {toggleView === 'grid_view' && (
            <>
              {bots.length === 0 ? (
                <Typography
                  sx={{
                    py: {
                      xs: 2,
                      sm: 3,
                      md: 6,
                      lg: 10,
                    },
                  }}
                  variant="h3"
                  color="text.secondary"
                  align="center"
                >
                  {t('Không có dữ liệu bot')}
                </Typography>
              ) : (
                <>
                  <Grid
                    container
                    spacing={{
                      xs: 2,
                      sm: 3,
                    }}
                  >
                    {bots.map((bot) => {
                      const isBotSelected = selectedItems.includes(bot.botId);
                      return (
                        <Grid
                          xs={12}
                          sm={6}
                          lg={4}
                          key={bot.botId}
                        >
                          <CardWrapper
                            className={clsx({
                              'Mui-selected': isBotSelected,
                            })}
                          >
                            <Box
                              sx={{
                                position: 'relative',
                                zIndex: '2',
                              }}
                            >
                              <Box
                                px={2}
                                pt={2}
                                display="flex"
                                alignItems="flex-start"
                                justifyContent="space-between"
                              >
                                {getBotStatus(bot.botStatus)}
                                <ChatbotFooterDropdown
                                  onSelect={() => setSelectedBot(bot)}
                                  setOpenAuthorizeChatbotQuery={setOpenAuthorizeChatbotQuery}
                                />
                              </Box>
                              <Box
                                p={2}
                                display="flex"
                                flexDirection={{
                                  xs: 'column',
                                  md: 'row',
                                }}
                                alignItems="flex-start"
                              >
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    width: 50,
                                    height: 50,
                                    mr: 1.5,
                                    mb: {
                                      xs: 2,
                                      md: 0,
                                    },
                                  }}
                                  src={bot.icon}
                                />
                                <Box>
                                  <Box>
                                    <Link
                                      variant="h6"
                                      href=""
                                      onClick={(e) => e.preventDefault()}
                                      underline="hover"
                                    >
                                      {bot.name}
                                    </Link>{' '}
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {bot.botName}
                                    </Typography>
                                  </Box>
                                  <Typography
                                    style={{
                                      height: 44,
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                    }}
                                    sx={{
                                      pt: 0.3,
                                    }}
                                    variant="subtitle2"
                                  >
                                    {bot.botDescription}
                                  </Typography>
                                </Box>
                              </Box>
                              <Divider />
                              <Box
                                pl={2}
                                py={1}
                                pr={1}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Button
                                  variant="contained"
                                  onClick={() => router.push(`/chatbot/${bot.botId}`)}
                                  endIcon={<ArrowForwardTwoToneIcon />}
                                >
                                  {t('Xem chi tiết bot')}
                                </Button>
                                <Checkbox
                                  checked={isBotSelected}
                                  onChange={(event) => handleSelectOneBot(event, bot.botId)}
                                  value={isBotSelected}
                                />
                              </Box>
                            </Box>
                          </CardWrapper>
                        </Grid>
                      );
                    })}
                  </Grid>
                </>
              )}
              <Box
                pt={2}
                sx={{
                  '.MuiTablePagination-select': {
                    py: 0.55,
                  },
                }}
              >
                <TablePagination
                  component="div"
                  count={totalCount}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  labelRowsPerPage="Số hàng mỗi trang"
                  rowsPerPageOptions={[5, 15, 30, 50]}
                  slotProps={{
                    select: {
                      variant: 'outlined',
                      size: 'small',
                      sx: {
                        p: 0,
                      },
                    },
                  }}
                />
              </Box>
            </>
          )}
          {!toggleView && (
            <Box
              sx={{
                textAlign: 'center',
                p: {
                  xs: 2,
                  sm: 3,
                },
              }}
            >
              <Typography
                align="center"
                variant="h4"
                color="text.secondary"
                fontWeight={500}
                sx={{
                  my: {
                    xs: 2,
                    sm: 3,
                    md: 5,
                  },
                }}
                gutterBottom
              >
                {t('Choose between table or grid views for displaying the bots list.')}
              </Typography>
            </Box>
          )}
          <AuthorizeChatbotQuery
            botName={selectedBot?.botName}
            open={openAuthorizeChatbotQuery}
            setOpen={setOpenAuthorizeChatbotQuery}
          />
        </>
      )}
    </>
  );
};
ChatbotSection.propTypes = {
  bots: PropTypes.array.isRequired,
};
ChatbotSection.defaultProps = {
  bots: [],
};
export default ChatbotSection;
