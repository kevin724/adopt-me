import { useState, useEffect } from "react";
import { Client } from "@petfinder/petfinder-js";

const client = new Client({apiKey: "L2K9g2D5reuhBZwW5VmhslDoVdQ5ASjz3iYOaOlGvZyygJMSlE", secret: "TJpZNSW3xwIOVc8ywv9gAMCQ4f3II1zYPqTsik6m"});
const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      client.animalData.breeds(animal)
      .then(resp => {
        // Do something with resp.data.breeds
        localCache[animal] = resp.breeds || [];
        setBreedList(localCache[animal]);
        setStatus("loaded");
      });
    }
  }, [animal]);

  return [breedList, status];
}
