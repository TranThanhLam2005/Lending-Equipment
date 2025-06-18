const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Error Fetching Data</h1>
      <p className="text-lg text-gray-700">There was an error while trying to fetch the data. Please try again later.</p>
    </div>
  );
}
export default ErrorPage;