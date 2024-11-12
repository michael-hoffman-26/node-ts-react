import logo from './logo.svg';
import './App.css';
import HealthCheckButton from './components/simple-button'
import ItemList from './components/tasks'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ItemList />
      </header>
    </div>
  );
}

export default App;
