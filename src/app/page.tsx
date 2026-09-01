"use client";

import { Pagination, Table } from "@heroui/react";
import { useState, useMemo, useEffect } from "react";
import { getAllCollections } from "@/api";

const columns = [
  {id: "paymentDate", name: "Fecha de transacción"},
  {id: "titularName", name: "Nombre del titular"},
  {id: "payerName", name: "Pagado por"},
  {id: "description", name: "Descripción"},
  {id: "origin", name: "Herramienta de origen"},
  {id: "accountNumber", name: "Cuenta Destino"},
  {id: "paymentType", name: "Tipo de Pago"},
  {id: "receptionistUser", name: "Usuario"},
  {id: "total", name: "Total"},
  {id: "state", name: "Estado"},
];

const ROWS_PER_PAGE = 10;

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [allCollections, setAllCollections] = useState([]);

  const getCollections = async () => {
    try {
      setLoading(true);

      const { error, data } = await getAllCollections();

      if (error) return;
      setAllCollections(data);
    } finally {
      setLoading(false);
    }
  };

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allCollections.length / ROWS_PER_PAGE);
  const pages = Array.from({length: totalPages}, (_, i) => i + 1);
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return allCollections.slice(start, start + ROWS_PER_PAGE);
  }, [page, allCollections]);
  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, allCollections.length);

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-4 py-8 md:py-10">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Table with pagination" className="min-w-150">
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column isRowHeader={column.id === "paymentDate"}>{column.name}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={paginatedItems}>
              {(user) => (
                <Table.Row>
                  <Table.Collection items={columns}>
                    {(column) => <Table.Cell>{user[column.id as keyof typeof user]}</Table.Cell>}
                  </Table.Collection>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>
          <Pagination size="sm">
            <Pagination.Summary>
              {start} to {end} of {allCollections.length} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <Pagination.PreviousIcon />
                  Prev
                </Pagination.Previous>
              </Pagination.Item>
              {pages.map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </Table>
    </section>
  );
}