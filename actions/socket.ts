"use server";
import io from "socket.io-client";

const backendUrl = process.env.BACKEND_BASE_URL
export const socket = io(backendUrl!);