"use client"
import React from "react";
import { sendCollectorTest } from "@/actions";

const Tester = ()=>{

    const handleClick = async ()=>{
        await sendCollectorTest("Precious@creath.io", "Precious Omowunmi", "Atmosphere of Peace - Maverick")
    }


    return(
        <button onClick={handleClick}>Test</button>
    )
}

export default Tester;