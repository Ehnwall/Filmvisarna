import { Navbar, Nav, Container, NavDropdown, NavLink } from 'react-bootstrap'
import routes from '../utils/routes'
import { HashLink as Link } from 'react-router-hash-link'
import { useState } from 'react'
export default function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand href="/">Filmvisarna</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <a href="/" className="nav-link">
              Hem
            </a>

            {/* {routes
              .filter((x) => x.menuLabel)
              .map(({ path, menuLabel }, i) => (
                <li className="nav-item">
                  <NavLink className="nav-link" href={path}>
                    {menuLabel}
                  </NavLink>
                </li>
              ))} */}
            <Link to="/#movies" className="nav-link">
              {' '}
              Se filmer
            </Link>
            <Link to="/#book" className="nav-link">
              {' '}
              Boka film
            </Link>
            <a href="/sign-in" className="nav-link">
              Medlem
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
