import './App.css';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
