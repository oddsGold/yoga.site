import {instance} from "./instance";

const alias = '/forms';

export default {

    createFormFeedback: (data) => {
        return instance.post(`${alias}/feedback`, data);
    },

    createFormBuy: (data) => {
        return instance.post(`${alias}/buy`, data);
    },

    createFormPresentation: (data) => {
        return instance.post(`${alias}/presentation`, data);
    },

    getFaq: () => {
        return instance.get(`/faq`);
    }
}
