import axios from 'axios'
import { AddressInfo } from "../types/AddressInfo";

const baseUrl = "https://viacep.com.br/ws"

export const getAddressInfo = async (cep: string): Promise<AddressInfo | void> => {

    try {
        const response = await axios.get(`${baseUrl}/${cep}/json`)
        
        const addressInfo: AddressInfo = {
            estado: response.data.uf,
            cidade: response.data.localidade,
            bairro: response.data.bairro,
            logradouro: response.data.logradouro
        }

        return addressInfo
    } catch (error) {
        console.log(error)
    }
}