// ============================================================
// Redux Provider - Wrapper component untuk Redux Store
// Membungkus aplikasi dengan Provider dari react-redux
// ============================================================

'use client';

import { Provider } from 'react-redux';
import store from './store';

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
