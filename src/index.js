import React from 'react';
import ReactDOM from 'react-dom';

import App from './component/app/app.js';

import './sass/styles.scss';

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById(`root`)
);
