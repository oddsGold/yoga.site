import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Dashboard/Home.jsx';
import NotFound from '../pages/OtherPage/NotFound.jsx';
import UserProfiles from '../pages/Profile/UserProfiles.jsx';
import UserPage from '../pages/UserPage/UserPage.jsx';
import CreateUserPage from '../pages/UserPage/CreateUserPage.jsx';
import EditUserPage from '../pages/UserPage/EditUserPage.jsx';
import ImagePage from '../pages/DownloadPage/ImagePage.jsx';
import FaqPage from '../pages/FaqPage/FaqPage.jsx';
import CreateFaqPage from '../pages/FaqPage/CreateFaqPage.jsx';
import EditFaqPage from '../pages/FaqPage/EditFaqPage.jsx';
import AuthorPage from '../pages/AuthorPage/AuthorPage.jsx';
import CreateAuthorPage from '../pages/AuthorPage/CreateAuthorPage.jsx';
import EditAuthorPage from '../pages/AuthorPage/EditAuthorPage.jsx';
import RolePage from '../pages/RolePage/RolePage.jsx';
import CreateRolePage from '../pages/RolePage/CreateRolePage.jsx';
import EditRolePage from '../pages/RolePage/EditRolePage.jsx';
import FilePage from '../pages/DownloadPage/FilePage.jsx';
import FormPage from '../pages/FormPages/FormPage.jsx';
import SocialPage from '../pages/SocialPages/SocialPage.jsx';
import EditSocialPage from '../pages/SocialPages/EditSocialPage.jsx';
import ProgramPage from '../pages/ProgramPages/ProgramPage.jsx';
import CreateProgramPage from '../pages/ProgramPages/CreateProgramPage.jsx';
import EditProgramPage from '../pages/ProgramPages/EditProgramPage.jsx';
import WorthPage from '../pages/WorthPages/WorthPage.jsx';
import EditWorthPage from '../pages/WorthPages/EditWorthPage.jsx';
import CreateWorthPage from '../pages/WorthPages/CreateWorthPage.jsx';
import GetPage from '../pages/GetPages/GetPage.jsx';
import EditGetPage from '../pages/GetPages/EditGetPage.jsx';
import CreateGetPage from '../pages/GetPages/CreateGetPage.jsx';
import LearningPage from '../pages/LearningPages/LearningPage.jsx';
import CreateLearningPage from '../pages/LearningPages/CreateLearningPage.jsx';
import EditLearningPage from '../pages/LearningPages/EditLearningPage.jsx';
import MainPage from '../pages/MainPages/MainPage.jsx';
import CreateMainPage from '../pages/MainPages/CreateMainPage.jsx';
import EditMainPage from '../pages/MainPages/EditMainPage.jsx';
import BonusPage from '../pages/BonusPages/BonusPage.jsx';
import CreateBonusPage from '../pages/BonusPages/CreateBonusPage.jsx';
import EditBonusPage from '../pages/BonusPages/EditBonusPage.jsx';

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/dashboard" element={<Home />} />

            <Route path="/admin/profile" element={<UserProfiles />} />

            <Route path="/admin/users" exact element={<UserPage />} />
            <Route path="/admin/users/:id/edit" element={<EditUserPage />} />
            <Route path="/admin/users/create" element={<CreateUserPage />} />

            <Route path="/admin/roles" exact element={<RolePage />} />
            <Route path="/admin/roles/:id/edit" element={<EditRolePage />} />
            <Route path="/admin/roles/create" element={<CreateRolePage />} />


            <Route path="/admin/faqs" exact element={<FaqPage />} />
            <Route path="/admin/faqs/:id/edit" element={<EditFaqPage />} />
            <Route path="/admin/faqs/create" element={<CreateFaqPage />} />

            <Route path="/admin/images" exact element={<ImagePage />} />
            <Route path="/admin/files" exact element={<FilePage />} />

            <Route path="/admin/learning" exact element={<LearningPage />} />
            <Route path="/admin/learning/:id/edit" element={<EditLearningPage />} />
            <Route path="/admin/learning/create" element={<CreateLearningPage />} />

            <Route path="/admin/author" exact element={<AuthorPage />} />
            <Route path="/admin/author/:id/edit" element={<EditAuthorPage />} />
            <Route path="/admin/author/create" element={<CreateAuthorPage />} />

            <Route path="/admin/social" exact element={<SocialPage />} />
            <Route path="/admin/social/:id/edit" element={<EditSocialPage />} />

            <Route path="/admin/program" exact element={<ProgramPage />} />
            <Route path="/admin/program/:id/edit" element={<EditProgramPage />} />
            <Route path="/admin/program/create" element={<CreateProgramPage />} />

            <Route path="/admin/bonus" exact element={<BonusPage />} />
            <Route path="/admin/bonus/:id/edit" element={<EditBonusPage />} />
            <Route path="/admin/bonus/create" element={<CreateBonusPage />} />

            <Route path="/admin/main" exact element={<MainPage />} />
            <Route path="/admin/main/:id/edit" element={<EditMainPage />} />
            <Route path="/admin/main/create" element={<CreateMainPage />} />

            <Route path="/admin/worth" exact element={<WorthPage />} />
            <Route path="/admin/worth/:id/edit" element={<EditWorthPage />} />
            <Route path="/admin/worth/create" element={<CreateWorthPage />} />

            <Route path="/admin/get" exact element={<GetPage />} />
            <Route path="/admin/get/:id/edit" element={<EditGetPage />} />
            <Route path="/admin/get/create" element={<CreateGetPage />} />

            <Route path="/admin/form/presentation" exact element={<FormPage />} />

            <Route path="/admin/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/admin/404" />} />
        </Routes>
    );
};

export default PrivateRoutes;
