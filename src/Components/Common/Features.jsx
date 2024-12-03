import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Tiers Management',
    description: 'Manage different tiers for your loyalty program with ease.',
    imageLight: `url("/tiers.png")`,
  },
  {
    icon: <MobileFriendlyIcon />,
    title: 'Offers Management',
    description: 'Create and manage offers to keep your customers engaged.',
    imageLight: `url("/offers.png")`,
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Coupons Management',
    description: 'Efficiently manage coupons and discounts across platforms.',
    imageLight: `url("/coupons.png")`,
  },
];

export function MobileLayout({ selectedItemIndex, handleItemClick, selectedFeature }) {
  if (!items[selectedItemIndex]) {
    return null;
  }

  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, overflow: 'auto' }}>
        {items.map(({ title }, index) => (
          <Button
            size="medium"
            key={index}
            onClick={() => handleItemClick(index)}
            variant={selectedItemIndex === index ? 'contained' : 'outlined'}
          >
            {title}
          </Button>
        ))}
      </Box>
      <Card variant="outlined">
        <Box
          sx={{
            mb: 2,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 280,
            backgroundImage: items[selectedItemIndex].imageLight,
          }}
        />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: 'text.primary', fontWeight: 'medium' }}
          >
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features">
      <Box sx={{ width: { sm: '100%', md: '60%' } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Product Features
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}
        >
          Explore the key features of our loyalty management system, including Tiers, Offers, and Coupons Management.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                    (theme) => ({
                      p: 2,
                      height: '100%',
                      width: '100%'
                    }),
                    selectedItemIndex === index && {
                      backgroundColor: 'action.selected',
                    },
                  ]}
                  
              >
                <Box
                  sx={[
                    {
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                      gap: 1,
                      textAlign: 'left',
                      textTransform: 'none',
                      color: 'text.secondary',
                    },
                    selectedItemIndex === index && {
                      color: 'text.primary',
                    },
                  ]}
                >
                  {icon}

                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: { xs: '100%', md: '70%' },
            height: 'var(--items-image-height)',
          }}
        >
          <Card
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
              backgroundColor: '#D0D8E8',
              boxShadow: 'none'
            }}
          >
            <Box
              sx={{
                m: 'auto',
                width: '100%',
                height: '100%',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: items[selectedItemIndex].imageLight,
              }}
            />
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
