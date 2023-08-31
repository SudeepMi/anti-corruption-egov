import React from "react";
import "./style.css";
import API from "../../utils/Api";
import Products from "../../components/Products";
import AmazonLogo from "../../assets/amazon.png";
import EbayLogo from "../../assets/ebay.png";
import snapdealLogo from "../../assets/snapdeal.png";
import Loading from "../../components/Loading";
function Ecommerce() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [items,setItems] = React.useState([{amazon:"",ebay:"",snapdeal:""}])
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    await API.post("/scrap/all-ecommerce", { query }).then((res) => {
      setResults(res.data.data);
      setLoading(false);
    });
  };

 
  return (
    <div className="container textCenter">
      <div className="m__5">

      <h1>Ecommerce</h1>
      <p>
        This tool fetches product information from different ecommerce portal
      </p>
      </div>
      <div className="search__section">
        <input
          type="text"
          placeholder="Jeans, T-shirt, Laptop, etc"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search__input"
        />
        <button
          className="search__button"
          onClick={handleSearch}
          disabled={query ? false : true}
        >
          Search
        </button>
      </div>
      <div className="results__section">
        <div className="results__container">
          {  loading ? <div className="loader"><Loading /></div> :
          <>  
          <div className="results__header">
          {results.amazon &&  <h3>Results</h3> }
          </div>
          <div className="results__body">
            <div className="results__body-container">
              {results.amazon && (
                <>
                  <img src={AmazonLogo} alt="snapdeal" width={"20%"}></img>
                  {results?.amazon.map((result, index) => (
                    <Products key={index} product={result} />
                  ))}
                </>
              )}
            </div>
            <div className="results__body-container">
              {results.amazon && (
                <>
                  <img src={EbayLogo} alt="snapdeal" width={"20%"}></img>
                  {results.ebay &&
                    results?.ebay.map((result, index) => (
                      <Products key={index} product={result} />
                    ))}
                </>
              )}
            </div>
            <div className="results__body-container">
              {results.amazon && (
                <>
                  <img
                    src={snapdealLogo}
                    alt="snapdeal"
                    width={"35%"}
                  ></img>
                  {results.snapdeal &&
                    results?.snapdeal.map((result, index) => (
                      <Products key={index} product={result} />
                    ))}
                </>
              )}
            </div>
          </div>
          </>
          }
        </div>
      </div>
    </div>
  );
}

export default Ecommerce;
