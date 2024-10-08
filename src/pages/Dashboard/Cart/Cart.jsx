import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hook/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";



const Cart = () => {
    const [cart, refetch] = useCart();
    console.log("Cart in Cart component:", cart);
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const axiosSecure = useAxiosSecure();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
            
            axiosSecure.delete(`/carts/${id}`)
            .then(res => {
            if(res.data.deletedCount > 0){
                refetch()
                  Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
            })
            }
          });
    }
    return (
        <div className="bg-slate-100 w-[800px] mx-auto mt-12 pt-4">
            <div className="flex justify-evenly mb-8">
            <h2 className="text-3xl uppercase ">Total Order: {cart.length} </h2>
            <h2 className="text-3xl uppercase ">Total Price: ${totalPrice} </h2>
            <button className=" btn btn-primary">Pay</button>
            </div>
            <div className="overflow-x-auto">
             <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
           #
          </label>
        </th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {
            cart.map((item, index) =>  <tr key={item._id}>
                <th>
               {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    {/* <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div> */}
                  </div>
                </td>
                <td>
              {item.name}
                </td>
                <td>${item.price}</td>
                <th>
                  <button 
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-ghost btn-lg">
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </th>
              </tr>)
        }
    
  
   
    </tbody>
  
   
  </table>
</div>
        </div>
    );
};

export default Cart;