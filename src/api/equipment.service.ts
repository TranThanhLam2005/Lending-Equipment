import {apiClient} from "./client";
import {API_ENDPOINTS} from "./config";
import type {Equipment, EquipmentQueryParams} from "@/types/Type";

export const equipmentService = {
  /**
   * Get all equipment (public endpoint)
   */
  async getAll() {
    return apiClient.get<Equipment[]>(API_ENDPOINTS.EQUIPMENT.GET_ALL);
  },

  /**
   * Get participant equipment (authenticated)
   */
  async getParticipantEquipment() {
    return apiClient.get<Equipment[]>(API_ENDPOINTS.EQUIPMENT.GET_PARTICIPANT);
  },

  /**
   * Get equipment detail by ID
   */
  async getEquipmentDetail(id: string) {
    return apiClient.get<Equipment>(API_ENDPOINTS.EQUIPMENT.GET_DETAIL(id));
  },

  /**
   * Query equipment with filters
   * @param params - Search parameters
   * @param isVisitor - If true, uses public visitor endpoint
   */
  async queryEquipment(params: EquipmentQueryParams, isVisitor = false) {
    const searchParams = new URLSearchParams();

    if (params.searchValue)
      searchParams.append("searchValue", params.searchValue);
    if (params.searchStatus)
      searchParams.append("searchStatus", params.searchStatus);
    if (params.searchOrder)
      searchParams.append("searchOrder", params.searchOrder);

    const queryString = searchParams.toString();
    const baseEndpoint = isVisitor
      ? API_ENDPOINTS.EQUIPMENT.QUERY_VISITOR
      : API_ENDPOINTS.EQUIPMENT.QUERY;
    const endpoint = queryString
      ? `${baseEndpoint}?${queryString}`
      : baseEndpoint;

    return apiClient.get<Equipment[]>(endpoint);
  },

  /**
   * Request to borrow equipment
   */
  async requestBorrow(equipmentId: string, borrowData: any) {
    return apiClient.post(`/equipment/${equipmentId}/borrow`, borrowData);
  },
};
