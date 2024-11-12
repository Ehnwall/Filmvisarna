
import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { formatTime } from '../../utils/timeFormat';
import useGetShows from '../../utils/api/shows/useGetShows';

export default function AdminShows() {
  const { data: shows, isLoading: isShowsLoading, error: showsError } = useGetShows();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysShows = shows?.filter((show) => {
    const showDate = new Date(show.showTime);
    showDate.setHours(0, 0, 0, 0);
    return showDate.getTime() === today.getTime();
  });


  return (
    <Container className="py-4">
      <h2 className="mb-4">Dagens Föreställningar</h2>
      {todaysShows && todaysShows.length > 0 ? (
        <Row className="g-4">
          {todaysShows.map((show) => {
            const formattedDate = formatTime(show.showTime).getWeekdayWithDate;
            const formattedTime = formatTime(show.showTime).getTime;

            return (
              <Col key={show.showId} md={4} lg={3}>
                <Card className="h-100 border">
                  <Card.Body>
                    <Card.Title>{show.movieTitle}</Card.Title>
                    <Card.Text>
                      {formattedDate} <br />
                      <strong>Kl:</strong> {formattedTime} <br />
                      {show.cinemaName} <br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p>Inga föreställningar idag.</p>
      )}
    </Container>
  );
}


