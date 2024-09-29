import { useState, useMemo, useEffect } from 'react';
import orderCoverImg from '../../../assets/shop/order.jpg';
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useMenu } from '../../Menu/MenuContext/MenuContext';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = category ? categories.indexOf(category) : 0;
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const { state: { menu, loading } } = useMenu();

    const categorizedMenu = useMemo(() => {
        return {
            salad: menu.filter(item => item.category === "salad"),
            pizza: menu.filter(item => item.category === "pizza"),
            soup: menu.filter(item => item.category === "soup"),
            dessert: menu.filter(item => item.category === "dessert"),
            drinks: menu.filter(item => item.category === "drinks")
        };
    }, [menu]);

    useEffect(() => {
        // Scroll to the desired position when the component mounts or category changes
        window.scrollTo({ top: 500, behavior: 'smooth' });
    }, [category]);

    if (loading) {
        return <div>Loading...</div>; // Or a more sophisticated loading indicator
    }

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <Cover img={orderCoverImg} title="Our Order" />
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    {categories.map(cat => <Tab key={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Tab>)}
                </TabList>
                {categories.map(cat => (
                    <TabPanel key={cat}>
                        <OrderTab items={categorizedMenu[cat] || []} />
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export default Order;