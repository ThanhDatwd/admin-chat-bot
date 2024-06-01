import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import { Box, Stack, Typography } from '@mui/material';
import { AvatarState } from 'src/components/base/styles/avatar';

const AlertDialogContent = (props) => {
  const {title, description} = props
  return (
    <>
      <Stack
        p={{
          xs: 0,
          sm: 2,
        }}
        spacing={2}
        justifyContent="flex-start"
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        alignItems={{
          xs: 'flex-start',
          sm: 'flex-start',
        }}
      >
        <AvatarState
          state="error"
          isSoft
          sx={{
            width: 54,
            height: 54,
          }}
        >
          <WarningTwoToneIcon
            sx={{
              fontSize: 24,
            }}
          />
        </AvatarState>
        <Box
          pt={{
            xs: 0,
            sm: 0.5,
          }}
          textAlign={{
            xs: 'center',
            sm: 'left',
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            fontWeight={500}
            sx={{
              pb: 2,
            }}
          >
           {description}
          </Typography>
        </Box>
      </Stack>
      
    </>
  );
};
export default AlertDialogContent;
