import { Database } from '../../../../lib/database.types';

export type EmployeeDto = Database['public']['Tables']['employee']['Row'];
export type EmployeeMonthlyTips = Database['public']['Views']['employee_monthly_tips']['Row'];
