export const DBConfig = {
  name: "School_Groups",
  version: 5,
  objectStoresMeta: [
    {
      store: "Groups",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "id", keypath: "id", options: { unique: true } },
        { name: "name", keypath: "name", options: { unique: true } },
        { name: "count", keypath: "count", options: { unique: false } },
        { name: "min", keypath: "min", options: { unique: false } },
        { name: "total", keypath: "total", options: { unique: false } },
        { name: "next", keypath: "next", options: { unique: false } },
        { name: "expanded", keypath: "expanded", options: { unique: false } },
      ],
    },
  ],
};
