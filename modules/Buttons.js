'use client'

import { Button } from "@mui/material";

const Buttons = ({todo}) => {

    return (
        <>


                <Button  variant="outlined" size="small" color="error" >
                حذف
                </Button>
            
            <Button variant="outlined" size="small" color="info" >
                ادیت
            </Button>
        </>
    );
}

export default Buttons;