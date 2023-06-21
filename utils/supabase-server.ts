/*
|--------------------------------------------------------------------------
| Supabase Client
|--------------------------------------------------------------------------
*/
import { cookies } from 'next/headers';

// utils/supabase-server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from "./database.types";

export const supabase = createServerComponentClient<Database>({
  cookies,
});
