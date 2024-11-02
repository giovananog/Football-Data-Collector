// ContactInfo.js
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const contactData = {
  address: "Allianz Parque\nAv. Francisco Matarazzo, 1705 - Barra Funda\n05001-200 São Paulo (SP)\nBrazil",
  phone: "+55 (11) 4800-6680",
  website: "http://www.allianzparque.com.br",
  ticketCentre: "http://www.allianzparque.com.br/tickets",
};

export default function ContactInfo() {
  return (
    <Card sx={{ width: "20%", margin: 'auto', padding: 3, boxShadow: 3, marginTop: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#2b3a4b', marginBottom: 2 }}>
          CONTACT INFORMATION
        </Typography>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">Address:</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {contactData.address.split('\n').map((line, index) => (
              <span key={index}>{line}<br /></span>
            ))}
          </Typography>
          
          <Typography variant="subtitle1" fontWeight="bold">Phone:</Typography>
          <Typography variant="body2" color="text.secondary">{contactData.phone}</Typography>
          
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
