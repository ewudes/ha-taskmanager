// import dayjs from "dayjs";
// import {COLORS} from "../const.js";
// import {getRandomInteger} from "../utils/common.js";

// // Date.now() и Math.random() - плохие решения для генерации id
// // в "продуктовом" коде, а для моков самое то.
// // Для "продуктового" кода используйте что-то понадежнее,
// // вроде nanoid - https://github.com/ai/nanoid
// export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

// const generateDescription = () => {
//   const descriptions = [
//     `Изучить теорию`,
//     `Сделать домашку`,
//     `Пройти интенсив на соточку`
//   ];

//   const randomIndex = getRandomInteger(0, descriptions.length - 1);

//   return descriptions[randomIndex];
// };

// const generateDate = () => {
//   // Когда в руках молоток, любая проблема - гвоздь.
//   // Вот и для генерации случайного булевого значения
//   // можно использовать "функцию из интернета".
//   // Ноль - ложь, один - истина. Для верности приводим
//   // к булевому типу с помощью Boolean
//   const isDate = Boolean(getRandomInteger(0, 1));

//   if (!isDate) {
//     return null;
//   }

//   const maxDaysGap = 7;
//   const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

//   return dayjs().add(daysGap, `day`).toDate();
// };

// const generateRepeating = () => {
//   return {
//     mo: false,
//     tu: false,
//     we: Boolean(getRandomInteger(0, 1)),
//     th: false,
//     fr: Boolean(getRandomInteger(0, 1)),
//     sa: false,
//     su: false
//   };
// };

// const getRandomColor = () => {
//   const randomIndex = getRandomInteger(0, COLORS.length - 1);

//   return COLORS[randomIndex];
// };

// export const generateTask = () => {
//   const dueDate = generateDate();
//   const repeating = dueDate === null
//     ? generateRepeating()
//     : {
//       mo: false,
//       tu: false,
//       we: false,
//       th: false,
//       fr: false,
//       sa: false,
//       su: false
//     };

//   return {
//     id: generateId(),
//     description: generateDescription(),
//     dueDate,
//     repeating,
//     color: getRandomColor(),
//     isArchive: Boolean(getRandomInteger(0, 1)),
//     isFavorite: Boolean(getRandomInteger(0, 1))
//   };
// };
