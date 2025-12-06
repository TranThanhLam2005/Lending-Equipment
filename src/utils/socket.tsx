import io from "socket.io-client";
import {API_BASE_URL} from "@/api/config";

export const socket = io(API_BASE_URL, {
  withCredentials: true,
});
