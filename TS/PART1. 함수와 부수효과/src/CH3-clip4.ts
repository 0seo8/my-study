//3. setTimeout
const delay = (time: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), time));
const logEl = document.querySelector("#log") as HTMLElement;
const insertMsg = (order: string) =>
  (logEl.innerHTML += `${order}가 완료되었습니다<br />`);

//2. 이벤트 핸들러의 콜백함수 외부로 따로
async function buttonClickHandler(orderList: string[]) {
  const delayTime = 2000;
  await delay(delayTime);
  orderList.forEach(insertMsg);
}

function orderCoffee(el: any, orderList: any): void {
  //1. if문이 중첩으로 되어 있으니 &&로 합치고 !연산자를 이용해 if내 코드와 분리
  if (!el && !Array.isArray(buttonClickHandler(orderList))) return;
  el.addEventListener("click");
}

orderCoffee(document.querySelector("button"), ["americano", "cafeLatte"]);
