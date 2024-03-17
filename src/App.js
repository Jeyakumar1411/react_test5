import OrdersPost from './orders/OrdersPost';
import OrdersGet from './orders/OrdersGet';
import OrdersEdit from './orders/OrdersEdit'
import OrdersRender from './orders/OrdersRender';
import OrdersView from './orders/OrderView'
import Nav from './Nav';
import User from './User';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {store} from './react-redux/store'

function App() {
  return (
      <Provider store= {store}>
    <div className="App">

      {/* <Nav/> */}
      {/* <OrdersGet/> */}
      {/* <OrdersPost/> */}
      {/* <OrdersEdit/> */}
      {/* <OrdersRender/> */}
      {/* <OrdersView/> */}

      <Routes>
        <Route path='/user' element={<User/>} />
      </Routes>
    </div>
      </Provider>
  );
}

export default App;
