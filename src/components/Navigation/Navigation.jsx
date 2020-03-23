import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Home, Map, Person, People, Assignment } from "@material-ui/icons";

import './Navigation.css';

const routes = [
    {
        to: '/home',
        label: 'خانه',
        icon: <Home />,
    },
    {
        to: '/map',
        label: 'نقشه',
        icon: <Map />,
    },
    {
        to: '/my-activities',
        label: 'من',
        icon: <Person />,
    },
    {
        to: '/family-activities',
        label: 'خانواده',
        icon: <People />,
    },
    {
        to: '/informing',
        label: 'آگاهی‌بخشی',
        icon: <Assignment />,
    },
];

export default withRouter(function Navigation({ location }) {
    const currentRoute = routes.findIndex(route => route.to === location.pathname);
    const [selected, setSelected] = useState(currentRoute);
    if (selected !== currentRoute) {
        setSelected(currentRoute);
    }

    return (
        <BottomNavigation value={selected}>
            {routes.map(route => (
                <BottomNavigationAction
                    key={route.to}
                    component={Link}
                    {...route}
                />
            ))}
        </BottomNavigation>
    );
});
