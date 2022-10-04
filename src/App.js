import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';
import DashboardPage from './pages/DashboardPage';
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/auth/LoginPage'
import GroupPage from './pages/GroupPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
        <Router>
            <Routes>
                <Route exact path='/' element={<DashboardPage/>} />
                <Route exact path='/login' element={<LoginPage/>} />
                <Route exact path='/contacts' element={<ContactPage/>} />
                <Route exact path='/groups' element={<GroupPage/>} />
            </Routes>  
        </Router>
    )
}

export default App;
