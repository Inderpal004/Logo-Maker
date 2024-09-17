import { useState } from 'react';
import './App.css';
import BackgroundController from './components/BackgroundController';
import Header from './components/Header';
import IconController from './components/IconController';
import Sidebar from './components/Sidebar';

function App() {

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <Header />
      <div className="w-64 fixed">
        <Sidebar selectedIndex={setSelectedIndex} />
      </div>

      <div className="ml-64 grid grid-cols-1 fixed md:grid-cols-6">
        <div className="md:col-span-2 border pb-10 h-screen shadow-sm p-5 overflow-y-scroll">
          {
            selectedIndex === 0 ? <IconController /> : <BackgroundController />
          }
        </div>

        <div className="md:col-span-4">
          Icon
        </div>
      </div>
    </>
  )
}

export default App;