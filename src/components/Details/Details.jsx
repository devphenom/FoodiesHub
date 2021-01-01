import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
import { Link } from "@reach/router";

import { fetchRecipeDetails } from "../Redux/actionCreators";
import SpinnerDiv from "../SpinnerDiv";
import "./Details.css";
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Details = ({ id }) => {
  // Redux
  const recipe = useSelector((state) => state.fetchedRecipe[id]);
  const dispatch = useDispatch();
  const fetchAPI = useCallback(() => dispatch(fetchRecipeDetails(id)), [
    id,
    dispatch,
  ]);

  // visible ingredients
  const [visibleIng, setVisibleIng] = useState(4);

  // carousel index
  let [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // instructions
  let instructions;
  const ingredients = [];

  const handleVisibleIng = () => {
    setVisibleIng(ingredients.length);
  };
  if (recipe) {
    // extract ingredients
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(`${recipe[`strIngredient${i}`]}`);
      } else {
        break;
      }
    }
    // extract instructions
    if (recipe.strInstructions.includes("approx")) {
      let instr = recipe.strInstructions.replace("approx.", "approximation");
      instructions = instr.split(".");
      instructions.pop();
    } else {
      instructions = recipe.strInstructions.split(".");
      instructions.pop();
    }
  }
  // useEffect fetch recipe api
  useEffect(() => {
    fetchAPI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (getWindowDimensions().width >= 426) {
      setVisibleIng(ingredients.length);
    }
  }, [ingredients]);
  // spinner
  if (!recipe) {
    return <SpinnerDiv />;
  }
  // destructuring
  const {
    strMeal,
    strCategory,
    strMealThumb,
    strArea,
    strTags,
    strYoutube,
  } = recipe;
  // RecipeDetails
  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-6 px-0 pr-md-3"
            style={{ alignSelf: "stretch" }}
          >
            <div className="details-img">
              <img src={strMealThumb} className="img-fluid " alt="" />
            </div>
            <Link to="/search">
              <div className="bg-orange back-btn">
                <i className="fa fa-arrow-left mr-3" aria-hidden="true"></i>{" "}
                Back
              </div>
            </Link>
          </div>
          {/* Name, Category, Area, Tags, Ingredients */}
          <div className="col-md-6 light-bg">
            <h2 className="font-weight-bold text-orange p-2">{strMeal}</h2>
            <div className="row p-2">
              <p className="det-p">
                <span className="font-weight-bold mr-2">Category:</span>{" "}
                {strCategory}
              </p>
              <p className="det-p">
                <span className="font-weight-bold mr-2">Area:</span> {strArea}
              </p>
              {strTags && (
                <p className="det-p">
                  <span className="font-weight-bold mr-2">Tags:</span>{" "}
                  {strTags.split(",").join(", ")}
                </p>
              )}
            </div>
            {/*  */}
            <div
              className="row instruction-col"
              style={{ backgroundColor: "#FFF" }}
            >
              <div className="col-12 instr-head">
                <h4 className="font-weight-bold">Ingredients:</h4>
              </div>
              <div id="horizontal-nav">
                {ingredients.slice(0, visibleIng).map((ingredient, index) => (
                  <div
                    key={index}
                    className="col-6 col-md-6 text-center mx-auto"
                    data-index={index}
                  >
                    <img
                      src={`https://www.themealdb.com/images/ingredients/${ingredient
                        .split(" ")
                        .join("%20")}-Small.png`}
                      alt=""
                      className="img-fluid"
                    />
                    <p className="">{`${ingredient} - ${
                      recipe[`strMeasure${(index += 1)}`]
                    }`}</p>
                  </div>
                ))}
              </div>
              <div
                className={`col-12 mx-auto text-center my-3 ${
                  visibleIng !== 4 && "d-none"
                }`}
                onClick={handleVisibleIng}
              >
                <i
                  className="fa fa-angle-double-down fa-lg"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
        {/* Row 2 */}
        <div className="row light-bg">
          {/* Procedure/ Instructions */}
          <div className="col-md-5 instruction-col">
            <div className="instr-head">
              <h4 className="font-weight-bold">Procedures:</h4>
              <h4 className="ml-auto font-weight-bold">{`${index + 1} /  ${
                instructions.length
              }`}</h4>
            </div>
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              className="carousel-box"
              controls={true}
              indicators={false}
              nextIcon={
                <i className="fas fa-angle-right text-orange fa-2x"></i>
              }
              prevIcon={<i className="fas fa-angle-left fa-2x text-orange"></i>}
            >
              {instructions.map((instruction, index) => (
                <Carousel.Item interval={null} key={index} data-index={index}>
                  <h5>{instruction}</h5>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          {/* Video */}
          {strYoutube && (
            <div className="col-md-6 instruction-col">
              <div className="instr-head">
                <h4 className="font-weight-bold">Video:</h4>
              </div>
              <div
                className={`embed-responsive ${
                  getWindowDimensions().width >= 426
                    ? "embed-responsive-21by9"
                    : "embed-responsive-4by3"
                }`}
                style={{ borderRadius: " 0 0 20px 20px" }}
              >
                <iframe
                  title={strMeal}
                  className="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${strYoutube.slice(-11)}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Details;
