"use server";

import { webActionError } from "@/utils/helpers/server-action-error";
import { ResponseData } from "@/utils/interfaces";
import { apiClient } from "@/utils/services/GatewayServerClient";

export const getAllCollections = async (): Promise<ResponseData> => {
  try {
    const response = await apiClient.GET("collections/transactions/findAll");
    const data = await response.json();
    return {
      error: data.error,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return (
      webActionError(error) ?? {
        error: true,
        message: "No fue posible obtener las recaudaciones.",
      }
    );
  }
};
