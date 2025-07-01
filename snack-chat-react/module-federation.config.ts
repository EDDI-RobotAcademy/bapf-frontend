export const mfConfig = {
    name: "chatApp",
    filename: "remoteEntry.js",
    exposes: {'./ChatApp': './src/App.tsx'},
    shared: ["react", "react-dom"],
};
