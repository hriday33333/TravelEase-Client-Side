import { useLoaderData } from 'react-router';

const ViewDetailsPage = () => {
  const data = useLoaderData();
  console.log(data);
  
  return (
    <div>
      <h1>View Details Page</h1>
      <h1>{data.name}</h1>
    </div>
  );
};

export default ViewDetailsPage;
