import React from 'react';
import { Slider, Box, Typography } from '@mui/material';
import { formatInterval } from '@/Pages/WaterfallPage/WaterfallLogic';
import axios from 'axios';
import { WATERFALL_STREAMER_URL } from '@/Helper/consts';

interface Props {
  values: number[]; // Array of specific values
  defaultValue: number;
  label: string;
}

export default function IntervalSelector({ values, defaultValue, label }: Props) {
  const [indexVal, setIndexValue] = React.useState<number>(values.findIndex(val => val === defaultValue));
  
  const handleChange = (_event: Event, newIndex: number | number[]) => {
    const newIndexVal = Array.isArray(newIndex) ? newIndex[0] : newIndex;
    setIndexValue(newIndexVal);
    onChange(values[newIndexVal]);
  };

  // Create marks for the slider based on the values
  const marks = values.map((val, index) => {
    const label: string = formatInterval(val as SendingInterval);

    return ({
      value: index,
      label: label,
    })
  });

  return (
    <Box sx={{ width: '100%', margin: '50px'}}>
      <Typography gutterBottom style={{ fontSize: '2rem' }}>{label}</Typography>
      <Slider
        color='success'
        value={indexVal}
        min={0}
        max={values.length - 1}
        marks={marks}
        onChange={handleChange}
        step={null} // Disable steps
        aria-labelledby="slider-label"
        sx={{
          '& .MuiSlider-markLabel': {
            fontSize: '1.5em', // Change the font size
          },
        }}
      />
    </Box>
  );
};

const onChange =  (value: number) => {
  axios.patch(WATERFALL_STREAMER_URL + '/ChangeSendingInterval', { newInterval: value })
  .then(() => {
    console.log('Interval successfully changed to ' + value + ' ms');
  })
  .catch((_) => {
    console.log('Failed to change interval');
  });
};
