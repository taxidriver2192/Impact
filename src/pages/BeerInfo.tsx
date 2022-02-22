import { useParams, Link } from "react-router-dom";
import "./BeerInfo.css";
import {useBeerQuery} from "../services/beersApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeerMugEmpty, faBurger, faToiletPaper } from '@fortawesome/free-solid-svg-icons'

const BeerInfo = () => {
  const { id } = useParams();
  const {data, error, isFetching, isLoading} = useBeerQuery(id!);
  useEffect(() =>{
    if (error){
      toast.error("Something went wrong!");
    }
  }, [error]);
  return (
    <section className="hero">
      <div className="container">
        
        <div className="imagesContainer"><strong>#{id}</strong>
          <div className="image">
            <img alt={data && data.name} className="imageStyle" src={data && data.image}/>
          </div>
        </div>
        <div className="textInformation">
          <Link className="goBack" to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
          <div className="shotInfo">
            <h1>{data && data.name}</h1>
            <h2>Beer!</h2>
            <div className="description">
              <p>{data && data.description}</p>
              <p className="madeBy">{data && data.brewery}</p>
          </div>
          </div>
          <div className="information">
            <h4>Information</h4>
            <ul>
              <li>{data && data.name}</li>
              <li>{data && data.brewery}</li>
              <li>{data && data.year}</li>
            </ul>
            <div className="iconContainer">
            <FontAwesomeIcon icon={faBurger} />
            <FontAwesomeIcon icon={faBeerMugEmpty} />
            <FontAwesomeIcon icon={faToiletPaper} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeerInfo;
