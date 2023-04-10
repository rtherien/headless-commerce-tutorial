import { useLocation, useNavigate } from "react-router-dom";
import { FreqViewedTogether } from "./Recommendations/FreqViewedTogether";
import CartRecommendations from "./Recommendations/CartRecommendations";
import {
  frequentlyViewedTogether as frequentlyViewedTogetherController,
  cartRecommendations as CartRecommendationsController,
} from "../controllers/controllers";

function ProductDetailPage() {
  const navigate = useNavigate();
  let { result } = useLocation().state;
  if (result.permanentid == null) result = result.raw;
  console.log(result);
  const productID = result.permanentid as string;
  return (
    <div className="pdp-section">
      <div className="product">
        <div className="product-heading">
          <h1>{result.ec_name}</h1>
          <p>${result.ec_price as string}</p>
        </div>

        <div className="product-info">
          <p>
            <strong>BRAND:</strong> {result.ec_brand as string}
          </p>
          <p>
            <strong>RATING:</strong> {result.ec_rating as string} stars
          </p>
          <p>
            <strong>PRODUCT-ID:</strong> {productID}
          </p>
        </div>
      </div>
      <button className="back-to-search" onClick={() => navigate("/")}>
        Back to search
      </button>
      <div className="recs-section">
        <FreqViewedTogether
          controller={frequentlyViewedTogetherController}
          productID={productID}
        />
        <CartRecommendations
          controller={CartRecommendationsController}
          productID={productID}
        />
      </div>
    </div>
  );
}

export default ProductDetailPage;
