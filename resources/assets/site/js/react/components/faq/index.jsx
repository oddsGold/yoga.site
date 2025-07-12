import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import API from "../../utils/api";
import plusIcon from '../../../../images/faq-plus.svg';
import minusIcon from '../../../../images/faq-minus.svg';

const FAQ = () => {
    const [questions, setQuestions] = useState([]);
    const [visibleQuestions, setVisibleQuestions] = useState(7);
    const [showMore, setShowMore] = useState(true);
    const [activeQuestion, setActiveQuestion] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await API.getFaq();
                if (response.data && response.status === 200) {
                    setQuestions(response.data);
                }
            } catch (error) {
                console.error('Error fetching questions:');
            }
        };

        fetchQuestions();
    }, []);

    const handleShowMore = () => {
        if (visibleQuestions >= questions.length) {
            setVisibleQuestions(7);
            setShowMore(true);
        } else {
            setVisibleQuestions(prev => prev + 7);
            if (visibleQuestions + 7 >= questions.length) {
                setShowMore(false);
            }
        }
    };

    const handleToggleActive = (index) => {
        if (activeQuestion === index) {
            setActiveQuestion(null);
        } else {
            setActiveQuestion(index);
        }
    };

    if (questions.length === 0) return null;

    return (
        <div className="container">
            <div className="title">
                <h2>Часті запитання</h2>
            </div>
            <ul className="faq__list" id="faq__list">
                {questions.slice(0, visibleQuestions).map((q, index) => (
                    <li key={index} className={`faq__item ${activeQuestion === index ? 'active' : ''}`}>
                        <button
                            className={`faq__title ${activeQuestion === index ? 'active' : ''}`}
                            type="button"
                            onClick={() => handleToggleActive(index)}
                        >
                            <span className="faq__title_text">{q.title}</span>
                            <span className="faq__title-icon">
                                <img
                                    src={activeQuestion === index ? minusIcon : plusIcon}
                                    alt={activeQuestion === index ? 'закрити' : 'відкрити'}
                                />
                            </span>
                        </button>
                        <div className={`faq__description ${activeQuestion === index ? 'active' : ''}`}>
                            <ul className="faq__list-description">
                                <li className="faq__item-description">
                                    <div dangerouslySetInnerHTML={{ __html: q.description }} />
                                </li>
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
            {questions.length > 7 && (
                <div className="faq-btn">
                    <button className="btn btn-base" onClick={handleShowMore}>
                        {showMore ? 'Дивитися більше' : 'Згорнути'}
                    </button>
                </div>
            )}
        </div>
    );
};

const rootElement = document.getElementById('faq');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<FAQ />);
}
