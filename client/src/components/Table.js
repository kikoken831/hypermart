import React, {useState, useEffect, useRef} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {TabPanel, TabView} from "primereact/tabview";
import {Button} from "primereact/button";
import {CustomDialog} from "./CustomDialog";
import {ItemApi} from "../common/ItemApi";
import {Toolbar} from "primereact/toolbar";

export const Table = (props) => {

    //get input props
    const [first, setFirst] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState([]);
    const [admin, setAdmin] = useState(false);
    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState({
        item_id: 0,
        item_name: "",
        item_price: 0,
        item_image: "test",
        category_id: 1,
        item_desc: "",
        item_category: "Category A",
        item_quantity: 0,

    });
    useEffect(() => {
        setItems(props.items);
        setCategory([{category_id: 0, category_name: "All"}, ...props.category]);
        setAdmin(props.admin);
    }, [props.items, props.category]);

    //handle change of tab view
    const handleChange = (e) => {
        setActiveIndex(e.index);
        if (e.index === 0) {
            setItems(props.items);
            return;
        }
        //filter all items by category id
        let filteredItems = props.items.filter((item) => {
            return item.category_id === e.index;
        });
        setItems(filteredItems);

    }
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="New"
                    icon="pi pi-plus"
                    className="p-button-primary mr-2"
                    onClick={setVisible.bind(this, true)}
                />
            </React.Fragment>
        );
    };

    function editItem(rowData) {
        //set item to be edited
        setItem(rowData);
        //show dialog
        setVisible(true);
    }

    function confirmDeleteProduct(rowData) {
        ItemApi.deleteItem(rowData.item_id).then((r) => {
            console.log(r);
            //update items
            setItems(items.filter((item) => item.item_id !== rowData.item_id));
        });
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-primary mr-2"
                    onClick={() => editItem(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    onClick={() => confirmDeleteProduct(rowData)}
                />
            </React.Fragment>
        );
    };
    const imageBodyTemplate = (rowData) => {
        return (
            <img
                style={{
                    width: "150px", height: "150px", boxShadow:
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
            <TabView
                activeIndex={activeIndex}
                onTabChange={handleChange}
            >
                {category.map((cat) => {
                    return (
                        <TabPanel header={cat.category_name} key={cat.category_id}>
                            {admin && cat.category_name === "All" ? (
                                <Toolbar
                                    className="mb-0 p-2"
                                    left={leftToolbarTemplate}
                                ></Toolbar>) : null}

                            <DataTable
                                value={items}
                                className="rounded-5"
                                paginator
                                scrollable
                                dataKey="comp_id"
                                rows={10}
                                first={first}
                                rowsPerPageOptions={[5, 10, 25]}>
                                <Column
                                    align={"left"}
                                    field="image"
                                    header="Image"
                                    style={{width: "1rem"}}
                                    body={imageBodyTemplate}
                                ></Column>
                                {cat.category_name === "All" && <Column
                                    field="category_name"
                                    header="Category"
                                    sortable
                                    style={{width: "5rem"}}
                                ></Column>}
                                <Column field="item_name" header="Name" sortable align={"left"}
                                        style={{width: "7rem"}}></Column>
                                <Column field="item_price" header="Price" sortable
                                        style={{width: "5rem"}}></Column>
                                <Column field="item_desc" header="Description" align={"left"}
                                        style={{width: "10rem"}}></Column>
                                <Column field="item_quantity" header="Quantity" sortable
                                        align={admin ? "left" : "right"}
                                        style={{width: "5rem"}}></Column>
                                {admin && <Column
                                    header="Action"
                                    body={actionBodyTemplate}
                                    exportable={false}
                                    style={{width: "8rem"}}
                                ></Column>}
                            </DataTable>
                        </TabPanel>
                    )
                })}
            </TabView>
            <CustomDialog visible={visible} setVisible={setVisible} item={item} setItem={setItem}
                          items={items} setItems={setItems}
                          category={category.filter(cat => {
                              return cat.category_name !== "All";
                          })}/>
        </div>
    );
}