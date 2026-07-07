import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../../common/supabase/supabase.service';
import { EmployeeServiceSummaryItemDto } from '../../../api/employees/dtos/employees.dto';
import {
  EmployeeDto,
  EmployeeServiceSummaryGroupedDto,
} from '../../../api/employees/dtos/employees.dto';

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

  async getEmployeesServicesSummary(period: string): Promise<EmployeeServiceSummaryGroupedDto[]> {
    const { data, error } = await this.supabase.client
      .from('employee_service_summary')
      .select('*')
      .eq('month', period)
      .order('tips_amount', {
        ascending: false,
      });
    if (error) throw error;
    return this.groupEmployeeServiceSummary(data);
  }

  groupEmployeeServiceSummary(
    items: EmployeeServiceSummaryItemDto[],
  ): EmployeeServiceSummaryGroupedDto[] {
    const map = new Map<number, EmployeeServiceSummaryGroupedDto>();
    for (const item of items) {
      let group = map.get(item.employee_id!);

      if (!group && item.employee_id && item.employee_name && item.month) {
        group = {
          employee_id: item.employee_id,
          employee_name: item.employee_name,
          month: item.month,
          tips_amount: 0,
          shifts: [],
        };

        map.set(item.employee_id, group);
      }
      if (group && item.shift_type && item.services_count) {
        group.tips_amount += item.tips_amount ?? 0;
        group.shifts.push({ type: item.shift_type, count: item.services_count });
      }
    }
    console.log([...map.values()]);
    return [...map.values()];
  }
}
