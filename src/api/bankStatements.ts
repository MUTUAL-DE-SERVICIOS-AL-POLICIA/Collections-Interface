"use server";

import { webActionError } from "@/utils/helpers/server-action-error";
import { ResponseData } from "@/utils/interfaces";
import { apiClient } from "@/utils/services/GatewayServerClient";

export const findAllBankStatements = async (): Promise<ResponseData> => {
  try {
    const response = await apiClient.GET("collections/bankStatements/findAll");
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
        message: "No fue posible obtener los extractos bancarios.",
      }
    );
  }
};

export const importBankStatements = async (
  body: FormData,
): Promise<ResponseData> => {
  try {
    const response = await apiClient.POST(
      "collections/bankStatements/import",
      body,
      true,
    );
    const data = await response.json();
    return { error: data.error, message: data.message };
  } catch (error) {
    return (
      webActionError(error) ?? {
        error: true,
        message: "No fue posible importar los extractos bancarios.",
      }
    );
  }
};
