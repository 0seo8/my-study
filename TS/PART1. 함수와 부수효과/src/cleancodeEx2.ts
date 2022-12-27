const grades = [80.55, 90, -95, -45, 44.3, 100, 177];

/**
 * 1. 0~100
 * 2. 소수점 제거
 * 3. '점' 문자 추가
 * 출력
 */


//좋지 않은 코드
const validGrades: number[] = []
for (let i =0; i<grades.length; i++) {
  if(grades[i]>=0; grades[i]<=100) {
    const validGrades = Math.floor(grades[i]) + "점"
    validGrades.push(validGrades)
  }
}

for(let index=0; index<validGrades.length; index++) {
  console.log(validGrades[index])
}


/**좋은코드 */


const validScore = (el : number)=> el > 0 && el<=100
const toInteger = (el:number)=> Math.floor(el)
const plusgSuffix = (el:number)=> el+"점"
const printArr = (el:string) => console.log(el)

grades
  .filter(validScore)
  .map(toInteger)
  .map(plusgSuffix)
  .forEach(printArr)