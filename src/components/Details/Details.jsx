import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-bootstrap";

import { fetchRecipeDetails } from "../Redux/actionCreators";
import "./Details.css";

const Details = (props) => {
  const fetchedData = props.fR;
  // const fetchedData = {
  //   dateModified: null,
  //   idMeal: "52785",
  //   strArea: "Indian",
  //   strCategory: "Vegetarian",
  //   strDrinkAlternate: null,
  //   strIngredient1: "Toor dal",
  //   strIngredient2: "Water",
  //   strIngredient3: "Salt",
  //   strIngredient4: "Turmeric",
  //   strIngredient5: "Ghee",
  //   strIngredient6: "Chopped tomatoes",
  //   strIngredient7: "Cumin seeds",
  //   strIngredient8: "Mustard Seeds",
  //   strIngredient9: "Bay Leaf",
  //   strIngredient10: "Green Chili",
  //   strIngredient11: "Ginger",
  //   strIngredient12: "Cilantro",
  //   strIngredient13: "Red Pepper",
  //   strIngredient14: "Salt",
  //   strIngredient15: "Sugar",
  //   strIngredient16: "Garam Masala",
  //   strIngredient17: "",
  //   strIngredient18: "",
  //   strIngredient19: "",
  //   strIngredient20: "",
  //   strInstructions:
  //     "Wash and soak toor dal in approx. 3 cups of water, for at least one hours. Dal will be double in volume after soaking. Drain the water.Cook dal with 2-1/2 cups water and add salt, turmeric, on medium high heat, until soft in texture (approximately 30 mins) it should be like thick soup.,In a frying pan, heat the ghee. Add cumin seeds, and mustard seeds. After the seeds crack, add bay leaves, green chili, ginger and chili powder. Stir for a few seconds.Add tomatoes, salt and sugar stir and cook until tomatoes are tender and mushy.Add cilantro and garam masala cook for about one minute.Pour the seasoning over dal mix it well and cook for another minute.Serve with Naan.",
  //   strMeal: "Dal fry",
  //   strMealThumb:
  //     "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
  //   strMeasure1: "1 cup",
  //   strMeasure2: "2-1/2 cups",
  //   strMeasure3: "1 tsp",
  //   strMeasure4: "1/4 tsp",
  //   strMeasure5: "3 tbs",
  //   strMeasure6: "1 cup",
  //   strMeasure7: "1/2 tsp",
  //   strMeasure8: "1/2 tsp",
  //   strMeasure9: "2",
  //   strMeasure10: "1 tbs chopped",
  //   strMeasure11: "2 tsp shredded",
  //   strMeasure12: "2 tbs ",
  //   strMeasure13: "1/2 tsp",
  //   strMeasure14: "1/2 tsp",
  //   strMeasure15: "1 tsp",
  //   strMeasure16: "1/4 tsp",
  //   strMeasure17: "",
  //   strMeasure18: "",
  //   strMeasure19: "",
  //   strMeasure20: "",
  //   strSource: "https://www.instagram.com/p/BO21bpYD3Fu",
  //   strTags: "Curry,Vegetarian,Cake",
  //   strYoutube: "https://www.youtube.com/watch?v=J4D855Q9-jg",
  // };
  let instructions;
  // if (fetchedData) {
  // }
  const ingredients = [];
  if (fetchedData) {
    for (let i = 1; i <= 20; i++) {
      if (fetchedData[`strIngredient${i}`]) {
        ingredients.push(`${fetchedData[`strIngredient${i}`]}`);
      } else {
        break;
      }
    }
    if (fetchedData.strInstructions.includes("approx")) {
      let instr = fetchedData.strInstructions.replace(
        "approx.",
        "approximation"
      );
      instructions = instr.split(".");
      console.log(instructions);
    } else {
      instructions = fetchedData.strInstructions.split(".");
      console.log(instructions);
    }
  }
  useEffect(() => {
    props.fetchAPI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 p-0">
            <div className="details-img">
              <img
                src={fetchedData && fetchedData.strMealThumb}
                className="img-fluid "
                alt=""
              />
            </div>
          </div>
          <div className="col-md-6 p-3">
            <h1 className="text-main font-weight-bold">
              {fetchedData && fetchedData.strMeal}
            </h1>
            <div className="row">
              <p className="det-p">
                <span className="font-weight-bold mr-2">Category:</span>{" "}
                {fetchedData && fetchedData.strCategory}
              </p>
              <p className="det-p">
                <span className="font-weight-bold mr-2">Area:</span>{" "}
                {fetchedData && fetchedData.strArea}
              </p>
              <p className="det-p">
                <span className="font-weight-bold mr-2">Tags:</span>{" "}
                {fetchedData && fetchedData.strTags.split(",").join(", ")}
              </p>
            </div>
            <div className="row py-3">
              <div className="col-12 ">
                <h4 className="font-weight-bold">Ingredients:</h4>
              </div>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="col-4 col-md text-center mx-auto">
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${ingredient
                      .split(" ")
                      .join("%20")}-Small.png`}
                    alt=""
                    className="img-fluid"
                  />
                  <p className="font-weight-bold">{ingredient}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 my-2">
            <h4 className="font-weight-bold py-2">Procedures:</h4>
            <div className="shadow rounded p-3">
              <Carousel style={{ height: "300px" }}>
                {instructions &&
                  instructions.map((instruction, index) => (
                    <Carousel.Item interval={null} key={index}>
                      <h5>{instruction}</h5>
                    </Carousel.Item>
                  ))}
              </Carousel>
              <h6 className="mb-0 ml-auto">Hello World</h6>
            </div>
          </div>
          <div className="col-md-6 my-2">
            <h4 className="font-weight-bold py-2">Video</h4>
            <div className="embed-responsive embed-responsive-16by9 shadow">
              {fetchedData && fetchedData.strYoutube && (
                <iframe
                  title={fetchedData.strMeal}
                  className="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${fetchedData.strYoutube.slice(
                    -11
                  )}`}
                  allowFullScreen
                ></iframe>
              )}
            </div>
            {console.log(fetchedData)}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state, ownProps) => {
  const fR = state.fetchedRecipe[ownProps.match.params.id];
  //   const fetchedRecipe =
  //     apiData.find((obj) => obj.idMeal === ownProps.match.params.id) ||
  //     state.fetchedRecipe;

  return {
    searchTerm: state.searchTerm,
    fR,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchAPI() {
    dispatch(fetchRecipeDetails(ownProps.match.params.id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
