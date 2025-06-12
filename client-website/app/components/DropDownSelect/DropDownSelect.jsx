import { useState } from "react";
import "./DropDownSelect.css";

const DropDownSelect = ({name, color, options, handle}) => {
    return (
        <div onChange={(e) => handle(e.target.value)} className="drop-down-select">
            <select className={`drop-down-select__select drop-down-select__select--${color}`} name={name} id={name}>
                {options.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
        </div>
    );
};

export default DropDownSelect;

