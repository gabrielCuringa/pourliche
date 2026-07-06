import { inject, Injectable, input } from '@angular/core';
import { SupabaseService } from '../../../common/supabase/supabase.service';
import { CreateRestaurantServiceDto } from '../../../api/restaurant-services/restaurant-services.dto';

@Injectable({
  providedIn: 'root',
})
export class RestaurantServicesService {
  private supabase = inject(SupabaseService);

  async getServicesForPeriod(start: string, end: string) {
    const { data, error } = await this.supabase.client.rpc('get_services_for_month', {
      p_start_date: start,
      p_end_date: end,
    });
    if (error) throw error;
    return data;
  }

  async upsertService(dto: CreateRestaurantServiceDto) {
    return await this.supabase.client.rpc('upsert_service_and_sync_employees', {
      p_date: dto.date,
      p_employee_ids: dto.employee_ids,
      p_shift: dto.shift.toUpperCase(),
      p_tips: dto.tips,
    });
  }
}
