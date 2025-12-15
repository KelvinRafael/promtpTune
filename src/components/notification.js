import React from "react";
import style from "./notification.module.css"

export function NotificationFailure({message}){
    return(
        <div className={style.d_boxNotificationFailure}>
            <div>
                <p>{message}</p>
            </div>
        </div>
    )
};

export function NotificationSuccess({message}){
    return(
        <div className={style.d_boxNotificationSuccess}>
            <div>
                <p>{message}</p>
            </div>
        </div>
    )
};

// export function NotificationWarning({message}){
//     return(
//         <div className={style.d_boxNotificationWarning}>
//             <div>
//                 <p>{message}</p>
//             </div>
//         </div>
//     )
// };