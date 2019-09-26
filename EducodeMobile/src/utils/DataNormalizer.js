import _ from 'lodash';

export function normalizeData(data, classId, locale) {
  const classUnits = data.units;
  var curriculumArr = [];
  var currentProjectId = '';
  loopUnits: for (let i = 0; i < classUnits.length; i++) {
    if (classUnits[i].type == 's') {
      var completedModule = false;
      if ('userData' in classUnits[i]) {
        completedModule = classUnits[i].userData.complete;
      }
      var module = {
        id: classUnits[i]._id,
        name: classUnits[i].name,
        listName:
          locale === 'en-CA'
            ? _.get(classUnits[i].name, ['en-CA'])
            : _.get(classUnits[i].name, ['fr-CA']),
        completed: completedModule,
        type: classUnits[i].type,
        exerciseData: [],
        trialMode: classUnits[i].trialMode,
        locked: false,
        videoFile: classUnits[i].videoFile,
        videoSubtitles: classUnits[i].videoSubtitles,
        classId,
      };
      curriculumArr.push(module);
      continue;
    }
    if (classUnits[i].type == 'p') {
      currentProjectId = classUnits[i]._id;
      var project = {
        id: classUnits[i]._id,
        name: classUnits[i].name,
        listName:
          locale === 'en-CA'
            ? _.get(classUnits[i].name, ['en-CA'])
            : _.get(classUnits[i].name, ['fr-CA']),
        completed: false,
        partial: false,
        type: classUnits[i].type,
        exerciseData: [],
        locked: false,
        trialMode: classUnits[i].trialMode,
        classId,
      };
      curriculumArr.push(project);
      continue;
    }
    if (classUnits[i].type == 'e') {
      for (let k = 0; k < curriculumArr.length; k++) {
        if (curriculumArr[k].id == currentProjectId) {
          var completedExercise = false;
          if ('userData' in classUnits[i]) {
            completedExercise = classUnits[i].userData.complete;
          }
          var exercise = {
            id: classUnits[i]._id,
            name: classUnits[i].name,
            listName:
              locale === 'en-CA'
                ? _.get(classUnits[i].name, ['en-CA'])
                : _.get(classUnits[i].name, ['fr-CA']),
            completed: completedExercise,
            category: classUnits[i].category,
            trialMode: classUnits[i].trialMode,
            locked: false,
            solution: classUnits[i].solution,
            videoFile: classUnits[i].videoFile,
            videoSubtitles: classUnits[i].videoSubtitles,
            classId,
          };
          curriculumArr[k].exerciseData.push(exercise);
        }
      }
      continue;
    }
    if (classUnits[i].type == 'q') {
      var completedQuiz = false;
      if ('userData' in classUnits[i]) {
        completedQuiz = classUnits[i].userData.complete;
      }
      var project = {
        id: classUnits[i]._id,
        name: classUnits[i].name,
        listName:
          locale === 'en-CA'
            ? _.get(classUnits[i].name, ['en-CA'])
            : _.get(classUnits[i].name, ['fr-CA']),
        type: classUnits[i].type,
        completed: completedQuiz,
        locked: false,
        exerciseData: [],
        trialMode: classUnits[i].trialMode,
        classId,
      };
      curriculumArr.push(project);
      continue;
    }
  }

  curriculumData: for (let j = 0; j < curriculumArr.length; j++) {
    if (curriculumArr[j].type != 'p') {
      continue;
    }
    var counter = 0;
    loopExercise: for (
      let k = 0;
      k < curriculumArr[j].exerciseData.length;
      k++
    ) {
      if (curriculumArr[j].exerciseData[k].completed == true) {
        counter++;
      }
    }
    if (counter == curriculumArr[j].exerciseData.length) {
      curriculumArr[j].completed = true;
    } else if (counter != 0) {
      curriculumArr[j].partial = true;
    }
  }

  loopCurriculumData: for (let j = 0; j < curriculumArr.length; j++) {
    if (j - 1 < 0) {
      //curriculumArr[j].completed = true;
      continue;
    }
    if (!curriculumArr[j - 1].completed) curriculumArr[j].locked = true;
    if (curriculumArr[j].type == 'p') {
      loopExercise: for (
        let k = 0;
        k < curriculumArr[j].exerciseData.length;
        k++
      ) {
        if (curriculumArr[j].locked === true) {
          curriculumArr[j].exerciseData[k].locked = true;
          continue;
        }
        if (k - 1 < 0) continue;
        if (!curriculumArr[j].exerciseData[k - 1].completed)
          curriculumArr[j].exerciseData[k].locked = true;
      }
    }
  }

  return curriculumArr;
}
