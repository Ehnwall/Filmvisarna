import React from 'react'
import { Card, Button, Row } from 'react-bootstrap'
import { BiSolidCameraMovie, BiSlideshow } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
    const navigate = useNavigate()

    return (
        <>
            <Row>
                <h2 className="text-center">Välkommen Admin!</h2>
                <p className="text-center">Vad vill du göra?</p>
            </Row>
            <Row className="d-flex justify-content-center gap-3">
                <Card style={{ width: '18rem' }} className="border text-center">
                    <div className="text-center">
                        <BiSolidCameraMovie size={70} />
                    </div>
                    <Card.Body>
                        <Card.Title>Lägg till filmer</Card.Title>
                        <Card.Text>Här kan du lägga till mer filmer</Card.Text>
                        <Button variant="primary" onClick={() => navigate('/medlem-addmovies')}>
                            Gå hit
                        </Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className="border text-center">
                    <div className="text-center">
                        <MdDelete size={70} />
                    </div>
                    <Card.Body>
                        <Card.Title>Radera filmer</Card.Title>
                        <Card.Text>Här kan du rader filmer från databasen</Card.Text>
                        <Button variant="primary"> Gå hit</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className="border text-center">
                    <div className="text-center">
                        <BiSlideshow size={70} />
                    </div>
                    <Card.Body>
                        <Card.Title>Lägg till mer föreställningar</Card.Title>
                        <Card.Text>Här kan du lägga till mer förställningar</Card.Text>
                        <Button variant="primary" onClick={() => navigate('/medlem-addshows')}>
                            Gå hit
                        </Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className="border text-center">
                    <div className="text-center">
                        <MdDelete size={70} />
                    </div>
                    <Card.Body>
                        <Card.Title>Radera föreställningar</Card.Title>
                        <Card.Text>Här kan du radera föreställningar</Card.Text>
                        <Button variant="primary"> Gå hit</Button>
                    </Card.Body>
                </Card>
            </Row>
        </>
    )
}
