import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("useEffect est déclenchée...");
      try {
        const response = await axios.get(
          "https://my-deliveroo-backend-project.herokuapp.com/"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="app">
      <header>
        <div className="text">
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <img src={data.restaurant.picture} alt="" />
      </header>

      <div className="container">
        {data.categories.map((category, index) => {
          return (
            data.categories.meals.length > 0 && (
              <div>
                <h2 key={index}>{category.name}</h2>
                <div className="categoryBlock">
                  {category.meals.map((meal, index) => {
                    console.log(meal);
                    return (
                      <div className="meal" key={index}>
                        <div>
                          <h3>{meal.title}</h3>
                          <p>{meal.description}</p>
                          <p>
                            <span>{meal.price} €</span>
                            {
                              (meal.popular = true && (
                                <span className="populaire"> Populaire</span>
                              ))
                            }
                          </p>
                        </div>
                        <div>
                          {meal.picture && <img src={meal.picture} alt="" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          );
        })}
        <div className="panierBlock">
          <p>Valider mon panier</p>
          <p>Votre panier est vide</p>
        </div>
      </div>
    </div>
  );
}

export default App;
