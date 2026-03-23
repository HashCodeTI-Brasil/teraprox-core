import React, { useState, useEffect, useRef } from 'react';
import { Image, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { BiUserCircle } from 'react-icons/bi';
import { FiChevronDown, FiLogOut, FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PermissionContainer from '../Hocs/withPermission';
import { useWebProvider } from '../../hooks/useWebProvider';
import scqlogo from '../../assets/img/teraprox-logo.png';
import { ids, paths } from '../../models/constantes';
import { setPageLocation, logOut } from '../../Reducers/default-reducers/globalConfigReducer';
import { isAuthenticated } from '../../Services/auth';
import "../../assets/styles/menuBarLogo.css";
import NotificationBell from '../Notifications/NotificationBell';
import { menuSections as sgpMenuSections } from '../../models/federatedProcessoScreens';
import { menuSections as sgmMenuSections } from '../../models/federatedManutencaoScreens';
import { menuSections as cadastroMenuSections } from '../../models/federatedCadastroScreens';

const MenuBar = () => {
    const { handleLogout, notificationSocket } = useWebProvider()
    const global = useSelector(state => state.global) || {}
    const socket = global.socketConnection
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [expandedMenu, setExpandedMenu] = useState(null)
    const drawerRef = useRef(null)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (drawerOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [drawerOpen])

    useEffect(() => {
        if (!drawerOpen) return
        const drawer = drawerRef.current
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setDrawerOpen(false)
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [drawerOpen])

    const navClickHandler = (event) => {
        const target = event.target
        if (target && target.classList && (target.classList.contains('dropdown-item') || target.classList.contains('drawer-link'))) {
            dispatch(setPageLocation(target.innerText || target.innerHTML))
            if (drawerOpen) setDrawerOpen(false)
        }
    }

    const toggleDrawer = () => setDrawerOpen(!drawerOpen)
    const toggleMenu = (menuKey) => setExpandedMenu(prev => prev === menuKey ? null : menuKey)

    if (isAuthenticated(global.token)) {
        return (
            <div className='App tc f3 menu-bar'>
                <Navbar className="menu-bar" expand="lg" onClick={navClickHandler} >
                    <div className="navbar-logo">
                        <Image style={{ cursor: "pointer" }} height={50} width={50} src={scqlogo} />
                    </div>

                    {isMobile ? (
                        <div className="mobile-header-controls d-flex align-items-center gap-2">
                            <NotificationBell className="notification-bell" socket={notificationSocket} />
                            <button className="mobile-menu-toggle" aria-label="Abrir menu" onClick={toggleDrawer}>
                                <FiMenu size={22} color="#fff" />
                            </button>
                        </div>
                    ) : (
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <PermissionContainer menubar component={cRef => (
                                    <NavDropdown ref={cRef} className="teraprox-dropdown" title="Processo" id={ids.menuBar.processoDropdownMenu}>
                                        {sgpMenuSections.map((section, sIdx) => (
                                            <React.Fragment key={section.title}>
                                                {sIdx > 0 && <NavDropdown.Divider />}
                                                <NavDropdown.Header>{section.title}</NavDropdown.Header>
                                                {section.items.map((item) => (
                                                    <PermissionContainer
                                                        key={item.routePath}
                                                        menubar={true}
                                                        component={(componenteRef) => (
                                                            <Link
                                                                className="dropdown-item"
                                                                id={item.routePath}
                                                                ref={componenteRef}
                                                                to={item.routePath}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        )}
                                                    />
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </NavDropdown>
                                )} />

                                <PermissionContainer menubar component={cRef => (
                                    <NavDropdown ref={cRef} className="teraprox-dropdown" title="Manutenção" id={ids.menuBar.manutencaoDropdownMenu}>
                                        {sgmMenuSections.map((section, sIdx) => (
                                            <React.Fragment key={section.title}>
                                                {sIdx > 0 && <NavDropdown.Divider />}
                                                <NavDropdown.Header>{section.title}</NavDropdown.Header>
                                                {section.items.map((item) => (
                                                    <PermissionContainer
                                                        key={item.routePath}
                                                        menubar={true}
                                                        component={(componenteRef) => (
                                                            <Link
                                                                className="dropdown-item"
                                                                id={item.routePath}
                                                                ref={componenteRef}
                                                                to={item.routePath}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        )}
                                                    />
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </NavDropdown>
                                )} />

                                <PermissionContainer menubar component={cRef => (
                                    <NavDropdown ref={cRef} className="teraprox-dropdown" title="Cadastros" id={ids.menuBar.cadastrosDropdownMenu}>
                                        {cadastroMenuSections.map((section, sIdx) => (
                                            <React.Fragment key={section.title}>
                                                {sIdx > 0 && <NavDropdown.Divider />}
                                                <NavDropdown.Header>{section.title}</NavDropdown.Header>
                                                {section.items.map((item) => (
                                                    <PermissionContainer
                                                        key={item.routePath}
                                                        menubar={true}
                                                        component={(componenteRef) => (
                                                            <Link
                                                                className="dropdown-item"
                                                                id={item.routePath}
                                                                ref={componenteRef}
                                                                to={item.routePath}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        )}
                                                    />
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </NavDropdown>
                                )} />
                            </Nav>
                        </Navbar.Collapse>
                    )}

                    {/* Mobile drawer */}
                    {isMobile && (
                        <>
                            <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`} ref={drawerRef} role="dialog" aria-hidden={!drawerOpen} aria-label="Menu de navegação">
                                <div className="mobile-drawer-header">
                                    <div className="navbar-logo small">
                                        <Image style={{ cursor: "pointer" }} height={36} width={36} src={scqlogo} />
                                    </div>
                                    <div className="company-name"><strong>{global.companyName}</strong></div>
                                    <div className="connection-status">{socket ? "Connected" : "Offline"}</div>
                                    <div className='d-flex align-items-center gap-3'>
                                        <Nav.Link href={paths.menu} title="Menu do Usuário">
                                            <BiUserCircle className="user-icon" size={24} />
                                        </Nav.Link>
                                        <Nav.Link onClick={handleLogout} title="Sair">
                                            <FiLogOut size={22} />
                                        </Nav.Link>
                                    </div>
                                </div>
                                <nav className="mobile-drawer-nav">
                                    {[{ key: 'processo', title: 'Processo', sections: sgpMenuSections },
                                      { key: 'manutencao', title: 'Manutenção', sections: sgmMenuSections },
                                      { key: 'cadastros', title: 'Cadastros', sections: cadastroMenuSections }
                                    ].map((group) => (
                                        <div className="drawer-accordion" key={group.key}>
                                            <button
                                                className={`drawer-accordion-toggle ${expandedMenu === group.key ? 'active' : ''}`}
                                                onClick={() => toggleMenu(group.key)}
                                                aria-expanded={expandedMenu === group.key}
                                            >
                                                <span>{group.title}</span>
                                                <FiChevronDown className={`drawer-accordion-icon ${expandedMenu === group.key ? 'rotated' : ''}`} size={18} />
                                            </button>
                                            <div className={`drawer-accordion-content ${expandedMenu === group.key ? 'expanded' : ''}`}>
                                                {group.sections.map((section, sIdx) => (
                                                    <React.Fragment key={`${group.key}-${section.title}`}>
                                                        {sIdx > 0 && <div className="drawer-divider" />}
                                                        <div className="drawer-section">
                                                            <div className="drawer-subsection-title">{section.title}</div>
                                                            {section.items.map((item) => (
                                                                <PermissionContainer
                                                                    key={item.routePath}
                                                                    menubar={true}
                                                                    component={(componenteRef) => (
                                                                        <Link
                                                                            className="drawer-link"
                                                                            id={item.routePath}
                                                                            ref={componenteRef}
                                                                            to={item.routePath}
                                                                            onClick={() => setDrawerOpen(false)}
                                                                        >
                                                                            {item.label}
                                                                        </Link>
                                                                    )}
                                                                />
                                                            ))}
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </nav>
                            </div>
                            <div className={`mobile-drawer-backdrop ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} />
                        </>
                    )}

                    {!isMobile && (
                        <Nav className="ms-auto align-items-center gap-3">
                            <NavItem className="company-name"><strong>{global.companyName}</strong></NavItem>
                            <NavItem className="connection-status">{socket ? "Connected" : "Offline"}</NavItem>
                            <NotificationBell className="notification-bell" socket={notificationSocket} />
                            <NavItem>
                                <Nav.Link href={paths.menu} title="Menu do Usuário">
                                    <BiUserCircle className="user-icon" size={24} />
                                </Nav.Link>
                            </NavItem>
                            <NavItem>
                                <Nav.Link onClick={handleLogout} title="Sair">
                                    <FiLogOut size={22} />
                                </Nav.Link>
                            </NavItem>
                        </Nav>
                    )}
                </Navbar>
            </div>
        )
    }

    return (
        <div className="menu-bar">
            <Navbar className="menu-bar" expand="lg">
                <div className="navbar-logo">
                    <Image height={50} width={50} src={scqlogo} />
                </div>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link style={{ fontSize: "1.4rem" }} className="nav-link" to="/Login">Login</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default MenuBar;
