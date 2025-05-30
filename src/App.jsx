import AuthenticationApp from './auth';
import Navbar from './layout/Navbar';
import AppRouter from './router';

const App = () => {
  return (
    <>
      <Navbar />
      <AppRouter />
      
    {/* <AuthenticationApp /> */}
    </>
  );

}

export default App;
