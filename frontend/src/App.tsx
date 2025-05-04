import "./App.css";
// import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SnackbarProvider from "./components/SnackbarProvider";
import { BrowserRouter } from "react-router-dom";  
import MianLayout from "./layouts/MianLayout";
 
function App() {
  
  return (
    
     <Provider store={store}>
      <SnackbarProvider>
      <BrowserRouter>
      <MianLayout/>
      
       </BrowserRouter>
      </SnackbarProvider>
    </Provider>
   
  );
}

export default App;
