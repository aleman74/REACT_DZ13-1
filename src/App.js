import './App.css';
import {Provider} from "react-redux";
import appStore from './store/store';

import Search from "./components/Search";


function App() {
  return (
      <Provider store={appStore}>
        <div id="container">
          <Search />
        </div>
      </Provider>
  );
}

export default App;
