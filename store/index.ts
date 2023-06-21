/*
|--------------------------------------------------------------------------
| Zustand Reactの状態管理ライブラリ
| https://github.com/pmndrs/zustand
|--------------------------------------------------------------------------
*/

import create from 'zustand';

import { Session, User } from '@supabase/supabase-js';

type Store = {
  user: User | null;
  session: Session | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
};

export const useStore = create<Store>((set) => ({
  user: null,
  session: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
}));
