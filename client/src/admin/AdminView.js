import React, {useState, useEffect, useRef} from "react";
import {ItemApi} from "../common/ItemApi";
import {CategoryApi} from "../common/CategoryApi";
import {Table} from "../components/Table";


export const AdminView = () => {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        ItemApi.getAllItems().then((data) => {
            setItems(data);
        });
        CategoryApi.getAllCategory().then((data) => {
            setCategory(data);
        });
    }, []);
    return (
        <div>
            <h1>Admin View</h1>
            <Table items={items} category={category} admin={true}></Table>
        </div>
    );
}