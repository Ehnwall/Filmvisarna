import { Navbar, Nav, Container, NavDropdown, Button, NavLink } from 'react-bootstrap'
import routes from '../utils/routes'
import { useAuth } from '../context/authContext'
export default function Header() {
    const { token, signOut } = useAuth()
    return (
        <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
            <Container>
                <Navbar.Brand href="/">Filmvisarna</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <>
                            {routes
                                .filter((x) => x.menuLabel)
                                .map(({ path, menuLabel }, i) => (
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href={path}>
                                            {menuLabel}
                                        </NavLink>
                                    </li>
                                ))}
                            {token && (
                                <Button variant="primary" onClick={signOut} type="button">
                                    Logga ut
                                </Button>
                            )}
                        </>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
