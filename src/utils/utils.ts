export const convertToBase64 = async (file: File) => { // Convierte una imagen a formato base64. Fuente: https://www.youtube.com/watch?v=pfxd7L1kzio&ab_channel=DailyTuition
    return new Promise((res, rej) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            res(fileReader.result)
        }
        fileReader.onerror = (error) => {
            rej(error)
        }
    })
}

export const esNumerico = (string: string) => {
    return string !== "" && !string.includes(" ") && !isNaN(Number(string));
}
