import axios from "axios";

const commonApi = async (reqMethod, reqUrl, reqBody, reqHeader) => {
    const axiosConfig = {
        method: reqMethod,
        url: reqUrl,
        data: reqBody,
        headers: reqHeader ? reqHeader : { 'Content-Type': 'application/json' }
    }

    return await axios(axiosConfig).then((res) => {
        return res
    }).catch((res) => {
        return res
    })
}

export default commonApi