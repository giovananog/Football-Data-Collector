// ContactInfo.js
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import api from "../../../api"; // Adjust the path according to your project structure

export default function ContactInfo(props) {
  const [contactData, setContactData] = useState({});

  useEffect(() => {
    // Fetch contact information
    api.get(`stadium-details/${props.id}`).then(res => {
      setContactData(res.data);
    });
  }, [props]);

  return (
    <Card sx={{ width: "20%", margin: 'auto', padding: 3, boxShadow: 3, marginTop: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#2b3a4b', marginBottom: 2 }}>
          CONTACT INFORMATION
        </Typography>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">Address:</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {contactData.address}
          </Typography>
          
          <Typography variant="subtitle1" fontWeight="bold">Phone:</Typography>
          <Typography variant="body2" color="text.secondary">{contactData.tel}</Typography>
          
          <Typography variant="subtitle1" fontWeight="bold">Website:</Typography>
          <Typography variant="body2" color="text.secondary">
            <a href={contactData.website} target="_blank" rel="noopener noreferrer">{contactData.website}</a>
          </Typography>
          
          <Typography variant="subtitle1" fontWeight="bold">Ticket Centre:</Typography>
          <Typography variant="body2" color="text.secondary">
            <a href={contactData.ticketCentre} target="_blank" rel="noopener noreferrer">{contactData.ticketCentre}</a>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
