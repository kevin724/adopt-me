import { useState, useEffect, useContext } from "react";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { Client } from "@petfinder/petfinder-js";

const client = new Client({apiKey: "L2K9g2D5reuhBZwW5VmhslDoVdQ5ASjz3iYOaOlGvZyygJMSlE", secret: "TJpZNSW3xwIOVc8ywv9gAMCQ4f3II1zYPqTsik6m"});

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("dog");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    client.animal.search({
      type:animal,
      breed:breed,
      page:1,
      limit:10
    })
    .then(function (response) {
        // Do something with `response.data.animals`
        console.log(response);
        setPets(response.data.animals);
    })
    .catch(function (error) {
        // Handle the error
    });

    // const res = await fetch(
    //   `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    // );
    // const json = await res.json();

    // setPets(response.animals);
  }

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center divide-y divide-gray-900"
        onSubmit={(e) => {
          // prevent refreshing the page
          e.preventDefault();
          requestPets();
        }}
      >
        <label className="search-label" htmlFor="location">
          Location
          <input
            className="search-control"
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
          />
        </label>
        <label className="search-label" htmlFor="animal">
          Animal
          <select
            className="search-control"
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option></option>
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label className="search-label" htmlFor="breed">
          Breed
          <select
            className="search-control disabled:opacity-50"
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option></option>
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label className="search-label" htmlFor="theme">
          Theme
          <select
            className="search-control"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="darkblue">Dark Blue</option>
            <option value="peru">Peru</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button
          className="rounded px-6 py-2 text-white hover:opacity-50 border-none"
          style={{ backgroundColor: theme }}
        >
          Submit
        </button>
      </form>
      <Results pets={pets}></Results>
    </div>
  );
};

export default SearchParams;
