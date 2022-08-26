export const checkResponse = res => {
    if (res.ok) {
        return res.json()
            .then(data => {
                if (data.success) {
                    return Promise.resolve(data)
                } else throw new Error("Error data loading");
            })
    }
    return Promise.reject(`Ошибка ${res.status}`)
}