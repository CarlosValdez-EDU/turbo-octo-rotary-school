import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import SignupReducer from './SignupReducer';
import AppReducer from './AppReducer';
import ProfileReducer from './ProfileReducer';
import DashboardReducer from './DashboardReducer';
import { reducer as i18n } from '@components/common/Loc';
import CurriculumInfoReducer from './CurriculumInfoReducer';
import SupportReducer from './SupportReducer';
import CourseReducer from './CourseReducer';
import AchievementsReducer from './AchievementsReducer';
import EventReducer from './EventReducer';
import AvailableCurriculumsReducer from './AvaliableCurriculumReducer';
import SubscriptionReducer from './SubscriptionReducer';
import MoreInfoReducer from './MoreInfoReducer';
import CertificateReducer from './CertificateReducer';

export default combineReducers({
    app: AppReducer,
    i18n: i18n,
    login: LoginReducer,
    signup: SignupReducer,
    profile: ProfileReducer,
    dashboard: DashboardReducer,
    curriculumInfo: CurriculumInfoReducer,
    support: SupportReducer,
    course: CourseReducer,
    achievements: AchievementsReducer,
    availableCurriculums: AvailableCurriculumsReducer,
    event: EventReducer,
    subscription: SubscriptionReducer,
    moreInfo: MoreInfoReducer,
    certificate: CertificateReducer
});