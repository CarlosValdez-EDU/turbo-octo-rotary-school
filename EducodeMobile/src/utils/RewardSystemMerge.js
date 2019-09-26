import { achievements } from '@constants/Achievements';
import { eventData } from '@constants/EventData';
import _ from 'lodash'

export function mergeAchievementsProgress(achievementsProgress){

  achievements.forEach(item => {
    item.progress = 0;
  });

  loopProgress: for (let i = 0; i < achievementsProgress.length; i++) {
    loopAchievements: for (let j = 0; j < achievements.length; j++) {
      if (achievements[j]._id == achievementsProgress[i].taskId) {
        achievements[j].progress = achievementsProgress[i].userCheckListData.progress;
        break loopAchievements;
      }
    }
  }

  return achievements;
}

export function mergeEventProgress(eventProgress){

  eventData.tasks.forEach(item => {
    item.progress = 0;
  });
  
  loopProgress: for (let i = 0; i < eventProgress.length; i++) {
    loopEvent: for (let j = 0; j < eventData.tasks.length; j++) {
      if (eventData.tasks[j].name == eventProgress[i].taskId) {
        eventData.tasks[j].progress = eventProgress[i].userCheckListData.progress;
        break loopEvent;
      }
    }
  }

  return eventData;
}