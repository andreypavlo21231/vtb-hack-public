import React, { useEffect, useRef, useState } from "react";
import useBackgroundSetter from "../../useBackgroundSetter";
import './Education.css';
import documentIcon from '../../img/icons/document-icon.png';
import workerIconCard from '../../img/icons/worker-icon-card.svg';

function Education() {
    useBackgroundSetter();

    // Пример данных курсов
    const [courses, setCourses] = useState([
    ]);

    const showEmployer = localStorage.getItem('userRole') === 'Employer';

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [filter, setFilter] = useState(null); // Состояние для фильтрации

    // Обработка клика по карточке курса
    const handleCardClick = (course) => {
        setSelectedCourse(course);
        setModalOpen(true);
    };

    // Закрытие модального окна
    const closeModal = () => {
        setModalOpen(false);
        setSelectedCourse(null);
    };

    const handleContactStudents = () => {
        console.log("Связаться с учениками");
        closeModal();
    };
	useEffect(() => {
		fetch(process.env.REACT_APP_BACK_API+'courses')
			.then(response => response.json())
			.then(data => setCourses(data.courses));
	}, []);

    const handleBlockStudent = () => {
        console.log("Заблокировать ученика");
        closeModal();
    };

    const handleAddCertificate = () => {
        console.log("Добавить сертификат");
        closeModal();
    };

    const handleSendMessage = () => {
        console.log("Написать создателю");
        closeModal();
    };

    const handleLeaveReview = () => {
        console.log("Оставить отзыв");
        closeModal();
    };

    const handleViewAchievements = () => {
        console.log("Посмотреть достижения/прогресс");
        closeModal();
    };

    const handleCompleteCourse = () => {
        console.log("Завершить курс");
        closeModal();
    };

    const handleFilterCourses = (type) => {
        setFilter(type); // Устанавливаем фильтр
    };

    const handleDownloadCourse = () => {
        console.log('donwload');
    };

    // Фильтрация курсов в зависимости от выбранного типа
    const filteredCourses = filter ? courses.filter(course => course.type === filter) : courses;

    return (
        <>
            {showEmployer ? (
                <div className="education-container">
                    <div className="education__card">
                        <div className="education-content">
                            <img className="education-icon" src={documentIcon} alt="Иконка документа" />
                            <h2 className="education-card__title">Загрузить курс</h2>
                            <div className="education-buttons">
                                <button
                                    className="create-course education__button button-submit auth__button"
                                    onClick={() => window.location.href = `/create-course/${localStorage.getItem('userId')}`}
                                >
                                    Создать курс
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="education__card">
                        <div className="education-content">
                            <img className="education-icon" src={documentIcon} alt="Иконка документа" />
                            <h2 className="education-card__title">Мои курсы</h2>
                            <div className="education-buttons">
                                <button className="open-courses education__button button-submit auth__button" onClick={() => window.location.href = `/my-courses/${localStorage.getItem('userId')}`}>Открыть</button>
                            </div>
                        </div>
                    </div>

                    <div className="education__card">
                        <div className="education-content">
                            <img className="education-icon" src={documentIcon} alt="Иконка документа" />
                            <h2 className="education-card__title">Сертификаты</h2>
                            <div className="education-buttons">
                                <button className="add-sertificate education__button button-submit auth__button" onClick={() => window.location.href = `/create-sertificate/${localStorage.getItem('userId')}`}>Добавить</button>
                                <button className="manage-sertificate education__button button-submit auth__button" onClick={() => window.location.href = `/my-sertificate/${localStorage.getItem('userId')}`}>Управлять</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="cards__inner">
                    <button className="education-button auth__button" onClick={() => handleFilterCourses('required')}>
                        Просмотр всех курсов обязательного обучения
                    </button>
                    <button className="education-button auth__button" onClick={() => handleFilterCourses('not-required')}>
                        Просмотр всех курсов дополнительного обучения
                    </button>
                    <button onClick={() => window.location.href = `/create-course/${localStorage.getItem('userId')}`} className="education-button auth__button">
                        Создать собственный курс
                    </button>
                    {filteredCourses.map(course => (
                        <div
                            key={course.id}
                            className="worker__card"
                            onClick={() => handleCardClick(course)}
                            data-id={course.id}
                        >
                            <div className="worker__card--image-container">
                                <img className="worker__card-image" src={workerIconCard} alt="Иконка курса" />
                            </div>
                            <div className="worker__card-content">
                                <h2 className="worker__card-title">{course.title}</h2>
                                <p className="worker__card-descr">{course.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{selectedCourse?.title}</h2>
                        <div className="modal-buttons-education">
                            {selectedCourse?.type !== 'my' && (
                                <>
                                    <button onClick={handleSendMessage} className="auth__button">Написать создателю</button>
                                    <button onClick={handleLeaveReview} className="auth__button">Оставить отзыв</button>
                                    <button onClick={handleViewAchievements} className="auth__button">Достижения/прогресс</button>
                                    <button onClick={handleCompleteCourse} className="auth__button">Завершить курс</button>
                                </>
                            )}
                            {selectedCourse?.type === 'my' && (
                                <>
                                    <button onClick={handleContactStudents} className="auth__button">Связаться с учениками</button>
                                    <button onClick={handleBlockStudent} className="auth__button">Заблокировать ученика</button>
                                    <button onClick={handleAddCertificate} className="auth__button">Добавить сертификат</button>
                                </>
                            )}
                        </div>
                        <button className="auth__button" onClick={handleDownloadCourse}>Скачать курс</button>
                        <button className="modal-close" onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Education;
