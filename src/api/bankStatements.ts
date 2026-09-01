"use server";

import { ResponseData } from "@/utils/interfaces";
import { apiClient } from "@/services";

export const findAllBankStatements = async (): Promise<ResponseData> => {
  try {
    const response = await apiClient.GET(`collections/bankStatements/findAll`);
    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: "Ocurrió un error",
        data: response.statusText,
      };
    }

    return {
      error: data.error,
      message: data.message,
      data: data.data,
    };

  } catch (error: any) {
    return {
      error: true,
      message: "Error al obtener las transacciones: " + error.message,
      data: error.message,
    };
  }
}

export const importBankStatements = async (body: any): Promise<ResponseData> => {
  try {

    const response = await apiClient.POST(`collections/bankStatements/import`, body, true);
    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: "Ocurrió un error",
        data: response.statusText,
      };
    }

    return {
      error: data.error,
      message: data.message,
    };

  } catch (error: any) {
    return {
      error: true,
      message: "Error al importar las transacciones: " + error.message,
      data: error.message,
    };
  }
};
