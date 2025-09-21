"use server";
import { FACT_CHECK_API } from "@/config/constants"
import { postRequest } from "./crud-actions"

export const checkFact = async (claim: string) => {
    const response = await postRequest(`${process.env.BACKEND_BASE_URL}/${FACT_CHECK_API}`, { claim })
    return response
}