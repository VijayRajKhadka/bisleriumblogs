import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const startConnection = () => {
    const hubUrl = "https://localhost:7216/notificationhub"; // Replace with your SignalR hub URL
    const connection = new HubConnectionBuilder()
        .withUrl(hubUrl)
        .build();

    return connection;
};

export const signalRService = {
    connection: startConnection()
};
