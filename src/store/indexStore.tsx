import { configureStore } from '@reduxjs/toolkit';
import contentCharacter from './character.tsx';

export const store = configureStore({
  reducer: {
    characters: contentCharacter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
