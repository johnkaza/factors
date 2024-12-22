import { Provider } from 'react-redux';
import DisneyCharacters from './pages/DisneyCharacters.tsx';
import { store } from './store/indexStore.tsx';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from './utils/theme.tsx';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <main>
          <DisneyCharacters />
        </main>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
