import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import './less/index.less';

const MainContainer = lazy(() => import('./Pages/MainContainer'))


const MainRouteUser = () => (
  <Routes>
    <Route path="*" element={<Suspense fallback={<div>Loading...</div>}>
      <MainContainer />
    </Suspense>} />
  </Routes>
);


function App() {
  return (
    <div className="App h-100">
      <MainRouteUser />
    </div>
  );
}

export default App;
