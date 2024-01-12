export const convertToBase64 = async (file: File) => {
    return new Promise(res => {
        if (!file || !file.type.startsWith('image/')) {
            return res("No image")
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            res(fileReader.result)
        }
    })
}

export const esNumerico = (string: string) => {
    return string !== "" && !string.includes(" ") && !isNaN(Number(string));
}
