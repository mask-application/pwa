import React from "react";
import { Link, useLocation } from "react-router-dom";
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

export default function Navigation() {
    const location = useLocation();

    // https://{domain-name}:{port}/{pathname}
    // location.pathname returns pathname in url
    return (
        <BottomNavigation value={location.pathname}>
            {routes.map(route => (
                <BottomNavigationAction
                    key={route.to}
                    value={route.to}
                    component={Link}
                    {...route}
                />
            ))}
        </BottomNavigation>
    );
};
