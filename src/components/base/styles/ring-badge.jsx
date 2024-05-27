import { alpha, Badge, styled } from '@mui/material';

const badgeVariants = [
  'colorPrimary',
  'colorSecondary',
  'colorWarning',
  'colorSuccess',
  'colorError',
  'colorInfo',
];
export const RingBadge = styled(Badge)(({ theme }) => {
  const styles = badgeVariants.reduce((acc, variant) => {
    const color = variant.replace('color', '').toLowerCase();
    acc[`& .MuiBadge-${variant}`] = {
      boxShadow: `0 0 0 5px ${alpha(theme.palette[color].main, 0.12)}`,
    };
    return acc;
  }, {});
  return styles;
});
