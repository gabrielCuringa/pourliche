import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../lib/database.types';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  client: SupabaseClient<Database>;

  constructor() {
    this.client = createClient<Database>(environment.supabaseUrl, environment.supabaseKey);
  }
}
