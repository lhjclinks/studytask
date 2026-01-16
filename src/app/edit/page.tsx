import EditClient from "./EditClient";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  return <EditClient id={id ?? ""} />;
}