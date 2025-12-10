/**
 * Lending Record API Service
 * Handles all API calls related to lending records
 */

import {apiClient} from "./client";
import {API_ENDPOINTS} from "./config";
import type {LendingRecord} from "@/types/Type";

export const lendingService = {
  /**
   * Get all lending records for the current user
   */
  async getUserLendingRecords() {
    return apiClient.get<LendingRecord[]>(
      API_ENDPOINTS.LENDING_RECORDS.GET_LENDINGS_BY_USER
    );
  },

  /**
   * Request to borrow equipment - creates a lending record
   */

  async requestBorrow(borrowData: LendingRecord) {
    return apiClient.post(
      API_ENDPOINTS.LENDING_RECORDS.ADD_LENDING_RECORD,
      borrowData
    );
  },

  // Do not implement for now
  // /**
  //  * Return equipment (mark lending record as returned)
  //  */
  // async returnEquipment(recordId: string) {
  //   return apiClient.post(`/lending_records/${recordId}/return`, {});
  // },

  // /**
  //  * Delete a lending record
  //  */
  // async deleteLendingRecord(recordId: string) {
  //   return apiClient.delete(`/lending_records/${recordId}`);
  // },

  // /**
  //  * Get lending record detail
  //  */
  // async getLendingRecordDetail(recordId: string) {
  //   return apiClient.get<LendingRecord>(`/lending_records/${recordId}`);
  // },

  /**
   * Request to borrow equipment - creates a lending record
   * @param borrowData - Contains BorrowerID, SuperviseID, EquipmentID, BorrowDate, ReturnDate, Purpose, Status
   */
};
