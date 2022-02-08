import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/logo.svg";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [panier, setPanier] = useState();

  // const handleClick = () => {
  //   const newPanier = [...panier];
  //   newPanier.push(meal);
  //   setPanier(newPanier);
  //   panier.map(meal,index)=>{

  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      // console.log("useEffect est déclenchée...");
      try {
        const response = await axios.get(
          "https://my-deliveroo-backend-project.herokuapp.com/"
        );
        // console.log(response.data);
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
        <div className="logo">
          <img alt="logo" src={logo} />
        </div>
        <div className="headerContent">
          <div className="headerText">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt="" />
        </div>
      </header>

      <div className="container">
        <div className="menuBlock">
          {data.categories.map((category, indexCategories) => {
            return (
              category.meals.length > 0 && (
                <div>
                  <h2 key={indexCategories}>{category.name}</h2>
                  <div className="categoryBlock">
                    {category.meals.map((meal, indexMeals) => {
                      // console.log(meal);
                      return (
                        <div
                          className="meal"
                          key={indexMeals}
                          onClick={() => {
                            // console.log("cliqué"); onClick fonctionne
                            const newPanier = [...panier];
                            newPanier.push(meal);
                            setPanier(newPanier);
                          }}
                        >
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
        </div>

        <div className="panierBlock">
          <p>Valider mon panier</p>
          {panier.length < 0 ? (
            <p>Votre panier est vide</p>
          ) : (
            <div>
              <p>{panier[index].title}</p>
              <p>{panier[index].price}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
