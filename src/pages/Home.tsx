import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {useBeersQuery, useDeleteBeerMutation} from "../services/beersApi";

/* 
https://react-table.tanstack.com/
React table har jeg desværre ikke fået til at virke endnu, men aflever opgaven som den er
Da i skal have tid til at læse opgaven igennem. 

import { useTable, useSortBy } from 'react-table'

*/
import "./Home.css";



const Home = () => {
  const {data, error, isLoading, isSuccess, isFetching} = useBeersQuery();
  const [deleteBeer] = useDeleteBeerMutation();
  useEffect(() =>{
    if(error){
      toast.error("something went wrong");
    }
  }, [error])
  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure that you wanted to delete that user ?")) {
      await deleteBeer(id);
      toast.success("Beer Deleted Successfully");
    }
  };
  return (
    <div>
      <h2>Opgave fra Impact</h2>
      <Link to="/add">
        <button className="btn btn-add">Add Beer</button>
      </Link>
      <br />
      <br />
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>brewery</th>
            <th style={{ textAlign: "center" }}>year</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: any, index: any) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.brewery}</td>
                  <td>{item.year}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
