import React, { useState, useEffect, useRef } from "react";
import {ItemApi} from "../common/ItemApi";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {CategoryApi} from "../common/CategoryApi";
import {Table} from "../components/Table";


export const CustomerView = () => {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        ItemApi.getAllItems().then((data) => {
            setItems(data);
        });
        CategoryApi.getAllCategory().then((data) => {
            setCategory(data);
        });
    },[]);
    return (
        <div>
            <h1>Customer View</h1>
            <Table items={items} category={category}></Table>
        </div>
    );
}