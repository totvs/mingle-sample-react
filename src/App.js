import React from 'react';
import logo from './logo.svg';
import './App.css';

import { MingleService, Configuration } from '@totvs/mingle';

const config = new Configuration();
const mingleService = new MingleService();

function mingleInit() {
  config.app_identifier = 'your_app_id';
  config.environment = 'DEV';
  config.server = 'https://hom-mingle.totvs.com.br/api';
  config.modules.crashr = true;
  config.modules.usage_metrics = true;
  config.modules.gateway = true;
  config.modules.push_notification = true;
  config.modules.ocr = true;
  config.modules.web = true;

  mingleService.setConfiguration(config);
  mingleService.init().then(res => {
    console.log('Mingle init is ok.');
  })
}

function anonymousMetrics() {
  mingleService.registerMetric('ANONYMOUS METRICS');
}

function auth() {
  mingleService.auth.login('login', 'password', 'ALIAS ').subscribe(() => {
    console.log('Logged in Mingle.');
    mingleService.registerMetric('LOGIN SUCCESS');
  },
  (authError) => {
    console.log('error in auth Mingle: ', authError.response.data);
  });
}

// - Methods publics 
function configMingleURL() {
  console.log(mingleService.configMingleURL('check_security'));
}

function gateway() {
  const url = 'check_security';

  mingleService.gateway.get(url).subscribe(res => {
    console.log(res);
  }, err => {
    console.log('error: ', err);
  });

}

function getAccessToken() {
  console.log(mingleService.getAccessToken());
}

function getAllItemsFromStorage() {
  mingleService.getAllStorage().then(res => {
    console.log(res);
  });
}

function getBodyToRefreshTokenAPI() {
  console.log(mingleService.getBodyToRefreshTokenAPI());
}

function getRefreshTokenURL() {
  console.log(mingleService.getRefreshTokenURL());
}

function getSessionInfo() {
  console.log(mingleService.getSessionInfo());
}

function logout() {
  mingleService.auth.logout().subscribe(() => {
    console.log('Loggout ok.');
  });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p className="App-link">
          Before loggin: 
        </p>

        <button onClick={mingleInit}>Init Mingle</button>
        <button onClick={anonymousMetrics}>Anonymous Metrics</button>
        <button onClick={auth}>Loggin</button>

        <p className="App-link">
          After loggin: 
        </p>

        <button onClick={configMingleURL}>Config Mingle URL</button>
        <button onClick={gateway}>gateway</button>
        <button onClick={getAccessToken}>Get Access Token</button>
        <button onClick={getAllItemsFromStorage}>Get All Items From Storage</button>
        <button onClick={getBodyToRefreshTokenAPI}>Get Body To Refresh Token API</button>
        <button onClick={getRefreshTokenURL}>Get Refresh Token URL</button> 
        <button onClick={getSessionInfo}>Get Session Info</button>
        <button onClick={logout}>Logout</button>
      </header>
    </div>
  );
}

export default App;
;