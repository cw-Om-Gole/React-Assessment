import { useEffect, useState } from 'react' 
import './App.css'
import Card from './components/card'
import Fueltype from './components/Fueltype';
import axios from 'axios'

const fuelMap = {
  petrol:1,
  diesel:2,
  cng : 3,
  lpg : 4,
  electric : 5,
  hybrid : 6
}

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getCars = async () => {
        const response = await axios.get('https://dummyjson.com/c/3151-8062-475b-8f20');
        setCars(response.data.stocks);
        setLoading(false);
      }

      getCars();
    } catch (error) {
      console.log(error);
    }
  },[]);

  useEffect(() => {
    console.log(cars);
  },[cars])

  if(loading) {
    return <div>Loading</div>;
  }
  
  if(cars.length == 0) {
    return <div>No cars found</div>;
  }

  return (
    <div className="container">
      <div className="filters">
        <div className="filter-container">
          <h2>Filters</h2>
          <a className="clear-all">Clear All</a>
        </div>

        <div className="filter-group">
            <label>Budget (Lakh)</label>
            <div className="budget-container">
              <input type="number" placeholder="0" min = "0"/> 
              <span> - </span> 
              <input type="number" placeholder="21"/>
            </div>
        </div>


        <div className="filter-group">
            <h2>Fuel</h2>

            {Object.entries(fuelMap).map(([key, value]) => (
              <Fueltype fueltype={key} fuelNumber={value}/>
            ))}
            
        </div>

    </div>

    <div className="main-content">
        <div className="sort">
            <div className="label">Sort By:</div>
            <select>
                <option>Price - Low to High</option>
                <option>Price - High to Low</option>
            </select>
        </div>

        <div className="products-grid">
            {cars.length != 0 && cars.map(car => <Card carDetails={car}/>)}

        </div>
        </div>
    </div>)
}

export default App;
