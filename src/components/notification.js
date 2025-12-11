import React from "react";

export function NotificationFailure({message}){
    return(
        <div>
            <div>
                <h1>{message}</h1>
            </div>
        </div>
    )
};

export function NotificationSuccess({message}){
    return(
        <div>
            <div>
                <h1>{message}</h1>
            </div>
        </div>
    )
};

export function NotificationWarning({message}){
    return(
        <div>
            <div>
                <h1>{message}</h1>
            </div>
        </div>
    )
};