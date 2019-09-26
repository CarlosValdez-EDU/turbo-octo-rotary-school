import _ from 'lodash';
import classes from './spu_classes.json';

export default isSpuClass = (classId) => {
    let spuClass = _.find(_.get(classes, ['publicClasses']), spuClass => {
        return spuClass === classId;
    });

    if (spuClass) {
        return true;
    } else {
        return false;
    }
}