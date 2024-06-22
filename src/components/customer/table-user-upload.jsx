import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {
  Box,
  Card,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import EmptyDataImage from '/src/assets/images/all-img/empty-data.png';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
const TableUserUpload = ({ users, onRemove }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };
  const paginatedUsers = applyPagination(users, page, limit);

  useEffect(() => {
    const count = Math.ceil(users.length / limit);
    if (page > 0 && page > count - 1) {
      setPage(count - 1);
    }
  }, [users]);

  return (
    <Box mt={3}>
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
                  <TableCell>{t('STT')}</TableCell>
                  <TableCell>{t('Họ')}</TableCell>
                  <TableCell>{t('Tên')}</TableCell>
                  <TableCell>{t('Email')}</TableCell>
                  <TableCell>{t('Số điện thoại')}</TableCell>
                  <TableCell align="center">{t('Hành động')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableCell
                    colSpan={6}
                    align="center"
                  >
                    <img
                      style={{ width: '200px' }}
                      src={EmptyDataImage}
                    />
                  </TableCell>
                ) : (
                  paginatedUsers.map((user, index) => {
                    return (
                      <TableRow
                        hover
                        key={user.id}
                      >
                        <TableCell>
                          <Typography variant="h6">{index + 1}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">{user.firstname}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">{user.lastname}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">{user.email}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">{user.phoneNumber}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography noWrap>
                            <Tooltip
                              title={t('Delete')}
                              arrow
                            >
                              <IconButton
                                color="secondary"
                                onClick={() => onRemove(index)}
                              >
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
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
            count={users.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            labelRowsPerPage="Số hàng mỗi trang"
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
    </Box>
  );
};
TableUserUpload.propTypes = {
  users: PropTypes.array.isRequired,
};
TableUserUpload.defaultProps = {
  users: [],
};
export default TableUserUpload;
