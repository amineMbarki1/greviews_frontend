import { httpClient } from "@/api/http-client";
import { TextMessageInputs } from "./types/schemas";
import dayjs from "dayjs";

export function createTextMessage(textMessage: TextMessageInputs) {
 
  return httpClient
    .post<{ data: unknown[] }>("/text-messages", {
      ...textMessage,
      date: dayjs(textMessage.date).format().split("T")[0],
    })
    .then((res) => res.data);
}
