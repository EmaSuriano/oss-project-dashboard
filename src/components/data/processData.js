import { sample1 } from './sample1';
import { sample2 } from './sample2';
import { sample3 } from './sample3';
import { sample4 } from './sample4';

const values1 = [];
sample1.map(point =>
  values1.push({ value: [point.time, point.moving_average] }),
);

let values = [values1];
const values2 = [];
sample2.map(point =>
  values2.push({ value: [point.time, point.moving_average] }),
);

const values3 = [];
sample3.map(point =>
  values3.push({ value: [point.time, point.moving_average] }),
);

const values4 = [];
sample4.map(point =>
  values4.push({ value: [point.time, point.moving_average] }),
);

values = [values1, values2, values3, values4];

// Quick shuffling example for binding bounds with refresh behavior
const shuffle = array => {
  const shuffleArray = array;
  const temp = array[2];
  // eslint-disable-next-line prefer-destructuring
  shuffleArray[2] = array[3];
  shuffleArray[3] = temp;
  return shuffleArray;
};

export const processData = isShuffle => (isShuffle ? shuffle(values) : values);
