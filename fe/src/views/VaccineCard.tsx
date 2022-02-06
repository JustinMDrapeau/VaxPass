import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function VaccineCard(props: any) {
  return (
    <Box mr={3} mb={4}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Clinic Name
          </Typography>
          <Typography variant="h5" component="div">
            {props.token.manufacturer}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Phase: {props.token.dosePhase}
          </Typography>
          <Typography variant="body2">
            Date: 02/16/2022
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
}