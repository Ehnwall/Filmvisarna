import { Accordion, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BiSolidCameraMovie, BiSlideshow } from 'react-icons/bi'
import { MdAddToPhotos, MdDashboard } from 'react-icons/md'

const Sidebar = () => {
    return (
        <Nav className="d-flex flex-column flex-wrap bg-body-tertiary p-3 h-100 mt-4 ms-3 shadow rounded">
            <Nav.Item className="shadow mb-3 mt-1 text-center rounded">
                <Nav.Link as={Link} to="/admin">
                    <MdDashboard size={30} className="me-2" />
                    <h4 className="mt-2">Dashboard</h4>
                </Nav.Link>
            </Nav.Item>
            <Accordion flush alwaysOpen className="custom-accordion">
                <Accordion.Item eventKey="0" className="mt-5">
                    <Accordion.Header>
                        <MdAddToPhotos size={20} className="me-2" />
                        Lägg till
                    </Accordion.Header>
                    <Accordion.Body>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/admin/add-movie">
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
            </Accordion>
        </Nav>
    )
}

export default Sidebar
