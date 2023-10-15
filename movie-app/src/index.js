import React from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { RatingProvider } from './components/rating-context/RatingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyleProvider hashPriority="high">
    <RatingProvider>
      <App />
    </RatingProvider>
  </StyleProvider>,
);
