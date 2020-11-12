import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchRecipeDetails } from "../Redux/actionCreators";

const Details = (props) => {
  useEffect(() => {
    props.fetchAPI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <section>
      {/* <div>Hello {console.log(props, props.fetchAPI())}</div>; */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <img
              src={
                props.fetchedRecipe.strMealThumb &&
                props.fetchedRecipe.strMealThumb
              }
              alt=""
            />
            {console.log(props.fetchedRecipe && props.fetchedRecipe)}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({ fetchedRecipe: state.fetchedRecipe });

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchAPI() {
    dispatch(fetchRecipeDetails(ownProps.match.params.id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
