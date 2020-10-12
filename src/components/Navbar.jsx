import React from 'react';
import { Navbar as Navb, NavbarBrand } from 'react-bootstrap';

export default function Navbar() {
    return (
        <Navb className="d-flex justify-content-center" style={{ backgroundColor: "#fb5d14", height: "5rem" }}>
            <NavbarBrand href="/" className="text-white m-0" style={{ fontSize: 25, fontWeight: "bold" }}>Imagic!</NavbarBrand>
        </Navb>
    )
}