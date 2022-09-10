import { useEffect, useState } from "react";
// typescript的好处 所有的判断类型的行为 都是在开发阶段 通过static code analysis 实现 避免runtime时发现
// unknown is the parent type of all other types. it's a regular type in the type system.

// any means "turn off the type check". it's a compiler directive and kind of meta programming.
export const isEmptyExceptZero = (value: unknown) => (value === 0 ? false : !value);
//!!get bool value
// object is not dict, 并且 在一个函数里 改变传入对象是不好的
export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    // @ts-ignore
    const value = object[key];
    if (isEmptyExceptZero(value)) {
      // 排除value为空的情况 (value为0除外) 删掉kv
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

// custom hook on top of useEffect: call callback when ComponentDidMount
// eslint regard prefix use as hook function
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
// useEffect when deps empty: call callback when comp mount & comp update
// deps not empty: call callback when state changed

// const debounce = (func, delay) => {
//   let timeout;
//   return () => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(() => {
//       func();
//     }, delay);
//   };
// };
// // 如何做到 十几次键盘敲击后只在用户暂时不再输入情况下后进行1次请求 这可以通过debounce函数实现
// // 无论中间连续敲击了多少次 100次 也会一直等待固定的超时 每一次debounce函数进入会因为闭包保留之前的变量状态 并取消掉之前超时 重新设置
// const log = debounce(() => console.log("call"), 5000);
// log();
// log();
// log();
// // debounce原理 闭包的神奇之处
// // 0s-------->1s----->2s------->...------>6s
// //  log() #1 timeout#1 0.1秒后
// //  log() #2 发现timeout#1 取消之 设置timeout#2
// //  log() #3 发现timeout#2 取消之 设置timeout#3
// //                                 timeout#3到达 执行callback中 console.log('call')

//当value  (param)发生改变时 触发use effect callback
//    这是一个有参箭头函数 也是闭包 用到了外层scope 变量 value, delay
// 首先设置一个timer 超过delay触发setDebouncedValue更新debouncedValue state
// 为最外层scope传入的新param
// component unmount时(用户离开页面) 或上层传入value/delay发生变化
// 或前一个useEffect执行完时 会执行return的cleanup function
// 这时候会取消掉超时
// 成功通过超时callback更新了debounceValue 最后会返回最新的debounced value状态值
// 这个hook执行完毕
// 如果一直有输入 则会一直更新外层param和这里的value 会不断设置timeout cancel timeout
// 直到用户暂时不再输入 则设置debouncedValue state并返回
// delay?: number 要么不传 要传就传number => number | undefined
// ?? nullish coalescing operators
// let random;  // if lefthandside is null or undefined then use righthand side default value
// const color = random ?? 'red';
// <V> 泛型占位符 这里声明的泛型变量 将于函数中出现的泛型对应
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // call callback after delay: set debouncedValue = value
    const timeoutID = setTimeout(() => setDebouncedValue(value), delay);
    // cancel the timeout if value/delay changes / unmount
    // this is how we prevent debounced value from updating within the delay period
    return () => clearTimeout(timeoutID);
  }, [value, delay]);
  return debouncedValue; // user input
};
// a custom hook for managing array content 
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
