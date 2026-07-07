import { Database } from '../../../../lib/database.types';
import { Shift } from '../../restaurant-services/restaurant-services.dto';

export type EmployeeDto = Database['public']['Tables']['employee']['Row'];
export type EmployeeServiceSummaryItemDto =
  Database['public']['Views']['employee_service_summary']['Row'];
export type EmployeeServiceSummaryGroupedDto = {
  employee_id: number;
  employee_name: string;
  month: string;
  shifts: { type: Shift; count: number }[];
  tips_amount: number;
};
