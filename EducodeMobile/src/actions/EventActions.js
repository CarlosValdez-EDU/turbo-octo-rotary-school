import _ from 'lodash';
import {
  SET_EVENT_DATA,
  EVENT_LOADING,
  SET_EVENT_REWARD
} from '@constants/Types';
import Socket from '@data/remote/socket_client/Socket';
import { mergeEventProgress } from '@utils/RewardSystemMerge';
import { eventData } from '@constants/EventData';

export const getEventData = () => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: EVENT_LOADING
        });

        let data = {
          parentId: eventData._id
        };

        let eventProgress = await dispatch(sendCommand('getUserChecklist', data));
        let finalData = mergeEventProgress(eventProgress);

        dispatch({
          type: SET_EVENT_DATA,
          payload: finalData
        });
      } catch (error) {
        console.log(error);
      } finally {
        resolve();
      }
    });
  }
};

export const getEventReward = (eventId) => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = {
          parentId: 'event-1'
        }
        let userRewards = await dispatch(sendCommand('getUserRewards', data));
        dispatch({
          type: SET_EVENT_REWARD,
          payload: userRewards
        });
      } catch (error) {
        debugger
        console.log(error);
      } finally {
        resolve();
      }
    });
  }
};

export const updateEvent = (taskId) => {
  return (dispatch, getState, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = {
          parentId: eventData._id,
          taskId: taskId 
        };

        await dispatch(sendCommand('updateChecklistItem', data));
      } catch (error) {
        console.log(error);
      } finally {
        resolve();
      }
    });
  }
};

export const setRewardReedemed = (parentId) => {
  return (dispatch, getStatem, { sendCommand }) => {
    return new Promise(async (resolve, reject) => {
      try {
        data = {
          parentId: parentId
        }
        await dispatch(sendCommand('setRewardRedeemed', data));
      } catch(error) {
        console.log(error);
      } finally {
        resolve();
      }
    })
  }
}