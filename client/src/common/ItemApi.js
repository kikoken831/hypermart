import API_URL from "../common/APIurl";

export class ItemApi{
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
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        }).then(res => res.json()).then(d => d);
    }
}