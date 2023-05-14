import API_URL from "../common/APIurl";

export class ItemApi {
    static getAllItems() {
        return fetch(`${API_URL}/api/items`).then(res => res.json()).then(d => d);
    }

    static getItemById(id) {
        return fetch(`${API_URL}/api/items/${id}`).then(res => res.json()).then(d => d);
    }

    static createItem(item) {
        return fetch(`${API_URL}/api/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                return res;
            }
        })//check if res is ok
    }

    static updateItem(item) {
        return fetch(`${API_URL}/api/items/${item.item_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                return res;
            }
        })//check if res is ok

    }

    static deleteItem(id) {
        return fetch(`${API_URL}/api/items/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                return res;
            }
        })//check if res is ok
    }
}