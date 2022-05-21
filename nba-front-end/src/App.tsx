
import './App.css';
import RouteConfig from './routes/routes';


function App() {  
  console.log(window.location.origin)
  return (
    <>
        <div className="App">
          <RouteConfig />
        </div>
    </>
  );
}


export default App;

