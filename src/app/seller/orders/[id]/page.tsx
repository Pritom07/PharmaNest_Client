const StatusUpdationPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <h1>Order id : {id}</h1>
    </div>
  );
};

export default StatusUpdationPage;
