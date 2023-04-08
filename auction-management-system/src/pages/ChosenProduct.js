import React from "react";
import { useParams } from "react-router-dom";

export const ChosenProduct = () =>
{ let {id} = useParams();
console.log(id)
    return(

        <>
            <h1>you are the chosen one</h1>
        </>
    );

};