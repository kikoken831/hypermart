import React, { useState, useEffect, useRef } from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

export const Table = (props) => {

    //get input props
    const [first, setFirst] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        setItems(props.items);
        setCategory(props.category);
    })
    const imageBodyTemplate = (rowData) => {
        return (
            <img
                style={{
                    width: "100px", height: "100px", boxShadow:
                        "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)", borderRadius: "5%"
                }}
                src={`${rowData.item_image}`}
                onError={(e) =>
                    (e.target.src =
                        "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                }
                alt={rowData.item_image}
                className="product-image"
            />
        );
    };
    return (
        <div>
            <DataTable
                value={items}
                className="rounded-5"
                paginator
                scrollable
                dataKey="item_id"
                rows={10}
                first={first}
                rowsPerPageOptions={[5, 10, 25]}>
                <Column
                    align={"left"}
                    field="image"
                    header="Image"
                    style={{width: "10rem"}}
                    body={imageBodyTemplate}
                ></Column>
                <Column field="item_name" header="Name" sortable align={"left"} style={{width: "20rem"}}></Column>
                <Column field="item_price" header="Price"></Column>
            </DataTable>
        </div>
    );
}