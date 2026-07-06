import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../../common/supabase/supabase.service';
import { EmployeeDto, EmployeeMonthlyTips } from '../../../api/employees/dtos/employees.dto';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private supabase = inject(SupabaseService);

  async getEmployees(): Promise<EmployeeDto[] | null> {
    return (await this.supabase.client.from('employee').select('*')).data;
  }

  async createEmployee(name: string): Promise<EmployeeDto | null> {
    return (await this.supabase.client.from('employee').insert({ name }).select().single()).data;
  }

  async deleteEmployee(id: number) {
    return await this.supabase.client.from('employee').delete().eq('id', id);
  }

  async updateEmployee(id: number, name: string) {
    return await this.supabase.client.from('employee').update({ name }).eq('id', id);
  }

  async getEmployeesServicesSummary(period: string): Promise<EmployeeMonthlyTips[]> {
    const { data, error } = await this.supabase.client
      .from('employee_monthly_tips')
      .select('*')
      .eq('month', period)
      .order('tips_amount', {
        ascending: false,
      });
    if (error) throw error;
    return data;
  }
}
