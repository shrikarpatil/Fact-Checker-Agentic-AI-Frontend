"use server";

export async function getEnvVariable(key: string): Promise<string | undefined> {
    return process.env[key];
}