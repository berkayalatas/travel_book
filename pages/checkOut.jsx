import React from 'react'
import { useRouter } from "next/dist/client/router";

function checkOut() {
    const router = useRouter();

    //ES6 Destructing
    const { location, startDate, endDate, numberOfGuest, roomID } = router.query;
    return (
        <div>
            {`${location}, ${startDate}, ${endDate}, ${numberOfGuest}, ${roomID}`}
        </div>
    )
}

export default checkOut;
