// Internet Explorer 11 requires polyfills and partially supported by this project.
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import './i18n/config';
import './styles/app-base.css';
import './styles/app-components.css';
import './styles/app-utilities.css';
import 'react-image-lightbox/style.css';

import { createRoot } from 'react-dom/client';

import App from './app/App';

import * as serviceWorker from './serviceWorker.js';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);

reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
