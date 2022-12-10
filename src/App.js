import './App.css';
import NavigationBar from './component/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Login from './pages/Login';
import Daftar from './pages/DaftarBarang';
import { BrowserRouter,Switch,Route} from "react-router-dom"
import Register from './pages/Register';
import Cart from './pages/Cart';
import Footer from './pages/Footer';



function App() {
  return (
    <div className="App">
      <NavigationBar />
      
      <BrowserRouter>
      <main>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/edit/:id" component={Edit} exact/>
          <Route path="/login" component={Login} exact/>
          <Route path="/register" component={Register} exact/>
          <Route path="/daftar" component={Daftar} exact/>
          <Route path="/cart" component={Cart} exact/>
       
        
        </Switch>
      </main>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
