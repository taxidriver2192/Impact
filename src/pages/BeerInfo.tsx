import { useParams, Link } from "react-router-dom";
import "./BeerInfo.css";
import {useBeerQuery} from "../services/beersApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const BeerInfo = () => {
  const { id } = useParams();
  const {data, error, isFetching, isLoading} = useBeerQuery(id!);
  useEffect(() =>{
    if (error){
      toast.error("Something went wrong!");
    }
  }, [error]);
  return (
    <section className="herro">
      <div className="container">
        <div>{id}</div>
        <span>{data && data.name}</span>
        <span>{data && data.brewery}</span>
        <span>{data && data.year}</span>
        <span>{data && data.description}</span>
        <img src={data && data.image}/>
        <Link to="/">
          <button className="btn btn-edit">Go Back</button>
        </Link>
      </div>
    </section>
  );
};

export default BeerInfo;
