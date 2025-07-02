export const mfConfig = {
    name: "mfe_container",
    remotes: {
        SnackChatReact: "snackChatReact@http://localhost:3002/remoteEntry.js",
        snackApp: "snackApp@http://localhost:3000/remoteEntry.js"

    },
    shared: {
        "react": { singleton: true },
        "react-dom": { singleton: true },
        "react-router-dom": { singleton: false }
    },
};
