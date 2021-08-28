import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Redirect, Route, Switch } from 'react-router-dom';
import ActivityFeed from './components/ActivityFeed.jsx';
import ArchiveCall from './components/ArchiveCall.jsx';
import ActivityDetail from './components/ActivityDetail.jsx';
import Notfound from './components/NotFound.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <>
    <div className="container-content">
    <Container>
      <div className="main-content">
      <Header />
      <Navbar >
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-top">
          <Nav className="mr-auto">
            <LinkContainer to="/activityfeed">
              <Nav.Link>Call List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/archivecall">
              <Nav.Link> Archived Call</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        <Row>
          <Col>
            <Switch>
              <Route exact path="/">
                <Redirect to="/activityfeed" />
              </Route>
              <Route exact path="/activityfeed">
                <ActivityFeed />
              </Route>
              <Route path="/activitydetail/:id">
                <ActivityDetail />
              </Route> 
              <Route exact path="/archivecall">
                <ArchiveCall />
              </Route>
              <Route>
                <Notfound />
              </Route>
            </Switch>
          </Col>
        </Row>
        </div>
      </Container>

    </div>
      
    </>
  );
}

export default App;
