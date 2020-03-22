import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import logo from './logo.svg';
import './App.css';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Home, Map, Person, Group, Assignment} from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
});

function App() {

    const [value, setValue] = useState(0);
    const classes = useStyles();

    return (
        <div className="App">
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                className={"bottomNav"}
            >
                <BottomNavigationAction label="آگاهی بخشی" icon={<Assignment/>}/>
                <BottomNavigationAction label="خانواده" icon={<Group/>}/>
                <BottomNavigationAction label="من" icon={<Person/>}/>
                <BottomNavigationAction label="نقشه" icon={<Map/>}/>
                <BottomNavigationAction label="خانه" icon={<Home/>}/>
            </BottomNavigation>
        </div>
    );
}

export default App;
