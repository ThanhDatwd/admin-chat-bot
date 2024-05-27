import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
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
  Card,
  Checkbox,
  Chip,
  Divider,
  Unstable_Grid2 as Grid,
  IconButton,
  InputAdornment,
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
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { knowledgesApi } from 'src/api/knowledges';
import { ButtonIcon } from 'src/components/base/styles/button-icon';
import { TabsShadow } from 'src/components/base/styles/tabs';
import { useRouter } from 'src/hooks/use-router';
import knowledgeSlice, { getKnowledge, setKnowledge } from 'src/slices/knowledge';
import { useDispatch } from 'src/store';
import BulkDelete from '../common/bulk-delete';

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

const applyFilters = (bots, query, filters) => {
  return bots.filter((bot) => {
    let matches = true;
    if (query) {
      const properties = ['botId', 'botName'];
      let containsQuery = false;
      properties.forEach((property) => {
        if (bot[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });
      if (filters.knowId && bot.knowId !== filters.knowId) {
        matches = false;
      }
      if (!containsQuery) {
        matches = false;
      }
    }
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && bot[key] !== value) {
        matches = false;
      }
    });
    return matches;
  });
};
const applyPagination = (bots, page, limit) => {
  return bots.slice(page * limit, page * limit + limit);
};
const ChatbotSection = ({ bots }) => {
  const [selectedItems, setSelectedBots] = useState([]);
  const [knowledges, setKnowledges] = useState([]);
  const { t } = useTranslation();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    knowId: null,
  });

  const getBotRoleLabel = (knowId) => {
    const knowledgeItem = knowledges.find((item) => item.value === knowId);
    const labelName = knowledgeItem ? knowledgeItem.label : 'Unknown';

    return (
      <Chip
        color={'info'}
        label={labelName}
      />
    );
  };

  const handleTabsChange = (_event, tabsValue) => {
    let value = null;
    if (tabsValue !== 'all') {
      value = tabsValue;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      knowId: value,
    }));
    setSelectedBots([]);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      knowId: selectedValue === 'all' ? null : selectedValue,
    }));
    setSelectedBots([]);
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSelectAllBots = (event) => {
    setSelectedBots(event.target.checked ? bots.map((bot) => bot.botId) : []);
  };

  const handleSelectOneBot = (_event, botId) => {
    if (!selectedItems.includes(botId)) {
      setSelectedBots((prevSelected) => [...prevSelected, botId]);
    } else {
      setSelectedBots((prevSelected) => prevSelected.filter((id) => id !== botId));
    }
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredBots = applyFilters(bots, query, filters);
  const paginatedBots = applyPagination(filteredBots, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeBots = selectedItems.length > 0 && selectedItems.length < bots.length;
  const selectedAllBots = selectedItems.length === bots.length;
  const [toggleView, setToggleView] = useState('grid_view');
  const handleViewOrientation = (_event, newValue) => {
    setToggleView(newValue);
  };
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchKnowledgeData = async () => {
      try {
        const data = await knowledgesApi.getKnowledges({ pageNumber: 0, pageSize: 20 });
        dispatch(setKnowledge(data));
        const knowledgeCounts = bots.reduce((acc, item) => {
          acc[item.knowId] = (acc[item.knowId] || 0) + 1;
          return acc;
        }, {});

        const convertedKnowledges = [
          {
            value: 'all',
            label: t('All bots'),
            count: bots.length,
          },
          // eslint-disable-next-line no-unsafe-optional-chaining
          ...data?.map((item) => ({
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

    fetchKnowledgeData();
  }, [bots]);

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
          value={filters.knowId || 'all'}
          variant="scrollable"
        >
          {knowledges.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={
                <>
                  {tab.label}
                  <Chip
                    label={tab.count}
                    size="small"
                  />
                </>
              }
            />
          ))}
        </TabsShadow>
      ) : (
        <Select
          value={filters.knowId || 'all'}
          //@ts-ignore
          onChange={handleSelectChange}
          fullWidth
        >
          {knowledges.map((tab) => (
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
                disabled={paginatedBots.length === 0}
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
            <TextField
              margin="none"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                ),
                endAdornment: query && (
                  <InputAdornment
                    sx={{
                      mr: -0.7,
                    }}
                    position="end"
                  >
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
              onChange={handleQueryChange}
              placeholder={t('Filter results')}
              value={query}
              size="small"
              variant="outlined"
            />
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
      {paginatedBots.length === 0 ? (
        <>
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
            fontWeight={500}
          >
            {t('Không có dữ liệu bot')}
          </Typography>
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
                      {paginatedBots.map((bot) => {
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
                            <TableCell>{getBotRoleLabel(bot.knowId)}</TableCell>
                            <TableCell>
                              <Typography fontWeight={600}>{bot.botDescription}</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography noWrap>
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
                  count={filteredBots.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 15]}
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
          {toggleView === 'grid_view' && (
            <>
              {paginatedBots.length === 0 ? (
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
                    {paginatedBots.map((bot) => {
                      const isBotSelected = selectedItems.includes(bot.botId);
                      return (
                        <Grid
                          xs={12}
                          sm={6}
                          lg={4}
                          key={bot.botId}
                          onClick={() => router.push(`/chatbot/${bot.botId}`)}
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
                                {getBotRoleLabel(bot.knowId)}
                                <IconButton
                                  color="primary"
                                  sx={{
                                    p: 0.5,
                                  }}
                                >
                                  <MoreVertTwoToneIcon />
                                </IconButton>
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
                                  src={bot.avatar}
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
                                    sx={{
                                      pt: 0.3,
                                    }}
                                    variant="subtitle2"
                                  >
                                    {bot.jobtitle}
                                  </Typography>
                                  {/* <Typography
                                    sx={{
                                      pt: 1,
                                    }}
                                    variant="h6"
                                    fontWeight={500}
                                  >
                                    {bot.email}
                                  </Typography> */}
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
                                <Typography>{bot.botDescription}</Typography>
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
                  <Card
                    sx={{
                      p: 2,
                      mt: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      '.MuiTablePagination-select': {
                        py: 0.55,
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        component="span"
                        variant="subtitle1"
                      >
                        {t('Showing')}
                      </Typography>{' '}
                      <b>{Math.min(limit, filteredBots.length)}</b> {t('of')}{' '}
                      <b>{filteredBots.length}</b> <b>{t('bots')}</b>
                    </Box>
                    <TablePagination
                      component="div"
                      count={filteredBots.length}
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleLimitChange}
                      page={page}
                      rowsPerPage={limit}
                      labelRowsPerPage=""
                      rowsPerPageOptions={[5, 10, 15]}
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
                  </Card>
                </>
              )}
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
