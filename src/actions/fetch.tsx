import { Client } from "../components/list"


export const fetchData = async (): Promise<Client[]> => {
    const response = await fetch('https://amaris-hw.free.beeceptor.com/clients')
    if (!response.ok) {
        throw new Error('Data coud not be fetched!')
    } else {
        return response.json()
    }
}
