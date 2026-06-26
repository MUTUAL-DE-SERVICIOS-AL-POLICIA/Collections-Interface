import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center px-4 max-w-2xl">
        <h1 className="text-6xl font-bold text-gray-900 mb-3">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Página no encontrada
        </h2>
        <p className="mb-5">
          Lo sentimos, la página que está buscando no existe.
        </p>
        <p className="text-xl text-gray-500">
          <Link
            className="text-blue-600 hover:underline"
            href={{
              pathname: "/",
            }}
          >
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
