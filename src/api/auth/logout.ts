"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { apiClient } from "@/services";
export async function logout() {
  try {
    await apiClient.GET("auth/logout");

    const cookieStore = await cookies();

    cookieStore.delete("msp");
    cookieStore.delete("user");
    cookieStore.delete("access");
  } catch (error: any) {
    return NextResponse.json(
      { error: true, message: error.message || "Error al cerrar sesión" },
      { status: 500 },
    );
  }
}
