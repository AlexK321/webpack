import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { First } from './components/First/First';


export const App = () => {
  const LazySecond =  lazy(() => import('./components/Second/Second'));
  const LazySecondPage =  () => {
    return (
      <Suspense fallback='Loading'>
        <LazySecond/>
      </Suspense>
    )
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<First/>} />
          <Route path='/second' element={<LazySecondPage/>}/>
        </Routes>
      </BrowserRouter>
  );
};
