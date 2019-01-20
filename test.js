let l = [10,20,30];
let m = {a:1, b:2, c:3};

console.log(JSON.stringify(Object.keys(m).map((key, i) => {key: `${key} - ${m[key]+l[i]}`})));