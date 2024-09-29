import { useState, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import OrderFood from "../../../components/OrderFood/OrderFood";

const OrderTab = ({ items }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;

    const pageCount = Math.ceil(items.length / itemsPerPage);
    const currentItems = items.slice(itemOffset, itemOffset + itemsPerPage);

    const handlePageClick = useCallback((event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
        window.scrollTo({ top: 500, behavior: 'smooth' });
    }, [items.length]);

    return (
        <div className='flex flex-col items-center'>
            <div className='grid md:grid-cols-3 gap-4 mb-8'>
                {currentItems.map(item => (
                    <OrderFood key={item._id} item={item} />
                ))}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Previous"
                renderOnZeroPageCount={null}
                className="flex space-x-2 select-none"
                pageClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer"
                activeClassName="bg-blue-500 text-white"
                previousClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer"
                nextClassName="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer"
                disabledClassName="opacity-50 cursor-not-allowed"
            />
        </div>
    );
};

export default OrderTab;