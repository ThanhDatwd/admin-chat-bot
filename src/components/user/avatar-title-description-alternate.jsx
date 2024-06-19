import { Avatar, Badge, Box, Typography } from '@mui/material';
import { lime } from '@mui/material/colors';
import { useSelector } from 'react-redux';

const AvatarTitleDescriptionAlternate = () => {
  const currentAmin = useSelector((state) => state.auth.admin);

  return (
    <Box
      display="flex"
      alignItems="center"
    >
        <Avatar
          sx={{
            borderRadius: 'inherit',
            width: 48,
            height: 48,
          }}
          src={currentAmin.avatarUrl}/>
      <Box
        mx={1}
        overflow="hidden"
      >
        <Typography
          variant="h5"
          component="div"
        >
          {currentAmin.firstName} {currentAmin.lastName} 
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          noWrap
        >
          {currentAmin.username}
        </Typography>
      </Box>
    </Box>
  );
};
export default AvatarTitleDescriptionAlternate;
