import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';


const Page = ({title}) => (
    <div className="App">
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>{title}</h2>
            <p>
                <Link to="/">Hodme</Link>
            </p>
            <p>
                <Link to="/about">About</Link>
            </p>
            <p>
                <Link to="/settings">Settings</Link>
            </p>
        </div>
    </div>
);


const Home = (props) => (
    <Page title="Home"/>
);

const About = (props) => (
    <Page title="About"/>
);

const Settings = (props) => (
    <Page title="تنظیمات"/>
);


export default function App() {
    // برای یادگیری Router ها در React می‌تونید از پیوند زیر استفاده کنید:
    // https://reacttraining.com/react-router/web/guides/quick-start
    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/">
                        <Home/>
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/settings">
                        <Settings/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
//
// function Home() {
//     return <h2>Home</h2>;
// }
//
// function About() {
//     return <h2>About</h2>;
// }

function Users() {
    return <h2>Users</h2>;
}

