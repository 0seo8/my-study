# 함수형 프로그래밍

함수의 재활용성을 높이고 합성을 쉽게 하기 위해서는 가능한 한가지 의미 있는 작업을 하는 최소한의 의미를 가지는 순수 함수들을 만들고,이 함수들을 마치 레고블록처럼 조합(합성)해서 더 큰 프로그래밍을 만들어나가야 합니다.

고차 함수를 이용한 추상화
부수효과가 포함된 for루프의 명령형 방식을 map, filter, reduce와 같은 고차함수로 사용해 선언적 방식으로 코드로 리팩토링 해도록 하겠습니다.

기존함수
const totalCount = (list: Array<Item>): string => {
let totalCount = 0;
for (let i = 0; i < list.length; i++) {
if (list[i].outOfStock === false) {
totalCount += list[i].quantity;
}
}

return `<h2>전체 수량: ${totalCount} 상자</h2>`;
};

const totalPrice = (list: Array<Item>): string => {
let totalPrice = 0;
for (let i = 0; i < list.length; i++) {
if (list[i].outOfStock === false) {
totalPrice += list[i].price \* list[i].quantity;
}
}

return `<h2>전체 가격: ${totalPrice} 원</h2>`;
};
위의 totalCount함수와 totalPrice함수의 경우 같은 부분과 다른 부분이 있습니다. if문 계산과 화면의 그리는 부분은 서로 다른 반면, for문 안의 로직은 완벽하게 일치합니다.

1. 리팩토링(추상화)
   이런 부분은 고차함수를 이용해 쉽게 추상화 할 수 있습니다.

//전체수량을 구하는 부분을 함수로 만들어 두번째 매개변수로 넣어줌
const totalCalculator = (
list: Array<Item>,
getValue: (item: Item) => number
) => {
let total = 0;
for (let i = 0; i < list.length; i++) {
total += getValue(list[i])
}

return total;
};

const totalCount = (list: Array<Item>): string => {
const totalCount = totalCalculator(list, (item) => item.quantity);
return `<h2>전체 수량: ${totalCount} 상자</h2>`;
};

const totalPrice = (list: Array<Item>): string => {
const totalPrice = totalCalculator(
list,
(item) => item.price \* item.quantity
);
return `<h2>전체 가격: ${totalPrice} 원</h2>`;
};
위 코드와 같이 반복되던 함수가 잘 정리된 것을 확인할 수 있습니다. 이제 전체 계산에 대한 요구사항이 수정되더라도 여러군데를 수정할 필요가 없어집니다.

그런데 현재 totalCalculator함수의 경우 total이라는 변수를 하나 선언해두고, item의 배열인 list를 처음부터 하나씩 검사하여 재고가 있을 때만 total의 getValue를 사용해서 가지고온 값을 누적하여 사용을 하고 있습니다. total을 계산하는 방식에 맞추고 코드가 작성되어 있는 것입니다.

이렇듯 for루프 뿐만 아니라 명령적 프로그래밍으로 코드를 작성할 때는 거의 대부분 위와 다르지 않은 형태로 코드를 작성하게 됩니다.

이 요구사항을 기능적으로 다시 분리해보도록 하겠습니다.

2. 리팩토링2
   기존 totalCalulator함수의 경우 전체 목록 중 재고가 있는 상품만 getValue를 실행하고 그 값을 모두 더하는 방식으로 구현이 되어 있습니다.

이는 아래와 같은 3단계로 나눌 수 있습니다.

재고가 있는 상품만 분류하기
분류된 상품들에 대해서 getValue 실행하기
getValue가 실행된 값 모두 더하기
사실 위의 각각의 명령을 수행하는 함수(filter, map, reduce)는 이미 존재하고 있습니다.

const totalCalculator = (
list: Array<Item>,
getValue: (item: Item) => number
) => {
// 전체 목록 중 재고가 있는 상품만 getValue를 실행하고 그 값을 모두 더한다.

return (
list
//1. 재고가 있는 상품만 분류하기
.filter((item) => item.outOfStock === false)
//2. 분류된 상품들에 대해서 getValue 실행하기
.map(getValue)
//3. getValue가 실행된 값 모두 더하기
.reduce((total, value) => total + value, 0)
);

let total = 0;
for (let i = 0; i < list.length; i++) {
total += getValue(list[i]);
}

return total;
};
위 코드의 경우 배열의 메소드들을 사용해 함수를 합성하는 대신 메소드 체이닝을 이용해 문제를 해결하였습니다.

(람다js와 같은 라이브러리를 사용한다면 똑같은 일을 메소드체이닝 대신 함수와 함수 합성을 통해 구현을 할 수 있습니다.)

이렇게 부수효과가 표함된 명령적 코드를, 부수효과를 격리시켜 함수로 만들고 그 함수를 직접 사용하는 방식의 선언적 코드로 변경함으로써 변경에 취약했던 코드를 유지보수도 쉽고, 재활용성도 높아지게 되었습니다.

기계에게 어떻게 일을 시켜야하는지에 대한 관점에서 벗어나 사람이 생각하는 것과 코드를 작성하는 것이 어떻게 일치될 수 있는지를 생각하며 코드를 작성하는 연습을 해나가야겠습니다.
