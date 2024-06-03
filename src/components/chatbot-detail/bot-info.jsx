import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ButtonIcon } from '../base/styles/button-icon';

const BotInfo = ({ data }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { knowledges } = useSelector((state) => state.knowledge);

  return (
    <Card
      sx={{
        width: '650px',
      }}
    >
      <CardHeader
        titleTypographyProps={{
          variant: 'h4',
        }}
        title="Thông tin Bot"
        action={
          <Tooltip
            arrow
            placement="top"
            title={t('Sửa thông tin bot')}
          >
            <ButtonIcon color="primary">
              <EditOutlinedIcon />
            </ButtonIcon>
          </Tooltip>
        }
      />
      <Divider />
      <Box
        textAlign="center"
        position="relative"
        p={{
          xs: 2,
          sm: 3,
          md: 6,
        }}
      >
        <Avatar
          sx={{
            mx: 'auto',
            mb: 1.5,
            width: 94,
            height: 94,
          }}
          src={data?.icon}
        />
        <Chip
          color="success"
          label={data?.botStatus}
        />
        <Typography
          sx={{
            pt: 2,
          }}
          variant="h3"
        >
          {data?.botName}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
        >
          {knowledges.find((item) => item.knowId === data?.knowId)?.knowName}
        </Typography>
        <Typography
          sx={{
            pt: 1,
          }}
          style={{ fontSize: 16 }}
          color="text.secondary"
        >
          {data?.botDescription}
        </Typography>
      </Box>
    </Card>
  );
};
export default BotInfo;
