import React, {useState, useEffect, useRef} from "react";
import {ItemApi} from "../common/ItemApi";
import {CategoryApi} from "../common/CategoryApi";
import {Table} from "../components/Table";
import {Card} from "primereact/card";


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
    }, []);

    const footer = (
        <div align={"center"}>
            <h3>Thank you for shopping with us!</h3>
            <h5>Not a customer? click <a href={"/admin"}>here</a></h5>
        </div>
    );

    return (
        <div>
            <h1>Customer View</h1>
            <Card footer={footer}>
                <Table items={items} category={category} admin={false}></Table>
            </Card>
        </div>
    );
}