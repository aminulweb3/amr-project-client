import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useCart from "../../hook/useCart";

const OrderFood = ({item}) => {
    const {name, image, price, recipe, _id} = item;
    const {user} = useAuth();

    const navigate = useNavigate();
    const location = useLocation(); 
    const axiosSecure = useAxiosSecure();
    const [refetch] = useCart();
    const handleAddToCart = () => {
      if(user && user.email){
      //  TODO: send cart item to the database
      // console.log(user.email, food);
      // send cart item to the database

      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        price,
        image
      }
      // axiosSecure.post('/carts', cartItem)
      //  .then(res => {
      //   console.log(res.data)
      //   if(res.data.insertedId){
      //     Swal.fire({
      //       position: "top-end",
      //       icon: "success",
      //       title: `${name} added to your cart`,
      //       showConfirmButton: false,
      //       timer: 1500
      //     });
      //     // refetch cart to update the cart items count
      //     refetch();
      //   }
      //  })
   
      }
      else{
        Swal.fire({
          title: "You are not lgged In",
          text: "Please login to add to the cart?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, login!"
        }).then((result) => {
          if (result.isConfirmed) {
          // send the user to the login page
          navigate('/login', {state: {from: location}})

         
          }
        });
      }
    }
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={image} alt="" />
            
        </figure>
        <p className="bg-slate-900 text-white right-0 absolute mr-16 mt-12 px-4">${price}</p>
        <div className="card-body items-center flex flex-col ">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions">
            <button 
            onClick={handleAddToCart}
            className="btn btn-outline border-0 border-b-4 bg-slate-200 border-orange-400 text-orange-400">Add to Cart</button>
          </div>
        </div>
      </div>
    );
};

export default OrderFood;