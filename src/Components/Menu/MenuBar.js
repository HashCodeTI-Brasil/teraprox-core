import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Image, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { BiUserCircle } from 'react-icons/bi';
import { FiChevronDown, FiLogOut, FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PermissionContainer from '../Hocs/withPermission';
import { useWebProvider } from '../../hooks/useWebProvider';
import scqlogo from '../../assets/img/teraprox-logo.png';
import { ids, paths } from '../../models/constantes';
import { setPageLocation } from '../../Reducers/default-reducers/globalConfigReducer';
import { isAuthenticated } from '../../Services/auth';
import "../../assets/styles/menuBarLogo.css";
import NotificationBell from '../Notifications/NotificationBell';

/**
 * MenuBar 100% manifest-driven.
 *
 * Recebe `menuSections` do App (gerado pelo remoteLoader a partir dos manifests dos remotes).
 * Cada seção tem { title, icon, items[] } onde items têm { routePath, label }.
 *
 * Os dropdowns são agrupados por título da seção. Se dois remotes declaram
 * a mesma seção (ex: "Cadastros"), os itens são mesclados automaticamente.
 */
const MenuBar = ({ menuSections = [], menuTree = null }) => {
    const { handleLogout, notificationSocket } = useWebProvider()
    const global = useSelector(state => state.global) || {}
    const socket = global.socketConnection
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [expandedMenu, setExpandedMenu] = useState(null)
    const drawerRef = useRef(null)

    // Agrupa seções com mesmo título (ex: "Cadastros" do SGP + SGM → um dropdown só).
    // Quando o host fornece `menuTree` (manifest-driven grouping), usa hierarquia
    // declarativa; caso contrário cai no merge legacy por título de section.
    const groupedMenus = useMemo(() => {
        if (Array.isArray(menuTree) && menuTree.length > 0) {
            // Converte MenuTreeNode[] -> { title, icon, subsections: [{title, items}] }
            // - children kind='section' -> subsection
            // - children kind='item' -> agrupa em pseudo-section sem título
            return menuTree.map((node) => {
                const subsections = [];
                let looseItems = null;
                for (const child of node.children || []) {
                    if (child.kind === 'section') {
                        subsections.push({
                            title: child.label,
                            icon: child.icon,
                            items: (child.items || []).map((it) => ({
                                routePath: it.routePath || it.path,
                                label: it.label,
                            })),
                        });
                    } else if (child.kind === 'item') {
                        if (!looseItems) {
                            looseItems = { title: node.label, icon: node.icon, items: [] };
                            subsections.push(looseItems);
                        }
                        looseItems.items.push({
                            routePath: child.item.routePath || child.item.path,
                            label: child.item.label,
                        });
                    }
                }
                return { title: node.label, icon: node.icon, subsections };
            });
        }

        const map = new Map();
        for (const section of menuSections) {
            const key = section.title;
            if (!map.has(key)) {
                map.set(key, { title: key, icon: section.icon, subsections: [] });
            }
            map.get(key).subsections.push(section);
        }
        return Array.from(map.values());
    }, [menuSections, menuTree]);

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

    const renderMenuLink = (item, extraProps = {}) => (
        <PermissionContainer
            key={item.routePath}
            menubar={true}
            component={(componenteRef) => (
                <Link
                    className={extraProps.className || "dropdown-item"}
                    id={item.routePath}
                    ref={componenteRef}
                    to={item.routePath}
                    {...(extraProps.onClick ? { onClick: extraProps.onClick } : {})}
                >
                    {item.label}
                </Link>
            )}
        />
    )

    if (isAuthenticated(global.token)) {
        return (
            <div className='App tc f3 menu-bar'>
                <Navbar className="menu-bar" expand="lg" onClick={navClickHandler}>
                    <div className="navbar-logo">
                        <Image
                            style={{ cursor: "pointer" }}
                            height={50}
                            width={50}
                            src={scqlogo}
                            onClick={() => navigate('/home')}
                        />
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
                                {groupedMenus.map((group) => (
                                    <PermissionContainer key={group.title} menubar component={cRef => (
                                        <NavDropdown
                                            ref={cRef}
                                            className="teraprox-dropdown"
                                            title={group.title}
                                            id={`menu-${group.title.toLowerCase().replace(/\s+/g, '-')}`}
                                        >
                                            {group.subsections.map((section, sIdx) => (
                                                <React.Fragment key={`${section.title}-${sIdx}`}>
                                                    {sIdx > 0 && <NavDropdown.Divider />}
                                                    {group.subsections.length > 1 && (
                                                        <NavDropdown.Header>{section.title}</NavDropdown.Header>
                                                    )}
                                                    {section.items.map((item) => renderMenuLink(item))}
                                                </React.Fragment>
                                            ))}
                                        </NavDropdown>
                                    )} />
                                ))}
                            </Nav>
                        </Navbar.Collapse>
                    )}

                    {isMobile && (
                        <>
                            <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`} ref={drawerRef} role="dialog" aria-hidden={!drawerOpen} aria-label="Menu de navegação">
                                <div className="mobile-drawer-header">
                                    <div className="navbar-logo small">
                                        <Image
                                            style={{ cursor: "pointer" }}
                                            height={36}
                                            width={36}
                                            src={scqlogo}
                                            onClick={() => {
                                                navigate('/home')
                                                setDrawerOpen(false)
                                            }}
                                        />
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
                                    {groupedMenus.map((group) => (
                                        <div className="drawer-accordion" key={group.title}>
                                            <button
                                                className={`drawer-accordion-toggle ${expandedMenu === group.title ? 'active' : ''}`}
                                                onClick={() => toggleMenu(group.title)}
                                                aria-expanded={expandedMenu === group.title}
                                            >
                                                <span>{group.title}</span>
                                                <FiChevronDown className={`drawer-accordion-icon ${expandedMenu === group.title ? 'rotated' : ''}`} size={18} />
                                            </button>
                                            <div className={`drawer-accordion-content ${expandedMenu === group.title ? 'expanded' : ''}`}>
                                                {group.subsections.map((section, sIdx) => (
                                                    <React.Fragment key={`${group.title}-${section.title}-${sIdx}`}>
                                                        {sIdx > 0 && <div className="drawer-divider" />}
                                                        <div className="drawer-section">
                                                            {group.subsections.length > 1 && (
                                                                <div className="drawer-subsection-title">{section.title}</div>
                                                            )}
                                                            {section.items.map((item) => renderMenuLink(item, {
                                                                className: 'drawer-link',
                                                                onClick: () => setDrawerOpen(false),
                                                            }))}
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
