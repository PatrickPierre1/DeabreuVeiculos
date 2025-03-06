import { Location } from "@/components/Location";
import VehicleList from "@/components/VehicleList";
import { Box } from "@mui/material";

export default function Veiculos() {
    return (
        <>
            <Box width={"100%"} sx={{ backgroundColor: "#323232", height: "106px" }}></Box>
            <VehicleList />
            <Location/>
        </>
    )
}