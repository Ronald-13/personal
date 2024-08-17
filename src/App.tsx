import classes from './App.module.scss';
import { IconLogo } from './Components/Icons';
import { Route, Routes } from 'react-router-dom';
import Home from './Containers/Home';
import PageNotFound from './Containers/PageNotFound';
import { appUseNavigate } from './CustomHooks/routerHook';
import TagManager from 'react-gtm-module';
import { useEffect } from 'react';

function App() {
  const navigateTo = appUseNavigate();
  
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-5D4KGM6', dataLayerName: 'PageDataLayer' });
  }, []);
    
  const handleLogoClick = () => {
    navigateTo('/');
  }

  return (
    <>
      <div><IconLogo className={classes.logo} onClick={handleLogoClick} /></div>
      <div className={classes.appContainer}>
        <Routes>
          <Route path="/">
            <Route path="" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
