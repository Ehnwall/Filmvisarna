import { Accordion, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BiSolidCameraMovie, BiSlideshow } from 'react-icons/bi'
import { MdAddToPhotos, MdDashboard, MdDelete } from 'react-icons/md'

const Sidebar = () => {
    return (
        <Nav className="flex-column bg-body-tertiary p-3 h-100">
            <Nav.Item>
                <Nav.Link as={Link} to="/admin">
                    <MdDashboard size={20} className="me-2" />
                    Dashboard
                </Nav.Link>
            </Nav.Item>
            <Accordion flush alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <MdAddToPhotos size={20} className="me-2" />
                        Lägg till
                    </Accordion.Header>
                    <Accordion.Body>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin-deletemovies">
                                <BiSolidCameraMovie size={20} className="me-2" />
                                Filmer
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin/add-show">
                                <BiSlideshow size={20} className="me-2" />
                                Visningar
                            </Nav.Link>
                        </Nav.Item>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <MdDelete size={20} className="me-2" />
                        Ta bort
                    </Accordion.Header>
                    <Accordion.Body>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin-deletemovies">
                                <BiSolidCameraMovie size={20} className="me-2" />
                                Filmer
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin-deletemovies">
                                <BiSlideshow size={20} className="me-2" />
                                Visningar
                            </Nav.Link>
                        </Nav.Item>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Nav>
    )
}

export default Sidebar
