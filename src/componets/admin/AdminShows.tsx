import { useGetOccupiedSeats } from '../../utils/api/booking/useGetOccupiedSeats';
import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { formatTime } from '../../utils/timeFormat';
import useGetShows from '../../utils/api/shows/useGetShows';

export default function AdminShows() {
  const { data: shows, isLoading: isShowsLoading, error: showsError } = useGetShows();
  const [occupiedSeatsMap, setOccupiedSeatsMap] = useState<{ [key: number]: number }>({});

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysShows = shows?.filter((show) => {
    const showDate = new Date(show.showTime);
    showDate.setHours(0, 0, 0, 0);
    return showDate.getTime() === today.getTime();
  });

  const fetchOccupiedSeats = async (shows: any[]) => {
    const seatsMap: { [key: number]: number } = {}; 

    const seatPromises = shows.map(async (show) => {
      const { data, error } = await useGetOccupiedSeats(show.showId);
      if (error) {
        console.error(`Error fetching occupied seats for show ${show.showId}: ${error}`);
        return { showId: show.showId, occupiedSeatsCount: 0 };
      }
      const occupiedSeatsCount = data?.occupiedSeats.length || 0;
      return { showId: show.showId, occupiedSeatsCount };
    });


    const seatResults = await Promise.all(seatPromises);

    seatResults.forEach((result) => {
      seatsMap[result.showId] = result.occupiedSeatsCount;
    });

    setOccupiedSeatsMap(seatsMap); 
  };

  useEffect(() => {
    if (todaysShows?.length) {
      fetchOccupiedSeats(todaysShows);
    }
  }, [todaysShows]);

  return (
    <Container className="py-4">
      <h2 className="mb-4">Dagens Föreställningar</h2>
      {todaysShows && todaysShows.length > 0 ? (
        <Row className="g-4">
          {todaysShows.map((show) => {
            const formattedDate = formatTime(show.showTime).getWeekdayWithDate;
            const formattedTime = formatTime(show.showTime).getTime;
            const occupiedSeatsCount = occupiedSeatsMap[show.showId] || 0;

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
                    <p><strong>Bokade platser:</strong> {occupiedSeatsCount}</p>
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

