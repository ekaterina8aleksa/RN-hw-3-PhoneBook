// import shortid from "shortid";

export const setContacts = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        console.log("set to locale storage");
    } catch (error) {
        throw new Error();
    }
};

export const getContacts = (key) => {
    try {
        const contacts = localStorage.getItem(key);
        console.log("get contacts");
        return contacts ? JSON.parse(contacts) : null;
    } catch (error) {
        throw new Error();
    }
};
