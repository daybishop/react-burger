import { FC } from "react"

interface IDateTime {
    time: string
}

export const DateTime: FC<IDateTime> = ({ time }) => {
    return (
        <>
            {time}
        </>
    )
}