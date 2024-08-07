import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Ratings from "./Ratings";

export default function Card({ mobile }) {
  const [quantity, setQuantity] = useState(mobile?.inStock <= 0 ? 0 : 1);

  const description = mobile?.description;
  const words = description.slice(0, 50);

  const incrementQuantity = () => {
    if (mobile?.inStock <= quantity) {
      Swal.fire({
        title: "Opps out of stock!",
        icon: "error",
        confirmButtonColor: "#ff00d3",
      });
    } else setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const addToCart = () => {
    if (mobile?.inStock <= 0) {
      Swal.fire({
        title: "Opps out of stock!",
        icon: "error",
        confirmButtonColor: "#ff00d3",
      });
    } else {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const itemIndex = cartItems.findIndex((item) => item.id === mobile.id);

      if (itemIndex >= 0) {
        cartItems[itemIndex].quantity += quantity;
      } else {
        cartItems.push({ id: mobile.id, quantity });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      window.dispatchEvent(new Event("updateCart"));
      Swal.fire({
        title: "Added to cart",
        icon: "success",
        confirmButtonColor: "#ff00d3",
      });
    }
  };

  return (
    <div className="card mx-auto rounded-md pt-4 border group h-full hover:scale-[0.98] transition-all bg-base-100 max-w-72 shadow-xl">
      <figure>
        <img
          src={mobile?.image}
          className="w-1/2 transform transition duration-300 group-hover:scale-x-[-1]"
          alt="Mobile"
        />
      </figure>
      <div className="card-body p-5">
        <div className="flex justify-between">
          <Link to={`/mobiles/${mobile?.id}`}>
            <h2 className="card-title inline cursor-pointer group-hover:text-primary-red">
              {mobile.name}
            </h2>
          </Link>
          <div className="badge cursor-pointer inline badge-outline">
            {mobile?.brand}
          </div>
        </div>
        <div className="text-xl font-semibold">${mobile.price}</div>
        <div className="flex flex-wrap gap-2 ">
          <Ratings mobile={mobile} />
          <div>({mobile.ratings})</div>
        </div>
        <p>{words}...</p>
        <Link to={`/mobiles/${mobile?.id}`}>
          <button className="btn btn-sm rounded-md  w-full ">Details</button>
        </Link>
        <div className="card-actions justify-between mt-4">
          <div className="flex items-center space-x-2">
            <div className="flex flex-wrap justify-center min-[300px]:flex-nowrap items-center gap-2">
              <button
                className="btn btn-sm rounded-md "
                onClick={decrementQuantity}
              >
                -
              </button>
              <input
                id={`increase-${mobile?.id}`}
                name={`increase-${mobile?.id}`}
                type={`increase-${mobile?.id}`}
                value={quantity}
                readOnly
                className="w-full input input-xs input-bordered m-0 p-0 text-center border rounded"
              />
              <button
                className="btn btn-sm rounded-md "
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>
            <button
              className="btn btn-sm rounded-md btn-secondary"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
