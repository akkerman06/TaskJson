import { Header } from "../components/Header"
import { useNotifications } from "../components/notification";
import { Seminars } from "../components/Seminars"

function App() {

  return (
    <div className='app'>
      <Header />
      <Seminars />
    </div>

  )
}

export default App
