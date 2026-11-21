export const instant = false;

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Edit Meeting {id}</h1>
      <p>Meeting editing form coming soon.</p>
    </main>
  );
}
