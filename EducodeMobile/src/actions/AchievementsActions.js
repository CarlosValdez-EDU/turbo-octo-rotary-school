import {
  SET_ACHIEVEMENT_LIST,
  ACHIEVEMENTS_LOADING
} from '@constants/Types';
import { mergeAchievementsProgress } from '@utils/RewardSystemMerge';

export const getAchievementsList = (userId, showLoader = true) => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (showLoader == true) {
          dispatch({
            type: ACHIEVEMENTS_LOADING,
            payload: true
          });
        }

        let data = {
          parentId: 'achievements'
        };
        let achievementsProgress = await dispatch(sendCommand('getUserChecklist', data));
        let finalData = mergeAchievementsProgress(achievementsProgress);
  
        dispatch({
          type: SET_ACHIEVEMENT_LIST,
          payload: {achievements: finalData, loading: false}
        });
      } catch (error) {
        console.log(error);
      } finally {
        resolve();
      }
    });
  }
};
