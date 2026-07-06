import { Database } from '../../../lib/database.types';

export type Shift = Database['public']['Enums']['Shift'];

export type CreateRestaurantServiceDto = {
  employee_ids: number[];
  date: string;
  shift: Shift;
  tips: number;
};

export type RestaurantServiceDto =
  Database['public']['Functions']['get_services_for_month']['Returns'][0];
