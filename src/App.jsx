import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/card'
import Fueltype from './components/Fueltype';
import axios from 'axios'

const fuelMap = {
  petrol: 1,
  diesel: 2,
  cng: 3,
  lpg: 4,
  electric: 5,
  hybrid: 6
}

const baseURL = 'api/stocks';

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiURL, setApiURL] = useState(baseURL);
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  }

  const handleMax = (e) => {
    setMax(e.target.value);
  }

  const handleMin = (e) => {
    setMin(e.target.value);
  }

  const getCars = async () => {
    try {
      const response = await fetch(apiURL);
      const carData = await response.json();

      setCars(carData.stocks);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getCars();
    // if (sortOrder !== "default") handleSort(cars);
  }, [apiURL]);

  useEffect(() => {
    let newFuelString = "";

    if (selectedFuels.length !== 0) {
      newFuelString = `fuel=${selectedFuels.join('+')}`;
    }

    let newBudgetString = "";



    if (max !== "") {
      if (min === "") {
        newBudgetString = `budget=0-${max}`;
      } else {
        if (Number(min) > Number(max)) {
          alert("Invalid Input");
          return;
        }
        newBudgetString = `budget=${min}-${max}`;
      }
    }

    if (min !== "" && max === "") {
      newBudgetString = `budget=${min}-100000000`;
    }

    if (newBudgetString === "" && newFuelString === "") return;

    if (newBudgetString === "") {
      setApiURL(baseURL + "?" + newFuelString);
    } else if (newFuelString === "") {
      setApiURL(baseURL + "?" + newBudgetString);
    } else {
      setApiURL(baseURL + "?" + newFuelString + "&" + newBudgetString);
    }

  }, [selectedFuels, min, max]);

  // const handleSort = (cars) => {
  //   if(sortOrder === "default") {
  //     getCars();
  //     return;
  //   }

  //   console.log("sort");

  //   const sortedCars = [...cars].sort((a, b) => {
  //     if (sortOrder === 'asc') {
  //       return Number(a.priceNumeric) - Number(b.priceNumeric);
  //     } else if (sortOrder === 'desc') {
  //       return Number(b.priceNumeric) - Number(a.priceNumeric);
  //     }

  //     return 0;
  //   });

  //   setCars(sortedCars);
  // }

  const handleClear = (e) => {
    e.preventDefault();
    setApiURL(baseURL);
    setMin("");
    setMax("");
    setSelectedFuels([]);
    setSortOrder("default");
  }

  // useEffect(() => {
  //   handleSort(cars);
  // }, [sortOrder]);

  useEffect(() => {
    console.log(cars);
  }, [cars])

  if (loading) {
    return <div>Loading</div>;
  }

  if (cars.length == 0) {
    return <div>No cars found</div>;
  }

  return (
    <div className="container">
      <div className="filters">
        <div className="filter-container">
          <h2>Filters</h2>
          <a className="clear-all" onClick={handleClear}>Clear All</a>
        </div>

        <div className="filter-group">
          <label>Budget (Lakh)</label>
          <div className="budget-container">
            <input type="number" min="0" value={min} onChange={handleMin} />
            <span> - </span>
            <input type="number" min="1" value={max} onChange={handleMax} />
          </div>
        </div>


        <div className="filter-group">
          <h2>Fuel</h2>

          {Object.entries(fuelMap).map(([key, value]) => (
            <Fueltype fueltype={key} fuelNumber={value} selectedFuels={selectedFuels} setSelectedFuels={setSelectedFuels} />
          ))}

        </div>

      </div>

      <div className="main-content">
        <div className="sort">
          <div className="label">Sort By:</div>
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="asc">Price - Low to High</option>
            <option value="desc">Price - High to Low</option>
          </select>
        </div>

        <div className="products-grid">
          {cars.length != 0 && cars.sort((a, b) => {
            if (sortOrder === 'asc') {
              return Number(a.priceNumeric) - Number(b.priceNumeric);
            } else if (sortOrder === 'desc') {
              return Number(b.priceNumeric) - Number(a.priceNumeric);
            }

            return 0;
          }).map(car => <Card carDetails={car} />)}

        </div>
      </div>
    </div>)
}

export default App;
