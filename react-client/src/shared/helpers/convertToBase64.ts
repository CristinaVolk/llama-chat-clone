export function convertToBase64(file: File) : Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            if (reader.result) {
                resolve(reader.result as string)
            }
        }

        reader.onerror = (error) => {
            reject(error)
        }
    })
}