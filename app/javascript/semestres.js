// @flow

const maxSemestres = 4;

const normalize = (date: Date) => {
  return new Date(date.getFullYear(), ~~(date.getMonth()/6), 1);
};

const subtract6Months = (date: Date) => {
  let copy = new Date(date.getTime());
  copy.setMonth(copy.getMonth() - 6);
  return copy;
}

let currentSemestre = normalize(new Date());

let semestres = [];

for (let i = 0; i < maxSemestres; i++) {
  semestres.push(currentSemestre);
  currentSemestre = subtract6Months(currentSemestre);
}

export default semestres;