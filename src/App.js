import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header/Header';
import MainTitleSection from './components/MainTitleSection/MainTitleSection';
import AuthForm from './components/AuthForm/AuthForm';
import RegisterChoice from './components/RegisterForm/RegisterChoice';
import PasswordResetForm from './components/PasswordResetForm/PasswordResetForm';
import RegisterFormEmployee from './components/RegisterForm/RegisterFormEmployee';
import RegisterFormWorker from './components/RegisterForm/RegisterFormWorker';
import ChoiceWorker from './components/Employee/ChoiceWorker';
import ManageWorker from './components/Employee/ManageWorker';
import Wallet from './components/wallet/Wallet';
import Profile from './components/Profle/Profile';
import MyWork from './components/Worker/MyWork';
import Education from './components/Education/Education';
import CreateCourse from './components/Employee/CreateCourse/CreateCourse';
import CreateSertificate from './components/Employee/CreateSertificate/CreateSertificate';
import MyCourses from './components/Employee/MyCourses/MyCourses';
import MySertificate from './components/Employee/MySertificate/MySertificate';
import WorkerRole from './components/workerRole/workerRole';
import Achieve from './components/Worker/Achieve/Achieve';
import ChoiceEmployee from './components/Worker/ChoiceEmployee';
import InviteCourse from './components/Employee/MyCourses/InviteCourse';

const App = () => {
  const location = useLocation();
  const { id } = useParams();
  const {courseId} = useParams();

  const courses = [
    { id: 1, title: "Курс 1", description: "Описание курса 1" },
    { id: 2, title: "Курс 2", description: "Описание курса 2" },
    // Добавьте остальные курсы здесь
  ];

  return (
    <>
      <header className="header">
        <div className="fixed-container">
          <AnimatedZoomIn>
            <Header />
          </AnimatedZoomIn>
          <AnimatedZoomIn>
            <Title />
          </AnimatedZoomIn>
        </div>
      </header>
      <main className="main">
        <div className="fixed-container">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route 
                path="/" 
                element={<AnimatedZoomIn><RegisterChoice /></AnimatedZoomIn>} 
              />
              <Route 
                path="/auth-worker" 
                element={<AnimatedZoomIn><AuthForm /></AnimatedZoomIn>} 
              />
              <Route 
                path="/auth-employee" 
                element={<AnimatedZoomIn><AuthForm /></AnimatedZoomIn>} 
              />
              <Route 
                path="/reset-password" 
                element={<AnimatedZoomIn><PasswordResetForm /></AnimatedZoomIn>} 
              />
              <Route 
                path="/register-employee" 
                element={<AnimatedZoomIn><RegisterFormEmployee /></AnimatedZoomIn>} 
              />
              <Route 
                path="/register-worker" 
                element={<AnimatedZoomIn><RegisterFormWorker /></AnimatedZoomIn>} 
              />
              <Route 
                path="/profile/:id"
                element={<AnimatedZoomIn><Profile /></AnimatedZoomIn>} // Страница для работника
              />
              <Route 
                path="/company-profile/:id"
                element={<AnimatedZoomIn><Profile /></AnimatedZoomIn>} // Страница для работодателя
              />
              <Route 
                path="wallet/:id"
                element={<AnimatedZoomIn><Wallet /></AnimatedZoomIn>} // Страница кошелька для работника
              />
              <Route 
                path="choice-worker/:id"
                element={<AnimatedZoomIn><ChoiceWorker /></AnimatedZoomIn>} // Страница кошелька для работодателя
              />
              <Route 
                path="manage-worker/:id"
                element={<AnimatedZoomIn><ManageWorker /></AnimatedZoomIn>} // Страница кошелька для работодателя
              />
              <Route 
                path="my-work/:id"
                element={<AnimatedZoomIn><MyWork /></AnimatedZoomIn>} // Страница кошелька для работодателя
              />
              <Route 
                path="education/:id"
                element={<AnimatedZoomIn><Education /></AnimatedZoomIn>} // Страница кошелька для работодателя
              />
              <Route 
                path="create-course/:id"
                element={<AnimatedZoomIn><CreateCourse /></AnimatedZoomIn>} // Страница кошелька для работодателя
              />
              <Route 
                path="create-sertificate/:id"
                element={<AnimatedZoomIn><CreateSertificate /></AnimatedZoomIn>} // Страница кошелька для работодателя
              />
              <Route 
                path="my-courses/:id"
                element={<AnimatedZoomIn><MyCourses /></AnimatedZoomIn>} // Страница кошелька для работодателя
              />
              <Route 
                path="my-sertificate/:id"
                element={<AnimatedZoomIn><MySertificate /></AnimatedZoomIn>} // Страница кошелька для работодателя
              />
              <Route 
                path="worker-role/:id"
                element={<AnimatedZoomIn><WorkerRole /></AnimatedZoomIn>} // Страница кошелька для работодателя
              />
              <Route 
                path="achieve/:id"
                element={<AnimatedZoomIn><Achieve /></AnimatedZoomIn>} // Страница кошелька для работодателя
              />
              <Route 
                path="choice-employer/:id"
                element={<AnimatedZoomIn><ChoiceEmployee /></AnimatedZoomIn>} // Страница кошелька для работодателя
              />
              <Route 
                path="invite/course/:courseid"
                element={<AnimatedZoomIn><InviteCourse courses={courses}/></AnimatedZoomIn>} // Страница кошелька для работодателя
              />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};

const Title = () => {
  const location = useLocation();
  const { id } = useParams(); // Получаем id из параметров URL
  let title;

  switch (location.pathname) {
    case `/auth-employee`:
    case `/auth-worker`:
      title = 'Авторизация';
      break;
    case `/`:
      title = 'Выбор роли';
      break;
    case `/reset-password`:
      title = 'Сброс пароля';
      break;
    case `/register-employee`:
      title = 'Регистрация работодателя';
      break;
    case `/register-worker`:
      title = 'Регистрация сотрудника';
      break;
    default:
      title = 'Извините, такой страницы не существует :(';
  }

  if (location.pathname.startsWith('/choice-worker')) {
    title = 'Подбор персонала';
  }
  if (location.pathname.startsWith('/manage-worker')) {
    title = 'Управление сотрудниками';
  }
  if (location.pathname.startsWith('/wallet')) {
    title = 'Кошелёк';
  }
  if (location.pathname.startsWith('/profile/') || location.pathname.startsWith('/company-profile/')) {
    title = 'Мой профиль';
  }
  if (location.pathname.startsWith('/my-work')) {
    title = 'Моя работа';
  }
  if (location.pathname.startsWith('/education/')) {
    title = 'Обучение';
  }
  if (location.pathname.startsWith('/create-course/')) {
    title = 'Создание курса';
  }
  if (location.pathname.startsWith('/create-sertificate/')){
    title = 'Создание сертификата';
  }
  if (location.pathname.startsWith('/my-courses/')){
    title = 'Мои курсы';
  }
  if (location.pathname.startsWith('/my-sertificate/')){
    title = 'Выданные сертификаты';
  }
  if (location.pathname.startsWith('/worker-role')){
    title = 'Должность';
  }
  if (location.pathname.startsWith('/achieve')){
    title = 'Достижения';
  }
  if (location.pathname.startsWith('/choice-employer/')){
    title = 'Компании партнеры';
  }
  if (location.pathname.startsWith('/invite/course/')){
    title = 'Приглашение на курс';
  }

  return <MainTitleSection title={title} />;
};

const AnimatedZoomIn = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
    transition={{ 
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }} 
  >
    {children}
  </motion.div>
);

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
