import {
  alpha,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { InlineBadge } from 'src/components/base/styles/inline-badge';

const ApprovePartnerDialogList = ({ data }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <List disablePadding>
      {data.map((item, idx) => (
        <Fragment key={idx}>
          <ListItem
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.neutral[800], 0.12)
                    : 'neutral.25',
              },
            }}
            secondaryAction={'Bị từ chối: ' + item.rejection_count + ' lần'}
          >
            <ListItemAvatar
              sx={{
                minWidth: 38,
                mr: 1,
              }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                }}
                alt={item.partner_name}
                src={item.avatar}
              />
            </ListItemAvatar>
            <ListItemText
              sx={{
                flexGrow: 0,
                maxWidth: '50%',
                flexBasis: '50%',
              }}
              disableTypography
              primary={
                <Typography
                  variant="h6"
                  noWrap
                >
                  {item.partner_name}
                </Typography>
              }
              secondary={
                <InlineBadge>
                  <Typography
                    color="text.secondary"
                    fontWeight={500}
                  >
                    {item.contact.phone}
                    <br />
                    {item.contact.email}
                  </Typography>
                </InlineBadge>
              }
            />
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};
export default ApprovePartnerDialogList;
