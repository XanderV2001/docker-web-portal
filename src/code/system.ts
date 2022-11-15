import { Functions, Models } from "appwrite";
import { useAppwrite } from "./appwrite";

const functions = new Functions(useAppwrite());

export type ServerStats = {
    system: {
        cpu_usage: number,
        ram: {
            usage: number,
            available: number,
            used: number,
        }
    }
}

export type DockerStats = {
    containers: {
        total: number,
        running: number,
        stopped: number,
        images: number
    }
}

export const getServerStats = async (): Promise<ServerStats> => {
    const values = await functions.createExecution("635066bccc80c8c7c8d9")
    const stats: ServerStats = JSON.parse(values.response);
    return stats;
}

export const getDockerStats = async (): Promise<DockerStats> => {
    const values = await functions.createExecution("634f3e8a2d355798e8f4");
    const stats: DockerStats = JSON.parse(values.response);
    return stats;
}