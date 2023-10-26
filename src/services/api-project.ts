import { apiService } from '@/services/api'

class ApiProjectService {
  async getProjectInformations() {
    const data = await apiService.callApiGet(`/api/consultations/projects`)
    return data
  }
}

export const apiProjectService = new ApiProjectService()
