import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Home, Map, Person, People, Assignment } from "@material-ui/icons";

import './Navigation.css';

export default function Navigation() {
    const [selected, setSelected] = useState(4);

    return (
        <BottomNavigation
            value={selected}
            onChange={(e, val) => setSelected(val)}
        >
            <BottomNavigationAction
                component={Link}
                to="/news"
                showLabel={selected === 0}
                label="آگاهی‌بخشی"
                icon={<Assignment />}
            />
            <BottomNavigationAction
                component={Link}
                to="/family"
                showLabel={selected === 1}
                label="خانواده"
                icon={<People />}
            />
            <BottomNavigationAction
                component={Link}
                to="/me"
                showLabel={selected === 2}
                label="من"
                icon={<Person />}
            />
            <BottomNavigationAction
                component={Link}
                to="/map"
                showLabel={selected === 3}
                label="نقشه"
                icon={<Map />}
            />
            <BottomNavigationAction
                component={Link}
                to="/home"
                showLabel={selected === 4}
                label="خانه"
                icon={<Home />}
            />
        </BottomNavigation>
    );
}
