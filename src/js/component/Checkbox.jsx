import React from "react";
import checkboxStyles from "../../styles/checkbox.css";

const Checkbox = ({ checked, onChange }) => {
    return (
        <div className="checkbox-wrapper-12">
            <div className="cbx">
                <input
                    checked={checked}
                    type="checkbox"
                    id="cbx-12"
                    onChange={onChange}
                />
                <label htmlFor="cbx-12"></label>
            </div>
        </div>
    );
};

export default Checkbox;