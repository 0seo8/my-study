import "./index.css";
import { cart, Item } from "./cart";
import * as o from "./option";

const stockItem = (item: Item): string => {
  //discount를 option으로 구현
  const optionDiscountPrice = o.fromUndefined(item.discountPrice); // {_tag: 'Some', value: 100} or {_tag: 'None'}
  const discountPrice = o.getOrElse(optionDiscountPrice, 0); // 10000 or 0

  let saleText = "";
  if (o.isSome(optionDiscountPrice)) {
    saleText = `(${discountPrice}원 할인)`;
  }

  return `
    <li>
      <h2>${item.name}</h2>
      <div>가격: ${item.price - discountPrice}원 ${saleText}</div>
      <div>수량: ${item.quantity}상자</div>
    </li>
  `;
};

const outOfStockItem = (item: Item): string => `
  <li class="gray">
    <h2>${item.name} (품절)</h2>
    <div class='strike'>가격: ${item.price}원</div>
    <div class='strike'>수량: ${item.quantity}상자</div>
  </li>
`;

const item = (item: Item): string => {
  if (item.outOfStock) {
    return outOfStockItem(item);
  } else {
    return stockItem(item);
  }
};

const totalCalculator = (
  list: Array<Item>,
  getValue: (item: Item) => number
) => {
  let result: Array<number> = [];
  list.forEach(function (item) {
    if (item.outOfStock === false) {
      result.push(getValue(item));
    }
  });

  return result.reduce((total, value) => total + value, 0);
};

const totalCount = (list: Array<Item>): string => {
  const totalCount = totalCalculator(list, (item) => item.quantity);
  return `<h2>전체 수량: ${totalCount}상자`;
};

const totalPrice = (list: Array<Item>): string => {
  const totalPrice = totalCalculator(
    list,
    (item) => item.price * item.quantity
  );

  const totalDiscountPrice = totalCalculator(list, (item) => {
    // item.discountPrice |> o.fromUndefined($) |> o.getOrElse($, 0)
    const discountPrice = o.getOrElse(o.fromUndefined(item.discountPrice), 0);
    return discountPrice * item.quantity;
  });

  return `<h2>전체 가격: ${
    totalPrice - totalDiscountPrice
  }원 (총 ${totalDiscountPrice}원 할인)</h2>`;
};

const list = (list: Array<Item>) => {
  return `
    <ul>
    ${list
      // 1. 목록에 있는 모든 아이템을 태그로 변경
      .map(item)
      // 2. 태그의 목록을 모두 하나의 문자열로 연결
      .reduce((tags, tag) => tags + tag, "")}
    </ul>
  `;
};

const app = document.getElementById("app");
if (app != null) {
  app.innerHTML = `
  <h1>장바구니</h1>
  ${list(cart)}
  ${totalCount(cart)}
  ${totalPrice(cart)}
  `;
}
