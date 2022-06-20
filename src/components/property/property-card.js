import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import './property-list-toolbar';

export const PropertyCard = ({ property, ...rest }) => {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = property.images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
    >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3,
          flexDirection: 'column',
        }}
      >
        
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          
        >
          {/* <img src={property.images[0].url} style={{
                  display: 'block',
                  width: "100%",
                  height: "255px",
                  overflow: 'hidden',
                  paddingLeft: '25px',
                  objectFit: 'cover'}}/> */}
        {property.images.map((step, index) => (
          <div key={step.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: 'block',
                  width: "100%",
                  height: "255px",
                  overflow: 'hidden',
                  paddingLeft: '25px',
                  objectFit: 'cover'
                }}
                src={step.url}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          
          nextButton={
            <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {property.propertyName}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {property.description}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <BedroomChildIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Room quantity: {property.roomQuantity}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <LocationCityIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {property.totalDownloads}
            {' '}
            {property.city}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired
};
