import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
const Button = ({ title, type, bg, width, onClick }) => {
    return (
        <button
            type={type}
            className={`px-10 py-3 ${
                bg ? "bg-blue-500" : "bg-primary"
            } rounded font-bold inline-block ${width ? "w-full" : ""}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
};
Button.prototype = {
    title: PropTypes.string,
    type: PropTypes.string,
    bg: PropTypes.string,
};
function FallbackComponent() {
    return (
        <div className="text-red-500 bg-red-200 text-base">
            This in component error
        </div>
    );
}
export default withErrorBoundary(Button, {
    FallbackComponent,
});
