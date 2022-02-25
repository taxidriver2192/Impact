import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddEditBeer.css";
import { 
  useAddBeerMutation, 
  useBeerQuery,
  useUpdateBeerMutation, 
} from "../services/beersApi";

const initialState = {
  name: "",
  brewery: "",
  year: 0,
  description: "",
  image: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [addBeers] = useAddBeerMutation();
  const [updateBeer] = useUpdateBeerMutation();
  const { name, brewery, year, description, image } = formValue;
  const navigate = useNavigate();
  const { id } = useParams();

  const {data, error, isFetching, isLoading} = useBeerQuery(id!);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data){
        setFormValue({...data});
      }
    } else {
      setEditMode(false);
      setFormValue({...initialState});
    }
  }, [id, data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name && !brewery && !year && !description && !image ) {
      toast.error("Please provide value into each input field");
    } else {
      if (!editMode) {
        await addBeers(formValue);
        navigate("/");
        toast.success("Contact Added Successfully");
      } else {
        await updateBeer(formValue)
        navigate("/");
        setEditMode(false);
        toast.success("Contact Updated Successfully");
      }
    }
  };

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="brewery">brewery</label>
        <input
          type="text"
          id="brewery"
          name="brewery"
          placeholder="Your brewery..."
          value={brewery || ""}
          onChange={handleInputChange}
        />
         <label htmlFor="year">year</label>
        <input
          type="number"
          id="year"
          name="year"
          min="1000" max="2022"
          placeholder="Hvornår er den fra?"
          value={year || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="description">description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Hvilken beskrivelse har den?"
          value={description || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="image">image url</label>
        <input
          type="url"
          id="image"
          name="image"
          placeholder="billede url"
          value={image || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEditUser;
