import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const startConnection = async (connection) => {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (error) {
        console.error("SignalR Connection Error: ", error);
    }
};


export const signalR = {
    startConnection: () => {
        const hubUrl = "https://localhost:7216/notificationhub";
        const connection = new HubConnectionBuilder()
            .withUrl(hubUrl)
            .configureLogging(LogLevel.Information) // Configure logging level
            .build();
        console.log("🚀 ~ connection:", connection)

        startConnection(connection);
        return connection;
    }
}