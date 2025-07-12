import React from "react";
import ReactDOM from 'react-dom/client';
import API from "../../../utils/api";
import FormTemplate from "../index";

const Buy = () => {
    return (
        <section className="contacts buy-form">
            <div className="contacts-form">
                <FormTemplate
                    title="Ми допоможемо обрати тип ліцензії, необхідний для вирішення ваших задач!"
                    apiMethod={API.createFormBuy}
                    buttonClose={<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>}
                />
            </div>
        </section>
    )
};


const rootElementBuy = document.getElementById('buy-form');

if (rootElementBuy) {
    const root = ReactDOM.createRoot(rootElementBuy);
    root.render(<Buy/>);
}

