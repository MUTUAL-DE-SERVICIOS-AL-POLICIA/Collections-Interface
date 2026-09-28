"use client";

import {
  Button,
  Input,
  Label,
  Card,
  Surface,
  toast,
  Separator,
} from "@heroui/react";
import { useState } from "react";

import { PdfIcon, ExcelIcon } from "@/components";

export default function Persons() {
  const dateNow = new Date().toISOString().split("T")[0];

  const [dateFrom, setDateFrom] = useState(dateNow);
  const [dateTo, setDateTo] = useState(dateNow);
  const [, setLoading] = useState(false);

  const downloadReportAllSales = async (format: string) => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ dateFrom, dateTo, format });
      const response = await fetch(`/api/reports?${query}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        toast.danger("No se pudo generar el reporte");

        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      if (format === "csv") {
        const link = document.createElement("a");
        link.href = url;
        link.download = "reporte-ventas.csv";
        link.click();
        URL.revokeObjectURL(url);
      } else {
        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.width = "1px";
        iframe.style.height = "1px";
        iframe.style.opacity = "0";
        iframe.style.pointerEvents = "none";
        iframe.src = url;
        iframe.onload = () => {
          iframe.contentWindow?.print();
          setTimeout(() => {
            URL.revokeObjectURL(url);
            iframe.remove();
          }, 1000);
        };
        document.body.appendChild(iframe);
      }
    } catch {
      toast.danger("No se pudo generar el reporte");

      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1 min-w-62.5 max-w-75 2xl:max-w-100 h-full">
        <Card className="relative flex flex-col border-2 h-full w-full min-h-0 gap-2">
          <Surface className="flex w-full items-center justify-center rounded-xl bg-surface">
            <Label className="w-1/4">Desde</Label>
            <Input
              className="w-3/4"
              defaultValue={dateFrom}
              type="date"
              variant="secondary"
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </Surface>
          <Surface className="flex w-full items-center justify-center rounded-xl bg-surface">
            <Label className="w-1/4">Hasta</Label>
            <Input
              className="w-3/4"
              defaultValue={dateTo}
              type="date"
              variant="secondary"
              onChange={(e) => setDateTo(e.target.value)}
            />
          </Surface>
        </Card>
      </div>
      <Card className="card-no-outline flex-1 border-2 p-3 min-w-162.5 h-full">
        <div className="flex w-1/2 flex-col h-full gap-2">
          <div className="font-bold">Formato en PDF</div>
          <div className="flex w-1/2 flex-col gap-1 overflow-y-auto overflow-x-hidden">
            <Button
              variant="tertiary"
              onPress={() => {
                downloadReportAllSales("pdf");
              }}
            >
              <PdfIcon />
              Reporte de ventas
            </Button>
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex w-1/2 flex-col h-full">
          <div className="font-bold">Formato en CSV</div>
          <div className="flex flex-col h-4/5 rounded-lg">
            <Button
              variant="tertiary"
              onPress={() => {
                downloadReportAllSales("csv");
              }}
            >
              <ExcelIcon />
              Reporte de ventas (CSV)
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
