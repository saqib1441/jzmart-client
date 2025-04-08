import localforage from "localforage";

const storage = localforage.createInstance({
  name: "jzmart",
  storeName: "redux",
  description: "JZ Mart state storage",
});

export default storage;
