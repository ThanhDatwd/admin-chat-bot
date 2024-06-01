import { DeleteRounded, MoreVertRounded } from '@mui/icons-material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import LocalFireDepartmentTwoToneIcon from '@mui/icons-material/LocalFireDepartmentTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import {
  Box,
  Card,
  Checkbox,
  Chip,
  IconButton,
  InputAdornment,
  Link,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonIcon } from 'src/components/base/styles/button-icon';
import { ButtonSoft } from 'src/components/base/styles/button-soft';

const ImgWrapper = styled('img')(
  ({ theme }) => `
      width: ${theme.spacing(7)};
      height: auto;
      border-radius: ${theme.shape.borderRadius}px;
`
);
const applyFilters = (users, query) => {
  return users.filter((user) => {
    let matches = true;
    if (query) {
      const properties = ['name'];
      let containsQuery = false;
      properties.forEach((property) => {
        if (user[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });
      if (!containsQuery) {
        matches = false;
      }
    }
    return matches;
  });
};
const applyPagination = (users, page, limit) => {
  return users.slice(page * limit, page * limit + limit);
};
const TableGroupUser = ({ users,selectedItems ,setSelectedItems }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState('');
  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };
  const handleSelectAllUsers = (event) => {
    setSelectedItems(event.target.checked ? users.map((user) => user.id) : []);
  };
  const handleSelectOneUser = (_event, userId) => {
    if (!selectedItems.includes(userId)) {
      setSelectedItems((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedItems((prevSelected) => prevSelected.filter((id) => id !== userId));
    }
  };
  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };
  const filteredUsers = applyFilters(users, query);
  const paginatedUsers = applyPagination(filteredUsers, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeUsers = selectedItems.length > 0 && selectedItems.length < users.length;
  const selectedAllUsers = selectedItems.length === users.length;
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <Box
        display="flex"
        pb={2}
        alignItems="center"
        justifyContent="space-between"
      >
        
          <Box
            flex={1}
            display={{
              xs: 'block',
              md: 'flex',
            }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                mb: {
                  xs: 2,
                  md: 0,
                },
              }}
            >
              <TextField
                size="small"
                fullWidth={mobile}
                onChange={handleQueryChange}
                value={query}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  my: '2px',
                }}
                placeholder={t('Filter by user name')}
              />
            </Box>
          </Box>
      </Box>

      {paginatedUsers.length === 0 ? (
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
          {t("We couldn't find any users matching your search criteria")}
        </Typography>
      ) : (
        <>
          <Card>
            <TableContainer
              sx={{
                mb: '-1px',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedAllUsers}
                        indeterminate={selectedSomeUsers}
                        onChange={handleSelectAllUsers}
                      />
                    </TableCell>
                    <TableCell>{t('STT')}</TableCell>
                    <TableCell>{t('Tên nhóm người dùng ')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((user, index) => {
                    const isUserSelected = selectedItems.includes(user.id);
                    return (
                      <TableRow
                        hover
                        key={user.id}
                        selected={isUserSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isUserSelected}
                            onChange={(event) => handleSelectOneUser(event, user.id)}
                            value={isUserSelected}
                          />
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6">{index + 1}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">{user.name}</Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          <Box
            p={2}
            sx={{
              '.MuiTablePagination-select': {
                py: 0.55,
              },
            }}
          >
            <TablePagination
              component="div"
              count={filteredUsers.length}
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
    </>
  );
};
TableGroupUser.propTypes = {
  users: PropTypes.array.isRequired,
};
TableGroupUser.defaultProps = {
  users: [],
};
export default TableGroupUser;
