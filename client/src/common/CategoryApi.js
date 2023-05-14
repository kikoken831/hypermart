import API_URL from "../common/APIurl";

export class CategoryApi{
    static getAllCategory() {
        return fetch(`${API_URL}/api/category`).then(res => res.json()).then(d => d);
    }

}