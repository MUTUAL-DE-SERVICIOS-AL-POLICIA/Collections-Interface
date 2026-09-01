"use client";

import {
  Button,
  Form,
  Input,
  Label,
  Card,
  Surface,
  toast,
  Table,
  Pagination,
} from "@heroui/react";
import { useState, useMemo, useEffect } from "react";
import {
  importBankStatements,
  findAllBankStatements,
} from "@/api";

interface BankStatement {
  date: string;
  operationCode: string;
  documentNumber: number;
  gloss: string;
  transferredAccount: string;
  credits: number;
  state: string;
}

const columns = [
  { id: "date", name: "Fecha" },
  { id: "operationCode", name: "Código de Operación" },
  { id: "documentNumber", name: "Número de Documento" },
  { id: "gloss", name: "Glosa" },
  { id: "transferredAccount", name: "Cuenta Transferida" },
  { id: "credits", name: "Créditos" },
  { id: "state", name: "Estado" },
];

const ROWS_PER_PAGE = 14;

export default function BankStatements() {
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const [allBankStatements, setAllBankStatements] = useState<
    BankStatement[]
  >([]);

  const [page, setPage] = useState(1);

  const getBankStatements = async () => {
    try {
      setLoading(true);

      const { error, data } = await findAllBankStatements();

      if (error) {
        toast.danger("Error al obtener los estados bancarios");
        return;
      }

      setAllBankStatements(data ?? []);
      setPage(1);
    } catch (error) {
      console.error(
        "Error al obtener estados bancarios:",
        error,
      );

      toast.danger(
        "Error al obtener los estados bancarios",
      );
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const form = e.currentTarget;

    setLoadingSave(true);

    try {
      const formData = new FormData(form);

      const file = formData.get("csvFile");

      if (!(file instanceof File) || file.size === 0) {
        toast.danger("Debe seleccionar un archivo CSV");
        return;
      }

      if (!file.name.toLowerCase().endsWith(".csv")) {
        toast.danger("El archivo debe tener formato CSV");
        return;
      }

      const data = new FormData();

      data.append("file", file);

      const { error, message } =
        await importBankStatements(data);

      if (error) {
        toast.danger(message);
        return;
      }

      toast.success(message);

      await getBankStatements();

      form.reset();
    } catch (error) {
      console.error(
        "Error al importar transacciones:",
        error,
      );

      toast.danger(
        "Ocurrió un error al importar el archivo",
      );
    } finally {
      setLoadingSave(false);
    }
  };

  const totalPages = Math.max(
    1,
    Math.ceil(
      allBankStatements.length / ROWS_PER_PAGE,
    ),
  );

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const paginatedItems = useMemo(() => {
    const start =
      (page - 1) * ROWS_PER_PAGE;

    return allBankStatements.slice(
      start,
      start + ROWS_PER_PAGE,
    );
  }, [page, allBankStatements]);

  const start =
    allBankStatements.length === 0
      ? 0
      : (page - 1) * ROWS_PER_PAGE + 1;

  const end = Math.min(
    page * ROWS_PER_PAGE,
    allBankStatements.length,
  );

  useEffect(() => {
    getBankStatements();
  }, []);

  return (
    <>
      <div className="flex-1 min-w-62.5 max-w-75 2xl:max-w-100 h-full">
        <Card className="relative flex flex-col border-2 h-full w-full min-h-0 gap-2">
          <Form onSubmit={onSubmit}>
            <Label>Subir Archivo</Label>

            <Surface className="flex w-full items-center justify-center rounded-xl bg-surface">
              <Input
                className="w-full bg-blue-100"
                type="file"
                name="csvFile"
                accept=".csv"
              />
            </Surface>

            <Button
              isPending={loadingSave}
              type="submit"
              variant="secondary"
              className="w-full mt-2"
            >
              Importar
            </Button>
          </Form>
        </Card>
      </div>

      {/* TABLA */}
      <Card className="card-no-outline flex-1 border-2 p-3 min-w-162.5 h-full overflow-y-auto">
        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Tabla de estados bancarios"
              className="min-w-150"
            >
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column
                    isRowHeader={column.id === "date"}
                  >
                    {column.name}
                  </Table.Column>
                )}
              </Table.Header>

              <Table.Body
                items={paginatedItems}
                renderEmptyState={() =>
                  loading
                    ? "Cargando..."
                    : "No existen registros"
                }
              >
                {(statement) => (
                  <Table.Row>
                    <Table.Collection items={columns}>
                      {(column) => (
                        <Table.Cell>
                          {
                            statement[
                              column.id as keyof BankStatement
                            ]
                          }
                        </Table.Cell>
                      )}
                    </Table.Collection>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
          <Table.Footer>
            <Pagination size="sm">
              <Pagination.Summary>
                {start} to {end} of{" "}
                {allBankStatements.length} results
              </Pagination.Summary>
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={page === 1}
                    onPress={() =>
                      setPage((currentPage) =>
                        Math.max(
                          1,
                          currentPage - 1,
                        ),
                      )
                    }
                  >
                    <Pagination.PreviousIcon />
                    Prev
                  </Pagination.Previous>
                </Pagination.Item>
                {pages.map((pageNumber) => (
                  <Pagination.Item
                    key={pageNumber}
                  >
                    <Pagination.Link
                      isActive={
                        pageNumber === page
                      }
                      onPress={() =>
                        setPage(pageNumber)
                      }
                    >
                      {pageNumber}
                    </Pagination.Link>
                  </Pagination.Item>
                ))}
                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={
                      page === totalPages
                    }
                    onPress={() =>
                      setPage((currentPage) =>
                        Math.min(
                          totalPages,
                          currentPage + 1,
                        ),
                      )
                    }
                  >
                    Next
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </Table.Footer>
        </Table>
      </Card>
    </>
  );
}