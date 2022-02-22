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
          <Typography variant="h5" component="div">
            {props.token.product}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Phase: {props.token.phase}
          </Typography>
          <Typography variant="body2">
            Date: {props.token.date}
          </Typography>
          <Typography variant="body2">
            Lot: {props.token.lot}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
}