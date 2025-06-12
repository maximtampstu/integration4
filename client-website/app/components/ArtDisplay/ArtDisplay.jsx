import { useState } from "react";
import DropDownSelect from "../DropDownSelect/DropDownSelect"
import CardSlider from "../CardSlider/CardSlider"
import "./ArtDisplay.css";

const ArtDisplay = ({ label, data, cardComponent }) => {
    const [category, setCategory] = useState("category")

    const categoryOptions = [
        { label: "Category", value: "category" },
        { label: "All", value: "category" },
        { label: "Music", value: 1 },
        { label: "Motion Graphic", value: 2 },
        { label: "Digital Art", value: 3 },
        { label: "Physical Art", value: 4 },
        { label: "Performance", value: 5 },
    ];

    const handleCategory = (value) => {
        setCategory(value)
    }

    const filteredData = data.filter(item => {
        if (category === "category") return true;
        return Number(item.artTypeId) === Number(category);
    });

    return (
        <li className={`art-display art-display--${label}`}>
            <div className="art-display__head">
                <h3>{label}</h3>
                <DropDownSelect name="category" color="purple" handle={handleCategory} options={categoryOptions} />
            </div>
            <CardSlider data={filteredData} cardComponent={cardComponent} />
        </li>
    );
};

export default ArtDisplay;
