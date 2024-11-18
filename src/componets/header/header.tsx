import { Navbar, Nav, Container, Button, NavLink } from 'react-bootstrap'
import routes from '../../utils/routes'
import { useAuth } from '../../context/authContext'
export default function Header() {
    const { token, signOut } = useAuth()
    return (
        <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
            <Container>
                <Navbar.Brand href="/">Filmvisarna</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {routes
                            .filter((x) => x.menuLabel)
                            .map(({ path, menuLabel }, i) => (
                                <li className="nav-item" key={menuLabel}>
                                    <NavLink className="nav-link" href={path}>
                                        {menuLabel}
                                    </NavLink>
                                </li>
                            ))}
                        {token && (
                            <Button variant="outline-primary" size="sm" onClick={signOut} type="button">
                                Logga ut
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
