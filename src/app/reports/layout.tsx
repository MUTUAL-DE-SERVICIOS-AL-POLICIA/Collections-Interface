export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ml-2 mr-2 my-2">
      <section className="flex justify-center md:flex-row flex-wrap gap-1 h-[calc(100vh-135px)]">
        {children}
      </section>
    </div>
  );
}
