import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="pt-8">
            {title && <Cover img={img} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-4 my-16">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}


                    ></MenuItem>)
                }
            </div>
            <div className="text-center">
            <Link to={`/order/${title || 'drinks'}`}>
            <button className="btn btn-outline border-0 border-b-4 mb-2">Order Your favorite Food</button>
            </Link>
            </div>
        </div>
    );
};

export default MenuCategory;