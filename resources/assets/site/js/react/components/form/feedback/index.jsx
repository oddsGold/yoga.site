import React from "react";
import ReactDOM from 'react-dom/client';
import API from "../../../utils/api";
import FormTemplate from "../index";

const Feedback = () => {
    return (
        <FormTemplate
            title="Форма зворотнього зв'язку"
            apiMethod={API.createFormFeedback}
        />
    )
};


const rootElement = document.getElementById('feedback-root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<Feedback/>);
}
