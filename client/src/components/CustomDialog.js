import React, {useState, useEffect, useRef} from "react";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Dialog} from "primereact/dialog";
import {InputNumber} from "primereact/inputnumber";
import {FileUpload} from "primereact/fileupload";
import {ItemApi} from "../common/ItemApi";

export const CustomDialog = (props) => {
    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState({
        item_id: 0,
        item_name: "",
        item_price: 0,
        item_image: "",
        category_id: 0,
        item_desc: "",
        item_category: "Category A",
        item_quantity: 0,

    });
    const [category, setCategory] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [itemDialog, setItemDialog] = useState(false);
    useEffect(() => {
        setItem(props.item);
        setCategory(props.category);
        setVisible(props.visible);
    }, [props.item, props.category, props.visible]);

    const saveItem = () => {
        console.log(item);
        if (item.item_id === 0) {
            ItemApi.createItem(item).then(r => console.log(r));
            let _items = props.items;
            _items.push(item);
            props.setItems(_items);
        } else {
            ItemApi.updateItem(item).then(r => console.log(r));
            let _items = props.items.filter((item) => {
                return item.item_id !== props.item.item_id;
            });
            _items.push(item);
            props.setItems(_items);
        }
        onHide();
    }
    const onHide = () => {
        setVisible(false);
        props.setVisible(false);
    }
    const onInputChange = (e, name) => {
        console.log(e);
        const val = (e.target && e.target.value) || "";
        let _item = {...item};
        _item[`${name}`] = val;
        setItem(_item);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _item = {...item};
        _item[`${name}`] = val;
        setItem(_item);
    }


    const ItemDialogFooter = (
        <React.Fragment>
            <FileUpload name="Img"
                        accept="image/*"
                        customUpload={true}
                        uploadHandler={saveItem}
                        mode="basic"
                        auto={true}
                        align="left"
                        chooseLabel="Upload"/>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={onHide}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                className="p-button-text"
                onClick={saveItem}
            />
        </React.Fragment>
    );

    return (
        <div>
            <Dialog header="Item Details" visible={visible} style={{width: '50vw'}} footer={ItemDialogFooter}
                    onHide={onHide}>
                <div className="p-grid">
                    <div className="p-col-12 p-md-6">
                        {item.item_image && (
                            <>
                                <img
                                    src={item.item_image}
                                    onError={(e) =>
                                        (e.target.src =
                                            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                                    }
                                    alt={item.item_image}
                                    className="product-image block m-auto pb-3"
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        boxShadow:
                                            "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
                                        borderRadius: "5%"
                                    }}
                                />
                            </>
                        )}
                    </div>
                    <div className="p-col-12 p-md-6">
                        <div className="p-field">
                            <label htmlFor="item_name">Item Name</label>
                            <InputText className={"ml-3"} id="item_name" value={item.item_name}
                                       onChange={(e) => {
                                           onInputChange(e, "item_name")
                                       }}/>
                        </div>
                        <div className="p-field">
                            <label htmlFor="item_price">Item Price</label>
                            <InputNumber className={"ml-3"} id="item_price" value={item.item_price}
                                         mode="currency" currency="USD" locale="en-US"
                                         onChange={(e) => {
                                             onInputNumberChange(e, "item_price")
                                         }}/>
                        </div>
                        <div className="p-field">
                            <label htmlFor="item_desc">Item Description</label>
                            <InputText className={"ml-3"} id="item_desc" value={item.item_desc}
                                       onChange={(e) => {
                                           onInputChange(e, "item_desc")
                                       }}/>
                        </div>
                        <div className="p-field">
                            <label htmlFor="item_quantity">Item Quantity</label>
                            <InputNumber className={"ml-3"} id="item_quantity" value={item.item_quantity}
                                         onChange={(e) => {
                                             onInputNumberChange(e, "item_quantity")
                                         }}/>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}