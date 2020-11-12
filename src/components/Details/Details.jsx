import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchRecipeDetails } from "../Redux/actionCreators";

const Details = (props) => {
  const fetchedData = props.fR || "";
  useEffect(() => {
    props.fetchAPI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <section>
      {/* <div>Hello {console.log(props, props.fetchAPI())}</div>; */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <img src={fetchedData.strMealThumb} className="img-fluid" alt="" />
            <h1>{fetchedData.strMeal}</h1>
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
