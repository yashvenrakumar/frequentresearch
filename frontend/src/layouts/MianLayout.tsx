import { useSelector } from "react-redux";
import AppRoutes from "../routes/AppRoutes";
import Navbar from "./Navbar";
import { RootState } from "../redux/rootReducer";

 
export default function MianLayout() {
    const accessToken = useSelector(
        (state: RootState) => state.userAuth.login?.accessToken
      );
      const isAuthenticated = Boolean(accessToken);
    
  return (
    <div>
        {isAuthenticated && <Navbar/>}
        
        <AppRoutes/>
        
    </div>
  )
}
