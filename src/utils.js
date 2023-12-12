// 度数对应的简谱表示
export const noteMap = {
  1: ["#7", "1"], // C
  1.5: ["#1", "b2"], // #C
  2: ["2"], // D
  2.5: ["#2", "b3"], // #D
  3: ["3", "b4"], // E
  3.5: ["4", "#3"], // F
  4: ["#4", "b5"], // #F
  4.5: ["5"], // G
  5: ["#5", "b6"], // #G
  5.5: ["6"], // A
  6: ["#6", "b7"], // #A
  6.5: ["7", "b1"] // B
};

/**
 * 获取音程名称对应的度数
 * @param {String} name 名称
 * @returns {Number} 音程对应的度数
 * @example
 *   getDegreeByName("小二") // 0.5
 *   getDegreeByName("大二") // 1
 */
export function getDegreeByName(name) {
  return degreeList.reduce((acc, cur) => {
    const find = cur.data.find((item) => item.label === name);
    if (find) {
      acc = find.value;
    }
    return acc;
  }, 0);
}

/**
 * 获取度数对应的名称
 * @param {Number} degree 度数
 * @returns {String} 音程对应的名称
 * @example
 *   getNameByDegree([0.5]) // 小二
 *   getNameByDegree(1) // 大二
 */
export function getNameByDegree(degree) {
  return degreeList.reduce((acc, cur) => {
    const find = cur.data.find((item) => item.value === degree);
    if (find) {
      acc = find.label;
    }
    return acc;
  }, "");
}

/**
 * 获取度数对应的简谱标记
 * @param {Number} degree 度数
 * @returns {String[]} 简谱标记
 * @example
 *   getNoteName(1) // ["1"]
 *   getNoteName(10) // ["#4", "b5"]
 */
export function getNoteName(degree) {
  return degree > 6.5 ? getNoteName(degree - 6) : noteMap[degree];
}

/**
 * 计算两个音的度数
 * @param {String} note1 根音
 * @param {String} note2 冠音
 * @returns {Number} 音程度数
 * @example
 *   caculateNoteDistance("1", "2") // 1
 *   caculateNoteDistance("1", "b3") // 3
 */
export function caculateNoteDistance(note1, note2) {
  const low = Number(note1.split("").pop());
  const high = Number(note2.split("").pop()) + 1;
  return high - low < 0 ? high + 7 - low : high - low;
}

/**
 * 获取音程应该包含的音数距离
 * @param {String} name 音程
 * @returns {Number} 距离
 * @example
 *   getDistanceByName("大三") // 3
 *   getDistanceByName("增四") // 4
 */
export function getDistanceByName(name) {
  return degreeList.reduce((acc, cur) => {
    const find = cur.data.find((item) => item.label === name);
    if (find) {
      acc = find.distance;
    }
    return acc;
  }, 0);
}

const symbols = ["1", "2", "3", "4", "5", "6", "7"];

/**
 * 根据音程和根音计算冠音
 * @param {String} root 根音
 * @param {String} n 音程
 * @returns {String} 冠音
 * @example
 *   getCoronation("1", "大三") // 3
 *   getCoronation("1", "增四") // 4
 */
export function getCoronation(root, n) {
  const note = root.split("").pop();
  const noteIndex = symbols.indexOf(note);
  return noteIndex + n > 7 ? symbols[noteIndex + n - 7 - 1] : symbols[noteIndex + n - 1];
}

/**
 * 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns {Number} 随机数
 * @example
 *   random(1, 10) // 2
 */
export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 音程度数列表
export const degreeList = [
  {
    name: "二度",
    data: [
      {
        label: "小二",
        distance: 2,
        value: 0.5
      },
      {
        label: "大二",
        distance: 2,
        value: 1
      }
    ]
  },
  {
    name: "三度",
    data: [
      {
        label: "小三",
        distance: 3,
        value: 1.5
      },
      {
        label: "大三",
        distance: 3,
        value: 2
      }
    ]
  },
  {
    name: "四度",
    data: [
      {
        label: "纯四",
        distance: 4,
        value: 2.5
      },
      {
        label: "增四",
        distance: 4,
        value: 3
      }
    ]
  },
  {
    name: "五度",
    data: [
      {
        label: "减五",
        distance: 5,
        value: 3
      },
      {
        label: "纯五",
        distance: 5,
        value: 3.5
      }
    ]
  },
  {
    name: "六度",
    data: [
      {
        label: "小六",
        distance: 6,
        value: 4
      },
      {
        label: "大六",
        distance: 6,
        value: 4.5
      }
    ]
  },
  {
    name: "七度",
    data: [
      {
        label: "小七",
        distance: 7,
        value: 5
      },
      {
        label: "大七",
        distance: 7,
        value: 5.5
      }
    ]
  }
];

// /**
//  * 和弦
//  */
// const chordList = [
//   {
//     name: "大三和弦",
//     data: [
//       {
//         label: "大三和弦",
//         useDegreeName: ["大三", "小三"]
//       },
//       {
//         label: "大六和弦",
//         useDegreeName: ["小三", "纯四"]
//       },
//       {
//         label: "大四六和弦",
//         useDegreeName: ["纯四", "大三"]
//       }
//     ]
//   }
// ];

// chordList.forEach((item) => {
//   item.data.forEach((chord) => {
//     chord.value = [];
//     chord.distance = [];
//     chord.useDegreeName.forEach((note) => {
//       chord.value.push(getDegreeByName(note));
//       chord.distance.push(getDistanceByName(note));
//     });
//   });
//   degreeList.push({
//     name: item.name,
//     data: item.data
//   });
// });
// console.log(degreeList);
