import React, { Component } from 'react';
import {
    Collapse,
    Navbar as NB,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import {ROUTES} from '../../routes-config';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    render() {
        return (
            <NB color="light" light expand="md" className="navbar">
                <Link className="navbar-brand" to="/">
                    DevPortal
                </Link>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link className="nav-link" to={ROUTES.LOGIN}>
                                Login
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to={ROUTES.REGISTER}>
                                Register
                            </Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Profile
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link className="nav-link" to={ROUTES.REGISTER}>
                                        Register
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link className="nav-link" to={ROUTES.REGISTER}>
                                        Register
                                    </Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link className="nav-link" to={ROUTES.REGISTER}>
                                        Logout
                                    </Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </NB>
        );
    }
}

export default Navbar;
