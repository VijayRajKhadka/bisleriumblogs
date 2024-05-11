import { HubConnection } from "@microsoft/signalr";

const startConnection = async (connection) => {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (error) {
        console.error("SignalR Connection Error: ", error);
    }
};


export const signalR = (connection) => {
    try {
        const hubUrl = "https://localhost:7216/notificationhub";
        const connection = new HubConnection(hubUrl);
        startConnection(connection);
        return connection;
    } catch (error) {
        console.error("SignalR Error: ", error);
    }
}