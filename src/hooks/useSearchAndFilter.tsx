// import libraries
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";


const URL_API = '192.168.1.127';

const statusItems = [
    { text: "All" },
    { text: "Available" },
    { text: "Borrowed" },
];
const sortItems = [
    { text: "Default" },
    { text: "Most Recent" },
    { text: "Oldest" },
];


const useSearchAndFilter = ({ data, path }) => {
    const [queryEquipmentList, setQueryEquipmentList] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchStatus, setSearchStatus] = useState("All");
    const [searchOrder, setSearchOrder] = useState("Default");

    const debouncedSearchTerm = useDebounce(searchTerm, 500);


    useEffect(() => {
        if (debouncedSearchTerm === "" && searchStatus === "All" && searchOrder === "Default") {
            setQueryEquipmentList([]);
            return;
        }

        fetch(`http://${URL_API}:3000/${path}?searchValue=${debouncedSearchTerm}&searchStatus=${searchStatus}&searchOrder=${searchOrder}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                setQueryEquipmentList(data);
            })
    }, [debouncedSearchTerm, searchStatus, searchOrder]);
    let displayData = [];
    if (debouncedSearchTerm != "" || searchStatus != "All" || searchOrder != "Default") {
        displayData = queryEquipmentList;
    }
    else {
        displayData = data;
    }

    return {
        searchTerm,
        setSearchTerm,
        searchStatus,
        setSearchStatus,
        searchOrder,
        setSearchOrder,
        displayData,
        statusItems,
        sortItems
    }
}
export default useSearchAndFilter;
