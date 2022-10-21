import { FC } from "react"
import moment from 'moment'
import 'moment/locale/ru';

interface IDateTime {
    time: string
}

export const DateTime: FC<IDateTime> = ({ time }) => {
    return (
        <>
            {moment(time).from(moment())}
        </>
    )
}