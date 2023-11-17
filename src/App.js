import './App.css';
import CompanyList from './components/CompanyList';
import HistoryList from './components/HistoryList';
import MechanicList from './components/MechanicList';
import OwnerList from './components/OwnerList';
import VehiclesList from './components/VehiclesList';

function App() {
  return (
    <div className="App">
      <h1>Welcome to CarChronicle</h1>
      <OwnerList />
      <VehiclesList />
      <HistoryList />
      <MechanicList />
      <CompanyList />
    </div>
  );
}

export default App;
