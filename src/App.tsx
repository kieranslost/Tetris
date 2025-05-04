import './App.css';
import { GamePage } from './pages/GamePage';
import { KeyboardListener } from './utils/KeyboardListener';

function App() {
  return (
    <>
      <KeyboardListener />
      <GamePage></GamePage>
    </>
  );
}

export default App;
